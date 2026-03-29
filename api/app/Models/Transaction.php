<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'campaign_id',
        'user_id',
        'type',
        'amount_cents',
    ];

    public function getDirectionAttribute(): string
    {
        return $this->amount_cents >= 0 ? 'input' : 'output';
    }

    public function campaign()
    {
        return $this->belongsTo(Campaign::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
