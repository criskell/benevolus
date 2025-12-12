<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class CampaignMediaAsset extends Model
{
    protected $fillable = [
        'campaign_id',
        'path',
        'type',
    ];

    public function campaign()
    {
        return $this->belongsTo(Campaign::class);
    }

    public function getUrlAttribute()
    {
        return Storage::disk('s3')->url($this->path);
    }
}
