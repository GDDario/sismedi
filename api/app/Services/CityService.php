<?php

namespace App\Services;

use App\Repositories\CityRepository;
use Illuminate\Http\Response;

class CityService
{
    public function __construct(
        private CityRepository $repository
    )
    {

    }

    public function search(string $search): Response
    {
        if ($search === '') {
            return new Response(['data' => []], 200);
        }

        $states = $this->repository->findByName($search, 'asc');

        return new Response(['data' => $states], 200);
    }
}
