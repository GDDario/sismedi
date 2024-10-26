<?php

namespace Database\Factories;

use App\Models\MedicineCategory;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Medicine>
 */
class MedicineFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'uuid' => fake()->uuid(),
            'dosage' => fake()->numberBetween(1, 999) . ' mg',
            'concentration' => fake()->numberBetween(0, 100),
            'quantity' => fake()->numberBetween(0, 1000),
            'expiration_date' => fake()->date(),
            'manufacturer' => fake()->company(),
            'batch_number' => fake()->randomLetter() . fake()->randomLetter() . fake()->numberBetween('10000, 99999'),
            'price' => fake()->randomFloat(2, 0, 99999),
            'category_id' => MedicineCategory::query()->inRandomOrder()->first()->id,
            'prescription' => fake()->text(),
            'description' => fake()->text()
        ];
    }
}
