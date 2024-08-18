<?php

namespace App\Services;

use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class AuthenticationService
{
    public function doLogin(string $login, string $password): Response
    {
        $credentials = $this->refineLoginCredentials($login, $password);

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('token')->plainTextToken;

            $user = $user->toArray();

            unset($user['id']);

            return new Response(['user' => $user, 'token' => $token], Response::HTTP_OK);
        }

        return new Response(['message' => 'Credenciais inválidas.'], Response::HTTP_UNAUTHORIZED);
    }

    public function getAuthenticatedUser()
    {
        $user = Auth::user();

        $user = $user->toArray();

        unset($user['id']);

        return new Response($user, Response::HTTP_OK);
    }

    public function logout(): Response
    {
        Auth::user()->currentAccessToken()->delete();

        return new Response(null, Response::HTTP_OK);
    }

    private function refineLoginCredentials(string $login, string $password): array
    {
        $loginType = filter_var($login, FILTER_VALIDATE_EMAIL) ? 'email' : 'cpf';

        return [
            $loginType => $login,
            'password' => $password
        ];
    }
}
