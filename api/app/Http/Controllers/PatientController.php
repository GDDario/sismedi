<?php

namespace App\Http\Controllers;

use App\DTO\CreatePatientDTO;
use App\DTO\UpdatePatientDTO;
use App\Http\Requests\CreatePatientRequest;
use App\Http\Requests\UpdatePatientRequest;
use App\Services\PatientService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class PatientController extends Controller
{
    public function __construct(
        private PatientService $service
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

    public function update(UpdatePatientRequest $request, string $uuid): Response
    {
        $patient = $request->get('patient');
        $address = $request->get('address');
        $cellphones = $request->get('cellphones');

        $dto = new UpdatePatientDTO(
            patientUuid: $uuid,
            patient: [
                'name' => $patient['name'],
                'email' => $patient['email'],
                'cpf' => $patient['cpf'],
                'cns' => $patient['cns'],
                'rg' => $patient['rg'],
                'birth_date' => $patient['birth_date'],
            ],
            address: [
                'street_address' => $address['street_address'],
                'house_number' => $address['house_number'],
                'address_line_2' => $address['address_line_2'],
                'neighborhood' => $address['neighborhood'],
                'postal_code' => $address['postal_code'],
                'city_uuid' => $address['city_uuid'],
            ],
            cellphones: $cellphones
        );

        return $this->service->update($dto);
    }

    public function create(CreatePatientRequest $request)
    {
        $patient = $request->get('patient');
        $address = $request->get('address');
        $cellphones = $request->get('cellphones');

        $dto = new CreatePatientDTO(
            patient: [
                'name' => $patient['name'],
                'email' => $patient['email'],
                'cpf' => $patient['cpf'],
                'cns' => $patient['cns'],
                'rg' => $patient['rg'],
                'birth_date' => $patient['birth_date'],
                'password' => $patient['password']
            ],
            address: [
                'street_address' => $address['street_address'],
                'house_number' => $address['house_number'],
                'address_line_2' => $address['address_line_2'],
                'neighborhood' => $address['neighborhood'],
                'postal_code' => $address['postal_code'],
                'city_uuid' => $address['city_uuid'],
            ],
            cellphones: $cellphones
        );

        return $this->service->create($dto);
    }

    public function delete(Request $request): Response
    {
        return $this->service->delete($request->route('uuid'));
    }
}
