<?php

namespace App\Http\Middleware;

use App\Http\Controllers\AuthController;
use App\Models\Site;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $site_id = (new AuthController())->getSiteId();
        $site = Site::where('id', $site_id)
            ->get()
            ->first();

        $user = $request->user();
        if($user) {
            if($user['photo']) {
                $photos = explode('.', $user['photo']);
                $user['photo_path'] = asset('storage/photos/' . $photos[0] . '.' . $photos[1]);
                $user['photo_thumb_path'] = asset('storage/photos/' . $photos[0] . '_thumb.' . $photos[1]);
                $user['photo_300_path'] = asset('storage/photos/' . $photos[0] . '_std.' . $photos[1]);
            } else {
                $user['photo_path'] = '';
                $user['photo_thumb_path'] = '';
                $user['photo_300_path'] = '';
            }
        }

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user,
            ],
            'site' => $site,
            'flash' => [
                'message' => fn () => $request->session()->get('message'),
                'data' => fn () => $request->session()->get('data'),
            ],
        ];
    }
}
