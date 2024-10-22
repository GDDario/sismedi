<?php

namespace Database\Seeders;

use App\Models\City;
use Illuminate\Database\Seeder;

class CitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $file = file_get_contents(database_path() . '/json/cities.json');
        $jsonArray = json_decode($file, true);

        foreach($jsonArray as $stateData) {
            City::factory()->create($stateData);
        }
    }
}
