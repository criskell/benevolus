<?php

namespace Database\Factories;

use App\Models\Address;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class AddressFactory extends Factory
{
    protected $model = Address::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'street' => fake()->streetName(),
            'number' => fake()->buildingNumber(),
            'city' => fake()->city(),
            'state' => fake()->stateAbbr(),
            'zipcode' => fake()->postcode(),
            'country' => 'BR',
        ];
    }
}
