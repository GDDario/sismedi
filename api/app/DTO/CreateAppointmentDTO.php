<?php

namespace App\DTO;

class CreateAppointmentDTO
{
    public function __construct(
        public string  $patientUuid,
        public string  $consultationType,
        public ?string $patientDescription
    )
    {

    }
}
