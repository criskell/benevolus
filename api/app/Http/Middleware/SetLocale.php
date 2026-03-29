<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Symfony\Component\HttpFoundation\Response;

final class SetLocale
{
    public function handle(Request $request, Closure $next): Response
    {
        $locale = $request->getPreferredLanguage(['en', 'es', 'pt']);

        App::setLocale($locale ?? 'pt');

        return $next($request);
    }
}
