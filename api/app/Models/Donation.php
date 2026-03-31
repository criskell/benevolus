<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Donation extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'campaign_id',
        'amount_cents',
        'is_anonymous',
        'payment_method',
        'payment_status',
        'payment_processor',
        'external_reference',
        'paid_at',
        'thank_you_message',
        'thanked_at',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function campaign()
    {
        return $this->belongsTo(Campaign::class);
    }

    protected $casts = [
        'is_anonymous' => 'boolean',
        'paid_at' => 'datetime',
        'thanked_at' => 'datetime',
    ];
}
