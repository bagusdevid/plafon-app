<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaskPlayed extends Model
{
    use HasFactory;

    protected $table = 'task_played';

    protected $fillable = [
        'sheep_id',
        'task_id',
        'code',
        'bet',
        'bet_options',
        'total'
    ];
}
