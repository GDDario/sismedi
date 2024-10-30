<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Assistant>
 */
class AssistantFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'uuid' => fake()->uuid()
        ];
    }

    /**
     * Define the associated user
     *
     * @param array $userAttributes
     * @return \Illuminate\Database\Eloquent\Factories\Factory
     */
    public function withUser(array $userAttributes = []): Factory
    {
        return $this->state(function (array $attributes) use ($userAttributes) {
            return [
                'user_id' => User::factory()->state($userAttributes),
            ];
        });
    }
}
