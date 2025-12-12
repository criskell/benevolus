<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\UploadCampaignImageRequest;
use App\Http\Resources\CampaignAssetResource;
use App\Models\Campaign;
use App\Services\CampaignImageService;

class CampaignImageController extends Controller
{
    public function __construct(private CampaignImageService $campaignImageService) {}

    public function store(Campaign $campaign, UploadCampaignImageRequest $request)
    {
        $image = $this->campaignImageService->store($campaign, $request->file('image'));

        return new CampaignAssetResource($image);
    }
}
