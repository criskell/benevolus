<?php

namespace App\Http\Controllers\API\Campaign;

use App\Http\Controllers\Controller;
use App\Http\Requests\Campaign\StoreCampaignUpdateRequest;
use App\Http\Resources\Campaign\CampaignUpdateResource;
use App\Models\CampaignUpdate;
use App\Services\Campaign\CampaignUpdateService;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class CampaignUpdateController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum', only: ['store', 'destroy']),
        ];
    }

    public function __construct(private CampaignUpdateService $campaignUpdateService) {}

    public function index(Request $request, int $campaignId)
    {
        $updates = $this->campaignUpdateService->listByCampaign($campaignId, $request->user());

        return CampaignUpdateResource::collection($updates);
    }

    public function store(StoreCampaignUpdateRequest $request, int $campaignId)
    {
        $update = $this->campaignUpdateService->create($campaignId, $request->validated());

        return new CampaignUpdateResource($update);
    }

    public function show(Request $request, int $updateId)
    {
        $update = $this->campaignUpdateService->findById($updateId, $request->user());

        if (!$update) {
            abort(404);
        }

        return new CampaignUpdateResource($update);
    }

    public function destroy(CampaignUpdate $update)
    {
        $this->campaignUpdateService->delete($update);

        return response()->noContent();
    }
}
