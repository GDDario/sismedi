<?php

namespace App\Services;

use App\Exceptions\NotFoundException;
use App\Repositories\CityRepository;
use Illuminate\Http\Response;
use Ramsey\Uuid\Uuid;

class CityService
{
    public function __construct(
        private CityRepository $repository
    )
    {

    }

    public function search(string $search, ?string $stateUuid): Response
    {
        if ($search === '') {
            return new Response(['data' => []], 200);
        }

        if (is_null($stateUuid)) {
            $states = $this->repository->findByName($search, 'asc');
        } else {
            if (!Uuid::isValid($stateUuid)) {
                return new Response(['message' => 'Invalid uuid.'], 404);
            }

            try {
                $states = $this->repository->findByNameAndState($search, $stateUuid, 'asc');
            } catch (NotFoundException $exception) {
                return new Response(['message' => $exception->getMessage()], 404);
            }
        }


        return new Response(['data' => $states], 200);
    }
}
