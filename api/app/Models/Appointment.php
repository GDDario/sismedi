<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    use HasFactory;

    protected $fillable = [
        'uuid',
        'patient_id',
        'patient_description',
        'patient_desired_date',
        'appointment_date',
        'doctor_id',
        'dctor_assigned_at',
        'canceled',
        'completed_at'
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => ' datetime'
    ];

    protected $hidden = [
        'id'
    ];

//    public function consultation(): HasOne {
//        return $this->hasOne(Consultation::class);
//    }
}
