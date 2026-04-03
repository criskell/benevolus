<?php

declare(strict_types=1);

namespace App\Providers;

use App\Services\Payment\Asaas\AsaasClient;
use App\Services\Payment\Asaas\AsaasPaymentGateway;
use App\Services\Payment\PaymentGatewayInterface;
use App\Services\Payment\StripePaymentGateway;
use App\Services\Payment\WooviPaymentGateway;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->singleton(AsaasClient::class, function () {
            return new AsaasClient(
                apiKey: config('services.asaas.api_key'),
                baseUrl: config('services.asaas.base_url'),
            );
        });

        $this->app->bind(PaymentGatewayInterface::class, fn ($app) => match (config('services.payment_gateway')) {
            'asaas' => $app->make(AsaasPaymentGateway::class),
            'stripe' => $app->make(StripePaymentGateway::class),
            default => $app->make(WooviPaymentGateway::class),
        });
    }

    public function boot(): void
    {
        JsonResource::withoutWrapping();
    }
}
