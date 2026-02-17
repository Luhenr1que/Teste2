<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NoticiaController;
use App\Http\Controllers\UserController;

Route::get('/teste', function () {
    return response()->json(['status' => 'API ONLINE']);
});

Route::post('/receber-noticias', [UserController::class, 'receberNoticias']);