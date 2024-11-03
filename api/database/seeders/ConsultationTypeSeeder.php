<?php

namespace Database\Seeders;

use App\Models\ConsultationType;
use Illuminate\Database\Seeder;

class ConsultationTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $typesMap = [
            [
                'name' => 'Primeira consulta',
                'description' => 'Para novos pacientes, geralmente para triagem.'
            ],
            [
                'name' => 'Retorno',
                'description' => 'Para pacientes que precisam retornar logo após um tempo depois de uma primeira
                consulta, ou para monitorar o progresso do tratamento.'
            ],
            [
                'name' => 'Urgente',
                'description' => 'Para pacientes que precisam urgentemente de uma consulta.'
            ],
            [
                'name' => 'Renovação',
                'description' => 'Para pacientes que precisam apenas renovar seus medicamentos.'
            ]
        ];

        foreach ($typesMap as $type) {
            ConsultationType::factory()->create([
                'name' => $type['name'],
                'description' => $type['description']
            ]);
        }
    }
}
