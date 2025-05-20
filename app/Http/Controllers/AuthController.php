<?php

namespace App\Http\Controllers;

use App\Models\Sheep;
use App\Models\Site;
use App\Models\SiteInvitation;
use App\Models\User;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        if($request->isMethod('post')) {
            $credentials = $request->validate([
                'email' => ['required', 'string', 'email'],
                'password' => ['required', 'string'],
            ]);

            if (Auth::attempt($credentials)) {
                $request->session()->regenerate();

                return redirect()->intended(route('home', absolute: false));
            }

            return back()->withErrors([
                'email' => 'The provided credentials do not match our records.',
            ])->onlyInput('email');
        }

        return inertia('Auth/Login');
    }

    public function register(Request $request)
    {
        if($request->isMethod('post')) {
            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|lowercase|email|max:255|unique:'.Sheep::class,
                'password' => ['required', 'confirmed', Rules\Password::defaults()],
                'invitation_code' => ['required']
            ]);

            if(!$this->checkInvitationCode($request->invitation_code)) {
                return back()
                    ->with('data', 'Invitation code tidak terdaftar atau kadaluarsa.');
            }

            $sheep = Sheep::create([
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'password' => Hash::make($request->password)
            ]);

            return redirect()
                ->to('/login')
                ->with('message', 'Registrasi berhasil');
        }

        $invitation = '';
        if($request->has('invitation') && $request->filled('invitation')) {
            $invitation = $this->codeDecrypter($request->invitation) ? $this->codeDecrypter($request->invitation) : '';
        }
        $data['invitation'] = $invitation;

        return inertia('Auth/Register', $data);
    }

    public function forgotPassword(Request $request)
    {
        if($request->isMethod('post')) {

            $request->validate([
                'email' => 'required|email',
            ]);

            $status = Password::sendResetLink(
                $request->only('email')
            );

            if ($status == Password::RESET_LINK_SENT) {
                return back()->with('status', __($status));
            }

            throw ValidationException::withMessages([
                'email' => [trans($status)],
            ]);
        }

        return inertia('Auth/ForgotPassword', [
            'status' => session('status'),
        ]);
    }

    public function createResetPassword(Request $request)
    {
        return Inertia::render('Auth/ResetPassword', [
            'email' => $request->email,
            'token' => $request->route('token'),
        ]);
    }

    public function storeResetPassword(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        // Here we will attempt to reset the user's password. If it is successful we
        // will update the password on an actual user model and persist it to the
        // database. Otherwise we will parse the error and return the response.
        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user) use ($request) {
                $user->forceFill([
                    'password' => Hash::make($request->password),
                    'remember_token' => Str::random(60),
                ])->save();

                event(new PasswordReset($user));
            }
        );

        // If the password was successfully reset, we will redirect the user back to
        // the application's home authenticated view. If there is an error we can
        // redirect them back to where they came from with their error message.
        if ($status == Password::PASSWORD_RESET) {
            return redirect()->route('login')->with('status', __($status));
        }

        throw ValidationException::withMessages([
            'email' => [trans($status)],
        ]);
    }

    private function checkInvitationCode($code)
    {
        $query = SiteInvitation::where('site_id', $this->getSiteId())
            ->where('code', $code)
            ->get();

        if($query->count() > 0) {
            $query = $query->first();
            return $this->codeIsValid($query->valid_start, $query->valid_end);
        }

        return false;
    }

    private function codeIsValid($valid_start, $valid_end) {
        $now = Carbon::now()->tzName;
        $start = Carbon::createFromFormat('Y-m-d H:i:s', $valid_start);
        $valid_start_status = $start->lessThan($now);
        $end = Carbon::createFromFormat('Y-m-d H:i:s', $valid_end);
        $valid_end_status = $end->greaterThan($now);

        return $valid_start_status && $valid_end_status;
    }

    public function logout(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/login');
    }

    public function siteActivation(Request $request)
    {
        if($request->isMethod('post')) {
            $request->validate([
                'activation_code' => ['required']
            ]);

            $query = Site::where('activation_code', $request->activation_code)
                ->get();

            if($query->count() > 0) {
                Site::where('id', $query->first()->id)
                    ->update([
                        'active' => 1
                    ]);

                return redirect()
                    ->to('/')
                    ->with('message', 'Site successfully activated');
            }

            return back()
                ->with('data', 'Wrong activation code');
        }

        $query = $this->getSitesMatch()
            ->count();

        if($query > 0) {
            return redirect()
                ->to('/');
        }

        $data['url'] = url('/');

        return inertia('Auth/SiteActivation', $data);
    }

    public function getSiteId()
    {
        return $this->getSitesMatch()
            ->map(function ($item) {
                return $item->id;
            })
            ->first();
    }

    public function getSitesMatch()
    {
        return DB::table('sites')
            ->get()
            ->filter(function ($item) {
                $domain = $this->urlPlain($item->domain);
                return $domain === $this->urlPlain(url('/')) && $item->active;
            });
    }

    private function urlPlain($url)
    {
        $parse = parse_url(strtolower($url));
        $parse = str_replace('www.', '', $parse['host']);

        return $parse;
    }

    public function codeDecrypter($code) {
        try {
            return decrypt($code);
        } catch (DecryptException $exception) {
            return $exception;
        }
    }
}
