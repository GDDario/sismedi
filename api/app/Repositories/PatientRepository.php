<?php

namespace App\Repositories;

use App\Exceptions\NotFoundException;
use App\Models\Patient;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;

class PatientRepository
{
    /**
     * @throws NotFoundException
     */
    public function findByUuid(string $uuid): Patient
    {
        if (!Patient::query()->where('uuid', $uuid)->exists()) {
            throw new NotFoundException("Patient with uuid $uuid not found.");
        }

        $patient = Patient::query()
            ->join('users', 'patients.user_id', '=', 'users.id')
            ->join('addresses', 'patients.id', '=', 'addresses.patient_id')
            ->join('cities', 'addresses.city_id', '=', 'cities.id')
            ->join('states', 'cities.state_id', '=', 'states.id')
            ->select(
                'patients.uuid', 'patients.cns', 'patients.created_at', 'patients.updated_at',
                'patients.deleted_at',
                'users.name', 'users.email', 'users.cpf', 'users.email_verified_at',
                'addresses.uuid as address_uuid', 'addresses.street_address', 'addresses.house_number',
                'addresses.address_line_2', 'addresses.neighborhood', 'addresses.postal_code',
                'cities.uuid as city_uuid', 'cities.name as city_name', 'cities.ibge_code',
                'states.uuid as state_uuid', 'states.name as state_name', 'states.code as state_code',
                'states.ibge_code as state_ibge_code', 'states.ddd'
            )
            ->where('patients.uuid', $uuid)
            ->first();

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
