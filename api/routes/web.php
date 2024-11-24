<?php

use App\Events\AppointmentUpdatedEvent;
use App\Models\Appointment;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Response;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/login', function () {
    return new Response(['message' => 'Please authenticate first.'], Response::HTTP_FORBIDDEN);
})->name('login');

Route::get('/test', function () {
    Log::info('testing update');
//    event(new AppointmentUpdatedEvent(['aaa'], 'a01771af-9104-3600-add4-0ca9fe5246f3'));
    $appointment = Appointment::where('uuid', '3c08066f-fe74-4233-ab83-d052a2f200af');
    $appointment->update([
        'patient_id' => '2',
        'consultation_type_id' => '1',
        'appointment_date' => '2024-11-09 09:00:00',
        'doctor_id' => 1,
        'doctor_assigned_at' => now(),
        'canceled' => false,
        'canceled_reason' => null
    ]);
});
