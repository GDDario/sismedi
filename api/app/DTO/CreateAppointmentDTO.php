<?php

namespace App\DTO;

class CreateAppointmentDTO
{
    public function __construct(
        public string  $patientUuid,
        public string  $consultationTypeUuid,
        public ?string $patientDescription
    )
    {

    }
}
