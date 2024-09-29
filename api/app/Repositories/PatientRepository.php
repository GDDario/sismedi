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
            ->where('uuid', $uuid)
            ->with([
                'user:id,name,email,cpf,email_verified_at',
                'cellphones:uuid,number,description,patient_id', // Telefone relacionado
                'address' => function ($query) {
                    $query->select(
                        'uuid', 'street_address', 'house_number', 'address_line_2',
                        'neighborhood', 'postal_code', 'city_id', 'patient_id'
                    )->with([
                        'city:id,uuid,name,ibge_code,state_id',
                        'city.state:id,uuid,name,code,ibge_code,ddd'
                    ]);
                }
            ])
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
