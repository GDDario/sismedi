<?php

namespace App\Repositories;

use App\Exceptions\NotFoundException;
use App\Models\Patient;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;

class PatientRepository
{
    /**
     * @throws NotFoundException
     */
    public function findByUuid(string $uuid): Patient
    {
        if (!$patient = Patient::query()->select('uuid', 'cns', 'created_at', 'updated_at', 'deleted_at')
            ->where('uuid', $uuid)->first()) {
            throw new NotFoundException("Patient with uuid $uuid not found.");
        }

        return $patient;
    }


    /**
     * @param array $parameters
     * @return LengthAwarePaginator
     */
    public function paginate(array $parameters): LengthAwarePaginator
    {
        $query = Patient::query()->join('users', 'patients.user_id', '=', 'users.id')
            ->select('patients.uuid', 'users.name', 'users.cpf', 'users.email',
                'patients.cns', 'patients.created_at');

        $query = $this->filterQueryByFields($query, $parameters);

        return $query->paginate($parameters['per_page'], ['*'], 'page', $parameters['page']);
    }

    private function filterQueryByFields(Builder $query, array $parameters): Builder
    {
        $blackList = ['offset', 'page', 'limit'];
        $patientBlackList = ['name', 'cpf', 'email'];

        foreach ($parameters as $key => $parameter) {
            if (strlen($key) === 5 && str_starts_with($key, 'name') && !in_array($parameter, $blackList)) {
                $number = substr($key, 4, 5);

                if (array_key_exists("value$number", $parameters)) {
                    $query =
                        $query->whereHas('user', function ($query) use ($parameter, $parameters, $number, $patientBlackList) {
                            $searchValue = $parameters["value$number"];
                            $table = in_array($parameter, $patientBlackList) ? 'users' : 'patients';

                            $query->whereRaw("$table.$parameter LIKE '$searchValue%'");
                        });
                }
            }
        }

        return $query;
    }
}
