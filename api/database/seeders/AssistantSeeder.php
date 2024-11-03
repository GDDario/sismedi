<?php

namespace Database\Seeders;

use App\Models\Assistant;
use Illuminate\Database\Seeder;

class AssistantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Assistant::factory()->withUser([
            'email' => 'user@assistant.com',
            'name' => 'Jhin Doe',
            'cpf' => '64509859090'
        ])->create([
            'uuid' => 'e0e42710-af59-37c4-bdfd-031d6d4bcaa0',
            'level' => 1
        ]);

        Assistant::factory()->withUser()->create(['level' => 2]);
    }
}
