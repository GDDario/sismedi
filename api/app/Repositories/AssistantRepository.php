<?php

namespace App\Repositories;

use App\Exceptions\NotFoundException;
use App\Models\Assistant;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;

class AssistantRepository
{
    /**
     * @param array $parameters
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    public function paginate(array $parameters): LengthAwarePaginator
    {
        $query = Assistant::query()->join('users', 'assistants.user_id', '=', 'users.id')
            ->select('assistants.uuid', 'users.name', 'users.cpf', 'users.email',
                'assistants.level', 'assistants.created_at');

        $query = $this->filterQueryByFields($query, $parameters);

        return $query->paginate($parameters['per_page'], ['*'], 'page', $parameters['page']);
    }

    private function filterQueryByFields(Builder $query, array $parameters): Builder
    {
        $blackList = ['offset', 'page', 'limit'];
        $assistantBlackList = ['name', 'cpf', 'email'];

        foreach ($parameters as $key => $parameter) {
            if (strlen($key) === 5 && str_starts_with($key, 'name') && !in_array($parameter, $blackList)) {
                $number = substr($key, 4, 5);

                if (array_key_exists("value$number", $parameters)) {
                    $query =
                        $query->whereHas('user', function ($query) use ($parameter, $parameters, $number, $assistantBlackList) {
                            $searchValue = $parameters["value$number"];
                            $table = in_array($parameter, $assistantBlackList) ? 'users' : 'assistants';

                            $query->whereRaw("$table.$parameter LIKE '$searchValue%'");
                        });
                }
            }
        }

        return $query;
    }

    /**
     * @throws NotFoundException
     */
    public function findByUuid(string $uuid): Assistant
    {
        if (!Assistant::query()->where('uuid', $uuid)->exists()) {
            throw new NotFoundException("Patient with uuid $uuid not found.");
        }

        $patient = Assistant::query()
            ->where('uuid', $uuid)
            ->with([
                'user:id,name,email,cpf,email_verified_at'
            ])
            ->first();

        return $patient;
    }
}
