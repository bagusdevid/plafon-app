<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ManagementBank extends Model
{
    use HasFactory;

    protected $table = 'management_banks';

    protected $fillable = [
        'bank_name',
        'bank_acc_name',
        'bank_acc_no',
        'created_by'
    ];
}
