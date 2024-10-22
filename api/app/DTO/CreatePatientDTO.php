<?php

namespace App\DTO;

class CreatePatientDTO
{
    public function __construct(
        public array $patient,
        public array $address,
        public array $cellphones
    )
    {

    }
}
