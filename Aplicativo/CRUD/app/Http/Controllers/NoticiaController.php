<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Noticia;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;

class NoticiaController extends Controller
{
        public function index()
    {
        $noticias = Noticia::where('StatusNoticia', 'ativa')
            ->orderBy('idNoticia', 'desc')
            ->get();

        return response()->json($noticias);

    }
}