<?php

namespace App\Services;

use App\Repositories\MedicineCategoryRepository;
use Illuminate\Http\Response;

class MedicineCategoryService
{
    public function __construct(
        private MedicineCategoryRepository $repository
    ) {

    }

    public function search(string $search): Response {
        if ($search === '') {
            return new Response(['data' => []], 200);
        }

        $states = $this->repository->findByName($search, 'asc');

        return new Response(['data' => $states], 200);
    }
}
