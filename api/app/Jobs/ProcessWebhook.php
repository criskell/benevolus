<?php

declare(strict_types=1);

namespace App\Jobs;

use App\Models\WebhookHistoryItem;
use App\Services\Webhook\WebhookService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class ProcessWebhook implements ShouldQueue
{
    use Queueable;

    public function __construct(public int $webhookHistoryItemId) {}

    public function handle(WebhookService $service): void
    {
        $item = WebhookHistoryItem::find($this->webhookHistoryItemId);

        if (! $item || $item->status !== 'pending') {
            return;
        }

        $service->process($item);
    }

    public function failed(\Throwable $exception): void
    {
        $item = WebhookHistoryItem::find($this->webhookHistoryItemId);

        $item?->update(['status' => 'failed']);
    }
}
