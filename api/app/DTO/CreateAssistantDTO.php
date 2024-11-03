<?php

namespace App\DTO;

class CreateAssistantDTO
{
    public function __construct(
        public string $name,
        public string $email,
        public string $cpf,
        public int    $level,
        public string $password
    )
    {
    }
}
