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

//        dd($patientsData);

        return [
            'data' => [
                'patient' => [
                    'uuid' => $patientsData->uuid,
                    'name' => $patientsData->user->name,
                    'email' => $patientsData->user->email,
                    'cpf' => $patientsData->user->cpf,
                    'cns' => $patientsData->cns,
                    'email_verified_at' => $patientsData->user->email_verified_at,
                    'created_at' => $patientsData->created_at,
                    'updated_at' => $patientsData->updated_at,
                    'deleted_at' => $patientsData->deleted_at
                ],
                'address' => [
                    'address_uuid' => $patientsData->address->uuid,
                    'street_address' => $patientsData->address->street_address,
                    'house_number' => $patientsData->address->house_number,
                    'address_line_2' => $patientsData->address->address_line_2,
                    'neighborhood' => $patientsData->address->neighborhood,
                    'postal_code' => $patientsData->address->postal_code,
                    'city_uuid' => $patientsData->address->city->uuid,
                    'city_name' => $patientsData->address->city->name,
                    'ibge_code' => $patientsData->address->city->ibge_code,
                    'state_uuid' => $patientsData->address->city->state->uuid,
                    'state_name' => $patientsData->address->city->state->name,
                    'state_code' => $patientsData->address->city->state->code,
                    'state_ibge_code' => $patientsData->address->city->state->ibge_code,
                    'ddd' => $patientsData->address->city->state->ddd
                ],
                'cellphones' => [

                ]
            ]
        ];
    }
}
