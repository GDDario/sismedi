<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Agenda extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'uuid',
        'patient_id',
        'doctor_id',
        'session_date',
        'obs',
        'craeted_at',
        'updated_at'
    ];

    public function agenda(): BelongsTo
    {
        return $this->belongsTo(Agenda::class);
    }
}
