<?php
declare(strict_types=1);

namespace App\Services\Payment;

use App\DTO\Donation\DonationDTO;

interface PaymentGatewayInterface
{
    public function createPayment(DonationDTO $data): array;
    public function getPaymentStatus(string $paymentId): string;
}
