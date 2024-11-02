<?php

namespace Database\Factories;

use App\Models\Doctor;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class DoctorFactory extends Factory
{
    protected $model = Doctor::class;

    public function definition()
    {
        $uf = $this->faker->randomElement(['SP', 'RJ', 'MG', 'RS', 'BA']);
        $sequencial = str_pad($this->faker->unique()->numberBetween(1, 99999999), 8, '0', STR_PAD_LEFT);

        return [
            'uuid' => fake()->uuid(),
            'crm' => "{$sequencial}-{$uf}",
            'user_id' => User::factory(),
            'rg' => $this->generateRG(),
            'birth_date' => $this->faker->date('Y-m-d', '2001-01-01')
        ];
    }

    public function withUser(array $userAttributes = []): Factory
    {
        return $this->state(function (array $attributes) use ($userAttributes) {
            return [
                'user_id' => User::factory()->state($userAttributes),
            ];
        });
    }

    private function generateRG(): string
    {
        $minLength = 7;
        $maxLength = 13;
        $length = rand($minLength, $maxLength - 1);
        $rg = '';

        for ($i = 0; $i < $length; $i++) {
            $rg .= rand(0, 9);
        }

        $length = strlen($rg);
        $weight = $length + 1;
        $sum = 0;

        for ($i = 0; $i < $length; $i++) {
            $sum += $rg[$i] * $weight--;
        }

        $rest = $sum % 11;

        $verifierDigit = $rest < 2 ? 0 : 11 - $rest;

        return $rg . $verifierDigit;
    }
}

