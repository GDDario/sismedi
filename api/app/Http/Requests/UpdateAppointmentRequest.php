<?php

namespace App\Http\Requests;

use App\Rules\CPFRule;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;

class UpdateAppointmentRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'type' => 'required|exists:consultation_types,uuid',
            'patient_desired_date' => 'date_format:Y-m-d H:i:s|after:' . date(DATE_ATOM),
            'appointment_date' => 'date_format:Y-m-d H:i:s|after:' . date(DATE_ATOM),
            'doctor_uuid' => 'nullable|uuid|exists:doctors,uuid',
            'canceled' => 'required|boolean'
        ];
    }

    /**
     * Handle a failed validation attempt.
     *
     * @param Validator $validator
     * @return void
     *
     * @throws HttpResponseException
     */
    protected function failedValidation(Validator $validator): void
    {
        $response = new JsonResponse(['errors' => $validator->errors()], 422);

        throw new HttpResponseException($response);
    }
}
