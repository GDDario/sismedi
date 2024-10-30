<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateMedicineRequest;
use App\Http\Requests\UpdateMedicineRequest;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class AssistantController extends Controller
{
    public function __construct()
    {
    }

    public function index(Request $request): Response
    {
        return new Response(null, Response::HTTP_NOT_IMPLEMENTED);
    }

    public function show(Request $request): Response
    {
        return new Response(null, Response::HTTP_NOT_IMPLEMENTED);
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
