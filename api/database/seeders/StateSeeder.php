<?php

namespace Database\Seeders;

use App\Models\State;
use Illuminate\Database\Seeder;

class StateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $file = file_get_contents(database_path() . '/json/states.json');
        $jsonArray = json_decode($file, true);

        foreach($jsonArray as $stateData) {
            State::factory()->create($stateData);
        }
    }
}
