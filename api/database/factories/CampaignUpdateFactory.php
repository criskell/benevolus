<?php

namespace Database\Factories;

use App\Models\Campaign;
use App\Models\CampaignUpdate;
use Illuminate\Database\Eloquent\Factories\Factory;

class CampaignUpdateFactory extends Factory
{
    protected $model = CampaignUpdate::class;

    public function definition(): array
    {
        return [
            'campaign_id' => Campaign::factory(),
            'title' => fake()->sentence(),
            'content' => fake()->paragraphs(2, true),
            'visible_to_donors_only' => false,
        ];
    }

    public function donorsOnly(): static
    {
        return $this->state(fn (array $attributes) => [
            'visible_to_donors_only' => true,
        ]);
    }
}
