<?php

namespace Database\Factories;

use App\Models\Campaign;
use App\Models\Comment;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class CommentFactory extends Factory
{
    protected $model = Comment::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'campaign_id' => Campaign::factory(),
            'content' => fake()->paragraph(),
            'is_anonymous' => false,
        ];
    }

    public function anonymous(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_anonymous' => true,
        ]);
    }
}
