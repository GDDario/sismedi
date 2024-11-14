<?php

namespace App\Repositories;

use App\DTO\CreateAssistantDTO;
use App\DTO\UpdateAssistantDTO;
use App\DTO2\UpdatePatientDTO;
use App\Exceptions\NotFoundException;
use App\Models\Assistant;
use App\Models\User;
use App\Util\UserUtil;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;
use InvalidArgumentException;
use Ramsey\Uuid\Uuid;

class AssistantRepository
{
    /**
     * @param array $parameters
     * @return LengthAwarePaginator
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

    /**
     * @throws NotFoundException
     * @throws InvalidArgumentException
     */
    public function update(UpdateAssistantDTO $dto): ?Assistant
    {
        if (!$assistant = Assistant::query()->where('uuid', $dto->uuid)->first()) {
            throw new NotFoundException("Assistint with uuid {$dto->uuid} not found.");
        }

        if (UserUtil::emailWasAlreadyTaken($assistant->user->email, $dto->email)) {
            throw new InvalidArgumentException('This email was already taken');
        }

        if (UserUtil::cpfWasAlreadyTaken($assistant->user->cpf, $dto->cpf)) {
            throw new InvalidArgumentException('This CPF was already taken');
        }

        DB::beginTransaction();

        $state = $assistant->update([
            'level' => $dto->level
        ]);

        if (!$state) {
            DB::rollBack();
            return null;
        }

        $state = $assistant->user()->update([
            'name' => $dto->name,
            'cpf' => $dto->cpf,
            'email' => $dto->email
        ]);

        if (!$state) {
            DB::rollBack();
            return null;
        }

        DB::commit();
        $assistant->refresh();

        return $assistant;
    }

    /**
     * @throws NotFoundException
     */
    public function delete(string $uuid): bool
    {
        if (!$assistant = Assistant::query()->where('uuid', $uuid)->first()) {
            throw new NotFoundException("Assistente com uuid $uuid não encontrado.");
        }

        return $assistant->delete();
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
