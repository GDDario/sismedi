<?php

namespace App\Services;

use App\Models\Patient;
use App\Util\PaginationUtil;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Response;

class PatientService
{
    public function list(array $parameters): Response
    {
        $patients = $this->getPatients($parameters);

        return new Response($patients, Response::HTTP_OK);
    }

    private function getPatients(array $parameters): array
    {
        $query = Patient::query()->join('users', 'patients.user_id', '=', 'users.id')
            ->select('patients.uuid', 'users.name', 'users.cpf', 'users.email',
                'patients.cns', 'patients.created_at');

        $query = $this->filterQueryByFields($query, $parameters);
        $paginator = $query->paginate($parameters['per_page'], ['*'], 'page', $parameters['page']);

        return PaginationUtil::extractData($paginator);
    }

    private function filterQueryByFields(Builder $query, array $parameters): Builder
    {
        $blackList = ['offset', 'page', 'limit'];

        foreach ($parameters as $key => $parameter) {
            if (strlen($key) === 5 && str_starts_with($key, 'name') && !in_array($parameter, $blackList)) {
                $number = substr($key, 4, 5);

                if (array_key_exists("value$number", $parameters)) {
                    $query = $query->whereHas('user', function ($query) use ($parameter, $parameters, $number) {
                        $searchValue = $parameters["value$number"];
                        $query->whereRaw("$parameter LIKE '$searchValue%'");
                    });
                }
            }
        }

        return $query;
    }
}
