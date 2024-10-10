<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Ramsey\Uuid\Uuid;

class CNSRule implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $cns = preg_replace('/[^0-9]/', '', $value);

        if (strlen($cns) != 15) {
            $fail('The CNS must be 15 characters long.');
            return;
        }

        $pis = substr($cns, 0, 11);
        $soma = 0;

        for ($i = 0; $i < 11; $i++) {
            $soma += (int)$pis[$i] * (15 - $i);
        }

        $resto = $soma % 11;
        $dv = ($resto == 0) ? 0 : 11 - $resto;

        if ($dv == 10) {
            if (substr($cns, 0, 1) !== '7' && substr($cns, 0, 1) !== '9') {
                $fail('Invalid selected digit for CNS starting with 7 or 9.');
                return;
            }
        } else {
            if (substr($cns, 0, 1) !== '1' && substr($cns, 0, 1) !== '2') {
                $fail('Check digit does not match.');
                return;
            }
        }
    }
}
