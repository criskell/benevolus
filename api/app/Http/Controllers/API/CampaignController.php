<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Campaign;
use App\Services\CampaignService;
use App\Http\Requests\StoreCampaignRequest;
use App\Http\Requests\UpdateCampaignRequest;
use App\Http\Resources\CampaignResource;
use Illuminate\Http\Request;

class CampaignController extends Controller
{
    public function __construct(private CampaignService $campaignService) {}

    public function index(Request $request)
    {
        $filters = $request->only(['status', 'userId', 'search']);
        $campaigns = $this->campaignService->list($filters);

        return CampaignResource::collection($campaigns);
    }

    public function show(int $id)
    {
        $campaign = $this->campaignService->findById($id);

        return new CampaignResource($campaign);
    }

    public function store(StoreCampaignRequest $request)
    {
        $campaign = $this->campaignService->create($request->validated(), $request->user());

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
