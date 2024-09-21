<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PasswordResetToken extends Model
{
    use HasFactory;

    protected $keyType = 'string';
    protected $primaryKey = 'email';

    public $timestamps = false;

    protected $fillable = [
        'email',
        'token',
        'created_at'
    ];
}
