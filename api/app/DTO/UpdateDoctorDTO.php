<?php

namespace App\DTO;

class UpdateDoctorDTO
{
    public function __construct(
        public string $doctorUuid,
        public array $doctor,
        public array $address,
        public array $cellphones
    )
    {

    }
}
