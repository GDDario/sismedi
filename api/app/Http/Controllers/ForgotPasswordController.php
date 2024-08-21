<?php

namespace App\Http\Controllers;

use App\Http\Requests\ConfirmPasswordResetTokenRequest;
use App\Http\Requests\ResetPasswordWithTokenRequest;
use App\Http\Requests\SendForgotPassordEmailRequest;
use App\Services\ForgotPasswordService;
use Illuminate\Http\Response;

class ForgotPasswordController extends Controller
{
    public function __construct(
        private ForgotPasswordService $service
    )
    {
    }

    public function sendEmail(SendForgotPassordEmailRequest $request): Response
    {
        return $this->service->sendEmail($request->get('email'));
    }

    public function confirmToken(ConfirmPasswordResetTokenRequest $request): Response
    {
        return $this->service->confirmToken($request->get('token'));
    }

    public function resetPassword(ResetPasswordWithTokenRequest $request): Response
    {
        return $this->service->resetPassword($request->get('token'), $request->get('new_password'));
    }
}
