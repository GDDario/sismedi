<?php

namespace App\Repositories;

use App\Models\MedicineCategory;

class MedicineCategoryRepository
{
    /**
     * @param string $search The start name of the model being searched.
     * @param string $order "asc" or "desc";
     * @return array<MedicineCategory>
     */
    public function findByName(string $search, string $order): array
    {
        $states = MedicineCategory::query()
            ->select('uuid', 'name')
            ->whereLike('name', "$search%")
            ->orderBy('name', $order)
            ->get();

        return $states->toArray();
    }
}
