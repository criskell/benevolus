<?php
declare(strict_types=1);

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use OpenPix\PhpSdk\Client;

class WooviServiceProvider extends ServiceProvider
{
    private const BASE_URI = 'https://api.woovi.com';
    private const SANDBOX_BASE_URI = 'https://api.woovi-sandbox.com';

    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->singleton(Client::class, function () {
            $appId = env('WOOVI_APP_ID');
            $baseUri = env('WOOVI_BASE_URI', app()->isProduction() ? self::BASE_URI : self::SANDBOX_BASE_URI);

            return Client::create($appId, $baseUri);
        });
    }
}
