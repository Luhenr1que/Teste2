<?php

namespace App\Http\Controllers;

use App\Events\Evento;
use App\Models\ChatModel;
use Illuminate\Http\Request;
use App\Models\AdmModel;
use Illuminate\Support\Facades\Log;
use PgSql\Lob;


class ChatController extends Controller
{
    public $user;
    public $adm; 
  public function enviarMensagem(Request $request)
{
    try {
        $validated = $request->validate([
            'idUsers' => 'required|integer',
            'mensagens' => 'required|string',
            'enviante' => 'required|string', 
        ]);
       $procurarPrivado = ChatModel::where('idUsers', $validated['idUsers'])
                            ->where('status', 'privada')
                            ->pluck('idAdm'); 

                            
        $adm=$procurarPrivado;
      $idA = ChatModel::where('idUsers', $validated['idUsers'])
        ->where('enviante', 'adm')
        ->whereNotNull('idAdm')
        ->orderBy('idAdm', 'DESC')
        ->value('idAdm');



if ($idA !== null) {
    ChatModel::where('idAdm', $idA)
        ->where('idUsers', $validated['idUsers'])
        ->where('enviante', 'adm')
        ->update(['notificacao' => 1]);
}

        if($procurarPrivado->isNotEmpty()){

            $idAdmPrivado = $procurarPrivado->first();
            $idConversa =ChatModel::where('idUsers',$validated['idUsers'])
                        ->where('idAdm',$idA)
                        ->whereNotNull('idConversa')
                        ->value('idConversa')
            ; 

            $dadosMensagem = [
                'idUsers' => $validated['idUsers'],
                'idAdm' => $idAdmPrivado, 
                'mensagens' => $validated['mensagens'],
                'enviante' => $validated['enviante'],
                'notificacao'=>0,
                'idConversa'=>$idConversa, 
                'status' => 'privada' 
            ];
                
                $mensagem = ChatModel::create($dadosMensagem);
                $mensagens[] = $mensagem;
                
                broadcast(new Evento($mensagem, $procurarPrivado, $validated['enviante']))->toOthers();
                   Log::info('Deu certo Ricardo ');

             return response()->json([
                'success' => true,
                'message' => 'Mensagem enviada para todos os admins',
                'mensagens' => $mensagens,
                'idAdm'=>$idAdmPrivado,
            ]);
            

        } else {
            $admins = AdmModel::all();
            
            if ($admins->isEmpty()) {
                return response()->json([
                    'success' => false,
                    'error' => 'Nenhum administrador encontrado'
                ], 404);
            }

            $mensagens = [];

            foreach ($admins as $adm) {
                $dadosMensagem = [
                    'idUsers' => $validated['idUsers'],
                    'idAdm' => $adm->idAdm,
                    'mensagens' => $validated['mensagens'],
                    'enviante' => $validated['enviante'],
                    'notificacao'=>0,
                    'status' => 'publica' 
                ];
                
                $mensagem = ChatModel::create($dadosMensagem);
                $mensagens[] = $mensagem;
                
                broadcast(new Evento($mensagem, $adm->idAdm, $validated['enviante']))->toOthers();
            }

            return response()->json([
                'success' => true,
                'message' => 'Mensagem enviada para todos os admins',
                'mensagens' => $mensagens
            ]);
        }

    } catch(\Exception $e) {
        Log::error('❌ ERRO CRÍTICO ao enviar mensagem: ' . $e->getMessage());
        Log::error('Stack trace: ' . $e->getTraceAsString());
        
        return response()->json([
            'success' => false,
            'error' => 'Erro ao enviar mensagem: ' . $e->getMessage(),
            'debug' => 'Verifique os logs para mais detalhes'
        ], 500);
    }
}

    
public function getMessages(Request $request)
{
    $userId = $request->input('idUsers');
    $contactId = $request->input('idAdm');

    if (!$userId || !$contactId) {
        return response()->json([
            'success' => false,
            'error' => 'Parâmetros idUsers e idAdm são obrigatórios',
            'params_recebidos' => $request->all()
        ], 400);
    }

    $userId = (int)$userId;
    $contactId = (int)$contactId;

    try {
        $messages = ChatModel::where(function ($query) use ($userId, $contactId) {
                $query->where('idUsers', $userId)
                      ->where('idAdm', $contactId);
            })
            ->where('status', '!=', 'finalizada') 
            ->orderBy('created_at')
            ->get();

        $formattedMessages = $messages->map(function($msg) {
            return [
                'id' => $msg->id,
                'mensagens' => $msg->mensagens,
                'enviante' => $msg->enviante,
                'created_at' => $msg->created_at,
                'idUsers' => $msg->idUsers,
                'idAdm' => $msg->idAdm
            ];
        });

        return response()->json([
            'success' => true,
            'status' => 'ok',
            'mensagens' => $formattedMessages,
            'metadata' => [
                'total' => $messages->count()
            ],
            'nomeAdm' => AdmModel::where('idAdm', $contactId)->value('nomeAdm'),
            'statusConversa' => ChatModel::where('idUsers', $userId)
                ->where('idAdm', $contactId)
                ->latest('created_at')
                ->value('status') === 'finalizada'

        ]);

    } catch (\Exception $e) {
        Log::error('Erro ao buscar mensagens: ' . $e->getMessage());
        return response()->json([
            'success' => false,
            'error' => 'Erro ao buscar mensagens: ' . $e->getMessage()
        ], 500);
    }
}

public function notificacao(Request $request)
{
    try {
        Log::info('🎯 ========== INICIANDO notificacao() ==========');
        
        // 1. Log do request completo
        Log::info('📥 Request completo recebido:', [
            'all' => $request->all(),
            'query' => $request->query(),
            'url' => $request->fullUrl()
        ]);
        
        // 2. Extrai parâmetros
        $idUsers = $request->input('idUsers');
        $idAdm = $request->input('idAdm');
        
        Log::info('📊 Parâmetros extraídos:');
        Log::info('   idUsers: ' . ($idUsers ?? 'NULL'));
        Log::info('   idAdm: ' . ($idAdm ?? 'NULL'));
        
        // 3. Validação
        if (!$idUsers || !$idAdm) {
            Log::warning('❌ VALIDAÇÃO FALHOU: Parâmetros obrigatórios faltando!');
            Log::warning('   idUsers presente: ' . ($idUsers ? 'SIM' : 'NÃO'));
            Log::warning('   idAdm presente: ' . ($idAdm ? 'SIM' : 'NÃO'));
            
            return response()->json([
                'success' => false,
                'error' => 'Parâmetros idUsers e idAdm são obrigatórios',
                'exemplo_correto' => '/api/notificacao?idUsers=1&idAdm=1'
            ], 400);
        }
        
        Log::info('✅ VALIDAÇÃO: Parâmetros OK');
        
        // 4. Conversão para inteiro
        $idUsersInt = (int)$idUsers;
        $idAdmInt = (int)$idAdm;
        
        Log::info('🔢 Parâmetros convertidos para int:');
        Log::info('   idUsers: ' . $idUsers . ' → ' . $idUsersInt);
        Log::info('   idAdm: ' . $idAdm . ' → ' . $idAdmInt);
        
        // 5. Monta a query
        Log::info('🔍 Montando query SQL...');
        $query = ChatModel::where('idUsers', $idUsersInt)
            ->where('idAdm', $idAdmInt)
            ->where('enviante', 'adm')
            ->where('notificacao', 0);
        
        // Log da query SQL bruta
        $sql = $query->toSql();
        $bindings = $query->getBindings();
        
        Log::info('📝 Query SQL gerada:');
        Log::info('   SQL: ' . $sql);
        Log::info('   Bindings: ' . json_encode($bindings));
        
        // 6. Executa a contagem
        Log::info('⚡ Executando contagem...');
        $contagem = $query->count();
        
        Log::info('📊 Resultado da contagem:');
        Log::info('   Total mensagens ADM não lidas: ' . $contagem);
        
        // 7. Debug adicional: verifica dados da tabela
        Log::info('🔍 Debug adicional - verificando dados reais:');
        
        // Total de mensagens desta conversa
        $totalMensagens = ChatModel::where('idUsers', $idUsersInt)
            ->where('idAdm', $idAdmInt)
            ->count();
            
        Log::info('   Total mensagens nesta conversa: ' . $totalMensagens);
        
        // Distribuição por tipo
        $distribuicao = ChatModel::where('idUsers', $idUsersInt)
            ->where('idAdm', $idAdmInt)
            ->selectRaw('enviante, notificacao, COUNT(*) as total')
            ->groupBy('enviante', 'notificacao')
            ->get();
            
        Log::info('   Distribuição das mensagens:');
        foreach ($distribuicao as $item) {
            Log::info("     {$item->enviante} | notificacao={$item->notificacao} | total={$item->total}");
        }
        
        // 8. Prepara resposta
        $resposta = [
            'success' => true,
            'notificacao' => $contagem,
            'debug' => [
                'parametros_recebidos' => ['idUsers' => $idUsers, 'idAdm' => $idAdm],
                'parametros_convertidos' => ['idUsers' => $idUsersInt, 'idAdm' => $idAdmInt],
                'query_executada' => $sql,
                'query_bindings' => $bindings,
                'estatisticas' => [
                    'total_mensagens_conversa' => $totalMensagens,
                    'distribuicao' => $distribuicao->toArray()
                ]
            ]
        ];
        
        Log::info('✅ RESPOSTA preparada:');
        Log::info('   notificacao: ' . $contagem);
        
        return response()->json($resposta);
        
    } catch (\Exception $e) {
        Log::error('💥 ERRO CRÍTICO em notificacao():');
        Log::error('   Mensagem: ' . $e->getMessage());
        Log::error('   Arquivo: ' . $e->getFile());
        Log::error('   Linha: ' . $e->getLine());
        Log::error('   Trace completo:');
        Log::error($e->getTraceAsString());
        
        // Debug do request que causou o erro
        Log::error('📥 Request que causou erro:', $request->all());
        
        return response()->json([
            'success' => false,
            'error' => 'Erro interno no servidor',
            'message' => env('APP_DEBUG') ? $e->getMessage() : 'Entre em contato com o suporte',
            'timestamp' => now()->toDateTimeString()
        ], 500);
    }
}
}