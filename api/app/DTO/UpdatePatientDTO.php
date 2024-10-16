<?php

namespace App\DTO;

class UpdatePatientDTO
{
    public function __construct(
        public string $patientUuid,
        public array $patient,
        public array $address,
        public array $cellphones
    )
    {

    }
}
