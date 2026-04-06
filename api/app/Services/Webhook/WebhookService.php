<?php

declare(strict_types=1);

namespace App\Services\Webhook;

use App\Events\DonationPaid;
use App\Jobs\ProcessWebhook;
use App\Models\Donation;
use App\Models\WebhookHistoryItem;
use App\Notifications\DonationReceived;

final class WebhookService
{
    public function store(string $processor, string $rawPayload, ?string $gatewayKey = null): ?WebhookHistoryItem
    {
        $idempotencyKey = $gatewayKey ?? hash('sha256', $rawPayload);

        $existing = WebhookHistoryItem::where('idempotency_key', $idempotencyKey)->first();

        if ($existing) {
            return null;
        }

        $item = WebhookHistoryItem::create([
            'idempotency_key' => $idempotencyKey,
            'payload' => json_decode($rawPayload, true),
            'processor' => $processor,
            'status' => 'pending',
        ]);

        ProcessWebhook::dispatch($item->id);

        return $item;
    }

    public function process(WebhookHistoryItem $item): void
    {
        if (! $this->isPaymentConfirmationEvent($item)) {
            $item->update([
                'status' => 'processed',
                'processed_at' => now(),
            ]);

            return;
        }

        $externalReference = $this->resolveExternalReference($item);

        if (! $externalReference) {
            $item->update(['status' => 'failed']);

            return;
        }

        $donation = Donation::where('external_reference', $externalReference)->first();

        if (! $donation) {
            $item->update(['status' => 'failed']);

            return;
        }

        if ($donation->payment_status === 'paid') {
            $item->update([
                'status' => 'processed',
                'processed_at' => now(),
            ]);

            return;
        }

        $donation->payment_status = 'paid';
        $donation->paid_at = now();
        $donation->save();

        $donation->campaign->increment('available_balance_cents', $donation->amount_cents);

        event(new DonationPaid($donation->external_reference));

        $donation->campaign->user->notify(new DonationReceived($donation->load('campaign')));

        $item->update([
            'status' => 'processed',
            'processed_at' => now(),
        ]);
    }

    private function isPaymentConfirmationEvent(WebhookHistoryItem $item): bool
    {
        $payload = $item->payload;

        return match ($item->processor) {
            'woovi' => in_array($payload['event'] ?? null, [
                'OPENPIX:CHARGE_COMPLETED',
                'OPENPIX:TRANSACTION_RECEIVED',
            ]) && ! empty($payload['charge']['correlationID']),
            'asaas' => in_array($payload['event'] ?? null, [
                'PAYMENT_RECEIVED',
                'PAYMENT_CONFIRMED',
            ]),
            default => false,
        };
    }

    private function resolveExternalReference(WebhookHistoryItem $item): ?string
    {
        $payload = $item->payload;

        return match ($item->processor) {
            'woovi' => $payload['charge']['correlationID'] ?? null,
            'asaas' => $payload['payment']['externalReference'] ?? null,
            default => null,
        };
    }
}
