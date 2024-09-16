<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Patient>
 */
class PatientFactory extends Factory
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
            'cns' => $this->generateCNS(),
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

    private function generateCNS()
    {
        $pis = str_pad(rand(0, 99999999999), 11, '0', STR_PAD_LEFT);

        $basePis = '7' . $pis;
        $sum = 0;

        for ($i = 0; $i < 11; $i++) {
            $sum += $basePis[$i] * (15 - $i);
        }

        $rest = $sum % 11;
        $dv = 11 - $rest;
        if ($dv == 11) {
            $dv = 0;
        }

        if ($dv == 10) {
            $sum += 2;
            $rest = $sum % 11;
            $dv = 11 - $rest;
            if ($dv == 11) {
                $dv = 0;
            }
            $basePis = '9' . $pis;
        }

        $cns = $basePis . $dv;

        return $cns;
    }
}
