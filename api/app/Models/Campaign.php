<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Campaign extends Model
{
    use HasFactory;

    const STATUS_IN_REVIEW = 'in_review';
    const STATUS_OPEN = 'open';
    const STATUS_CLOSED = 'closed';
    const STATUS_REJECTED = 'rejected';
    const STATUS_FINISHED = 'finished';

    protected $fillable = [
        'user_id',
        'title',
        'description',
        'goal_cents',
        'expires_at',
        'status',
    ];

    protected $casts = [
        'expires_at' => 'datetime',
    ];

    public static function validStatuses(): array
    {
        return [
            self::STATUS_IN_REVIEW,
            self::STATUS_OPEN,
            self::STATUS_CLOSED,
            self::STATUS_REJECTED,
            self::STATUS_FINISHED,
        ];
    }

    public function getStatusLabelAttribute()
    {
        return ucfirst($this->status);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function favoritedByUsers()
    {
        return $this->belongsToMany(User::class, 'campaign_user_favorites')
            ->withTimestamps();
    }

    public function donations(): HasMany
    {
        return $this->hasMany(Donation::class);
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    public function reports(): HasMany
    {
        return $this->hasMany(Report::class);
    }

    public function assets(): HasMany
    {
        return $this->hasMany(CampaignMediaAsset::class);
    }

    public function withdrawals(): HasMany
    {
        return $this->hasMany(Withdrawal::class);
    }

    public function updates(): HasMany
    {
        return $this->hasMany(CampaignUpdate::class);
    }
}
