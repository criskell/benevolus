<?php

declare(strict_types=1);

namespace App\Services\Payment;

use App\DTO\Donation\DonationDTO;
use App\Models\User;

interface CardTokenizableInterface
{
    /**
     * Create a tokenization session for client-side card tokenization.
     *
     * Asaas: returns gateway config (tokenization handled by Asaas.js on client)
     * Stripe: creates a SetupIntent and returns the client secret
     *
     * @return array{gateway: string, clientSecret?: string}
     */
    public function createTokenizationSession(User $user): array;

    /**
     * Create a payment using a previously tokenized card.
     *
     * @param  string  $token  Gateway-specific token (Asaas creditCardToken or Stripe PaymentMethod ID)
     * @param  string|null  $customerId  Gateway customer ID for the payer
     */
    public function createPaymentWithToken(DonationDTO $data, string $token, ?string $customerId): array;
}
