<?php

namespace App\Http\Controllers;

use App\Services\ConsultationTypeService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ConsultationTypeController extends Controller
{
    public function __construct(
        private ConsultationTypeService $service
    )
    {
    }

    public function index(): Response {
        return $this->service->getAll();
    }

    public function search(Request $request): Response
    {
        $search = $request->get('query', '') ?? '';

        return $this->service->search($search);
    }
}
