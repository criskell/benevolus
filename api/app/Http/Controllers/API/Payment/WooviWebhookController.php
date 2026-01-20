<?php

namespace App\Http\Controllers\API\Payment;

use App\Events\DonationPaid;
use App\Http\Controllers\Controller;
use App\Models\Donation;
use Illuminate\Http\Request;
use OpenApi\Attributes as OA;
use OpenPix\PhpSdk\Client;

class WooviWebhookController extends Controller
{
    const SIGNATURE_HEADER = 'x-webhook-signature';

    const TEST_WEBHOOK_EVENT = 'teste_webhook';

    const OPENPIX_CHARGE_COMPLETED_EVENT = 'OPENPIX:CHARGE_COMPLETED';

    const OPENPIX_TRANSACTION_RECEIVED_EVENT = 'OPENPIX:TRANSACTION_RECEIVED';

    public function __construct(protected Client $woovi) {}

    #[OA\Post(
        operationId: "receiveWooviWebhook",
        path: "/api/woovi/webhook",
        summary: "Receive Woovi webhook",
        tags: ["Webhooks"],
        parameters: [
            new OA\Parameter(
                name: "x-webhook-signature",
                in: "header",
                required: true,
                schema: new OA\Schema(type: "string"),
                description: "Webhook signature for verification"
            ),
        ],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                properties: [
                    new OA\Property(property: "event", type: "string", example: "OPENPIX:CHARGE_COMPLETED"),
                    new OA\Property(
                        property: "charge",
                        type: "object",
                        properties: [
                            new OA\Property(property: "correlationID", type: "string"),
                            new OA\Property(property: "value", type: "integer"),
                        ]
                    ),
                ],
                type: "object"
            )
        ),
        responses: [
            new OA\Response(
                response: 200,
                description: "Webhook processed successfully",
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: "message", type: "string", example: "Success."),
                    ],
                    type: "object"
                )
            ),
            new OA\Response(
                response: 400,
                description: "Invalid webhook signature or type",
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(
                            property: "errors",
                            type: "array",
                            items: new OA\Items(
                                properties: [
                                    new OA\Property(property: "message", type: "string"),
                                ],
                                type: "object"
                            )
                        ),
                    ],
                    type: "object"
                )
            ),
            new OA\Response(
                response: 404,
                description: "Donation not found",
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(
                            property: "errors",
                            type: "array",
                            items: new OA\Items(
                                properties: [
                                    new OA\Property(property: "message", type: "string"),
                                ],
                                type: "object"
                            )
                        ),
                    ],
                    type: "object"
                )
            ),
        ]
    )]
    public function receive(Request $request)
    {
        if ($response = $this->allowRequestOnlyFromWoovi($request)) return $response;

        return $this->handleWebhook($request);
    }

    private function allowRequestOnlyFromWoovi(Request $request)
    {
        $rawPayload = $request->getContent();
        $signature = $request->header(self::SIGNATURE_HEADER);

        $isWebhookValid = ! empty($rawPayload)
            && ! empty($signature)
            && $this->woovi->webhooks()->isWebhookValid($rawPayload, $signature);

        if ($isWebhookValid) return null;

        return response()->json([
            'errors' => [
                [
                    'message' => 'Invalid webhook signature.'
                ],
            ],
        ], 400);
    }

    public function handleChargePaidWebhook(Request $request)
    {
        $correlationId = $request->input('charge.correlationID');

        $donation = Donation::where('external_reference', $correlationId)->first();

        if (empty($donation)) {
            return response()->json([
                'errors' => [
                    [
                        'message' => 'Donation not found.',
                    ],
                ],
            ], 404);
        }

        $donation->payment_status = 'paid';
        $donation->save();

        // FIXME: Apply taxes.
        // FIXME: Implement double entry bookkeeping ledger.
        // FIXME: Ports and adapters architecture.
        $amount = $request->input('charge.value');
        $donation->campaign->increment('available_balance_cents', $amount);

        event(new DonationPaid($donation->external_reference));

        return response()->json(['message' => 'Success.']);
    }

    private function handleTestWebhook()
    {
        return response()->json(['message' => 'Success.']);
    }

    private function isChargePaidPayload(Request $request)
    {
        $event = $request->input('event');

        $allowedEvents = [
            self::OPENPIX_CHARGE_COMPLETED_EVENT,
            self::OPENPIX_TRANSACTION_RECEIVED_EVENT,
        ];

        $isChargePaidEvent = ! empty($event) && in_array($event, $allowedEvents);

        return $isChargePaidEvent
            && ! empty($request->input('charge.correlationID'));
    }

    private function isTestPayload(Request $request)
    {
        $event = $request->input('evento');

        return ! empty($event) && $event === self::TEST_WEBHOOK_EVENT;
    }

    private function handleWebhook(Request $request)
    {
        if ($this->isChargePaidPayload($request)) {
            return $this->handleChargePaidWebhook($request);
        }

        if ($this->isTestPayload($request)) {
            return $this->handleTestWebhook();
        }

        return response()->json([
            'errors' => [
                [
                    'message' => 'Invalid webhook type.',
                ],
            ]
        ], 400);
    }
}
