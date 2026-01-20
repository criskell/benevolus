<?php

namespace App\Services\Payment;

use App\DTO\Donation\DonationDTO;
use OpenPix\PhpSdk\Client;
use Illuminate\Support\Str;

final class WooviPaymentGateway implements PaymentGatewayInterface
{
    public function __construct(private Client $client) {}

    public function createPayment(DonationDTO $data): array
    {
        $externalReference = Str::random(48);

        $createChargeResult = $this->client->charges()->create([
            'value' => $data->amount,
            'correlationID' => $externalReference,
            'comment' => 'Donation',
        ]);

        $charge = $createChargeResult['charge'];

        return [
            'externalReference' => $charge['correlationID'],
            'status' => $charge['status'],
            'pixCode' => $charge['brCode'],
            'qrCode' => $charge['qrCodeImage'],
            'expiresAt' => now()->addSeconds($charge['expiresIn']),
        ];
    }

    public function getPaymentStatus(string $externalReference): string
    {
        $charge = $this->client->charges()->getOne($externalReference)['charge'];

        return $charge['status'];
    }
}
