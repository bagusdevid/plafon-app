<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class VipController extends Controller
{
    public function index()
    {
        return inertia('Vip/Main');
    }
}
