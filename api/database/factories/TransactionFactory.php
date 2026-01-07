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
            'direction' => fake()->randomElement(['credit', 'debit']),
            'type' => fake()->randomElement(['donation', 'withdrawal', 'refund']),
            'amount_cents' => fake()->numberBetween(1000, 100000),
        ];
    }

    public function credit(): static
    {
        return $this->state(fn (array $attributes) => [
            'direction' => 'credit',
        ]);
    }

    public function debit(): static
    {
        return $this->state(fn (array $attributes) => [
            'direction' => 'debit',
        ]);
    }
}
