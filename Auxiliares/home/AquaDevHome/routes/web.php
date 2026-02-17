<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContatoController;

Route::get('/', function () {
    return view('index');
});

Route::post('/enviar', [ContatoController::class, 'enviar'])->name('contato.enviar');
