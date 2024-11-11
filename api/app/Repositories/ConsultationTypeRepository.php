<?php

namespace App\Repositories;

use App\Models\ConsultationType;

class ConsultationTypeRepository
{
    /**
     * @return array<ConsultationType>
     */
    public function findAll(): array
    {
        $states = ConsultationType::all();

        return $states->toArray();
    }

    /**
     * @return array<ConsultationType>
     */
    public function findByName(string $search, string $order): array
    {
        $types = ConsultationType::query()
            ->select('uuid', 'name')
            ->whereLike('name', "$search%")
            ->orderBy('name', $order)
            ->get();

        return $types->toArray();
    }
}
