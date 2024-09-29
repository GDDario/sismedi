<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Cellphone>
 */
class CellphoneFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'uuid' => $this->faker->uuid(),
            'number' => $this->generateNumber(),
            'description' => $this->faker->realText(100),
            'is_primary' => true
        ];
    }

    /**
     * It generaters a phone number, initializing from ddd 11 to 99.
     *
     * @return string The generate phone number.
     */
    private function generateNumber(): string
    {
        $ddd = rand(11, 99);

        $part1 = '9' . rand(1000, 9999);

        $part2 = rand(1000, 9999);

        return $ddd . $part1 . $part2;
    }
}
