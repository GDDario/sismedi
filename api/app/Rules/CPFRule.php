<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class CPFRule implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $cpf = preg_replace('/[^0-9]/', '', $value);

        if (strlen($cpf) != 11) {
            $fail('The informed CPF must be 11 digits long.');
            return;
        }

        if (preg_match('/(\d)\1{10}/', $cpf)) {
            $fail('The informed CPF is invalid.');
            return;
        }

        for ($t = 9; $t < 11; $t++) {
            $soma = 0;
            for ($i = 0; $i < $t; $i++) {
                $soma += $cpf[$i] * (($t + 1) - $i);
            }

            $resto = ($soma * 10) % 11;
            $dv = ($resto == 10 || $resto == 11) ? 0 : $resto;

            if ($cpf[$t] != $dv) {
                $fail('The informed CPF is invalid.');
                return;
            }
        }
    }
}
