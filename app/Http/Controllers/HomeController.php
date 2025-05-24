<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Faker\Factory as Faker;
use App\Http\Controllers\AuthController;

class HomeController extends Controller
{
    public function index()
    {
        $site_id = (new AuthController())->getSiteId();
        $data['tasks'] = Task::where('site_id', $site_id)
            ->with('site')->has('site')
            ->with('options')
            ->get()
            ->map(function ($item) {
                $photos = explode('.', $item->photo);
                $item->photo_path = env('APP_MNG_URL') . '/storage/tasks/' . $photos[0] . '.' . $photos[1];
                $item->photo_thumb_path = env('APP_MNG_URL') . '/storage/tasks/' . $photos[0] . '_thumb.' . $photos[1];
                $item->photo_300_path = env('APP_MNG_URL') . '/storage/tasks/' . $photos[0] . '_std.' . $photos[1];
                return $item;
            });

        return inertia('Home', $data);
    }

    public function indexOld()
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
