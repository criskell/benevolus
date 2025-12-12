<?php

namespace App\Services;

use App\Models\Campaign;
use App\Models\CampaignMediaAsset;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Exception;

final class CampaignImageService
{
    public function store(Campaign $campaign, UploadedFile $file): CampaignMediaAsset
    {
        $path = 'images/campaigns/' . $campaign->id;
        $fileName = Str::random(48) . '.' . $file->getClientOriginalExtension();

        $fullPath = $path . '/' . $fileName;

        $isSuccessful = Storage::disk('s3')->putFileAs($path, $file, $fileName);

        if (!$isSuccessful) {
            throw new Exception('Failed to upload image');
        }

        return CampaignMediaAsset::create([
            'campaign_id' => $campaign->id,
            'path' => $fullPath,
            'type' => 'image',
        ]);
    }
}
