<?php

use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\ForgotPasswordController;
use Illuminate\Support\Facades\Route;

Route::post('login', [AuthenticationController::class, 'login']);

Route::prefix('forgot-password')->group(function() {
    Route::post('send-email', [ForgotPasswordController::class, 'sendEmail']);
    Route::post('confirm-token', [ForgotPasswordController::class, 'confirmToken']);
    Route::post('reset-password', [ForgotPasswordController::class, 'resetPassword']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('authenticated-user', [AuthenticationController::class, 'authenticatedUser']);

    Route::post('logout', [AuthenticationController::class, 'logout']);
});
