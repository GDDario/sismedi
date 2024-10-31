<?php

namespace App\Services;

use App\Repositories\AssistantRepository;
use App\Util\PaginationUtil;
use Illuminate\Http\Response;

class AssistantService
{
    public function __construct(
        private AssistantRepository $repository
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

