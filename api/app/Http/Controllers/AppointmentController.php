<?php

namespace App\Http\Controllers;

use App\DTO\CreateAppointmentDTO;
use App\Http\Requests\CreateAppointmentRequest;
use App\Http\Requests\UpdateAssistantRequest;
use App\Services\AppointmentService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class AppointmentController extends Controller
{
    public function __construct(
        private AppointmentService $service
    )
    {
    }

    public function index(Request $request): Response
    {
        return new Response(null, Response::HTTP_NOT_IMPLEMENTED);
    }

    public function show(Request $request): Response
    {
        return new Response(null, Response::HTTP_NOT_IMPLEMENTED);
    }

    public function create(CreateAppointmentRequest $request): Response
    {
        return $this->service->create(
            new CreateAppointmentDTO(
                patientUuid: $request->get('patient_uuid'),
                consultationTypeUuid: $request->get('type'),
                patientDescription: $request->get('patient_description')
            )
        );
    }

    public function update(UpdateAssistantRequest $request): Response
    {
        return new Response(null, Response::HTTP_NOT_IMPLEMENTED);
    }

    public function delete(Request $request): Response
    {
        return new Response(null, Response::HTTP_NOT_IMPLEMENTED);
    }
}
