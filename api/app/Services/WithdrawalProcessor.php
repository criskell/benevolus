<?php

namespace App\Services;

use App\Models\Withdrawal;
use Illuminate\Support\Str;
use OpenPix\PhpSdk\Client;

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

        $withdrawal->campaign()->decrement('available_balance_cents', $withdrawal->amountCents);
    }
}
