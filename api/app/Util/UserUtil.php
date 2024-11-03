<?php

namespace App\Util;

use App\Models\User;

class UserUtil
{
    public static function emailWasAlreadyTaken(string $assistantEmail, string $dtoEmail): bool
    {
        if ($assistantEmail !== $dtoEmail) {
            return User::query()->where('email', $dtoEmail)->exists();
        }

        return false;
    }

    public static function cpfWasAlreadyTaken($assistantCPF, string $dtoCPF): bool
    {
        if ($assistantCPF !== $dtoCPF) {
            return User::query()->where('cpf', $dtoCPF)->exists();
        }

        return false;
    }
}
