<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Address extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'uuid',
        'street_address',
        'house_number',
        'address_line_2',
        'neighborhood',
        'postal_code',
        'city_id',
        'patient_id'
    ];

    public function patient(): BelongsTo
    {
        return $this->belongsTo(Patient::class);
    }

    public function city(): BelongsTo
    {
        return $this->belongsTo(City::class);
    }
}
