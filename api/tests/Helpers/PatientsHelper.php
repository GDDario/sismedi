<?php

namespace Tests\Helpers;

use App\Models\Patient;
use App\Models\User;

class PatientsHelper
{
    public static function createPatients(int $count = 1): void
    {
        Patient::factory()->withUser()->count($count)->create();
    }

    public static function createDefaultPatient(): void
    {
        Patient::factory()
            ->withUser(['email' => 'user@patient.com', 'name' => 'Jhon Doe', 'cpf' => '44654545972'])
            ->create(['uuid' => 'c9eff2e0-bd27-4c5f-930b-b12664801bcd', 'cns' => '7093887818289',
                'rg' => '978862946', 'created_at' => '2024-09-02 03:50:29']);
    }

    public static function getDefaultPatient(): User
    {
        return User::query()->where('email', 'user@patient.com')->first();
    }
}
