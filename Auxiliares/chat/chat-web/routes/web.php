<?php

use App\Http\Controllers\chatsController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/a', function () {
    return view('welcome');
});

Route::get('/', function(){
    return view('chat-web');
});

Route::post('/enviar',[chatsController::class, 'enviar']);
Route::post('/editar/{idMensagem}',[chatsController::class, 'editar']);
Route::post('/apagar/{idMensagem}',[chatsController::class, 'delete']);
Route::get('/render/{user}',[chatsController::class, 'getConversa']);