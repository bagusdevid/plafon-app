<?php

namespace App\Http\Controllers;

use App\Models\ManagementBank;
use BaconQrCode\Renderer\Image\SvgImageBackEnd;
use BaconQrCode\Renderer\ImageRenderer;
use BaconQrCode\Renderer\RendererStyle\RendererStyle;
use BaconQrCode\Writer;
use Illuminate\Http\Request;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class TopupController extends Controller
{
    public function index()
    {
        $text = 'Hello world';
        $renderer = new ImageRenderer(
            new RendererStyle(400),
            new SvgImageBackEnd()
        );
        $writer = new Writer($renderer);
        $data['qr'] = $writer->writeString($text);

//        dd($data['qr']);

        $data['banks'] = ManagementBank::orderBy('bank_name', 'ASC')
            ->get();

        return inertia('Topup/Main', $data);
    }
}
