<?php

namespace App\Http\Controllers\API\Campaign;

use App\Http\Controllers\Controller;
use App\Http\Requests\Campaign\UploadCampaignImageRequest;
use App\Http\Resources\Campaign\CampaignMediaAssetResource;
use App\Models\Campaign;
use App\Services\Campaign\CampaignImageService;

class CampaignImageController extends Controller
{
    public function __construct(private CampaignImageService $campaignImageService) {}

    public function store(Campaign $campaign, UploadCampaignImageRequest $request)
    {
        $image = $this->campaignImageService->store($campaign, $request->file('image'));

        return new CampaignMediaAssetResource($image);
    }
}
