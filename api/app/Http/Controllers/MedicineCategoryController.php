<?php

namespace App\Http\Controllers;

use App\Services\MedicineCategoryService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class MedicineCategoryController extends Controller
{
    public function __construct(
        private MedicineCategoryService $service
    )
    {
    }

    public function search(Request $request): Response
    {
        $search = $request->get('query', '') ?? '';

        return $this->service->search($search);
    }
}
