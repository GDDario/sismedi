<?php

namespace App\Services;

use App\Repositories\MedicineRepository;
use App\Util\PaginationUtil;
use Illuminate\Http\Response;

class MedicineService
{
    public function __construct(
        private MedicineRepository $repository
    )
    {

    }

    public function list(array $parameters): Response
    {
        $paginator = $this->repository->paginate($parameters);

        $pageData = PaginationUtil::extractData($paginator);

        return new Response($pageData, Response::HTTP_OK);
    }
}
