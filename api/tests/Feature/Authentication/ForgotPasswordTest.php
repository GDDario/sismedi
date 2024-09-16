<?php

use App\Mail\ForgotPassword;
use App\Models\PasswordResetToken;
use App\Models\User;
use App\Models\UserType;
use Illuminate\Support\Facades\Mail;

const SEND_EMAIL_PATH = '/api/forgot-password/send-email';
const CONFIRM_TOKEN_PATH = '/api/forgot-password/confirm-token';
const RESET_PASSWORD_PATH = '/api/forgot-password/reset-password';

beforeEach(function () {
    User::factory()->create([
        'email' => 'test@example.com',
        'cpf' => '67774092030'
    ]);
});

it('should send the email successfully', function () {
    Mail::fake();
    $requestData = [
        'email' => 'test@example.com'
    ];

    $response = $this->post(SEND_EMAIL_PATH, $requestData);
    Mail::assertQueued(ForgotPassword::class);

    $response->assertStatus(200);
    $response->assertExactJson(['message' => 'Confira seu email para os próximos passos.']);
    $this->assertDatabaseCount(PasswordResetToken::class, 1);
});

it('should not send the email with wrong email input', function () {
    Mail::fake();
    $requestData = [
        'email' => 'test@fail.com'
    ];

    $response = $this->post(SEND_EMAIL_PATH, $requestData);
    Mail::assertNothingQueued();

    $response->assertStatus(422);
    $response->assertExactJson([
        'errors' => [
            'email' => [
                'Email inválido.'
            ]
        ]
    ]);
});

it('should confirm token', function () {
    $token = str()->random(255);
    $requestData = ['token' => $token];

    PasswordResetToken::factory()->create([
        'email' => 'test@example.com',
        'token' => $token
    ]);

    $response = $this->post(CONFIRM_TOKEN_PATH, $requestData);

    $response->assertStatus(204);
    $response->assertNoContent();
});

it('should have error when confirm invalid token', function () {
    $token = str()->random(255);
    $wrongToken = str()->random(255);
    $requestData = ['token' => $wrongToken];

    PasswordResetToken::factory()->create([
        'email' => 'test@example.com',
        'token' => $token
    ]);

    $response = $this->post(CONFIRM_TOKEN_PATH, $requestData);

    $response->assertStatus(422);
    $response->assertExactJson([
        'errors' => [
            'token' => [
                'Token inválido.'
            ]
        ]
    ]);
});

it('should reset password', function () {
    $token = str()->random(255);

    PasswordResetToken::factory()->create([
        'email' => 'test@example.com',
        'token' => $token
    ]);

    $requestData = [
        'new_password' => 'password',
        'new_password_confirmation' => 'password',
        'token' => $token
    ];

    $response = $this->post(RESET_PASSWORD_PATH, $requestData);

    $response->assertStatus(200);
    $response->assertExactJson(['message' => 'Senha redefinida com sucesso!']);
    $this->assertDatabaseCount(PasswordResetToken::class, 0);
});

it('should have error when passwords do not match', function () {
    $token = str()->random(255);

    PasswordResetToken::factory()->create([
        'email' => 'test@example.com',
        'token' => $token
    ]);

    $requestData = [
        'new_password' => 'password',
        'new_password_confirmation' => 'wrong_password',
        'token' => $token
    ];

    $response = $this->post(RESET_PASSWORD_PATH, $requestData);

    $response->assertStatus(422);
    $response->assertExactJson([
        'errors' => [
            'new_password' => [
                'As senhas não coincidem.'
            ]
        ]
    ]);
    $this->assertDatabaseCount(PasswordResetToken::class, 1);
});

it('should have error when token is invalid', function () {
    $token = str()->random(255);
    $invalidToken = str()->random(255);

    PasswordResetToken::factory()->create([
        'email' => 'test@example.com',
        'token' => $token
    ]);

    $requestData = [
        'new_password' => 'password',
        'new_password_confirmation' => 'password',
        'token' => $invalidToken
    ];

    $response = $this->post(RESET_PASSWORD_PATH, $requestData);

    $response->assertStatus(422);
    $response->assertExactJson([
        'errors' => [
            'token' => [
                'Token inválido.'
            ]
        ]
    ]);
    $this->assertDatabaseCount(PasswordResetToken::class, 1);
});
