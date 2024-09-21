<?php

use App\Models\Patient;
use App\Models\User;
use Tests\Helpers\PatientsHelper;
use function Pest\Laravel\actingAs;
use function PHPUnit\Framework\assertCount;
use function PHPUnit\Framework\assertGreaterThan;

const PATIENTS_PATH = '/api/patient';

beforeEach(function () {
    PatientsHelper::createDefaultPatient();

    PatientsHelper::createPatients(29);
});

it('should return a list of 20 patients as default', function () {
    $requestUrl = PATIENTS_PATH;
    actingAs(PatientsHelper::getDefaultPatient());

    $response = $this->get($requestUrl);
    $jsonResponse = $response->json();

    $response->assertStatus(200);
    assertCount(20, $jsonResponse['data']);
});

it('should return a list of 10 patients', function () {
    $requestUrl = PATIENTS_PATH . '?page=1&per_page=10';
    actingAs(PatientsHelper::getDefaultPatient());

    $response = $this->get($requestUrl);

    $response->assertStatus(200);
    assertCount(10, $response->json()['data']);
});

it('should return a second page with 10 patients', function () {
    $requestUrl = PATIENTS_PATH . '?page=2';
    actingAs(PatientsHelper::getDefaultPatient());

    $response = $this->get($requestUrl);

    $response->assertStatus(200);
    assertCount(10, $response->json()['data']);
});

it('should filter patients by name', function () {
    $requestUrl = PATIENTS_PATH . '?name1=name&value1=Jhon Doe';
    actingAs(PatientsHelper::getDefaultPatient());

    $response = $this->get($requestUrl);

    $response->assertStatus(200);
    assertGreaterThan(1, $response->json()['data']);
});

it('should filter patients by cpf', function () {
    $requestUrl = PATIENTS_PATH . '?name1=cpf&value1=44654545972';
    actingAs(PatientsHelper::getDefaultPatient());

    $response = $this->get($requestUrl);

    $response->assertStatus(200);
    assertGreaterThan(1, $response->json()['data']);
});

it('should filter patients by cns', function () {
    $requestUrl = PATIENTS_PATH . '?name1=cns&value1=7093887818289';
    actingAs(PatientsHelper::getDefaultPatient());

    $response = $this->get($requestUrl);

    $response->assertStatus(200);
    assertGreaterThan(1, $response->json()['data']);
});
