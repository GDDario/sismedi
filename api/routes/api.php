<?php

use App\Http\Controllers\AuthenticationController;
use Illuminate\Support\Facades\Route;

//Route::get('/user', function (Request $request) {
//    return $request->user();
//})->middleware('auth:sanctum');

Route::post('login', [AuthenticationController::class, 'login']);


//Route::middleware('auth:api')->group(function () {
//    Route::post('login', [AuthenticationController::class, 'login']);
//});
