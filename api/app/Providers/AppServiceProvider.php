<?php

namespace App\Providers;

use App\Services\StripePaymentProcessor;
use App\Services\PaymentProcessorInterface;
use App\Services\WooviPaymentProcessor;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(
            PaymentProcessorInterface::class,
            WooviPaymentProcessor::class
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
