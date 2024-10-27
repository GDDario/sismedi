<?php

namespace App\Repositories;

use App\Exceptions\NotFoundException;
use App\DTO\CreateDoctorDTO;
use App\DTO\UpdateDoctorDTO;
use App\Models\City;
use App\Models\User;
use App\Models\Doctor;
use App\Models\Agenda;
use App\Models\Address;
use App\Models\Cellphone;
use Ramsey\Uuid\Uuid;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Collection;

class DoctorRepository
{
    /**
     * @throws NotFoundException
     */
    public function findByUuid(string $uuid): Doctor
    {
        $doctor = Doctor::query()
            ->select('doctors.id', 'doctors.user_id','doctors.uuid', 'doctors.crm', 'doctors.rg', 'birth_date','doctors.created_at', 'doctors.updated_at')
            ->selectRaw('users.name, users.email, users.cpf, users.email_verified_at')
            ->join('users', 'doctors.user_id', '=', 'users.id')
            ->where('doctors.uuid', $uuid)
            ->first();

        $addressQuery = Address::query()
            ->select('street_address', 'house_number', 'address_line_2', 'neighborhood', 'postal_code')
            ->selectRaw('cities.uuid as city_uuid, cities.name as city_name, cities.ibge_code')
            ->selectRaw('states.uuid as state_uuid, states.name as state_name, states.code as state_code, states.ibge_code as state_ibge_code, states.ddd')
            ->join('cities', 'addresses.city_id', '=', 'cities.id')
            ->join('states', 'cities.state_id', '=', 'states.id')
            ->where('addresses.user_id', $doctor->user_id);
        $address = $addressQuery->first();

        $cellphoneQuery = Cellphone::query()
            ->select('uuid','number','description','user_id')
            ->where('user_id', $doctor->user_id);
        $cellphone = $cellphoneQuery->first();

        if (!$cellphone) {
            $doctor->cellphones = (object) [
                'uuid' => '',
                'number' => '',
                'description' => '',
                'user_id' => '',
            ];
        } else {
            $doctor->cellphones = $cellphone;
        }

        if (!$address) {
            $doctor->address = (object) [
                'street_address' => '',
                'house_number' => '',
                'address_line_2' => '',
                'neighborhood' => '',
                'postal_code' => '',
                'city_uuid' => '',
                'city_name' => '',
                'state_uuid' => '',
                'state_name' => '',
                'state_code' => '',
                'state_ibge_code' => '',
                'state_ddd' => '',
            ];
        } else {
            $doctor->address = $address;
        }

        if (!$doctor) {
            throw new NotFoundException("Doctor with uuid $uuid not found.");
        }

        return $doctor;
    }

    /**
     * @param array $parameters
     * @return LengthAwarePaginator
     */
    public function paginate(array $parameters): LengthAwarePaginator
    {
        $query = Doctor::query()->join('users', 'doctors.user_id', '=', 'users.id')
            ->select('doctors.uuid', 'users.name', 'users.cpf', 'users.email',
                'doctors.crm', 'doctors.created_at');

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
                            $table = in_array($parameter, $patientBlackList) ? 'users' : 'doctors';

                            $query->whereRaw("$table.$parameter LIKE '$searchValue%'");
                        });
                }
            }
        }

        return $query;
    }

    //Realiza a consulta no Banco de Dados buscando a agenda de x médico por sua id
    public function getAgendaByID(string $id): Collection
    {
        if (!Agenda::query()->where('id', $id)->exists()) {
            throw new NotFoundException("Agenda with id $id not found.");
        }

        return Agenda::query()
                ->select('agendas.id', 'doctors_users.name as doctor_name', 'patients_users.name as patient_name', 'agendas.session_date')
                ->join('doctors', 'agendas.doctor_id', '=', 'doctors.id')
                ->join('users as doctors_users', 'doctors.user_id', '=', 'doctors_users.id')
                ->join('patients', 'agendas.patient_id', '=', 'patients.id')
                ->join('users as patients_users', 'patients.user_id', '=', 'patients_users.id')
                ->where('agendas.doctor_id', $id)
                ->get();
    }

    public function insert(CreateDoctorDTO $dto): Doctor
    {
        if (!$city = City::query()->where('uuid', $dto->address['city_uuid'])->first()) {
            throw new NotFoundException("City with uuid {$dto->address['city_uuid']} not found.");
        }

        $user = User::query()->create([
            'uuid' => Uuid::uuid4(),
            'name' => $dto->doctor['name'],
            'cpf' => $dto->doctor['cpf'],
            'email' => $dto->doctor['email'],
            'password' => $dto->doctor['password']
        ]);

        $doctor = Doctor::query()->create([
            'uuid' => Uuid::uuid4(),
            'name' => $dto->doctor['name'],
            'crm' => $dto->doctor['crm'],
            'rg' => $dto->doctor['rg'],
            'birth_date' => $dto->doctor['birth_date'],
            'user_id' => $user->id
        ]);

        $address = Address::query()->create([
            'uuid' => Uuid::uuid4(),
            'user_id' => $user->id,
            'street_address' => $dto->address['street_address'],
            'house_number' => $dto->address['house_number'],
            'address_line_2' => $dto->address['address_line_2'],
            'neighborhood' => $dto->address['neighborhood'],
            'postal_code' => $dto->address['postal_code'],
            'city_id' => $city->id
        ]);

        foreach ($dto->cellphones as $cellphone) {
            $doctor->cellphones()->create([
                'uuid' => Uuid::uuid4(),
                'number' => $cellphone['number'],
                'description' => $cellphone['number'],
                'is_primary' => $cellphone['is_primary']
            ]);
        }

        return $doctor;
    }

    public function destroy(string $uuid): bool
    {
        if (!$doctor = Doctor::query()->where('uuid', $uuid)->first()) {
            throw new NotFoundException("Doctor with uuid $uuid not found");
        }

        $user = $doctor->user();

        return $user->delete();
    }

    public function update(UpdateDoctorDTO $dto): ?Doctor
    {
        if (!$doctor = doctor::query()->where('uuid', $dto->doctorUuid)->first()) {
            throw new NotFoundException("Doctor with uuid {$dto->doctorUuid} not found.");
        }

        DB::beginTransaction();

        $state = $doctor->update([
            'crm' => $dto->doctor['crm'],
            'rg' => $dto->doctor['rg'],
            'birth_date' => $dto->doctor['birth_date']
        ]);

        if (!$state) {
            DB::rollBack();
            return null;
        }

        $state = $doctor->user()->update([
            'name' => $dto->doctor['name'],
            'cpf' => $dto->doctor['cpf'],
            'email' => $dto->doctor['email']
        ]);

        if (!$state) {
            DB::rollBack();
            return null;
        }

        if (!$city = City::query()->where('uuid', $dto->address['city_uuid'])->first()) {
            throw new NotFoundException("City with uuid {$dto->address['city_uuid']} not found.");
        }

        $state = $doctor->address()->update([
            'street_address' => $dto->address['street_address'],
            'house_number' => $dto->address['house_number'],
            'address_line_2' => $dto->address['address_line_2'],
            'neighborhood' => $dto->address['neighborhood'],
            'postal_code' => $dto->address['postal_code'],
            'city_id' => $city->id,
        ]);

        if (!$state) {
            DB::rollBack();
            throw new NotFoundException("Doctor with uuid {$dto->doctorUuid} not updated.");
            return null;
        }

        $doctor->cellphones()->delete();

        foreach ($dto->cellphones as $cellphone) {
            $doctor->cellphones()->create([
                'uuid' => Uuid::uuid4(),
                'number' => $cellphone['number'],
                'description' => $cellphone['number'],
                'is_primary' => $cellphone['is_primary']
            ]);
        }

        DB::commit();
        $doctor->refresh();

        return $doctor;
    }
}
