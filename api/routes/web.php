<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Response;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/login', function () {
    return new Response(['message' => 'Please authenticate first.'], Response::HTTP_FORBIDDEN);
})->name('login');
