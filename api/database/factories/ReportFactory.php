<?php

namespace Database\Factories;

use App\Models\Campaign;
use App\Models\Report;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ReportFactory extends Factory
{
    protected $model = Report::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'campaign_id' => Campaign::factory(),
            'type' => fake()->randomElement(['personal_rights', 'terms_violations']),
            'reason' => strtoupper(fake()->words(3, true)),
            'description' => fake()->paragraph(),
            'status' => 'pending',
        ];
    }
}
