<?php

namespace App\Services;

use App\Exceptions\NotFoundException;
use App\Models\Doctor;
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
            return new Response(['message' => 'Doctor not found.'], Response::HTTP_NOT_FOUND);
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
            'Doctor' => [
                'uuid' => $DoctorsData->uuid,
                'name' => $DoctorsData->name,
                'email' => $DoctorsData->email,
                'cpf' => $DoctorsData->cpf,
                'crm' => $DoctorsData->crm,
                'email_verified_at' => $DoctorsData->email_verified_at,
                'created_at' => $DoctorsData->created_at,
                'updated_at' => $DoctorsData->updated_at,
                'deleted_at' => $DoctorsData->deleted_at
            ],
            'address' => [
                'street_address' => $DoctorsData->street_address,
                'house_number' => $DoctorsData->house_number,
                'address_line_2' => $DoctorsData->address_line_2,
                'neighborhood' => $DoctorsData->neighborhood,
                'postal_code' => $DoctorsData->postal_code,
                'city_uuid' => $DoctorsData->city_uuid,
                'city_name' => $DoctorsData->city_name,
                'ibge_code' => $DoctorsData->ibge_code,
                'state_uuid' => $DoctorsData->state_uuid,
                'state_name' => $DoctorsData->state_name,
                'state_code' => $DoctorsData->state_code,
                'state_ibge_code' => $DoctorsData->state_ibge_code,
                'ddd' => $DoctorsData->ddd
            ]
        ];
    }
}
