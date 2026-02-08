<?php

namespace App\Http\Controllers\API\Report;

use App\Http\Controllers\Controller;
use App\Http\Requests\Report\StoreReportRequest;
use App\Http\Resources\Report\ReportResource;
use App\Models\Campaign;
use App\Services\Report\ReportService;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use OpenApi\Attributes as OA;

final class ReportController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('auth:sanctum', only: ['index', 'store']),
        ];
    }

    public function __construct(private ReportService $reportService) {}

    #[OA\Get(
        operationId: "listReports",
        path: "/api/reports",
        summary: "List reports",
        tags: ["Reports"],
        responses: [
            new OA\Response(
                response: 200,
                content: new OA\JsonContent(
                    type: "object",
                    properties: [
                        new OA\Property(
                            property: "data",
                            type: "array",
                            items: new OA\Items(ref: "#/components/schemas/ReportResource")
                        ),
                    ]
                )
            ),
            new OA\Response(response: 401, ref: "#/components/responses/Unauthorized"),
        ]
    )]
    public function index()
    {
        $reports = $this->reportService->list();

        return ReportResource::collection($reports);
    }

    #[OA\Post(
        operationId: "createReport",
        path: "/api/campaigns/{campaign}/reports",
        summary: "Create report",
        tags: ["Reports"],
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
                ref: "#/components/schemas/StoreReportRequest"
            )
        ),
        responses: [
            new OA\Response(
                response: 201,
                content: new OA\JsonContent(
                    ref: "#/components/schemas/ReportResource"
                )
            ),
            new OA\Response(response: 401, ref: "#/components/responses/Unauthorized"),
            new OA\Response(response: 404, ref: "#/components/responses/NotFound"),
            new OA\Response(response: 422, ref: "#/components/responses/ValidationError"),
        ]
    )]
    public function store(Campaign $campaign, StoreReportRequest $request): JsonResource
    {
        $report = $this->reportService->create($request->user(), $campaign, $request->validated())
            ->load(['campaign', 'user']);

        return new ReportResource($report);
    }
}
