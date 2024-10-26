<?php

namespace App\Repositories;

use App\DTO\CreateMedicineDTO;
use App\DTO\UpdateMedicineDTO;
use App\Exceptions\NotFoundException;
use App\Models\Medicine;
use App\Models\MedicineCategory;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Ramsey\Uuid\Uuid;

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

    /**
     * @throws NotFoundException
     */
    public function findByUuid(string $uuid)
    {
        if (!Medicine::query()->where('uuid', $uuid)->exists()) {
            throw new NotFoundException("Patient with uuid $uuid not found.");
        }

        $medicine = Medicine::query()->where('uuid', $uuid)
            ->with('category')->get();

        return $medicine->toArray();
    }

    /**
     * @throws NotFoundException
     */
    public function insert(CreateMedicineDTO $dto): ?Medicine
    {
        if (!$category = MedicineCategory::query()->where('uuid', $dto->categoryUuid)->first()) {
            throw new NotFoundException("Medicine category with uuid {$dto->categoryUuid} not found.");
        }

        $medicine = Medicine::query()->create([
            'uuid' => Uuid::uuid4(),
            'name' => $dto->name,
            'quantity' => $dto->quantity,
            'dosage' => $dto->dosage,
            'concentration' => $dto->concentration,
            'expiration_date' => $dto->expirationDate,
            'manufacturer' => $dto->manufacturer,
            'batch_number' => $dto->batchNumber,
            'price' => $dto->price,
            'category_id' => $category->id,
            'prescription' => $dto->prescription,
            'description' => $dto->description
        ]);
        $medicine->refresh();

        return Medicine::query()->where('id', $medicine->id)->with('category')->first();
    }

    /**
     * @throws NotFoundException
     */
    public function update(UpdateMedicineDTO $dto): ?Medicine
    {
        if (!$category = MedicineCategory::query()->where('uuid', $dto->categoryUuid)->first()) {
            throw new NotFoundException("Medicine with uuid {$dto->categoryUuid} not found.");
        }

        if (!$medicine = Medicine::query()->where('uuid', $dto->uuid)->first()) {
            throw new NotFoundException("Medicine with uuid {$dto->uuid} not found.");
        }

        $medicine->update([
            'name' => $dto->name,
            'quantity' => $dto->quantity,
            'dosage' => $dto->dosage,
            'concentration' => $dto->concentration,
            'expiration_date' => $dto->expirationDate,
            'manufacturer' => $dto->manufacturer,
            'batch_number' => $dto->batchNumber,
            'price' => $dto->price,
            'category_id' => $category->id,
            'prescription' => $dto->prescription,
            'description' => $dto->description
        ]);
        $medicine->refresh();

        return Medicine::query()->where('id', $medicine->id)->with('category')->first();
    }

    /**
     * @throws NotFoundException
     */
    public function destroy(string $uuid): bool {
        if (!$medicine = Medicine::query()->where('uuid', $uuid)->first()) {
            throw new NotFoundException("Medicine with uuid $uuid not found.");
        }

        return $medicine->delete();
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
