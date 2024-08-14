<?php

use App\Http\Controllers\AuthenticationController;
use Illuminate\Support\Facades\Route;

Route::post('login', [AuthenticationController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('authenticated-user', [AuthenticationController::class, 'authenticatedUser']);

    Route::post('logout', [AuthenticationController::class, 'logout']);
});
