<?php

namespace Database\Factories;

use App\Models\Campaign;
use App\Models\Donation;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class DonationFactory extends Factory
{
    protected $model = Donation::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'campaign_id' => Campaign::factory(),
            'amount_cents' => fake()->numberBetween(1000, 100000),
            'payment_method' => fake()->randomElement(['credit_card', 'pix', 'bank_transfer']),
            'payment_status' => 'pending',
            'payment_processor' => fake()->randomElement(['stripe', 'woovi']),
            'external_reference' => fake()->uuid(),
            'is_anonymous' => false,
            'paid_at' => null,
        ];
    }

    public function anonymous(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_anonymous' => true,
        ]);
    }

    public function thanked(): static
    {
        return $this->state(fn (array $attributes) => [
            'thanked_at' => now(),
            'thank_you_message' => 'Obrigado pela sua doacao!',
        ]);
    }

    public function paid(): static
    {
        return $this->state(fn (array $attributes) => [
            'payment_status' => 'paid',
            'paid_at' => now(),
        ]);
    }

    public function failed(): static
    {
        return $this->state(fn (array $attributes) => [
            'payment_status' => 'failed',
            'paid_at' => null,
        ]);
    }
}
