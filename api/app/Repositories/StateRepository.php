<?php

namespace App\Repositories;

use App\Models\State;

class StateRepository
{
    /**
     * @param string $search The start name of the model being searched.
     * @param string $order "asc" or "desc";
     * @return array<State>
     */
    public function findByName(string $search, string $order): array
    {
        $states = State::query()
            ->select('uuid', 'name', 'code')
            ->whereLike('name', "$search%")
            ->orderBy('name', $order)
            ->get();

        return $states->toArray();
    }
}
