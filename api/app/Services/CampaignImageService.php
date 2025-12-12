<?php

namespace App\Services;

use App\Models\Campaign;
use App\Models\CampaignAsset;
use Exception;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class CampaignImageService
{
    public function store(Campaign $campaign, UploadedFile $file): CampaignAsset
    {
        $path = 'images/campaigns/' . $campaign->id;
        $fileName = Str::random(48) . '.' . $file->getClientOriginalExtension();

        $fullPath = $path . '/' . $fileName;

        $isSuccessful = Storage::disk('s3')->putFileAs($path, $file, $fileName);

        if (!$isSuccessful) {
            throw new Exception('Failed to upload image');
        }

        return CampaignAsset::create([
            'campaign_id' => $campaign->id,
            'path' => $fullPath,
            'type' => 'image',
        ]);
    }
}
