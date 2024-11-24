<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'uuid',
        'name',
        'email',
        'cpf',
        'email_verified_at',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'id',
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'created_at' => 'datetime',
            'updated_at' => 'datetime'
        ];
    }

    public function patient()
    {
        return $this->hasOne(Patient::class);
    }

    public function doctor()
    {
        return $this->hasOne(Doctor::class);
    }

    public function assistant()
    {
        return $this->hasOne(Assistant::class);
    }

    public function isPatient(): bool
    {
        return $this->patient()->exists();
    }

    public function isDoctor(): bool
    {
        return $this->doctor()->exists();
    }

    public function isAssistant(): bool
    {
        return $this->assistant()->exists();
    }

    public function getUserType(): string
    {
        if ($this->isPatient()) {
            return 'patient';
        }

        if ($this->isDoctor()) {
            return 'doctor';
        }

        if ($this->isAssistant()) {
            return 'assistant';
        }

        return 'unknown';
    }
}
