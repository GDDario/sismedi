<?php

use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\AssistantController;
use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\CityController;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\ForgotPasswordController;
use App\Http\Controllers\MedicineCategoryController;
use App\Http\Controllers\MedicineController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\StateController;
use Illuminate\Support\Facades\Route;

Route::post('login', [AuthenticationController::class, 'login']);

Route::prefix('forgot-password')->group(function () {
    Route::post('send-email', [ForgotPasswordController::class, 'sendEmail']);
    Route::post('confirm-token', [ForgotPasswordController::class, 'confirmToken']);
    Route::post('reset-password', [ForgotPasswordController::class, 'resetPassword']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('authenticated-user', [AuthenticationController::class, 'authenticatedUser']);

    Route::post('logout', [AuthenticationController::class, 'logout']);

    Route::prefix('patient')->group(function () {
        Route::get('', [PatientController::class, 'index']);
        Route::get('{uuid}', [PatientController::class, 'show']);
        Route::post('', [PatientController::class, 'create']);
        Route::put('{uuid}', [PatientController::class, 'update']);
        Route::delete('{uuid}', [PatientController::class, 'delete']);
    });

    Route::prefix('state')->group(function () {
        Route::get('search', [StateController::class, 'search']);
    });

    Route::prefix('city')->group(function () {
        Route::get('search', [CityController::class, 'search']);
    });

    Route::prefix('doctor')->group(function () {
        Route::get('', [DoctorController::class, 'index']);
        Route::get('/{uuid}', [DoctorController::class, 'show']);
        Route::get('/agenda/{id}', [DoctorController::class, 'getAgenda']);
    });

    Route::prefix('medicine')->group(function () {
        Route::get('', [MedicineController::class, 'index']);
        Route::get('/{uuid}', [MedicineController::class, 'show']);
        Route::post('', [MedicineController::class, 'create']);
        Route::put('/{uuid}', [MedicineController::class, 'update']);
        Route::delete('/{uuid}', [MedicineController::class, 'delete']);
    });

    Route::prefix('medicine-category')->group(function () {
        Route::get('search', [MedicineCategoryController::class, 'search']);
    });

    Route::prefix('assistant')->group(function () {
        Route::get('', [AssistantController::class, 'index']);
        Route::get('/{uuid}', [AssistantController::class, 'show']);
        Route::post('', [AssistantController::class, 'create']);
        Route::put('/{uuid}', [AssistantController::class, 'update']);
        Route::delete('/{uuid}', [AssistantController::class, 'delete']);
    });

    Route::prefix('appointment')->group(function () {
        Route::get('', [AppointmentController::class, 'index']);
        Route::get('{uuid}', [AppointmentController::class, 'show']);
        Route::post('', [AppointmentController::class, 'create']);
        Route::put('{uuid}', [AppointmentController::class, 'update']);
    });
});
