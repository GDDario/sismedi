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
            'uuid' => Str::uuid(),
            'CRM' => "{$sequencial}-{$uf}", 
            'user_id' => User::factory(),
        ];
    }
}

