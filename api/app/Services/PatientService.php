<?php

namespace App\Services;

use App\Exceptions\NotFoundException;
use App\Models\Patient;
use App\Repositories\PatientRepository;
use App\Util\PaginationUtil;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Response;
use Ramsey\Uuid\Uuid;

class PatientService
{
    public function __construct(
        private PatientRepository $repository
    )
    {

    }

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

    public function getByUuid(string $uuid): Response
    {
        try {
            if (!Uuid::isValid($uuid)) {
                return new Response(['message' => 'Invalid uuid'], 400);
            }

            $user = $this->repository->findByUuid($uuid);

            return new Response($user, Response::HTTP_OK);
        } catch (NotFoundException $exception) {
            return new Response(
                [
                    'message' => $exception->getMessage()
                ],
                404);
        }
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
