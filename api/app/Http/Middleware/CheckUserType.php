<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;

class CheckUserType
{
    /**
     * Handle an incoming request.
     *a
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$types): Response
    {
        $user = $request->user();

        foreach ($types as $type) {
            if (($type === 'doctor' && $user->isDoctor()) ||
                ($type === 'assistant' && $user->isAssistant()) ||
                ($type === 'patient' && $user->isPatient())) {
                return $next($request);
            }
        }

        return new Response(['message' => 'Acesso negado.'], Response::HTTP_FORBIDDEN);
    }
}
