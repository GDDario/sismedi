<?php

namespace App\Services;

use App\Repositories\ConsultationTypeRepository;
use Illuminate\Http\Response;

class ConsultationTypeService
{
    public function __construct(
        private ConsultationTypeRepository $repository
    )
    {

    }

    public function getAll(): Response {
        $types = $this->repository->findAll();

        return new Response(['data' => $types]);
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
