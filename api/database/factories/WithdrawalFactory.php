<?php

namespace Database\Factories;

use App\Models\Campaign;
use App\Models\Withdrawal;
use Illuminate\Database\Eloquent\Factories\Factory;

class WithdrawalFactory extends Factory
{
    protected $model = Withdrawal::class;

    public function definition(): array
    {
        return [
            'campaign_id' => Campaign::factory(),
            'amountCents' => fake()->numberBetween(10000, 1000000),
            'status' => 'pending',
            'pix_key' => fake()->email(),
            'pix_key_type' => 'email',
            'paid_at' => null,
        ];
    }

    public function paid(): static
    {
        return $this->state(fn (array $attributes) => [
            'paid_at' => now(),
        ]);
    }
}
