<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Faker\Factory as Faker;

class HomeController extends Controller
{
    public function index()
    {
        $faker = Faker::create('id_ID');

        $donaturs = [];
        $x = 0;
        while ($x < 30) {
            $donaturs[] = [
                'name' => $faker->name,
                'amount' => $faker->randomElement($this->rupiahs())
            ];
            $x++;
        }

        $data['donaturs'] = $donaturs;
//        $data['faker'] = $faker->name;
        return inertia('Home', $data);
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
