<?php

namespace App\Http\Requests;

use App\Rules\CNSRule;
use App\Rules\CPFRule;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;

class CreatePatientRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            // Patient object
            'patient.name' => 'required',
            'patient.email' => 'required|email|unique:users,email',
            'patient.cpf' => ['required', new CPFRule, 'unique:users,cpf'],
            'patient.cns' => ['required', new CNSRule, 'unique:patients,cns'],
            'patient.rg' => 'required|unique:patients,rg',
            'patient.birth_date' => 'required|date',
            'patient.password' => 'required|confirmed',

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
     * Get the custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'patient.email' => 'Email já cadastrado.',
            'patient.cpf' => ['CPF já cadastrado.'],
            'patient.cns' => 'CNS já cadastrado.',
            'patient.rg' => 'RG já cadastrado.',
            'password.required' => 'O campo password é obrigatório.',
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
