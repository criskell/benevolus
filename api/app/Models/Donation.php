<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Donation extends Model
{
    protected $fillable = [
        'user_id',
        'campaign_id',
        'amount',
        'payment_method',
        'payment_status',
        'payment_processor',
        'external_reference_id',
        'paid_at',
    ];

    public function user(): User
    {
        return $this->belongsTo(User::class);
    }

    public function campaign()
    {
        return $this->belongsTo(Campaign::class);
    }

    protected $casts = [
        'paid_at' => 'datetime',
    ];
}
