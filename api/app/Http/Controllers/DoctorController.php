<?php

namespace App\Http\Controllers;

use App\DTO\CreateDoctorDTO;
use App\DTO\UpdateDoctorDTO;
use App\Services\DoctorService;
use App\Http\Requests\CreateDoctorRequest;
use App\Http\Requests\UpdateDoctorRequest;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class DoctorController extends Controller
{
    public function __construct(
        private DoctorService $service
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

    public function search(Request $request): Response
    {
        $search = $request->get('query', '') ?? '';

        return $this->service->search($search);
    }

    //Controlador para a função de obter a agenda de X médico utilizando sua id
    public function getAgenda(Request $request): Response
    {
        return $this->service->getAgendaByID($request->route('id'));
    }

    public function create(CreateDoctorRequest $request)
    {
        $doctor = $request->get('doctor');
        $address = $request->get('address');
        $cellphones = $request->get('cellphones');

        $dto = new CreateDoctorDTO(
            doctor: [
                'name' => $doctor['name'],
                'email' => $doctor['email'],
                'cpf' => $doctor['cpf'],
                'crm' => $doctor['crm'],
                'rg' => $doctor['rg'],
                'birth_date' => $doctor['birth_date'],
                'password' => $doctor['password']
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

    public function update(UpdateDoctorRequest $request, string $uuid): Response
    {
        $doctor = $request->get('doctor');
        $address = $request->get('address');
        $cellphones = $request->get('cellphones');

        $dto = new UpdateDoctorDTO(
            doctorUuid: $uuid,
            doctor: [
                'name' => $doctor['name'],
                'email' => $doctor['email'],
                'cpf' => $doctor['cpf'],
                'crm' => $doctor['crm'],
                'rg' => $doctor['rg'],
                'birth_date' => $doctor['birth_date'],
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
}
