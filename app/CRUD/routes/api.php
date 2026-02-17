<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Response;
use App\Http\Controllers\NoticiaController;
use App\Http\Controllers\RegistroController;
use App\Http\Controllers\OngController;
use App\Http\Controllers\CampanhaController;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\ChatController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Registro
Route::get('/Registro', [RegistroController::class, 'index']);
Route::get('/Registro/{id}', [RegistroController::class, 'show']);
Route::post('/Registro', [RegistroController::class, 'store']);
Route::put('/Registro/{idUsers}/documentos', [RegistroController::class, 'updateDocuments']);
Route::put('/Registro/{idUsers}/endereco', [RegistroController::class, 'updateEndereco']);
Route::put('/Registro/{email}/{senhaAtual}', [RegistroController::class, 'update']);
Route::post('/Verificar/{email}/{senhaAtual}', [RegistroController::class, 'verificarConta']);
Route::put('/atualizarP/{id}', [RegistroController::class,'AtualizarP']);
Route::put('/atualizarSenha/{id}', [RegistroController::class, 'atualizarSenha']);
Route::post('/upload-foto', [RegistroController::class, 'uploadFoto']);
Route::post('/email', [RegistroController::class, 'email']);

// Notícias
Route::get('/Noticia', [NoticiaController::class, 'index']);

// Ong


// Campanhas
Route::get('/campanhas/{idOng}', [CampanhaController::class, 'index']);

Route::get('/uploads/campanhas/{filename}', function ($filename) {
    // Caminho correto para imagens de campanhas
    $path = storage_path('app/public/uploads/campanhas/' . $filename);
    
    Log::info("Tentando carregar imagem: " . $path);

    if (!file_exists($path)) {
        Log::error("Imagem não encontrada: " . $path);
        abort(404, 'Arquivo não encontrado: ' . $filename);
    }

    $file = file_get_contents($path);
    $type = mime_content_type($path);

    return Response::make($file, 200, [
        'Content-Type' => $type,
        'Content-Length' => filesize($path),
        'Cache-Control' => 'public, max-age=31536000'
    ]);
})->where('filename', '.*');

Route::post('/EnviarMensagem', [ChatController::class, 'enviarMensagem']);

Route::get('/PegarMensagem', [ChatController::class, 'getMessages']);

Route::get('/Notificacao', [ChatController::class, 'notificacao']);