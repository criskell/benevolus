<?php

declare(strict_types=1);

namespace App\Http\Controllers\API\Payment;

use App\Http\Controllers\Controller;
use App\Services\Webhook\WebhookService;
use Illuminate\Http\Request;

final class AsaasWebhookController extends Controller
{
    public function __construct(protected WebhookService $webhookService) {}

    public function receive(Request $request)
    {
        if (! $this->validateWebhookToken($request)) {
            return response()->json([
                'errors' => [['message' => 'Invalid webhook token.']],
            ], 401);
        }

        $rawPayload = $request->getContent();

        $item = $this->webhookService->store('asaas', $rawPayload);

        if (! $item) {
            return response()->json(['message' => 'Webhook already received.']);
        }

        return response()->json(['message' => 'Webhook received.']);
    }

    private function validateWebhookToken(Request $request): bool
    {
        $token = $request->header('asaas-access-token');

        return $token && $token === config('services.asaas.webhook_token');
    }
}
