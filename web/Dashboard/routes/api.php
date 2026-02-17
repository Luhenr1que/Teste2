<?php

use App\Http\Controllers\ControllersAdm\AdminController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Log;

Route::post('/cadastrar', [AdminController::class, 'cadastrar']);

// No arquivo de rotas do backend 8003
Route::get('/uploads/campanhas/{filename}', function ($filename) {
    $path = storage_path('app/public/uploads/campanhas/' . $filename);

    if (!file_exists($path)) {
        abort(404, 'Arquivo não encontrado');
    }

    // Garante o tipo MIME correto
    $type = mime_content_type($path);

    return Response::stream(function () use ($path) {
        $stream = fopen($path, 'rb');
        fpassthru($stream);
        fclose($stream);
    }, 200, [
        'Content-Type' => $type,
        'Cache-Control' => 'public, max-age=31536000',
        'Accept-Ranges' => 'bytes',
        'Content-Length' => filesize($path),
    ]);
});
