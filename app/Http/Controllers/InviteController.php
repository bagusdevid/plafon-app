<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class InviteController extends Controller
{
    public function index()
    {
        $data['ref_url'] = url('/') . '?referralCode=' . Auth::user()['referral_code'];
        return inertia('Invite/Main', $data);
    }
}
