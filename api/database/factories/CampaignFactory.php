<?php

namespace Database\Factories;

use App\Models\Campaign;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class CampaignFactory extends Factory
{
    protected $model = Campaign::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'title' => fake()->sentence(),
            'description' => fake()->paragraphs(3, true),
            'goal_cents' => fake()->numberBetween(10000, 10000000),
            'status' => Campaign::STATUS_OPEN,
            'expires_at' => now()->addDays(30),
        ];
    }

    public function open(): static
    {
        return $this->state(fn(array $attributes) => [
            'status' => Campaign::STATUS_OPEN,
        ]);
    }

    public function inReview(): static
    {
        return $this->state(fn(array $attributes) => [
            'status' => Campaign::STATUS_IN_REVIEW,
        ]);
    }

    public function closed(): static
    {
        return $this->state(fn(array $attributes) => [
            'status' => Campaign::STATUS_CLOSED,
        ]);
    }

    public function rejected(): static
    {
        return $this->state(fn(array $attributes) => [
            'status' => Campaign::STATUS_REJECTED,
        ]);
    }

    public function finished(): static
    {
        return $this->state(fn(array $attributes) => [
            'status' => Campaign::STATUS_FINISHED,
        ]);
    }

    public function expired(): static
    {
        return $this->state(fn(array $attributes) => [
            'expires_at' => now()->subDay(),
        ]);
    }
}
