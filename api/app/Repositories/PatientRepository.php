<?php

namespace App\Repositories;

use App\DTO\CreatePatientDTO;
use App\DTO\UpdatePatientDTO;
use App\Exceptions\NotFoundException;
use App\Models\Address;
use App\Models\City;
use App\Models\Patient;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;
use Ramsey\Uuid\Uuid;

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
                'cellphones:uuid,number,description,patient_id',
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
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    public function paginate(array $parameters): LengthAwarePaginator
    {
        $query = Patient::query()->join('users', 'patients.user_id', '=', 'users.id')
            ->select('patients.uuid', 'users.name', 'users.cpf', 'users.email',
                'patients.cns', 'patients.created_at');

        $query = $this->filterQueryByFields($query, $parameters);

        return $query->paginate($parameters['per_page'], ['*'], 'page', $parameters['page']);
    }


    /**
     * @param UpdatePatientDTO $dto
     * @return \App\DTO\UpdatePatientDTO The updated model.
     * @throws \App\Exceptions\NotFoundException
     */
    public function update(UpdatePatientDTO $dto): ?Patient
    {
        if (!$patient = Patient::query()->where('uuid', $dto->patientUuid)->first()) {
            throw new NotFoundException("Patient with uuid {$dto->patientUuid} not found.");
        }

        DB::beginTransaction();

        $state = $patient->update([
            'cns' => $dto->patient['cns'],
            'rg' => $dto->patient['rg'],
            'birth_date' => $dto->patient['birth_date']
        ]);

        if (!$state) {
            DB::rollBack();
            return null;
        }

        $state = $patient->user()->update([
            'name' => $dto->patient['name'],
            'cpf' => $dto->patient['cpf'],
            'email' => $dto->patient['email']
        ]);

        if (!$state) {
            DB::rollBack();
            return null;
        }

        if (!$city = City::query()->where('uuid', $dto->address['city_uuid'])->first()) {
            throw new NotFoundException("City with uuid {$dto->address['city_uuid']} not found.");
        }

        $state = $patient->address()->update([
            'street_address' => $dto->address['street_address'],
            'house_number' => $dto->address['house_number'],
            'address_line_2' => $dto->address['address_line_2'],
            'neighborhood' => $dto->address['neighborhood'],
            'postal_code' => $dto->address['postal_code'],
            'city_id' => $city->id,
        ]);

        if (!$state) {
            DB::rollBack();
            return null;
        }

        $patient->cellphones()->delete();

        foreach ($dto->cellphones as $cellphone) {
            $patient->cellphones()->create([
                'uuid' => Uuid::uuid4(),
                'number' => $cellphone['number'],
                'description' => $cellphone['number'],
                'is_primary' => $cellphone['is_primary']
            ]);
        }

        DB::commit();
        $patient->refresh();

        return $patient;
    }


    /**
     * @throws NotFoundException
     */
    public function insert(CreatePatientDTO $dto): Patient
    {
        if (!$city = City::query()->where('uuid', $dto->address['city_uuid'])->first()) {
            throw new NotFoundException("City with uuid {$dto->address['city_uuid']} not found.");
        }

        $user = User::query()->create([
            'uuid' => Uuid::uuid4(),
            'name' => $dto->patient['name'],
            'cpf' => $dto->patient['cpf'],
            'email' => $dto->patient['email'],
            'password' => $dto->patient['password']
        ]);

        $patient = Patient::query()->create([
            'uuid' => Uuid::uuid4(),
            'name' => $dto->patient['name'],
            'cns' => $dto->patient['cns'],
            'rg' => $dto->patient['rg'],
            'birth_date' => $dto->patient['birth_date'],
            'user_id' => $user->id
        ]);

        $address = Address::query()->create([
            'uuid' => Uuid::uuid4(),
            'patient_id' => $patient->id,
            'street_address' => $dto->address['street_address'],
            'house_number' => $dto->address['house_number'],
            'address_line_2' => $dto->address['address_line_2'],
            'neighborhood' => $dto->address['neighborhood'],
            'postal_code' => $dto->address['postal_code'],
            'city_id' => $city->id
        ]);

        foreach ($dto->cellphones as $cellphone) {
            $patient->cellphones()->create([
                'uuid' => Uuid::uuid4(),
                'number' => $cellphone['number'],
                'description' => $cellphone['number'],
                'is_primary' => $cellphone['is_primary']
            ]);
        }

        return $patient;
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
