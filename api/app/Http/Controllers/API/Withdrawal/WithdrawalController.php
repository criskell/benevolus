<?php
declare(strict_types=1);

namespace App\Http\Controllers\API\Withdrawal;

use App\Http\Controllers\Controller;
use App\Http\Requests\Withdrawal\StoreWithdrawalRequest;
use App\Http\Resources\Withdrawal\WithdrawalResource;
use App\Models\Campaign;
use App\Models\Withdrawal;
use App\Services\Withdrawal\WithdrawalProcessor;
use App\Services\Withdrawal\WithdrawalService;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use OpenApi\Attributes as OA;

final class WithdrawalController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('auth:sanctum', only: ['index', 'store']),
        ];
    }

    public function __construct(
        private WithdrawalService $withdrawalService,
        private WithdrawalProcessor $withdrawalProcessor
    ) {}

    #[OA\Get(
        operationId: "listWithdrawals",
        path: "/api/campaigns/{campaign}/withdrawals",
        summary: "List campaign withdrawals",
        tags: ["Withdrawals"],
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
                description: "Withdrawals retrieved successfully",
                content: new OA\JsonContent(
                    type: "object",
                    properties: [
                        new OA\Property(
                            property: "data",
                            type: "array",
                            items: new OA\Items(ref: "#/components/schemas/WithdrawalResource")
                        ),
                    ]
                )
            ),
        ]
    )]
    public function index(Campaign $campaign)
    {
        $withdrawals = $this->withdrawalService->listByCampaign($campaign);

        return WithdrawalResource::collection($withdrawals);
    }

    #[OA\Post(
        operationId: "createWithdrawal",
        path: "/api/campaigns/{campaign}/withdrawals",
        summary: "Create withdrawal",
        tags: ["Withdrawals"],
        parameters: [
            new OA\Parameter(
                name: "campaign",
                in: "path",
                required: true,
                schema: new OA\Schema(type: "integer"),
                description: "Campaign ID"
            ),
        ],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                ref: "#/components/schemas/StoreWithdrawalRequest"
            )
        ),
        responses: [
            new OA\Response(response: 204),
        ]
    )]
    public function store(Campaign $campaign, StoreWithdrawalRequest $request)
    {
        $data = [
            'pix_key_type' => $request->pixKeyType,
            'pix_key' => $request->pixKey,
            'amountCents' => $request->amountCents,
        ];

        if ($request->amountCents > $campaign->available_balance_cents) {
            abort(403);
        }

        $withdrawal = $this->withdrawalService->create($campaign, $data);

        // FIXME: Background processing.
        $this->withdrawalProcessor->process($withdrawal);

        return response()->noContent();
    }

    #[OA\Get(
        operationId: "getWithdrawal",
        path: "/api/withdrawals/{withdrawal}",
        summary: "Get withdrawal by ID",
        tags: ["Withdrawals"],
        parameters: [
            new OA\Parameter(
                name: "withdrawal",
                in: "path",
                required: true,
                schema: new OA\Schema(type: "integer"),
                description: "Withdrawal ID"
            ),
        ],
        responses: [
            new OA\Response(
                response: 200,
                description: "Withdrawal retrieved successfully",
                content: new OA\JsonContent(
                    ref: "#/components/schemas/WithdrawalResource"
                )
            ),
        ]
    )]
    public function show(Withdrawal $withdrawal)
    {
        return new WithdrawalResource($withdrawal->load('campaign'));
    }
}
