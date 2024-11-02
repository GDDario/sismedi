<?php

namespace App\Http\Requests;

use App\Rules\CPFRule;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;

class UpdateAssistantRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required',
            'email' => 'required|email',
            'cpf' => ['required', new CPFRule],
            'level' => 'required|integer',
            'password' => 'required|confirmed',
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
