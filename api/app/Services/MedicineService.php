<?php

namespace App\Services;

use App\DTO\CreateMedicineDTO;
use App\DTO\UpdateMedicineDTO;
use App\Exceptions\NotFoundException;
use App\Models\Patient;
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

    public function create(CreateMedicineDTO $dto): Response
    {
        try {
            $medicine = $this->repository->insert($dto);

            if (is_null($medicine)) {
                return new Response(['message' => 'Could not create the medicine.'], Response::HTTP_INTERNAL_SERVER_ERROR);
            } else {
                return new Response(['data' => $medicine], Response::HTTP_OK);
            }
        } catch (NotFoundException $e) {
            return new Response(['message' => $e->getMessage()], Response::HTTP_NOT_FOUND);
        }
    }

    public function update(UpdateMedicineDTO $dto): Response
    {
        try {
            $medicine = $this->repository->update($dto);
            if (is_null($medicine)) {
                return new Response(['message' => 'Could not update the medicine.'], Response::HTTP_INTERNAL_SERVER_ERROR);
            } else {
                return new Response(['data' => $medicine], Response::HTTP_OK);
            }
        } catch (NotFoundException $e) {
            return new Response(['message' => $e->getMessage()], Response::HTTP_NOT_FOUND);
        }
    }
}

