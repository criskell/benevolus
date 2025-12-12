<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Services\OAuthService;

class OAuthController extends Controller
{
    public function __construct(private OAuthService $oAuthService) {}

    public function redirect(string $provider)
    {
        $url = $this->oAuthService->getRedirectUrl($provider);

        return redirect($url);
    }

    public function callback(string $provider)
    {
        return response()->json($this->oAuthService->handleCallback($provider));
    }
}
