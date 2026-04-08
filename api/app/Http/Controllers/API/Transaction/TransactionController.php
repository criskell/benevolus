<?php

declare(strict_types=1);

namespace App\Http\Controllers\API\Transaction;

use App\Http\Controllers\Controller;
use App\Http\Resources\Transaction\TransactionResource;
use App\Models\Campaign;
use App\Services\Transaction\TransactionService;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use OpenApi\Attributes as OA;

final class TransactionController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('auth:sanctum', only: ['index']),
        ];
    }

    public function __construct(
        private TransactionService $transactionService
    ) {}

    #[OA\Get(
        operationId: 'listCampaignTransactions',
        path: '/api/campaigns/{campaign}/transactions',
        summary: 'List campaign transactions with summary',
        tags: ['Transactions'],
        parameters: [
            new OA\Parameter(
                name: 'campaign',
                in: 'path',
                required: true,
                schema: new OA\Schema(type: 'integer'),
                description: 'Campaign ID'
            ),
            new OA\Parameter(
                name: 'type',
                in: 'query',
                required: false,
                schema: new OA\Schema(type: 'string', enum: ['donation', 'withdrawal', 'dispute', 'adjustment']),
                description: 'Filter by transaction type'
            ),
            new OA\Parameter(
                name: 'period',
                in: 'query',
                required: false,
                schema: new OA\Schema(type: 'integer'),
                description: 'Filter by period in days (e.g. 7, 15, 30, 90)'
            ),
            new OA\Parameter(
                name: 'per_page',
                in: 'query',
                required: false,
                schema: new OA\Schema(type: 'integer', default: 15),
                description: 'Items per page'
            ),
        ],
        responses: [
            new OA\Response(
                response: 200,
                description: 'Transactions retrieved successfully',
                content: new OA\JsonContent(
                    type: 'object',
                    properties: [
                        new OA\Property(
                            property: 'summary',
                            type: 'object',
                            properties: [
                                new OA\Property(property: 'balanceCents', type: 'integer'),
                                new OA\Property(property: 'totalReceivedCents', type: 'integer'),
                                new OA\Property(property: 'totalWithdrawnCents', type: 'integer'),
                            ]
                        ),
                        new OA\Property(
                            property: 'data',
                            type: 'array',
                            items: new OA\Items(ref: '#/components/schemas/TransactionResource')
                        ),
                    ]
                )
            ),
        ]
    )]
    public function index(Campaign $campaign, Request $request)
    {
        $type = $request->query('type');
        $period = $request->query('period');
        $perPage = (int) $request->query('per_page', 15);

        $periodDays = is_numeric($period) ? (int) $period : null;

        $summary = $this->transactionService->getCampaignSummary($campaign->id);

        $transactions = $this->transactionService->getFilteredTransactionsByCampaign(
            $campaign->id,
            $type,
            $periodDays,
            $perPage
        );

        return response()->json([
            'summary' => [
                'balanceCents' => $summary['balance'],
                'totalReceivedCents' => $summary['total_received'],
                'totalWithdrawnCents' => $summary['total_withdrawn'],
            ],
            'data' => TransactionResource::collection($transactions)->resolve(),
            'meta' => [
                'currentPage' => $transactions->currentPage(),
                'lastPage' => $transactions->lastPage(),
                'perPage' => $transactions->perPage(),
                'total' => $transactions->total(),
            ],
        ]);
    }
}
