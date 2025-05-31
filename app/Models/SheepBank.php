<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SheepBank extends Model
{
    use HasFactory;

    protected $table = 'sheep_bank';

    protected $fillable = [
        'sheep_id',
        'bank_name',
        'bank_acc_name',
        'bank_acc_no'
    ];
}
