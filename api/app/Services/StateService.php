<?php

namespace App\Services;

use App\Repositories\StateRepository;
use Illuminate\Http\Response;

class StateService
{
    public function __construct(
        private StateRepository $repository
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
