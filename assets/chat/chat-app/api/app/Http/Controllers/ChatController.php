<?php

namespace App\Http\Controllers;

use App\Events\Evento;
use App\Models\ChatModel;
use Illuminate\Http\Request;
use App\Models\AdmModel;
use Illuminate\Support\Facades\Log;

class ChatController extends Controller
{
    public $user;
    public function enviarMensagem(Request $request)
    {
        $validated = $request->validate([
            'idUsers' => 'required|integer',
            'mensagem' => 'required|string',
            'enviante' => 'required|string', 
        ]);

        try {
            $admins = AdmModel::all();
            
            $mensagens = [];
            

            foreach ($admins as $adm) {
                
                
                $dadosMensagem = $validated;
                $dadosMensagem['idAdm'] = $adm->idAdm;
                
                $mensagem = ChatModel::create($dadosMensagem);
                $mensagens[] = $mensagem;
                
            
                broadcast(new Evento($mensagem, $adm->idAdm,$dadosMensagem['enviante']))->toOthers();
            }

            return response()->json([
                'success' => true,
                'message' => 'Mensagem enviada para todos os admins',
                'mensagens' => $mensagens
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => 'Erro ao enviar mensagem: ' . $e->getMessage()
            ], 500);
        }
    }
    

  
    
   
        public function getMessages(Request $request)
        {
            try {
                Log::info('=== INICIANDO GETMESSAGES ===');
              
                $userId = $request->input('idAdm');
                $contactId = $request->input('idUsers');
    
                Log::info('Parâmetros recebidos:', [
                    'userId' => $userId,
                    'contactId' => $contactId
                ]);
    
                // Validar parâmetros
                if (!$userId || !$contactId) {
                    return response()->json([
                        'status' => 'error',
                        'message' => 'Parâmetros idAdm e idUsers são obrigatórios'
                    ], 400);
                }
    
                // Buscar mensagens
                $mensagens = ChatModel::where(function ($query) use ($userId, $contactId) {
                    $query->where('idUsers', $userId)
                          ->where('idAdm', $contactId);
                })->orWhere(function ($query) use ($userId, $contactId) {
                    $query->where('idUsers', $contactId)
                          ->where('idAdm', $userId);
                })
                ->orderBy('created_at', 'asc')
                ->get();
    
                Log::info('Total de mensagens encontradas: ' . $mensagens->count());
    
                return response()->json([
                    'status' => 'ok',
                    'mensagens' => $mensagens,
                    'count' => $mensagens->count()
                ]);
    
            } catch (\Exception $e) {
                Log::error('ERRO em getMessages:', [
                    'message' => $e->getMessage(),
                    'file' => $e->getFile(),
                    'line' => $e->getLine()
                ]);
    
                return response()->json([
                    'status' => 'error',
                    'message' => 'Erro ao buscar mensagens'
                ], 500);
            }
        }
    }



