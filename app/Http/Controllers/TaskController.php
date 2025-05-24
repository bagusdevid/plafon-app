<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Carbon\Carbon;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index()
    {
        $data['code'] = fake()->regexify('[0-9]{6}');
        return inertia('Task/Main', $data);
    }

    public function detail(Request $request)
    {
        $year = Carbon::now()->format('Y');
        $month = Carbon::now()->format('m');
        $day = Carbon::now()->format('d');
        $data['code'] = $year . $month . $day . fake()->regexify('[0-9]{5}');
        $data['task'] = Task::where('id', $request->id)
            ->with('site')->has('site')
            ->with('options')
            ->get()
            ->map(function ($item) {
                $photos = explode('.', $item->photo);
                $item->photo_path = env('APP_MNG_URL') . '/storage/tasks/' . $photos[0] . '.' . $photos[1];
                $item->photo_thumb_path = env('APP_MNG_URL') . '/storage/tasks/' . $photos[0] . '_thumb.' . $photos[1];
                $item->photo_300_path = env('APP_MNG_URL') . '/storage/tasks/' . $photos[0] . '_std.' . $photos[1];

                if($item->thumbs_inside) {
                    $thumbs = explode(',', $item->thumbs_inside);
                    $tip = [];
                    for($i=0;$i<count($thumbs);$i++) {
                        $th = explode('.', $thumbs[$i]);
                        $tip[] = env('APP_MNG_URL') . '/storage/tasks/' . $th[0] . '_std.' . $th[1];
                    }
                    $item->thumbs_inside_path = $tip;
                } else {
                    $item->thumbs_inside_path = [];
                }

                return $item;
            })
            ->first();

        return inertia('Task/Inside', $data);
    }

    public function getTaskCode()
    {
        $year = Carbon::now()->format('Y');
        $month = Carbon::now()->format('m');
        $day = Carbon::now()->format('d');
        $code = $year . $month . $day . fake()->regexify('[0-9]{5}');

        return response()
            ->json([
                'results' => $code
            ]);
    }
}
