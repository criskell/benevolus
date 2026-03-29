<?php

namespace Database\Factories;

use App\Models\Campaign;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class TransactionFactory extends Factory
{
    protected $model = Transaction::class;

    public function definition(): array
    {
        return [
            'campaign_id' => Campaign::factory(),
            'user_id' => User::factory(),
            'type' => fake()->randomElement(['donation', 'withdrawal', 'dispute', 'adjustment']),
            'amount_cents' => fake()->numberBetween(1000, 100000),
        ];
    }

    public function donation(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'donation',
            'amount_cents' => fake()->numberBetween(1000, 100000),
        ]);
    }

    public function withdrawal(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'withdrawal',
            'amount_cents' => -fake()->numberBetween(1000, 100000),
        ]);
    }
}
