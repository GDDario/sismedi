<?php

namespace App\Http\Controllers;

use App\Services\MedicineService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class MedicinesController extends Controller
{
    public function __construct(
        private MedicineService $service
    )
    {
    }

    public function index(Request $request): Response
    {
        return new Response(null, Response::HTTP_SERVICE_UNAVAILABLE);
    }

    public function show(Request $request): Response
    {
        return new Response(null, Response::HTTP_SERVICE_UNAVAILABLE);
    }

    public function update(Request $request): Response
    {
        return new Response(null, Response::HTTP_SERVICE_UNAVAILABLE);
    }

    public function create(Request $request): Response
    {
        return new Response(null, Response::HTTP_SERVICE_UNAVAILABLE);
    }

    public function delete(Request $request)
    {
        return new Response(null, Response::HTTP_SERVICE_UNAVAILABLE);
    }
}
