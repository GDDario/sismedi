<?php

namespace App\Repositories;

use App\DTO\CreateAppointmentDTO;
use App\DTO\UpdateAppointmentDTO;
use App\Exceptions\NotFoundException;
use App\Models\Appointment;
use App\Models\ConsultationType;
use App\Models\Doctor;
use App\Models\Patient;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Ramsey\Uuid\Uuid;

class AppointmentRepository
{
    /**
     * @param array $parameters
     * @return LengthAwarePaginator
     */
    public function paginate(array $parameters): LengthAwarePaginator
    {
        $query = Appointment::query()
            ->join('patients', 'appointments.patient_id', '=', 'patients.id')
            ->join('users as patient_users', 'patients.user_id', '=', 'patient_users.id')
            ->leftJoin('doctors', 'appointments.doctor_id', '=', 'doctors.id')
            ->leftJoin('users as doctor_users', 'doctors.user_id', '=', 'doctor_users.id')
            ->join('consultation_types', 'appointments.consultation_type_id', '=', 'consultation_types.id')
            ->select(
                'appointments.uuid',
                'appointments.patient_desired_date',
                'appointments.appointment_date',
                'consultation_types.name',
                'patient_users.name as patient_name',
                'doctor_users.name as doctor_name',
                'appointments.created_at'
            );


        $query = $this->filterQueryByFields($query, $parameters);


        return $query->paginate($parameters['per_page'], ['*'], 'page', $parameters['page']);
    }

    /**
     * @throws NotFoundException
     */
    public function findByUuid(string $uuid): Appointment
    {
        if (!$appointment = Appointment::query()->where('uuid', $uuid)->first()) {
            throw new NotFoundException("Appointment with uuid $uuid not found.");
        }

        $appointment->refresh();
        $appointment->load('patient');

        return $appointment;
    }

    /**
     * @throws NotFoundException
     */
    public function insert(CreateAppointmentDTO $dto): ?Appointment
    {
        if (!$patient = Patient::query()->where('uuid', $dto->patientUuid)->first()) {
            throw new NotFoundException('Paciente não encontrado.');
        }

        if (!$consultationType = ConsultationType::query()->where('uuid', $dto->consultationTypeUuid)->first()) {
            throw new NotFoundException('Tipo de consulta não encontrado.');
        }

        $appointment = Appointment::query()->create([
            'uuid' => Uuid::uuid4(),
            'patient_id' => $patient->id,
            'consultation_type_id' => $consultationType->id,
            'patient_description' => $dto->patientDescription,
            'patient_desired_date' => $dto->patientDesiredDate,
        ]);
        $appointment->refresh();
        $appointment->load('patient');

        return $appointment;
    }

    /**
     * @throws NotFoundException
     */
    public function update(UpdateAppointmentDTO $dto): ?Appointment
    {
        $doctorAssignedAt = null;

        if (!$appointment = Appointment::query()->where('uuid', $dto->uuid)->first()) {
            throw new NotFoundException("Appointment with uuid $dto->uuid not found.");
        }

        if (!$patient = Patient::query()->where('uuid', $dto->patientUuid)->first()) {
            throw new NotFoundException("Patient with uuid $dto->patientUuid not found.");
        }

        if ($dto->doctorUuid && !$doctor = Doctor::query()->where('uuid', $dto->doctorUuid)->first()) {
            throw new NotFoundException("Doctor with uuid $dto->patientUuid not found.");
        }

        if (!$consultationType = ConsultationType::query()->where('uuid', $dto->consultationTypeUuid)->first()) {
            throw new NotFoundException('Tipo de consulta não encontrado.');
        }

        if ($dto->doctorUuid) {
            $doctorAssignedAt = now();
        }

        $appointment->update([
            'patient_id' => $patient->id,
            'consultation_type_id' => $consultationType->id,
            'patient_description' => $dto->patientDescription,
            'patient_desired_date' => $dto->patientDesiredDate,
            'appointment_date' => $dto->appointmentDate,
            'doctor_id' => $dto->doctorUuid ? $doctor->id : null,
            'doctor_assigned_at' => $doctorAssignedAt,
            'canceled' => $dto->canceled,
            'canceled_reason' => $dto->canceled ? $dto->canceledReason : null
        ]);
        $appointment->refresh();
        $appointment->load('patient');
        $appointment->load('doctor');

        return $appointment;
    }

    /**
     * @throws NotFoundException
     */
    public function delete(string $uuid): bool
    {
        if (!$appointment = Appointment::query()->where('uuid', $uuid)->first()) {
            throw new NotFoundException("Agenda com uuid $uuid não encontrado.");
        }

        return $appointment->delete();
    }

    private function filterQueryByFields(Builder $query, array $parameters)
    {
        $blackList = ['offset', 'page', 'limit'];

        foreach ($parameters as $key => $parameter) {
            if (strlen($key) === 5 && str_starts_with($key, 'name') && !in_array($parameter, $blackList)) {
                $number = substr($key, 4, 5);

                if (array_key_exists("value$number", $parameters)) {
                    $searchValue = $parameters["value$number"];

                    $query->where(function ($query) use ($parameter, $searchValue) {
                        switch ($parameter) {
                            case 'patient_name':
                                $query->whereHas('patient.user', function ($query) use ($searchValue) {
                                    $query->where('name', 'LIKE', "$searchValue%");
                                });
                                break;
                            case 'doctor_name':
                                $query->whereHas('doctor.user', function ($query) use ($searchValue) {
                                    $query->where('name', 'LIKE', "$searchValue%");
                                });
                                break;
                            default:
                                $table = match ($parameter) {
                                    'patient_uuid' => 'patients',
                                    'doctor_uuid' => 'doctors',
                                    'patient_name', 'doctor_name', 'cpf' => 'users',
                                    'uuid' => 'appointments'
                                };

                                $field = match ($parameter) {
                                    'patient_uuid', 'doctor_uuid' => 'id',
                                    'patient_name', 'doctor_name' => 'name',
                                    default => $parameter
                                };

                                $query->whereRaw("$table.$field LIKE ?", ["$searchValue%"]);
                        }
                    });
                }
            }
        }

        return $query;
    }
}
