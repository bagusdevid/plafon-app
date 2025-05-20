<?php

namespace App\Models;

//use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Sheep extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $table = 'sheeps';

    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'photo'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
