<?php

use App\Models\User;
use App\Models\UserType;
use Illuminate\Validation\ValidationException;
use Ramsey\Uuid\Uuid;
use function Pest\Laravel\assertDatabaseEmpty;
use function Pest\Laravel\assertDatabaseHas;
use function PHPUnit\Framework\assertTrue;

const LOGIN_PATH = '/api/login';

beforeEach(function () {
    UserType::factory()->create(['name' => 'Administrador']);

    User::factory()->create([
        'email' => 'user@example.com',
        'cpf' => '67774092030'
    ]);
});

it('should login successfully with email and password', function () {
    $requestData = [
        'login' => 'user@example.com',
        'password' => 'password'
    ];

    $response = $this->post(LOGIN_PATH, $requestData);

    $response->assertStatus(200);
    $response->assertJson(['user' => [
        'email' => 'user@example.com',
        'cpf' => '67774092030',
    ]]);
    assertTrue(Uuid::isValid($response['user']['uuid']));
    assertDatabaseHas('personal_access_tokens', ['tokenable_type' => 'App\Models\User']);
});

it('should login successfully with cpf and password', function () {
    $requestData = [
        'login' => '67774092030',
        'password' => 'password'
    ];

    $response = $this->post(LOGIN_PATH, $requestData);

    $response->assertStatus(200);
    $response->assertJson(['user' => [
        'email' => 'user@example.com',
        'cpf' => '67774092030',
    ]]);
    assertTrue(Uuid::isValid($response['user']['uuid']));
    assertDatabaseHas('personal_access_tokens', ['tokenable_type' => 'App\Models\User']);
});

it('should not login with login field is required error', function () {
    $requestData = [
        'password' => 'password'
    ];

    $response = $this->post(LOGIN_PATH, $requestData);

    $response->assertStatus(302);
    $response->assertJson(['user' => [
        'email' => 'user@example.com',
        'cpf' => '67774092030',
    ]]);
})->throws(ValidationException::class, 'The login field is required');

it('should not login with password field is required error', function () {
    $requestData = [
        'login' => 'user@example.com'
    ];

    $response = $this->post(LOGIN_PATH, $requestData);

    $response->assertStatus(302);
    $response->assertJson(['user' => [
        'email' => 'user@example.com',
        'cpf' => '67774092030',
    ]]);
})->throws(ValidationException::class, 'The password field is required');

it('should not login with wrong credentials', function () {
    $requestData = [
        'login' => 'example@user.com',
        'password' => '@Password123'
    ];

    $response = $this->post(LOGIN_PATH, $requestData);

    $response->assertStatus(401);
    $response->assertExactJson([
        'message' => 'Wrong credentials'
    ]);
    assertDatabaseEmpty('personal_access_tokens');
});
