<?php

namespace App\DTO;

class UpdateAppointmentDTO
{
    public function __construct(
        public string  $uuid,
        public string  $patientUuid,
        public string  $consultationTypeUuid,
        public bool    $canceled,
        public ?string $appointmentDate,
        public ?string $doctorUuid,
        public ?string $canceledReason
    )
    {

    }
}
