<?php

namespace App\Services;

use App\Exceptions\NotFoundException;
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

    public function getByUuid(string $uuid): Response
    {
        try {
            $medicineData = $this->repository->findByUuid($uuid);

            return new Response(['data' => $medicineData], Response::HTTP_OK);
        } catch (NotFoundException $e) {
            return new Response(['message' => 'Medicine not found.'], Response::HTTP_NOT_FOUND);
        }
    }
}
