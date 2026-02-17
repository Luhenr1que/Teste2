<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class RoutesController extends Controller
{
    public function index(Request $request)
    {
        $token = session('adm_token');

        $response = Http::withToken($token)
            ->get('http://localhost:8000/api/adm/perfil');

        if ($response->status() !== 200) {
            return redirect('/adm/login');
        }

        $adm = $response->json();
        return view('adm.dashboard', compact('adm'));
    }
}
