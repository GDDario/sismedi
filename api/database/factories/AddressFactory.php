<?php

namespace Database\Factories;

use App\Models\City;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Address>
 */
class AddressFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $cityId = City::query()->inRandomOrder()->first()->id;

        return [
            'uuid' => $this->faker->uuid(),
            'street_address' => $this->faker->streetAddress(),
            'house_number' => $this->faker->streetSuffix(),
            'neighborhood' => $this->faker->streetName(),
            'postal_code' => $this->faker->numberBetween(10000000, 99999999),
            'city_id' => $cityId
        ];
    }
}
