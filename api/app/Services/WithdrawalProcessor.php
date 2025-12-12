<?php

namespace App\Services;

use App\Models\Withdrawal;
use Illuminate\Support\Str;
use OpenPix\PhpSdk\Client;
use OpenPix\PhpSdk\Request;

final class WithdrawalProcessor
{
    public function __construct(private Client $woovi) {}

    public function process(Withdrawal $withdrawal)
    {
        $externalReference = Str::random(48);

        $this->woovi->payments()->create([
            'type' => 'PIX_KEY',
            'value' => $withdrawal->amountCents,
            'destinationAliasType' => $withdrawal->pix_key_type,
            'destinationAlias' => $withdrawal->pix_key,
            'correlationID' => $externalReference,
        ]);

        if (false) {
            // FIXME: Add `PixKeys` resource on PHP-SDK.
            $this->woovi->getRequestTransport()->transport(
                (new Request)
                    ->method('POST')
                    ->path('/api/v1/pix-keys')
                    ->body([
                        'pixKey' => $withdrawal->pix_key,
                        'type' => 'PHONE'
                    ])
            );

            // FIXME: Add `approve` method to `Payments` resource on PHP-SDK.
            $this->woovi->getRequestTransport()->transport(
                (new Request)
                    ->method('POST')
                    ->path('/api/v1/payment/approve')
                    ->body([
                        'correlationID' => $externalReference,
                    ])
            );
        }

        $withdrawal->status = 'paid';
        $withdrawal->campaign()->decrement('available_balance_cents', $withdrawal->amountCents);
        $withdrawal->save();
    }
}
