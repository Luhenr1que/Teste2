<?php

namespace App\Http\Controllers;

use App\Models\Ong; 
use App\Models\Campanha;
use Illuminate\Http\Request;

class CampanhaController extends Controller
{
    public function index($idOng)
    {
        $campanhas = Campanha::where('idOng', $idOng)
            ->where('statusCampanha', 'ativa')
            ->get()
            ->map(function($campanha) {
                if ($campanha->cartazCampanha) {
                    $campanha->cartazCampanha = $campanha->cartazCampanha;
                }
                return $campanha;
            });

        return response()->json($campanhas);
    }
}