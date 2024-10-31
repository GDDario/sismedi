<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateMedicineRequest;
use App\Http\Requests\UpdateMedicineRequest;
use App\Services\AssistantService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class AssistantController extends Controller
{
    public function __construct(
        private AssistantService $service
    )
    {
    }

    public function index(Request $request): Response
    {
        $page = $request->input('page', 1);
        $perPage = $request->input('per_page', 20);

        $parameters = [
            ...$request->all(),
            'page' => $page,
            'per_page' => $perPage
        ];

        return $this->service->list($parameters);
    }

    public function show(Request $request): Response
    {
        return $this->service->getByUuid($request->route('uuid'));
    }

    public function create(CreateMedicineRequest $request): Response
    {
        return new Response(null, Response::HTTP_NOT_IMPLEMENTED);
    }

    public function update(UpdateMedicineRequest $request): Response
    {
        return new Response(null, Response::HTTP_NOT_IMPLEMENTED);
    }

    public function delete(Request $request): Response
    {
        return new Response(null, Response::HTTP_NOT_IMPLEMENTED);
    }
}
