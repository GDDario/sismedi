<?php

namespace Database\Seeders;

use App\Models\UserType;
use Illuminate\Database\Seeder;

class UserTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $typeNames = [
            'Administrador',
            'Médico',
            'Auxiliar',
            'Paciente'
        ];

        foreach ($typeNames as $typeName) {
            UserType::factory()->create([
                'name' => $typeName,
            ]);
        }
    }
}
