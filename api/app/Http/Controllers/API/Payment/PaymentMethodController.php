<?php

declare(strict_types=1);

namespace App\Http\Controllers\API\Payment;

use App\DTO\Payment\CardTokenDTO;
use App\Exceptions\PaymentException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Payment\StorePaymentMethodRequest;
use App\Http\Resources\Payment\PaymentMethodResource;
use App\Models\PaymentMethod;
use App\Services\Payment\CardTokenizableInterface;
use App\Services\Payment\PaymentGatewayInterface;
use App\Services\Payment\PaymentMethodService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controllers\HasMiddleware;
use OpenApi\Attributes as OA;

final class PaymentMethodController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            'auth:sanctum',
        ];
    }

    public function __construct(
        private PaymentMethodService $paymentMethodService,
        private PaymentGatewayInterface $paymentGateway,
    ) {}

    #[OA\Post(
        operationId: 'createTokenizationSession',
        path: '/api/payment-methods/tokenization-session',
        summary: 'Create a tokenization session for client-side card tokenization',
        security: [['sanctum' => []]],
        tags: ['Payment Methods'],
        responses: [
            new OA\Response(
                response: 200,
                description: 'Tokenization session created',
                content: new OA\JsonContent(
                    type: 'object',
                    properties: [
                        new OA\Property(property: 'gateway', type: 'string'),
                        new OA\Property(property: 'clientSecret', type: 'string', nullable: true),
                        new OA\Property(property: 'customerId', type: 'string', nullable: true),
                    ]
                )
            ),
        ]
    )]
    public function tokenizationSession(Request $request): JsonResponse
    {
        if (! ($this->paymentGateway instanceof CardTokenizableInterface)) {
            throw PaymentException::invalidPaymentMethod('Current gateway does not support card tokenization');
        }

        $session = $this->paymentGateway->createTokenizationSession($request->user());

        return response()->json($session);
    }

    #[OA\Get(
        operationId: 'listPaymentMethods',
        path: '/api/payment-methods',
        summary: 'List saved payment methods',
        security: [['sanctum' => []]],
        tags: ['Payment Methods'],
        responses: [
            new OA\Response(
                response: 200,
                description: 'Payment methods retrieved successfully',
                content: new OA\JsonContent(
                    type: 'object',
                    properties: [
                        new OA\Property(
                            property: 'data',
                            type: 'array',
                            items: new OA\Items(ref: '#/components/schemas/PaymentMethodResource')
                        ),
                    ]
                )
            ),
        ]
    )]
    public function index(Request $request)
    {
        $paymentMethods = $this->paymentMethodService->listForUser($request->user());

        return PaymentMethodResource::collection($paymentMethods);
    }

    #[OA\Post(
        operationId: 'storePaymentMethod',
        path: '/api/payment-methods',
        summary: 'Save a tokenized payment method',
        security: [['sanctum' => []]],
        tags: ['Payment Methods'],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(ref: '#/components/schemas/StorePaymentMethodRequest')
        ),
        responses: [
            new OA\Response(
                response: 201,
                description: 'Payment method saved',
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(
                            property: 'data',
                            ref: '#/components/schemas/PaymentMethodResource'
                        ),
                    ],
                    type: 'object'
                )
            ),
        ]
    )]
    public function store(StorePaymentMethodRequest $request): JsonResponse
    {
        $paymentMethod = $this->paymentMethodService->saveCard(
            $request->user(),
            CardTokenDTO::from($request->validated()),
        );

        return response()->json([
            'data' => new PaymentMethodResource($paymentMethod),
        ], 201);
    }

    #[OA\Delete(
        operationId: 'deletePaymentMethod',
        path: '/api/payment-methods/{id}',
        summary: 'Delete a saved payment method',
        security: [['sanctum' => []]],
        tags: ['Payment Methods'],
        parameters: [
            new OA\Parameter(
                name: 'id',
                in: 'path',
                required: true,
                schema: new OA\Schema(type: 'integer')
            ),
        ],
        responses: [
            new OA\Response(response: 204, description: 'Payment method deleted'),
            new OA\Response(response: 403, description: 'Forbidden'),
        ]
    )]
    public function destroy(Request $request, PaymentMethod $paymentMethod): Response
    {
        if ($paymentMethod->user_id !== $request->user()->id) {
            abort(403);
        }

        $this->paymentMethodService->delete($paymentMethod);

        return response()->noContent();
    }

    #[OA\Post(
        operationId: 'setDefaultPaymentMethod',
        path: '/api/payment-methods/{id}/default',
        summary: 'Set a payment method as default',
        security: [['sanctum' => []]],
        tags: ['Payment Methods'],
        parameters: [
            new OA\Parameter(
                name: 'id',
                in: 'path',
                required: true,
                schema: new OA\Schema(type: 'integer')
            ),
        ],
        responses: [
            new OA\Response(response: 204, description: 'Default updated'),
            new OA\Response(response: 403, description: 'Forbidden'),
        ]
    )]
    public function setDefault(Request $request, PaymentMethod $paymentMethod): Response
    {
        if ($paymentMethod->user_id !== $request->user()->id) {
            abort(403);
        }

        $this->paymentMethodService->setDefault($request->user(), $paymentMethod);

        return response()->noContent();
    }
}
