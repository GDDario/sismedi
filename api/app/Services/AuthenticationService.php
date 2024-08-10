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

        return new Response(['message' => 'Wrong credentials'], Response::HTTP_UNAUTHORIZED);
    }

    private function refineLoginCredentials(string $login, string $password): array
    {
        $loginType = filter_var($login, FILTER_VALIDATE_EMAIL) ? 'email' : 'cpf';

        return [
            $loginType => $login,
            'password' =>$password
        ];
    }
}
