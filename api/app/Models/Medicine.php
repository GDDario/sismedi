<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Medicine extends Model
{
    use HasFactory;

    protected $fillable = [
        'uuid',
        'name',
        'dosage',
        'concentration',
        'quantity',
        'expiration_date',
        'manufacturer',
        'batch_number',
        'price',
        'category_id',
        'prescription',
        'description'
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];

    public function address(): HasOne
    {
        return $this->hasOne(MedicineCategory::class, 'category_id', 'id');
    }
}
