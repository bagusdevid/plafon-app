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

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'site' => $site,
            'flash' => [
                'message' => fn () => $request->session()->get('message'),
                'data' => fn () => $request->session()->get('data'),
            ],
        ];
    }
}
