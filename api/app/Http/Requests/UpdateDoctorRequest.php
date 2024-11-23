<?php

namespace App\Http\Requests;

use App\Rules\CRMRule;
use App\Rules\CPFRule;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;

class UpdateDoctorRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            // Doctor object
            'doctor.name' => 'required',
            'doctor.email' => 'required|email',
            'doctor.cpf' => ['required', new CPFRule],
            'doctor.crm' => ['required', new CRMRule],
            'doctor.rg' => 'required',
            'doctor.birth_date' => 'required|date',

            // Address object
            'address.street_address' => 'required',
            'address.house_number' => 'required',
            'address.neighborhood' => 'required',
            'address.postal_code' => 'required',
            "address.city_uuid" => "required|uuid|exists:cities,uuid",

            // Cellphones
            "cellphones" => "array|min:1",
            "cellphones.*.number" => 'required|size:11'
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
