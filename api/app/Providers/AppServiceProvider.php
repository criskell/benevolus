<?php
declare(strict_types=1);

namespace App\Providers;

use App\Services\Payment\StripePaymentGateway;
use App\Services\Payment\PaymentGatewayInterface;
use App\Services\Payment\WooviPaymentGateway;
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
