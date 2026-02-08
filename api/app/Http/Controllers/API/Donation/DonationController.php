<?php
declare(strict_types=1);

namespace App\Http\Controllers\API\Donation;

use App\DTO\Donation\DonationDTO;
use App\Http\Controllers\Controller;
use App\Http\Requests\Donation\DonateRequest;
use App\Http\Resources\Campaign\CampaignDonationResource;
use App\Http\Resources\Donation\DonationResource;
use App\Http\Resources\Payment\PaymentResource;
use App\Models\Campaign;
use App\Services\Donation\DonationProcessor;
use App\Services\Donation\DonationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use OpenApi\Attributes as OA;

final class DonationController extends Controller
{
    public function __construct(
        private DonationService $donationService,
        private DonationProcessor $donationProcessor
    ) {}

    #[OA\Get(
        operationId: "listCampaignDonations",
        path: "/api/campaigns/{campaign}/donations",
        summary: "List campaign donations",
        tags: ["Donations"],
        parameters: [
            new OA\Parameter(
                name: "campaign",
                in: "path",
                required: true,
                schema: new OA\Schema(type: "integer"),
                description: "Campaign ID"
            ),
        ],
        responses: [
            new OA\Response(
                response: 200,
                description: "Donations retrieved successfully",
                content: new OA\JsonContent(
                    type: "object",
                    properties: [
                        new OA\Property(
                            property: "data",
                            type: "array",
                            items: new OA\Items(ref: "#/components/schemas/CampaignDonationResource")
                        ),
                    ]
                )
            ),
        ]
    )]
    public function index(Campaign $campaign)
    {
        $donations = $this->donationService->listPaidDonationsByCampaign($campaign->id);

        return CampaignDonationResource::collection($donations);
    }

    #[OA\Post(
        operationId: "createDonation",
        path: "/api/donations",
        summary: "Create a new donation",
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
            ),
        ]
    )]
    public function store(DonateRequest $request): JsonResponse
    {
        $result = $this->donationProcessor->process(DonationDTO::from($request->validated()));

        return response()->json([
            'donation' => new DonationResource($result['donation']),
            'payment' => new PaymentResource($result['payment']),
        ], 201);
    }

    #[OA\Post(
        operationId: "confirmDonation",
        path: "/api/donations/{id}/confirm",
        summary: "Confirm donation payment",
        tags: ["Donations"],
        parameters: [
            new OA\Parameter(
                name: "id",
                in: "path",
                required: true,
                schema: new OA\Schema(type: "string"),
                description: "External reference ID"
            ),
        ],
        responses: [
            new OA\Response(response: 204, description: "Donation confirmed successfully"),
        ],
    )]
    public function confirm(string $externalReferenceId): Response
    {
        $this->donationProcessor->confirmPayment($externalReferenceId);

        return response()->noContent();
    }
}
