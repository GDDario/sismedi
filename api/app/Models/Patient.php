<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as UserAlias;

/**
 * @extends
 */
class Patient extends UserAlias
{
    use HasFactory;

    protected $fillable = [
        'uuid',
        'cns',
        'user_id',
        'created_at',
        'updated_at',
        'deleted_at'
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function address(): HasOne
    {
        return $this->hasOne(Address::class);
    }

    public function cellphones(): HasMany
    {
        return $this->hasMany(Cellphone::class);
    }
}
