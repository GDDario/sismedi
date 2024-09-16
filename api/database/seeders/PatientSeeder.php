<?php

namespace Database\Seeders;

use App\Models\Patient;
use Illuminate\Database\Seeder;

class PatientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Accessible
        Patient::factory()->withUser(['email' => 'user@patient.com'])->create();

        Patient::factory()->withUser()->count(29)->create();
    }

}
