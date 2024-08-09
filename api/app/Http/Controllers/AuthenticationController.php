<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class AuthenticationController extends Controller
{
    public function login(LoginRequest $request): Response
    {
        $login = $request->get('login');

        $loginType = filter_var($login, FILTER_VALIDATE_EMAIL) ? 'email' : 'cpf';

        $credentials = [
            $loginType => $login,
            'password' => $request->get('password'),
        ];

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('token')->plainTextToken;

            $user = $user->toArray();

            unset($user['id']);

            return new Response(['user' => $user, 'token' => $token]);
        }

        return new Response(null, Response::HTTP_UNAUTHORIZED);
    }
}
