<?php

namespace App\Http\Controllers;

use App\Models\ManagementCS;
use Illuminate\Http\Request;

class CustomerServiceController extends Controller
{
    public function index()
    {
        $data['customer_service'] = ManagementCS::orderBy('account', 'ASC')
            ->get();

        return inertia('CustomerService/Main', $data);
    }
}
