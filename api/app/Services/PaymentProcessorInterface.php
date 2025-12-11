<?php

namespace App\Services;

use App\DTO\Donation\DonationDTO;

interface PaymentGatewayInterface
{
    public function createPayment(DonationDTO $data): array;
    public function getPaymentStatus(string $paymentId): string;
}
