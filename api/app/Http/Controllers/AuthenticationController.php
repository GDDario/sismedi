<?php

namespace App\Http\Controllers;

use Symfony\Component\HttpFoundation\Response;

class AuthenticationController extends Controller
{
    public function login(LoginRequest $request): Response
    {


        return new Response(null, Response::HTTP_UNAUTHORIZED);
    }
}
