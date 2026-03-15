<?php

declare(strict_types=1);

namespace App\Providers;

use App\Services\Payment\PaymentGatewayInterface;
use App\Services\Payment\WooviPaymentGateway;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(
            PaymentGatewayInterface::class,
            WooviPaymentGateway::class
        );
    }

    public function boot(): void
    {
        JsonResource::withoutWrapping();
    }
}
