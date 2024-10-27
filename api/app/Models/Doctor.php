<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Model;

class Doctor extends Model
{
    use HasFactory;

    protected $fillable = [
        'uuid',
        'crm',
        'rg',
        'birth_date',
        'user_id',
        'created_at',
        'updated_at',
        'deleted_at'
    ];

    public $incrementing = false;

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function cellphones(): HasMany
    {
        return $this->hasMany(Cellphone::class, 'user_id', 'id');
    }

    public function address(): HasOne
    {
        return $this->hasOne(Address::class, 'user_id', 'id');
    }
}
