<?php

namespace App\Repositories;

use App\Models\City;

class CityRepository
{
    /**
     * @param string $search The start name of the model being searched.
     * @param string $order "asc" or "desc";
     * @return array<City>
     */
    public function findByName(string $search, string $order): array
    {
        $states = City::query()
            ->select('uuid', 'name', 'state_id')
            ->whereLike('name', "$search%")
            ->orderBy('name', $order)
            ->get();

        return $states->toArray();
    }
}
