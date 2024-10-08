<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Services\AuthenticationService;
use Illuminate\Http\Response;

class AuthenticationController extends Controller
{
    public function __construct(
        public AuthenticationService $service
    )
    {
    }

    public function login(LoginRequest $request): Response
    {
        return $this->service->doLogin($request->get('login'), $request->get('password'));
    }

    public function authenticatedUser(): Response
    {
        return $this->service->getAuthenticatedUser();
    }

    public function logout(): Response
    {
        return $this->service->logout();
    }
}
