<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CampaignUpdate extends Model
{
    protected $fillable = [
        'campaign_id',
        'title',
        'content',
        'visible_to_donors_only',
    ];

    public function campaign()
    {
        return $this->belongsTo(Campaign::class);
    }
}
