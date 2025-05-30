<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Faker\Factory as Faker;
use Illuminate\Http\Request;

class WalletController extends Controller
{
    public function index()
    {
        $faker = Faker::create('id_ID');

        $lastTopup = [];
        $x = 0;
        while ($x < 30) {
            $lastTopup[] = [
                'name' => $faker->name,
                'amount' => $faker->randomElement($this->rupiahs()),
                'dt' => Carbon::parse($faker->dateTimeBetween('-1 week', '0 days'))->diffForHumans()
            ];
            $x++;
        }

        $data['lastTopup'] = $lastTopup;
        return inertia('Wallet/Main', $data);
    }

    private function rupiahs()
    {
        return [
            100000,
            125000,
            150000,
            200000,
            250000,
            300000,
            325000,
            350000,
            375000,
            400000,
            425000,
            450000,
            475000,
            500000,
            525000,
            550000,
            575000,
            600000,
            625000,
            650000,
            675000,
            700000,
            725000,
            750000,
            775000,
            800000,
            825000,
            850000,
            875000,
            900000,
            925000,
            950000,
            975000,
        ];
    }
}
