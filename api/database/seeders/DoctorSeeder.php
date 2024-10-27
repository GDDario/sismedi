<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Doctor;
use App\Models\Address;
use App\Models\Cellphone;

class DoctorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        //$this->createDefaultDoctor();

        Doctor::factory()->count(10)->create()->each(function ($doctor) {
            Address::factory()->create(['user_id' => $doctor->user_id]);
        });
    }

    public function createDefaultDoctor()
    {
        Doctor::factory()
            ->withUser([
                'email' => 'user@doctor.com',
                'name' => 'Dr. Rene',
                'cpf' => '00000000000'
            ])
            ->has(
                Address::factory()
                    ->state([
                        'user_id' => '1',
                        'street_address' => 'Bad Street',
                        'house_number' => 'CD89',
                    ])
            )
            ->has(Cellphone::factory()
                ->state([
                    'number' => '14965215645'
                ])
            )
            ->create([
                'uuid' => '17b5b9e7-e3ef-4e06-845a-4114eb0e537f',
                'crm' => '5465156-SP',
                'rg' => '65432465',
                'birth_date' => '1998-09-09',
                'created_at' => '2024-09-02 03:50:29'
            ]);
    }
}
