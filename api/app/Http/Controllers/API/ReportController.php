<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\StoreReportRequest;
use App\Http\Resources\ReportResource;
use App\Models\Campaign;
use App\Services\ReportService;
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
        return $this->reportService->create($request->user(), $campaign, $request->validated())
            ->load(['campaign', 'user'])
            ->toResource();
    }
}
