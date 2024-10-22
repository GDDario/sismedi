<?php

namespace Database\Seeders;

use App\Models\Address;
use App\Models\Cellphone;
use App\Models\Patient;
use Illuminate\Database\Seeder;

class PatientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->createDefaultPatient();

        Patient::factory()->withUser()->hasAddress()->hasCellphones()->count(29)->create();
    }

    /**
     * Creates the default patient used to access/test (manually) the system.
     *
     * @return void
     */
    public function createDefaultPatient()
    {
        Patient::factory()
            ->withUser([
                'email' => 'user@patient.com',
                'name' => 'Jhon Doe',
                'cpf' => '44654545972'
            ])
            ->has(
                Address::factory()
                    ->state([
                        'street_address' => 'Good Street',
                        'house_number' => 'AB65'
                    ])
            )
            ->has(Cellphone::factory()
                ->state([
                    'number' => '14998128923'
                ])
            )
            ->create([
                'uuid' => 'c9eff2e0-bd27-4c5f-930b-b12664801bcd',
                'cns' => '991373255580003',
                'rg' => '978862946',
                'birth_date' => '1988-09-09',
                'created_at' => '2024-09-02 03:50:29'
            ]);
    }
}
