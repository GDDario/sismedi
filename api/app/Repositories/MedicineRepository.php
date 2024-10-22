<?php

namespace App\Repositories;

use App\Models\Medicine;
use App\Models\Patient;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;

class MedicineRepository
{
    /**
     * @param array $parameters
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    public function paginate(array $parameters): LengthAwarePaginator
    {
        $query = Medicine::query()
            ->join('medicine_categories', 'medicines.category_id', '=', 'medicine_categories.id')
            ->select('medicines.uuid', 'medicines.name', 'medicines.quantity', 'medicines.expiration_date',
                'medicines.manufacturer', 'medicines.batch_number', 'medicine_categories.name as category');

        $query = $this->filterQueryByFields($query, $parameters);

        return $query->paginate($parameters['per_page'], ['*'], 'page', $parameters['page']);
    }

    private function filterQueryByFields(Builder $query, array $parameters): Builder
    {
        $blackList = ['offset', 'page', 'limit'];
        foreach ($parameters as $key => $parameter) {
            if (strlen($key) === 5 && str_starts_with($key, 'name') && !in_array($parameter, $blackList)) {
                $number = substr($key, 4, 5);

                if (array_key_exists("value$number", $parameters)) {
                    $searchValue = $parameters["value$number"];
                    $query = $query->whereRaw("medicines.$parameter LIKE '$searchValue%'");
                }
            }
        }

        return $query;
    }
}
