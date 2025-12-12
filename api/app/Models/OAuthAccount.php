<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OAuthAccount extends Model
{
    protected $table = 'oauth_accounts';

    protected $fillable = [
        'provider',
        'provider_id',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
