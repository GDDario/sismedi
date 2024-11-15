<?php

namespace App\Http\Controllers;

use App\DTO\CreateAppointmentDTO;
use App\DTO\UpdateAppointmentDTO;
use App\Http\Requests\CreateAppointmentRequest;
use App\Http\Requests\UpdateAppointmentRequest;
use App\Services\AppointmentService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;

class AppointmentController extends Controller
{
    public function __construct(
        private readonly AppointmentService $service
    )
    {
    }

    public function index(Request $request): Response
    {
        $page = $request->input('page', 1);
        $perPage = $request->input('per_page', 20);

        $parameters = [
            ...$request->all(),
            'page' => $page,
            'per_page' => $perPage
        ];

        return $this->service->list($parameters);
    }

    public function show(Request $request): Response
    {
        return $this->service->getByUuid($request->route('uuid'));
    }

    public function create(CreateAppointmentRequest $request): Response
    {
        return $this->service->create(
            new CreateAppointmentDTO(
                patientUuid: $request->get('patient_uuid'),
                consultationTypeUuid: $request->get('type'),
                patientDescription: $request->get('patient_description'),
                patientDesiredDate: $request->get('patient_desired_date')
            )
        );
    }

    public function update(UpdateAppointmentRequest $request): Response
    {
        return $this->service->update(
            new UpdateAppointmentDTO(
                uuid: $request->route('uuid'),
                patientUuid: $request->get('patient_uuid'),
                consultationTypeUuid: $request->get('type'),
                canceled: $request->get('canceled'),
                appointmentDate: $request->get('appointment_date'),
                doctorUuid: $request->get('doctor_uuid'),
                canceledReason: $request->get('canceled_reason')
            )
        );
    }

    public function delete(Request $request): Response
    {
        return $this->service->delete($request->route('uuid'));
    }
}
