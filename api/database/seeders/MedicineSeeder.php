<?php

namespace Database\Seeders;

use App\Models\Medicine;
use App\Models\MedicineCategory;
use App\Models\State;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MedicineSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $file = file_get_contents(database_path() . '/json/medicines.json');
        $jsonArray = json_decode($file, true);

        foreach ($jsonArray as $medicineData) {
            Medicine::factory()->create([
                'uuid' => $medicineData['uuid'],
                'name' => $medicineData['name'],
                'dosage' => $medicineData['dosage'],
                'concentration' => $medicineData['concentration'],
                'quantity' => $medicineData['quantity'],
                'expiration_date' => $medicineData['expiration_date'],
                'manufacturer' => $medicineData['manufacturer'],
                'batch_number' => $medicineData['batch_number'],
                'price' => $medicineData['price'],
                'category_id' => MedicineCategory::query()->where('name', $medicineData['category'])->first()->id,
                'description' => $medicineData['description']
            ]);
        }
    }
}
