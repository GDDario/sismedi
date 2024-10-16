<?php

namespace App\Http\Controllers;

use App\Services\StateService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class StateController extends Controller
{
    public function __construct(
        private StateService $service
    )
    {
    }

    public function search(Request $request): Response
    {
        $search = $request->get('query', '') ?? '';

        return $this->service->search($search);
    }
}
