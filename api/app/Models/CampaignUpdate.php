<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CampaignUpdate extends Model
{
    use HasFactory;
    protected $fillable = [
        'campaign_id',
        'title',
        'content',
        'visible_to_donors_only',
    ];

    protected $casts = [
        'visible_to_donors_only' => 'boolean',
    ];

    public function campaign()
    {
        return $this->belongsTo(Campaign::class);
    }
}
