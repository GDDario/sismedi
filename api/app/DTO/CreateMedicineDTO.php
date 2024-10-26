<?php

namespace App\DTO;

class CreateMedicineDTO
{
    public function __construct(
        public string  $name,
        public int     $quantity,
        public string  $expirationDate,
        public string  $manufacturer,
        public string  $batchNumber,
        public float   $price,
        public string  $categoryUuid,
        public ?string $dosage = null,
        public ?float  $concentration = null,
        public ?float  $prescription = null,
        public ?float  $description = null
    )
    {

    }
}
