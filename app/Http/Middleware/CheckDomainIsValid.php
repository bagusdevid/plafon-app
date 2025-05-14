<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class CheckDomainIsValid
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $query = DB::table('sites')
            ->get()
            ->filter(function ($item) {
                $domain = $this->urlPlain($item->domain);
                return $domain === $this->urlPlain(url('/')) && $item->active;
            })
            ->count();

        if($query > 0) {
            return $next($request);
        }

        return redirect()
            ->to('/site-activation');
    }

    private function urlPlain($url)
    {
        $parse = parse_url(strtolower($url));
        $parse = str_replace('www.', '', $parse['host']);

        return $parse;
    }
}
