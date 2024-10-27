<?php

namespace App\DTO;

class CreateDoctorDTO
{
    public function __construct(
        public array $doctor,
        public array $address,
        public array $cellphones
    )
    {

    }
}
