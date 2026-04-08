<?php

declare(strict_types=1);

namespace App\Services\Payment;

use App\DTO\Payment\CardTokenDTO;
use App\Models\PaymentMethod;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

final class PaymentMethodService
{
    public function listForUser(User $user): Collection
    {
        return $user->paymentMethods()
            ->orderByDesc('is_default')
            ->orderByDesc('created_at')
            ->get();
    }

    public function saveCard(User $user, CardTokenDTO $dto): PaymentMethod
    {
        $gateway = config('services.payment_gateway', 'asaas');

        $hasCards = $user->paymentMethods()->exists();

        return $user->paymentMethods()->create([
            'gateway' => $gateway,
            'gateway_token' => $dto->token,
            'gateway_customer_id' => $dto->gatewayCustomerId,
            'brand' => $dto->brand,
            'last_four' => $dto->lastFour,
            'exp_month' => $dto->expMonth,
            'exp_year' => $dto->expYear,
            'holder_name' => $dto->holderName,
            'billing_postal_code' => $dto->billingPostalCode,
            'billing_address_number' => $dto->billingAddressNumber,
            'billing_street' => $dto->billingStreet,
            'billing_neighborhood' => $dto->billingNeighborhood,
            'billing_city' => $dto->billingCity,
            'billing_state' => $dto->billingState,
            'billing_complement' => $dto->billingComplement,
            'is_default' => ! $hasCards,
        ]);
    }

    public function delete(PaymentMethod $paymentMethod): void
    {
        $wasDefault = $paymentMethod->is_default;
        $userId = $paymentMethod->user_id;

        $paymentMethod->delete();

        if ($wasDefault) {
            $next = PaymentMethod::where('user_id', $userId)
                ->orderByDesc('created_at')
                ->first();

            if ($next) {
                $next->update(['is_default' => true]);
            }
        }
    }

    public function setDefault(User $user, PaymentMethod $paymentMethod): void
    {
        $user->paymentMethods()
            ->where('is_default', true)
            ->update(['is_default' => false]);

        $paymentMethod->update(['is_default' => true]);
    }
}
