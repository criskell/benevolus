<?php

declare(strict_types=1);

namespace App\Http\Controllers\API\Payment;

use App\Http\Controllers\Controller;
use App\Services\Webhook\WebhookService;
use Illuminate\Http\Request;
use OpenPix\PhpSdk\Client;

final class WooviWebhookController extends Controller
{
    const SIGNATURE_HEADER = 'x-webhook-signature';

    const TEST_WEBHOOK_EVENT = 'teste_webhook';

    public function __construct(
        protected Client $woovi,
        protected WebhookService $webhookService,
    ) {}

    public function receive(Request $request)
    {
        if ($this->isTestPayload($request)) {
            return response()->json(['message' => 'Success.']);
        }

        if ($response = $this->allowRequestOnlyFromWoovi($request)) {
            return $response;
        }

        $rawPayload = $request->getContent();

        $item = $this->webhookService->store('woovi', $rawPayload);

        if (! $item) {
            return response()->json(['message' => 'Webhook already received.']);
        }

        return response()->json(['message' => 'Webhook received.']);
    }

    private function allowRequestOnlyFromWoovi(Request $request)
    {
        $rawPayload = $request->getContent();
        $signature = $request->header(self::SIGNATURE_HEADER);

        $isWebhookValid = ! empty($rawPayload)
            && ! empty($signature)
            && $this->woovi->webhooks()->isWebhookValid($rawPayload, $signature);

        if ($isWebhookValid) {
            return null;
        }

        return response()->json([
            'errors' => [
                [
                    'message' => 'Invalid webhook signature.',
                ],
            ],
        ], 400);
    }

    private function isTestPayload(Request $request): bool
    {
        $event = $request->input('evento');

        return ! empty($event) && $event === self::TEST_WEBHOOK_EVENT;
    }
}
