<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateMedicineRequest;
use App\Services\MedicineService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class MedicineController extends Controller
{
    public function __construct(
        private MedicineService $service
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

    public function update(Request $request): Response
    {
        return new Response(null, Response::HTTP_SERVICE_UNAVAILABLE);
    }

    public function create(CreateMedicineRequest $request): Response
    {
        return new Response(null, Response::HTTP_SERVICE_UNAVAILABLE);
    }

    public function delete(Request $request)
    {
        return new Response(null, Response::HTTP_SERVICE_UNAVAILABLE);
    }
}
