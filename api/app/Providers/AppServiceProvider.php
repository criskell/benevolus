<?php

namespace App\Providers;

use App\Services\StripePaymentGateway;
use App\Services\PaymentGatewayInterface;
use App\Services\WooviPaymentGateway;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(
            PaymentGatewayInterface::class,
            WooviPaymentGateway::class
        );
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
