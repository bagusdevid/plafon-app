<?php

namespace App\Http\Controllers;

use App\Models\SheepBank;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class WithdrawController extends Controller
{
    public function index()
    {
        $data['bank'] = SheepBank::where('sheep_id', Auth::user()['id'])
            ->get()
            ->first();

        return inertia('Withdraw/Main', $data);
    }
}
