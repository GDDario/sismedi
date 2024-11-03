<?php

namespace App\Repositories;

use App\DTO\CreateAppointmentDTO;
use App\Exceptions\NotFoundException;
use App\Models\Appointment;
use App\Models\ConsultationType;
use App\Models\Patient;
use Ramsey\Uuid\Uuid;

class AppointmentRepository
{
    /**
     * @throws NotFoundException
     */
    public function insert(CreateAppointmentDTO $dto): ?Appointment
    {
        if (!$patient = Patient::query()->where('uuid', $dto->patientUuid)->first()) {
            throw new NotFoundException('Paciente não encontrado.');
        }

        if (!$consultationType = ConsultationType::query()->where('uuid', $dto->consultationType)->first()) {
            throw new NotFoundException('Tipo de consulta não encontrado.');
        }

        $appointment = Appointment::query()->create([
            'uuid' => Uuid::uuid4(),
            'patient_id' => $patient->id,
            'consultation_type_id' => $consultationType->id,
            'patient_description' => $dto->patientDescription
        ]);
        $appointment->refresh();

        return $appointment->with(['patient'])->first();
    }
}
