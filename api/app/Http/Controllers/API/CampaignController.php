<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCampaignRequest;
use App\Http\Requests\UpdateCampaignRequest;
use App\Http\Resources\CampaignResource;
use App\Models\Campaign;
use App\Services\CampaignService;
use Illuminate\Http\Request;

class CampaignController extends Controller
{
    public function __construct(private CampaignService $campaignService) {}

    public function index(Request $request)
    {
        $filters = $request->only(['status', 'userId', 'search']);
        $perPage = $request->get('per_page', 15);

        $campaigns = $this->campaignService->list($filters, $perPage);

        return CampaignResource::collection($campaigns);
    }

    public function store(StoreCampaignRequest $request)
    {
        $campaign = $this->campaignService->create($request->validated(), $request->user()->id);

        return new CampaignResource($campaign);
    }

    public function show(int $campaignId)
    {
        $campaign = $this->campaignService->getById($campaignId);

        return new CampaignResource($campaign);
    }

    public function update(UpdateCampaignRequest $request, Campaign $campaign)
    {
        $this->campaignService->update($campaign, $request->validated());

        return response()->noContent();
    }

    public function destroy(Campaign $campaign)
    {
        $this->campaignService->delete($campaign);

        return response()->noContent();
    }
}
