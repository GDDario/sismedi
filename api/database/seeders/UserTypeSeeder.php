<?php

namespace Database\Seeders;

use App\Models\UserType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Ramsey\Uuid\Uuid;

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
                'uuid' => Uuid::uuid4()->toString(),
                'name' => $typeName,
            ]);
        }
    }
}
