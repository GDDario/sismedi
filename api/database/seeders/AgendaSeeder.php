<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Agenda;

class AgendaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        Agenda::factory()->count(10)->create();
    }
}
