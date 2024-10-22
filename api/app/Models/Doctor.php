<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Doctor extends Model
{
    use HasFactory;

    protected $fillable = [
        'uuid',
        'CRM',
        'user_id',
    ];

    public $incrementing = false; // Se estiver usando UUID

    protected static function boot()
    {
        parent::boot();

        // Gera UUID automaticamente ao criar um novo registro
        static::creating(function ($model) {
            $model->uuid = (string) \Illuminate\Support\Str::uuid();
        });
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
