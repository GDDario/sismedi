<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class MedicineCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'uuid',
        'name',
        'description'
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];

    protected $hidden = [
        'id'
    ];

    public function state(): BelongsToMany
    {
        return $this->belongsToMany(Medicine::class, 'medicine', 'category_id');
    }
}
