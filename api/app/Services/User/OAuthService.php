<?php
declare(strict_types=1);

namespace App\Services\User;

use App\Models\OAuthAccount;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Laravel\Socialite\Facades\Socialite;

final class OAuthService
{
    public function getRedirectUrl(string $provider)
    {
        return Socialite::driver($provider)->stateless()->redirect()->getTargetUrl();
    }

    public function handleCallback(string $provider)
    {
        $socialUser = Socialite::driver($provider)->stateless()->user();

        return DB::transaction(function () use ($provider, $socialUser) {
            $oAuthAccount = OAuthAccount::where('provider', $provider)
                ->where('provider_id', $socialUser->getId())
                ->first();

            if ($oAuthAccount) {
                $user = $oAuthAccount->user;
            } else {
                $user = User::firstOrCreate(
                    ['email' => $socialUser->getEmail()],
                    ['name' => $socialUser->getName()],
                );

                OAuthAccount::create([
                    'provider' => $provider,
                    'provider_id' => $socialUser->getId(),
                    'user_id' => $user->id,
                ]);
            }

            Auth::login($user, true);

            return $user;
        });
    }
}
