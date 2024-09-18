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
        Patient::factory()->withUser(['email' => 'user@patient.com', 'name' => 'Jhon Doe', 'cpf' => '44654545972'])->create(['cns' => '7093887818289', 'created_at' => '2024-09-02 03:50:29']);

        Patient::factory()->withUser()->count(29)->create();
    }

}
