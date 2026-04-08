<?php

namespace Database\Factories;

use App\Models\PaymentMethod;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class PaymentMethodFactory extends Factory
{
    protected $model = PaymentMethod::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'gateway' => 'asaas',
            'gateway_token' => fake()->uuid(),
            'gateway_customer_id' => 'cus_'.fake()->regexify('[A-Za-z0-9]{14}'),
            'brand' => fake()->randomElement(['visa', 'mastercard', 'elo']),
            'last_four' => fake()->numerify('####'),
            'exp_month' => str_pad((string) fake()->numberBetween(1, 12), 2, '0', STR_PAD_LEFT),
            'exp_year' => (string) fake()->numberBetween(2027, 2032),
            'holder_name' => fake()->name(),
            'billing_postal_code' => fake()->numerify('########'),
            'billing_address_number' => fake()->buildingNumber(),
            'is_default' => false,
        ];
    }

    public function default(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_default' => true,
        ]);
    }
}
