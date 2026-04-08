<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class PaymentMethod extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'gateway',
        'gateway_token',
        'gateway_customer_id',
        'brand',
        'last_four',
        'exp_month',
        'exp_year',
        'holder_name',
        'billing_postal_code',
        'billing_address_number',
        'billing_street',
        'billing_neighborhood',
        'billing_city',
        'billing_state',
        'billing_complement',
        'is_default',
    ];

    protected function casts(): array
    {
        return [
            'is_default' => 'boolean',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
