<?php

namespace App\DTO;

class UpdateAssistantDTO
{
    public function __construct(
        public string $uuid,
        public string $name,
        public string $email,
        public string $cpf,
        public int    $level
    )
    {
    }
}
