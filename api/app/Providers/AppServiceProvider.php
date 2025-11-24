<?php

namespace App\Providers;

use App\Services\Payment\StripePaymentProcessor;
use App\Services\PaymentProcessorInterface;
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
            StripePaymentProcessor::class
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
