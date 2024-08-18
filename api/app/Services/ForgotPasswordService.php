<?php

namespace App\Services;

use App\Exceptions\NotFoundException;
use App\Mail\ForgotPassword;
use App\Models\PasswordResetToken;
use App\Models\User;
use Illuminate\Http\Response;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class ForgotPasswordService
{
    public function sendEmail(string $email): Response
    {
        $userName = $this->getUserName($email);
        $token = $this->generateToken();
        $resetLink = env('FRONT_END_URL') . '/reset-password?token=' . $token;
        $createdAt = now();

        $this->createModel($email, $token, $createdAt);

        Mail::to($email)->queue(
            new ForgotPassword(
                $resetLink,
                $userName
            )
        );

        return new Response(['message' => 'Confira seu email para os próximos passos.'], Response::HTTP_OK);
    }

    public function confirmToken(string $token): Response
    {
        try {
            $model = $this->getModelByToken($token);
        } catch (NotFoundException $_) {
            return $this->tokenNotFoundResponse();
        }

        if (now()->diff($model->created_at)->hours >= 1) {
            return new Response(['message' => 'Token expirado.'], Response::HTTP_BAD_REQUEST);
        }

        return new Response(null, Response::HTTP_NO_CONTENT);
    }

    public function resetPassword(string $token, string $newPassword): Response
    {
        try {
            $model = $this->getModelByToken($token);
        } catch (NotFoundException $_) {
            return $this->tokenNotFoundResponse();
        }

        $this->updatePassword($model->email, $newPassword);
        $this->deleteModel($model);

        return new Response(['message' => 'Senha redefinida com sucesso!'], Response::HTTP_OK);
    }

    private function generateToken()
    {
        return str()->random(255);
    }

    /**
     * @throws NotFoundException
     */
    private function getUserName(string $email): string
    {
        if (!$user = User::query()->where('email', $email)->first()) {
            throw new NotFoundException;
        }

        return $user->name;
    }

    /**
     * @throws NotFoundException
     */
    private function getModelByToken(string $token): PasswordResetToken
    {
        if (!$token = PasswordResetToken::query()->where('token', $token)->first()) {
            throw new NotFoundException;
        }

        return $token;
    }

    private function createModel(string $email, $token, Carbon $createdAt)
    {
        if ($model = PasswordResetToken::query()->where('email', $email)->first()) {
            $model->query()->delete();
        }

        PasswordResetToken::query()->create([
            'email' => $email,
            'token' => $token,
            'created_at' => $createdAt
        ]);
    }

    private function tokenNotFoundResponse(): Response
    {
        return new Response(['message' => 'Token não encontrado'], Response::HTTP_NOT_FOUND);
    }


    /**
     * @throws NotFoundException
     */
    private function updatePassword(string $email, string $newPassword)
    {
        if (!$user = User::query()->where('email', $email)->first()) {
            throw new NotFoundException;
        }

        // Implicit hash
        $user->update(['password' => $newPassword]);
    }

    private function deleteModel(PasswordResetToken $model): void
    {
        $model->delete();
    }
}
