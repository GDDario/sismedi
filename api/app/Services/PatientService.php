<?php

namespace App\Services;

use App\DTO\CreatePatientDTO;
use App\DTO\UpdatePatientDTO;
use App\Exceptions\NotFoundException;
use App\Models\Cellphone;
use App\Models\Patient;
use App\Repositories\PatientRepository;
use App\Util\PaginationUtil;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Response;

class PatientService
{
    public function __construct(
        private PatientRepository $repository
    )
    {
    }

    public function list(array $parameters): Response
    {
        $paginator = $this->repository->paginate($parameters);

        $pageData = PaginationUtil::extractData($paginator);

        return new Response($pageData, Response::HTTP_OK);
    }

    public function getByUuid(string $uuid): Response
    {
        try {
            $patient = $this->repository->findByUuid($uuid);

            $patientData = $this->arrangePatientData($patient);

            return new Response($patientData, Response::HTTP_OK);
        } catch (NotFoundException $e) {
            return new Response(['message' => 'Patient not found.'], Response::HTTP_NOT_FOUND);
        }
    }

    public function update(UpdatePatientDTO $dto): Response
    {
        try {
            $patient = $this->repository->update($dto);

            if (is_null($patient)) {
                return new Response(['message' => 'Could not update the patient.'], Response::HTTP_INTERNAL_SERVER_ERROR);
            } else {
                return new Response($this->arrangePatientData($patient), Response::HTTP_OK);
            }
        } catch (NotFoundException $e) {
            return new Response(['message' => $e->getMessage()], Response::HTTP_NOT_FOUND);
        }
    }

    public function create(CreatePatientDTO $dto)
    {
        $patient = $this->repository->insert($dto);

        if (is_null($patient)) {
            return new Response(['message' => 'Could not update the patient.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        } else {
            return new Response($this->arrangePatientData($patient), Response::HTTP_OK);
        }
    }

    public function delete(string $uuid)
    {
        try {
            if ($this->repository->destroy($uuid)) {
                return new Response(['message' => 'Patient deleted successfully'], Response::HTTP_OK);
            } else {
                return new Response(['message' => 'Could not delete the patient.'], Response::HTTP_INTERNAL_SERVER_ERROR);
            }
        } catch (NotFoundException $e) {
            return new Response($e->getMessage(), 404);
        }
    }

    private function arrangePatientData(Patient $patientData): array
    {
        return [
            'data' => [
                'patient' => [
                    'uuid' => $patientData->uuid,
                    'name' => $patientData->user->name,
                    'email' => $patientData->user->email,
                    'cpf' => $patientData->user->cpf,
                    'rg' => $patientData->rg,
                    'cns' => $patientData->cns,
                    'birth_date' => $patientData->birth_date,
                    'email_verified_at' => $patientData->user->email_verified_at,
                    'created_at' => $patientData->created_at,
                    'updated_at' => $patientData->updated_at,
                    'deleted_at' => $patientData->deleted_at
                ],
                'address' => [
                    'uuid' => $patientData->address->uuid,
                    'street_address' => $patientData->address->street_address,
                    'house_number' => $patientData->address->house_number,
                    'address_line_2' => $patientData->address->address_line_2,
                    'neighborhood' => $patientData->address->neighborhood,
                    'postal_code' => $patientData->address->postal_code,
                    'city_uuid' => $patientData->address->city->uuid,
                    'city_name' => $patientData->address->city->name,
                    'ibge_code' => $patientData->address->city->ibge_code,
                    'state_uuid' => $patientData->address->city->state->uuid,
                    'state_name' => $patientData->address->city->state->name,
                    'state_code' => $patientData->address->city->state->code,
                    'state_ibge_code' => $patientData->address->city->state->ibge_code,
                    'ddd' => $patientData->address->city->state->ddd
                ],
                'cellphones' => $this->arrangeCellphones($patientData->cellphones)
            ]
        ];
    }

    private function arrangeCellphones(Collection $cellphones): array
    {
        return $cellphones->map(function (Cellphone $cellphone) {
            return [
                'uuid' => $cellphone->uuid,
                'number' => $cellphone->number,
                'description' => $cellphone->description,
            ];
        })->toArray();
    }
}
