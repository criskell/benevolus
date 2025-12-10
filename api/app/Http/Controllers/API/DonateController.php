<?php

namespace App\Http\Controllers\API;

use App\DTO\Donation\DonationDTO;
use App\Http\Controllers\Controller;
use App\Http\Requests\DonateRequest;
use App\Http\Resources\DonationResource;
use App\Http\Resources\PaymentResource;
use App\Http\Responses\ApiResponse;
use App\Services\DonationProcessor;
use Illuminate\Http\JsonResponse;
use OpenApi\Attributes as OA;

class DonateController extends Controller
{
    public function __construct(private DonationProcessor $donationProcessor) {}

    #[OA\Post(
        path: "/api/donations",
        summary: "Create a new donation",
        description: "Create a new donation with payment information",
        tags: ["Donations"],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                ref: "#/components/schemas/DonationRequest"
            )
        ),
        responses: [
            new OA\Response(
                response: 201,
                description: "Created",
                content: new OA\JsonContent(
                    allOf: [
                        new OA\Schema(
                            ref: "#/components/schemas/ApiSuccessResponse"
                        ),
                        new OA\Schema(
                            properties: [
                                new OA\Property(
                                    property: "data",
                                    properties: [
                                        new OA\Property(
                                            property: "donation",
                                            ref: "#/components/schemas/DonationResource"
                                        ),
                                        new OA\Property(
                                            property: "payment",
                                            ref: "#/components/schemas/PaymentResource"
                                        ),
                                    ],
                                    type: "object"
                                )
                            ]
                        )
                    ]
                )
            ),
            new OA\Response(
                response: 422,
                description: "Validation error",
                content: new OA\JsonContent(
                    ref: "#/components/schemas/ApiErrorResponse"
                )
            )
        ]
    )]
    public function store(DonateRequest $request): JsonResponse
    {
        $result = $this->donationProcessor->process(DonationDTO::from($request->validated()));

        return ApiResponse::created([
            'donation' => new DonationResource($result['donation']),
            'payment' => new PaymentResource($result['payment']),
        ]);
    }

    #[OA\Post(
        path: "/api/donations/{id}/confirm",
        summary: "Confirm donation payment",
        tags: ["Donations"],
        parameters: [
            new OA\Parameter(
                name: "id",
                in: "path",
                required: true,
                schema: new OA\Schema(type: "integer")
            ),
        ],
        responses: [
            new OA\Response(
                response: 200,
                description: "Success",
                content: new OA\JsonContent(
                    allOf: [
                        new OA\Schema(
                            ref: "#/components/schemas/ApiSuccessResponse"
                        ),
                        new OA\Schema(
                            properties: [
                                new OA\Property(
                                    property: "data",
                                    ref: "#/components/schemas/DonationResponse"
                                ),
                            ]
                        ),
                    ]
                )
            ),
            new OA\Response(
                response: 404,
                description: "Not found",
                content: new OA\JsonContent(
                    ref: "#/components/schemas/ApiErrorResponse"
                )
            ),
        ],
    )]
    public function confirm(string $externalReferenceId): JsonResponse
    {
        $donation = $this->donationProcessor->confirmPayment($externalReferenceId);
        $data = [
            'donation_id' => $donation->id,
            'status' => $donation->payment_status,
            'paid_at' => $donation->paid_at,
        ];

        return ApiResponse::success($data);
    }
}
