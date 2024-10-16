<?php

namespace App\Http\Controllers;

use App\Services\DoctorService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class DoctorController extends Controller
{
    public function __construct(
        private DoctorService $service
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

    //Controlador para a função de obter a agenda de X médico utilizando sua id
    public function getAgenda(Request $request): Response
    {
        return $this->service->getAgendaByID($request->route('id'));
    }
}
