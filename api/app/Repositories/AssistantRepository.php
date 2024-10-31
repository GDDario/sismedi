<?php

namespace App\Repositories;

use App\DTO\CreateAssistantDTO;
use App\Exceptions\NotFoundException;
use App\Models\Assistant;
use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Ramsey\Uuid\Uuid;

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

    public function insert(CreateAssistantDTO $dto): ?Assistant
    {
        $user = User::query()->create([
            'uuid' => Uuid::uuid4(),
            'name' => $dto->name,
            'cpf' => $dto->cpf,
            'email' => $dto->email,
            'password' => $dto->password
        ]);

        $assistant = Assistant::query()->create([
            'uuid' => Uuid::uuid4(),
            'level' => $dto->level,
            'user_id' => $user->id
        ]);

        return $assistant;
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
}
