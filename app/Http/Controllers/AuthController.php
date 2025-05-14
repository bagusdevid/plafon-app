<?php

namespace App\Http\Controllers;

use App\Models\Sheep;
use App\Models\Site;
use App\Models\SiteInvitation;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Illuminate\Contracts\Encryption\DecryptException;

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

    private function getSiteId()
    {
        return $this->getSitesMatch()
            ->map(function ($item) {
                return $item->id;
            })
            ->first();
    }

    private function getSitesMatch()
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
