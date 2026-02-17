<?php

namespace App\Http\Controllers;

use App\Models\adm;
use App\Models\tb_mensagem as Message;
use App\Models\user;
use App\Events\Mensagens;
use Error;
use Illuminate\Http\Request;
use SebastianBergmann\Environment\Console;

class chatsController extends Controller
{   
    public function enviar(Request $request)
    {
        $request->validate([
            'mensagem' => 'required|string|'
        ]);

        $message = Message::create([
            'idUsers' => 1,
            'idAdm' => 1,
            'mensagens' => $request->mensagem,
            'enviante' => 'adm',
        ]);

        broadcast(new Mensagens($message))->toOthers();

        return response()->json([
            'status' => 'Mensagem enviada!',
            'mensagen' => $message
        ]);
    }

    public function delete($idMensagem)
    {
        try{
            $mensagem = Message::where('id', $idMensagem)->first();
    
             if (!$mensagem){
                return response()->json([
                    'status' => 'erro',
                    'mensagem' => 'Mensagem não encontrada'
                ], 404);
            }

            $mensagem->idUsers = 2;
            $mensagem->save();

            return response()->json([
                'status' => 'ok',
                'mensagem' => 'Mensagem apagada com sucesso!',
                'dados' => $mensagem
            ]);
        }catch(Error $erro){

        }
    } 

    public function editar($idMensagem, Request $request)
    {
        $request->validate([
            'atualizada' => 'required|string'
        ]);

        $mensagem = Message::where('id', $idMensagem)->first();

        if (!$mensagem) {
            return response()->json([
                'status' => 'erro',
                'mensagem' => 'Mensagem não encontrada'
            ], 404);
        }

        $mensagem->mensagens = $request->atualizada;
        $mensagem->save();

        return response()->json([
            'status' => 'ok',
            'mensagem' => 'Mensagem atualizada com sucesso!',
            'dados' => $mensagem
        ]);
    }


    public function getConversa($user)
    {
        try {
            $adm = adm::where('idAdm', 1)->first();
            $usuario = user::where('idUsers', $user)->first();

            $mensagens = Message::where('idAdm', $adm->idAdm)
                ->where('idUsers', $usuario->idUsers)
                ->orderBy('created_at', 'asc')
                ->get();

            return response()->json([
                'status' => 'ok',
                'mensagens' => $mensagens,
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'erro',
                'mensagem' => $th->getMessage()
            ], 500);
        }
    }
}