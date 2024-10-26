<?php

namespace App\Http\Controllers;

use App\Services\CityService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class CityController extends Controller
{
    public function __construct(
        private CityService $service
    )
    {
    }

    public function search(Request $request): Response
    {
        $search = $request->get('query', '') ?? '';
        $stateUuid = $request->get('state_uuid', null);

        return $this->service->search($search, $stateUuid);
    }
}
