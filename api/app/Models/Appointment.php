<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class Appointment extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'uuid',
        'patient_id',
        'consultation_type_id',
        'patient_description',
        'patient_desired_date',
        'appointment_date',
        'doctor_id',
        'doctor_assigned_at',
        'canceled',
        'canceled_reason',
        'completed_at',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'canceled' => 'bool'
    ];

    protected $hidden = [
        'id'
    ];

    public function patient(): HasOne
    {
        return $this->hasOne(Patient::class, 'id', 'patient_id');
    }

    public function doctor(): HasOne
    {
        return $this->hasOne(Doctor::class, 'id', 'doctor_id');
    }

    public function consultationType(): HasOne
    {
        return $this->hasOne(ConsultationType::class, 'id', 'consultation_type_id');
    }
}
