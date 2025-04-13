<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Campaign extends Model
{
    const STATUS_PENDING = 'pending';
    const STATUS_APPROVED = 'approved';
    const STATUS_REJECTED = 'rejected';
    const STATUS_FINISHED = 'finished';
    
    protected $fillable = [
        'user_id',
        'title',
        'description',
        'goal_cents',
        'amount_raised_cents',
        'status',
        'expires_at',
    ];

    public static function validStatuses(): array
    {
        return [
            self::STATUS_PENDING,
            self::STATUS_APPROVED,
            self::STATUS_REJECTED,
            self::STATUS_FINISHED,
        ];
    }

    public function getStatusLabelAttribute()
    {
        return ucfirst($this->status);
    }
}
