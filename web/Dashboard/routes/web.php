<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ControllersAdm\chatsController;
use App\Http\Controllers\ControllersAdm\AdminController;
use App\Http\Controllers\ControllersAdm\ControllerAdmOng;
use App\Http\Controllers\ControllersAdm\homeController;
use App\Http\Controllers\ControllersAdm\NoticiaController;
use App\Http\Controllers\PDFcontroller;
use App\Models\ModelsAdm\Admin;
use App\Mail\NovaSenhaAdm;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

/*
|--------------------------------------------------------------------------
| Pages de Adm
|--------------------------------------------------------------------------
*/


Route::get('/', function () {
    return view('adm.login');
})->name('admin.login');

// Rotas protegidas só para adms logados abaixo
Route::middleware('auth:admin')->group(function () {

    Route::get('/perfil-page', function () {
        return view('adm.perfilAdm');
    })->name('admin.perfil-page');

    Route::get('/senha-adm', function () {
        return view('adm.senhaAdm');
    })->name('admin.senha-page');

    Route::get('/suporte', function () {
        return view('adm.chat');
    })->name('admin.suporte');

    Route::get('/dashboard', [ControllerAdmOng::class, 'dashboard'])->name('admin.dashboard');

    //Aqui
    Route::post('/validar2.0', [AdminController::class, 'validarUp'])->name('admin.validar-up');
    Route::post('/up', [AdminController::class, 'up'])->name('admin.up');
    Route::get('/logout', [AdminController::class, 'logout'])->name('admin.logout');

    Route::get('/enviar-email', function () {
        for ($i = 0; $i < 6; $i++) {
            $code[$i] = random_int(0, 9);
        }

        Mail::to(Auth::guard('admin')->user()->emailAdm)->send(new NovaSenhaAdm($code));

        return redirect()->route('admin.senha-page')->with('code', $code);
    });

    Route::get('/usuarios', [homeController::class, 'mostrarUsuarios'])->name('admin.usuarios');
    Route::post('/VistoNotificacao', [homeController::class, 'notificacaoVer'])->name('admin.visto');
    Route::get('/situacao-noticia', [AdminController::class, 'index'])->name('admin.situacao-noticia');
    Route::get('/filtro-usuarios', [homeController::class, 'ajaxUsuarios'])->name('filtro-usuarios');
    Route::get('/chamar-usuario', [homeController::class, 'chamarUsuario'])->name('chamar-usuarios');
    Route::post('/update-usuario', [homeController::class, 'updateUsers'])->name('update-usuarios');
    Route::post('/excluit-usuario', [homeController::class, 'excluirUsuario'])->name('excluir-usuarios');
    Route::post('/update-senha', [AdminController::class, 'updateSenha'])->name('update-senha');
    Route::get('/foto-usuario', [homeController::class, 'fotoUsuario'])->name('foto-usuario');


    Route::post('/trocar-tema', [AdminController::class, 'trocarTema'])->name('admin.trocar-tema');
    Route::get('/get-tema', [AdminController::class, 'getTema'])->name('admin.get-tema');

    Route::get('/perfil-adm/{id}', [AdminController::class, 'idAdm'])->name('admin.perfil-id');
    Route::get('/aparencia-page', [AdminController::class, 'aparenciaPage'])->name('admin.aparencia-page');
    Route::post('/insert-noticia', [NoticiaController::class, 'criarNoticia'])->name('insert-noticia');
    Route::post('/insert-noticia-manual', [NoticiaController::class, 'criarNoticiaManual'])->name('insert-noticia-manual');

    /*Rotas de chat{*/
    Route::post('/enviar', [chatsController::class, 'enviar']);
    Route::post('/finalizar', [chatsController::class, 'finalizar']);
    Route::get('/conversa', [chatsController::class, 'conversa']);
    Route::get('/render/{user}', [chatsController::class, 'getConversa']);
    /*}Fim Chat*/

    /*Notificacao Mensagens{*/
        Route::get('/notificacao-mensagem', [homeController::class, 'notificacaoMensagem']);
    /*}Fim Notificacao Mensagens*/
});

Route::post('/validar', [AdminController::class, 'validarLogin'])->name('admin.validar');
Route::post('/logar', [AdminController::class, 'logar'])->name('admin.logar');



Route::get('visto-notiicacao', [homeController::class, 'notificacao']);

Route::get('/checar', [ControllerAdmOng::class, 'checar']);

Route::post('/update-perfil/{id}', 'App\Http\Controllers\Api\ControllersAdm\AdminController@atualizar');


Route::get('/filtro-noticia', [AdminController::class, 'ListaNoticia'])->name('admin.filtro-noticia');



Route::post('/update-Noticia', [ControllerAdmOng::class, 'situacaoNoticia'])->name('admin.update-noticia');



// } Fim das pages de Adm




Route::get('/p', function () {
    return view('adm.naoEntre');
})->name('admin.nao-entre');



Route::post('/xiii', 'App\Http\Controllers\proibido@store')->name('proibido.store');

Route::get('/gerar-pdf', [PDFcontroller::class, 'gerarPDF'])->name('gerar-pdf');
Route::get('/gerar-pdf-condicao', [PDFcontroller::class, 'PDFrefugiados'])->name('pdf-condicao');
Route::get('/gerar-pdf-paises', [PDFcontroller::class, 'PDFpaises'])->name('pdf-paises');
Route::get('/gerar-dashboard', [PDFcontroller::class, 'PDFdashboard'])->name('PDFdashboard');
