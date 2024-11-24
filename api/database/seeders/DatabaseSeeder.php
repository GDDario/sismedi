<?php

namespace Database\Seeders;

use App\Models\UserType;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
//            UserSeeder::class,
            StateSeeder::class,
            CitySeeder::class,
            PatientSeeder::class,
            DoctorSeeder::class,
            AgendaSeeder::class,
            MedicineCategorySeeder::class,
            MedicineSeeder::class,
            AssistantSeeder::class,
            ConsultationTypeSeeder::class
        ]);
    }
}
