<?php

namespace App\Services;

use App\Exceptions\NotFoundException;
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

            return new Response($patient, Response::HTTP_OK);
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
}
