<?php

namespace App\Services;

use App\Exceptions\NotFoundException;
use App\DTO\CreateDoctorDTO;
use App\DTO\UpdateDoctorDTO;
use App\Models\Doctor;
use App\Models\Agenda;
use App\Repositories\DoctorRepository;
use App\Util\PaginationUtil;
use Illuminate\Http\Response;

class DoctorService
{
    public function __construct(
        private DoctorRepository $repository
    )
    {
    }

    public function getByUuid(string $uuid): Response
    {
        try {
            $Doctor = $this->repository->findByUuid($uuid);

            $DoctorData = $this->arrangeDoctorData($Doctor);

            return new Response($DoctorData, Response::HTTP_OK);
        } catch (NotFoundException $e) {
            return new Response(['message' => "Doctor uuid $uuid not found."], Response::HTTP_NOT_FOUND);
        }
    }

    //Serviço para buscar a agenda de X médico pela ID
    public function getAgendaByID(string $id): Response
    {
        try {
            $Agenda = $this->repository->getAgendaByID($id);

            return new Response($Agenda, Response::HTTP_OK);
        } catch (NotFoundException $e) {
            return new Response(['message' => 'Agenda not found.'], Response::HTTP_NOT_FOUND);
        }
    }

    public function list(array $parameters): Response
    {
        $paginator = $this->repository->paginate($parameters);

        $pageData = PaginationUtil::extractData($paginator);

        return new Response($pageData, Response::HTTP_OK);
    }

    private function arrangeDoctorData(Doctor $DoctorsData): array
    {
        return [
            'doctor' => [
                'uuid' => $DoctorsData->uuid,
                'name' => $DoctorsData->name,
                'email' => $DoctorsData->email,
                'cpf' => $DoctorsData->cpf,
                'rg' => $DoctorsData->rg,
                'crm' => $DoctorsData->crm,
                'birth_date' => $DoctorsData->birth_date,
                'email_verified_at' => $DoctorsData->email_verified_at,
                'created_at' => $DoctorsData->created_at,
                'updated_at' => $DoctorsData->updated_at,
                'deleted_at' => $DoctorsData->deleted_at
            ],
            'address' => [
                'street_address' => $DoctorsData->address->street_address,
                'house_number' => $DoctorsData->address->house_number,
                'address_line_2' => $DoctorsData->address->address_line_2,
                'neighborhood' => $DoctorsData->address->neighborhood,
                'postal_code' => $DoctorsData->address->postal_code,
                'city_uuid' => $DoctorsData->address->city_uuid,
                'city_name' => $DoctorsData->address->city_name,
                'state_uuid' => $DoctorsData->address->state_uuid,
                'state_name' => $DoctorsData->address->state_name,
                'state_code' => $DoctorsData->address->state_code,
                'state_ibge_code' => $DoctorsData->address->state_ibge_code
            ],
            'cellphones' => $DoctorsData->cellphones instanceof Collection ? $this->arrangeCellphones($DoctorsData->cellphones) : []
        ];
    }

    private function arrangeCellphones(Collections $cellphones): array
    {
        return $cellphones->map(function (Cellphone $cellphone) {
            return [
                'uuid' => $cellphone->uuid,
                'number' => $cellphone->number,
                'description' => $cellphone->description,
            ];
        })->toArray();
    }

    public function create(CreateDoctorDTO $dto)
    {
        $doctor = $this->repository->insert($dto);

        if (is_null($doctor)) {
            return new Response(['message' => 'Could not update the doctor.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        } else {
            return new Response(['message' => 'Created successfully'], Response::HTTP_OK);
        }
    }

    public function delete(string $uuid)
    {
        try {
            if ($this->repository->destroy($uuid)) {
                return new Response(['message' => 'Doctor deleted successfully'], Response::HTTP_OK);
            } else {
                return new Response(['message' => 'Could not delete the doctor.'], Response::HTTP_INTERNAL_SERVER_ERROR);
            }
        } catch (NotFoundException $e) {
            return new Response($e->getMessage(), 404);
        }
    }

    public function update(UpdateDoctorDTO $dto): Response
    {
        try {
            $doctor = $this->repository->update($dto);

            if (is_null($doctor)) {
                return new Response(['message' => 'Could not update the doctor.'], Response::HTTP_INTERNAL_SERVER_ERROR);
            } else {
                return new Response(['message' => 'Doctor updated successfully.'], Response::HTTP_OK);
            }
        } catch (NotFoundException $e) {
            return new Response(['message' => $e->getMessage()], Response::HTTP_NOT_FOUND);
        }
    }
}
