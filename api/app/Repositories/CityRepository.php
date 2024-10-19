<?php

namespace App\Repositories;

use App\Exceptions\NotFoundException;
use App\Models\City;
use App\Models\State;

class CityRepository
{
    /**
     * @param string $search The start name of the model being searched.
     * @param string $order "asc" or "desc";
     * @return array<City>
     */
    public function findByName(string $search, string $order): array
    {
        $cities = City::query()
            ->select('uuid', 'name', 'state_id')
            ->whereLike('name', "$search%")
            ->orderBy('name', $order)
            ->get();

        return $cities->toArray();
    }

    /**
     * @param string $search The start name of the model being searched.
     * @param string $stateUuid The state public identifier, which have a relationship with the searched models.
     * @param string $order "asc" or "desc";
     * @return array<City>
     * @throws NotFoundException If the passed uuid do not belong to any state.
     */
    public function findByNameAndState(string $search, string $stateUuid, string $order): array
    {
        if (!$state = State::query()->where('uuid', $stateUuid)->first()) {
            throw new NotFoundException("State with uuid '$stateUuid' not found.");
        }

        $cities = City::query()
            ->join('states', 'cities.state_id', 'states.id')
            ->select('cities.uuid', 'cities.name', 'cities.state_id', 'states.code')
            ->where('cities.state_id', $state->id)
            ->whereLike('cities.name', "$search%")
            ->orderBy('cities.name', $order)
            ->get();

        return $cities->toArray();
    }


}
