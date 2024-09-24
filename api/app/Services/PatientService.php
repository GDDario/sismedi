<?php

namespace App\Services;

use App\Repositories\PatientRepository;
use App\Util\PaginationUtil;
use Illuminate\Http\Response;

final readonly class PatientService
{
    public function __construct(
        private PatientRepository $patientRepository
    )
    {

    }

    public function list(array $parameters): Response
    {
        $builder = $this->patientRepository->findPatientsByQueryFields($parameters);

        $paginator = $builder->paginate($parameters['per_page'], ['*'], 'page', $parameters['page']);

        $pageData = PaginationUtil::extractData($paginator);

        return new Response($pageData, Response::HTTP_OK);
    }
}
