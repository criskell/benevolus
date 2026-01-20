<?php

namespace App\Http\Controllers\API\Report;

use App\Http\Requests\Report\StoreReportRequest;
use App\Http\Resources\Report\ReportResource;
use App\Models\Campaign;
use App\Services\Report\ReportService;
use Illuminate\Http\Resources\Json\JsonResource;

// FIXME: Apply access control here.
class ReportController
{
    public function __construct(private ReportService $reportService) {}

    public function index()
    {
        $reports = $this->reportService->list();

        return ReportResource::collection($reports);
    }

    public function store(Campaign $campaign, StoreReportRequest $request): JsonResource
    {
        $report = $this->reportService->create($request->user(), $campaign, $request->validated())
            ->load(['campaign', 'user']);

        return new ReportResource($report);
    }
}
