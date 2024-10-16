<?php

namespace App\Repositories;

use App\Exceptions\NotFoundException;
use App\Models\Doctor;
use App\Models\Agenda;
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
        if (!Doctor::query()->where('uuid', $uuid)->exists()) {
            throw new NotFoundException("Doctor with uuid $uuid not found.");
        }

        $doctor = Doctor::query()
            ->join('users', 'doctors.user_id', '=', 'users.id')
            ->join('addresses', 'doctors.user_id', '=', 'addresses.patient_id')
            ->join('cities', 'addresses.city_id', '=', 'cities.id')
            ->join('states', 'cities.state_id', '=', 'states.id')
            ->select(
                'doctors.uuid', 'doctors.crm', 'doctors.created_at', 'doctors.updated_at',
                'users.name', 'users.email', 'users.cpf', 'users.email_verified_at',
                'addresses.street_address', 'addresses.house_number', 'addresses.address_line_2',
                'addresses.neighborhood', 'addresses.postal_code',
                'cities.uuid as city_uuid', 'cities.name as city_name', 'cities.ibge_code',
                'states.uuid as state_uuid', 'states.name as state_name', 'states.code as state_code',
                'states.ibge_code as state_ibge_code', 'states.ddd'
            )
            ->where('doctors.uuid', $uuid)
            ->first();

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
}
