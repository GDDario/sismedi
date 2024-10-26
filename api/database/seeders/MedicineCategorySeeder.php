<?php

namespace Database\Seeders;

use App\Models\MedicineCategory;
use Illuminate\Database\Seeder;

class MedicineCategorySeeder extends Seeder
{
    const DEFAULT_CATEGORIES = [
        'Analgesics',
        'Antibiotics',
        'Antifungals',
        'Antivirals',
        'Antihistamines',
        'Antacids',
        'Anticoagulants',
        'Antidepressants',
        'Antidiabetics',
        'Antiepileptics',
        'Antihypertensives',
        'Anti-inflammatory',
        'Antimicrobials',
        'Antiparasitics',
        'Antipsychotics',
        'Antirheumatics',
        'Antiseptics',
        'Antispasmodics',
        'Anxiolytics',
        'Beta-blockers',
        'Bronchodilators',
        'Calcium channel blockers',
        'Corticosteroids',
        'Diuretics',
        'Expectorants',
        'Hormonal contraceptives',
        'Immunosuppressants',
        'Laxatives',
        'Muscle relaxants',
        'Nonsteroidal anti-inflammatory drugs (NSAIDs)',
        'Opioid analgesics',
        'Proton pump inhibitors',
        'Sedatives',
        'Statins',
        'Thyroid medications',
        'Vasodilators',
        'Vitamins and minerals',
        'Antiemetics',
        'Hypoglycemics',
        'Antiglaucoma',
        'Decongestants',
        'Dermatologicals',
        'Digestive enzymes',
        'Electrolyte solutions',
        'Fibrinolytics',
        'Hemostatics',
        'Nootropics',
        'Ophthalmic preparations',
        'Otic preparations',
        'Psychostimulants',
        'Smoking cessation aids',
        'Topical anesthetics',
        'Uterotonics'
    ];

    public function run(): void
    {
        foreach (self::DEFAULT_CATEGORIES as $category) {
            MedicineCategory::factory()->create(['name' => $category]);
        }
    }
}
