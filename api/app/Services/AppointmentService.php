<?php

namespace App\Services;

use App\DTO\CreateAppointmentDTO;
use App\DTO\UpdateAppointmentDTO;
use App\DTO\UpdateAssistantDTO;
use App\Exceptions\NotFoundException;
use App\Models\Appointment;
use App\Repositories\AppointmentRepository;
use App\Util\PaginationUtil;
use Illuminate\Http\Response;
use InvalidArgumentException;

class AppointmentService
{
    public function __construct(
        private AppointmentRepository $repository
    )
    {

    }

    public function list(array $parameters): Response
    {
        $paginator = $this->repository->paginate($parameters);

        $pageData = PaginationUtil::extractData($paginator);

        return new Response($pageData, Response::HTTP_OK);
    }

    public function getByUuid(string $uuid)
    {
        try {
            $appointment = $this->repository->findByUuid($uuid);

            $appointmentData = $this->arrangeAppointmentData($appointment);

            return new Response($appointmentData, Response::HTTP_OK);
        } catch (NotFoundException $e) {
            return new Response(['message' => $e->getMessage()], Response::HTTP_NOT_FOUND);
        }
    }

    public function create(CreateAppointmentDTO $dto): Response
    {
        try {
            $appointmentData = $this->repository->insert($dto);

            if (is_null($appointmentData)) {
                return new Response(['message' => 'Could not create the appointment.'], Response::HTTP_INTERNAL_SERVER_ERROR);
            } else {
                return new Response($this->arrangeAppointmentData($appointmentData), Response::HTTP_OK);
            }
        } catch (NotFoundException $exception) {
            return new Response(['message' => $exception->getMessage()], Response::HTTP_NOT_FOUND);
        }
    }

    public function update(UpdateAppointmentDTO $dto): Response
    {
        try {
            $assistant = $this->repository->update($dto);

            if (is_null($assistant)) {
                return new Response(['message' => 'Could not update the appointment.'], Response::HTTP_INTERNAL_SERVER_ERROR);
            } else {
                return new Response($this->arrangeAppointmentData($assistant), Response::HTTP_OK);
            }
        } catch (NotFoundException $e) {
            return new Response(['message' => $e->getMessage()], Response::HTTP_NOT_FOUND);
        } catch (InvalidArgumentException $e) {
            return new Response(['message' => $e->getMessage()], Response::HTTP_UNPROCESSABLE_ENTITY);
        }
    }

    private function arrangeAppointmentData(Appointment $appointmentData): array
    {
        $doctorUuid = null;

        if ($appointmentData->doctor) {
            $doctorUuid = $appointmentData->doctor->uuid;
        }

        return [
            'data' => [
                'uuid' => $appointmentData->uuid,
                'patient_uuid' => $appointmentData->patient->uuid,
                'consultation_type_uuid' => $appointmentData->consultationType->uuid,
                'patient_description' => $appointmentData->patient_description,
                'patient_desired_date' => $appointmentData->patient_desired_date,
                'appointment_date' => $appointmentData->appointment_date,
                'doctor_uuid' => $doctorUuid,
                'doctor_assigned_at' => $appointmentData->doctor_assigned_at,
                'canceled' => $appointmentData->canceled,
                'canceled_reason' => $appointmentData->canceled_reason,
                'completed_at' => $appointmentData->completed_at,
                'created_at' => $appointmentData->created_at,
                'updated_at' => $appointmentData->updated_at,
                'deleted_at' => $appointmentData->deleted_at,
            ]
        ];
    }
}
