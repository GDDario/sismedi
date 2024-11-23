<?php

namespace App\Http\Requests;

use App\Rules\CRMRule;
use App\Rules\CPFRule;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;

class CreateDoctorRequest extends FormRequest
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
            'doctor.email' => 'required|email|unique:users,email',
            'doctor.cpf' => ['required', new CPFRule, 'unique:users,cpf'],
            'doctor.crm' => ['required', new CRMRule, 'unique:doctors,crm'],
            'doctor.rg' => 'required|unique:doctors,rg',
            'doctor.birth_date' => 'required|date',
            'doctor.password' => 'required|confirmed',

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
            'doctor.email' => 'Email já cadastrado.',
            'doctor.cpf' => ['CPF já cadastrado.'],
            'doctor.crm' => 'CRM já cadastrado.',
            'doctor.rg' => 'RG já cadastrado.',
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
