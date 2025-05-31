<?php

namespace App\Http\Controllers;

use App\Models\ManagementBank;
use App\Models\Sheep;
use App\Models\SheepBank;
use Carbon\Carbon;
use Faker\Factory as Faker;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
        $data['bank'] = SheepBank::where('sheep_id', Auth::user()['id'])
            ->get()
            ->first();

        return inertia('Wallet/Main', $data);
    }

    public function addBank(Request $request)
    {
        if($request->isMethod('post')) {
            $request->validate([
                'bank_name' => ['required'],
                'bank_acc_name' => ['required'],
                'bank_acc_no' => ['required'],
            ]);

            SheepBank::create([
                'sheep_id' => Auth::user()['id'],
                'bank_name' => $request->bank_name,
                'bank_acc_no' => $request->bank_acc_no,
                'bank_acc_name' => $request->bank_acc_name,
            ]);

            return back()
                ->with('message', 'Data successfully added.');
        }
    }

    public function update(Request $request, SheepBank $sheepBank)
    {
        $request->validate([
            'bank_name' => ['required'],
            'bank_acc_name' => ['required'],
            'bank_acc_no' => ['required'],
        ]);

        $sheepBank::where('id', $request->id)
            ->update([
                'bank_name' => $request->bank_name,
                'bank_acc_no' => $request->bank_acc_no,
                'bank_acc_name' => $request->bank_acc_name
            ]);

        return back()
            ->with('message', 'Data berhasil diubah.');
    }

    public function destroyBank(SheepBank $sheepBank)
    {
        $sheepBank->delete();

        return back()
            ->with('message', 'Data successfully deleted.');
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
