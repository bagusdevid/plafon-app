<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Sheep;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;
use Intervention\Image\Laravel\Facades\Image;

class ProfileController extends Controller
{
    public function index()
    {
        return inertia('Profile/Main');
    }

    public function edit(Request $request)
    {
        return inertia('Profile/Edit');
    }

    public function update(Request $request, Sheep $sheep)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255',
        ]);

        $sheep::where('id', $request->id)
            ->update([
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone
            ]);

        return redirect()
            ->to('/profile')
            ->with('message', 'Data berhasil diubah.');
    }

    public function changePasswd(Request $request)
    {
        if($request->isMethod('put')) {
            $validated = $request->validate([
                'current_password' => ['required', 'current_password'],
                'password' => ['required', Password::defaults(), 'confirmed'],
            ]);

            $request->user()->update([
                'password' => Hash::make($validated['password']),
            ]);

            return redirect()
                ->to('/profile')
                ->with('message', 'Password berhasil diubah.');
        }

        return inertia('Profile/ChangePassword');
    }

    public function changeAvatar(Request $request)
    {
        if($request->isMethod('post')) {
            $request->validate([
                'photo' => 'required|file|mimes:jpg,jpeg,gif,png|max:2048'
            ]);

            $upload = $request->file('photo');
            $random = Str::random();

            $image = Image::read($upload);
            Storage::put('photos/' . $random . '.' . $upload->getClientOriginalExtension(), $image->encodeByExtension($upload->getClientOriginalExtension()));

            $image_thumb = Image::read($upload)
                ->cover(150,150);
            Storage::put('photos/' . $random . '_thumb.' . $upload->getClientOriginalExtension(), $image_thumb->encodeByExtension($upload->getClientOriginalExtension()));

            $image_300 = Image::read($upload)
                ->cover(300,300);
            Storage::put('photos/' . $random . '_std.' . $upload->getClientOriginalExtension(),
            $image_300->encodeByExtension($upload->getClientOriginalExtension()));

            Sheep::where('id', Auth::user()['id'])
                ->update([
                    'photo' => $random . '.' . $upload->getClientOriginalExtension()
                ]);

            return redirect()
                ->to('/profile')
                ->with('message', 'Photo berhasil diubah.');
        }

        return inertia('Profile/ChangeAvatar');
    }

    /**
     * Display the user's profile form.
     */
    public function editOld(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function updateOld(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
