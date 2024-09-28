<?php

namespace App\Services;

use App\Exceptions\NotFoundException;
use App\Models\Patient;
use App\Repositories\PatientRepository;
use App\Util\PaginationUtil;
use Illuminate\Http\Response;

class PatientService
{
    public function __construct(
        private PatientRepository $repository
    )
    {
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

    public function list(array $parameters): Response
    {
        $paginator = $this->repository->paginate($parameters);

        $pageData = PaginationUtil::extractData($paginator);

        return new Response($pageData, Response::HTTP_OK);
    }

    private function arrangePatientData(Patient $patientsData): array
    {
        return [
            'data' => [
                'patient' => [
                    'uuid' => $patientsData->uuid,
                    'name' => $patientsData->name,
                    'email' => $patientsData->email,
                    'cpf' => $patientsData->cpf,
                    'cns' => $patientsData->cns,
                    'email_verified_at' => $patientsData->email_verified_at,
                    'created_at' => $patientsData->created_at,
                    'updated_at' => $patientsData->updated_at,
                    'deleted_at' => $patientsData->deleted_at
                ],
                'address' => [
                    'address_uuid' => $patientsData->address_uuid,
                    'street_address' => $patientsData->street_address,
                    'house_number' => $patientsData->house_number,
                    'address_line_2' => $patientsData->address_line_2,
                    'neighborhood' => $patientsData->neighborhood,
                    'postal_code' => $patientsData->postal_code,
                    'city_uuid' => $patientsData->city_uuid,
                    'city_name' => $patientsData->city_name,
                    'ibge_code' => $patientsData->ibge_code,
                    'state_uuid' => $patientsData->state_uuid,
                    'state_name' => $patientsData->state_name,
                    'state_code' => $patientsData->state_code,
                    'state_ibge_code' => $patientsData->state_ibge_code,
                    'ddd' => $patientsData->ddd
                ]
            ]
        ];
    }
}
