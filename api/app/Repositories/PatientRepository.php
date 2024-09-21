<?php

namespace App\Repositories;

use App\Exceptions\NotFoundException;
use App\Models\Patient;
use App\Models\User;

class PatientRepository
{
    /**
     * @throws NotFoundException
     */
    public function findByUuid(string $uuid): Patient {
        if (!$patient = Patient::query()->select('uuid, cns, created_at, updated_at, deleted_at')->where('uuid', $uuid)->first()) {
            throw new NotFoundException("Patient with uuid $uuid not found.");
        }

        return $patient;
    }
}
