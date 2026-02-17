<?php

namespace App\Http\Controllers\ControllersAdm;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ModelsAdm\tb_mensagem as Mensagem;
use App\Models\ModelsUsuario\UsuarioModel as User;
use App\Events\Mensagens;
use Illuminate\Support\Facades\Log;

class chatsController extends Controller
{
    private $conversa;
    private $user;

    /**
     * Define ou cria o idConversa para um usuário.
     */
 private function idConversa()
{
    $adminId = auth('admin')->user()->idAdm;
    
    Log::info('🔍 [idConversa] INÍCIO', [
        'admin_id' => $adminId,
        'user_id' => $this->user,
    ]);
    
    // Busca conversa existente
    $sql = Mensagem::where('idAdm', $adminId)
        ->where('idUsers', $this->user)
        ->whereNotNull('idConversa')
        ->orderBy('idMensagem', 'desc')
        ->toSql();
        
    Log::info('📋 SQL Busca conversa existente:', ['sql' => $sql]);
    
    $mensagem = Mensagem::where('idAdm', $adminId)
        ->where('idUsers', $this->user)
        ->whereNotNull('idConversa')
        ->orderBy('idMensagem', 'desc')
        ->first();
    
    if ($mensagem) {
        Log::info('✅ CONVERSA EXISTENTE ENCONTRADA', [
            'id_mensagem' => $mensagem->idMensagem,
            'id_conversa' => $mensagem->idConversa,
            'admin_id' => $mensagem->idAdm,
            'user_id' => $mensagem->idUsers,
            'created_at' => $mensagem->created_at,
            'full_record' => $mensagem->toArray()
        ]);
        
        $this->conversa = $mensagem->idConversa;
    } else {
        Log::warning('⚠️ NENHUMA CONVERSA EXISTENTE');
        
        // Gera timestamp único para nova conversa
        $microtime = microtime(true);
        $this->conversa = (int) ($microtime * 1000);
        
        Log::info('🆔 NOVO ID GERADO', [
            'microtime' => $microtime,
            'id_conversa' => $this->conversa,
            'timestamp' => now()->toDateTimeString()
        ]);
        
        // DEBUG: Verifica mensagens sem conversa antes de atualizar
        $mensagensSemConversa = Mensagem::where('idUsers', $this->user)
            ->where('idAdm', $adminId)
            ->whereNull('idConversa')
            ->get();
            
        Log::info('📝 MENSAGENS SEM CONVERSA PARA ATUALIZAR', [
            'count' => $mensagensSemConversa->count(),
            'ids' => $mensagensSemConversa->pluck('idMensagem')->toArray()
        ]);
        
        // Atualiza mensagens sem conversa do admin atual
        $atualizadas = Mensagem::where('idUsers', $this->user)
            ->where('idAdm', $adminId)
            ->whereNull('idConversa')
            ->update(['idConversa' => $this->conversa]);
            
        Log::info('✅ MENSAGENS ATUALIZADAS', ['count' => $atualizadas]);
        
        // DEBUG: Verifica mensagens de outros admins antes de deletar
        $mensagensOutrosAdmins = Mensagem::where('idUsers', $this->user)
            ->where('idAdm', '!=', $adminId)
            ->whereNull('idConversa')
            ->get();
            
        Log::info('🗑️ MENSAGENS DE OUTROS ADMINS PARA DELETAR', [
            'count' => $mensagensOutrosAdmins->count(),
            'admin_ids' => $mensagensOutrosAdmins->pluck('idAdm')->unique()->toArray(),
            'mensagem_ids' => $mensagensOutrosAdmins->pluck('idMensagem')->toArray()
        ]);
        
        // Deleta mensagens sem conversa de outros admins
        $deletadas = Mensagem::where('idUsers', $this->user)
            ->where('idAdm', '!=', $adminId)
            ->whereNull('idConversa')
            ->delete();
            
        Log::info('✅ MENSAGENS DELETADAS', ['count' => $deletadas]);
    }
    
    Log::info('🏁 [idConversa] FIM', [
        'id_conversa_final' => $this->conversa,
        'memory_usage' => round(memory_get_usage() / 1024 / 1024, 2) . 'MB'
    ]);
    
    return $this->conversa;
}
    /**
     * Envia uma mensagem do admin para o usuário.
     */
    public function enviar(Request $request)
    {
        $request->validate([
            'mensagem' => 'required|string',
            'idUsers' => 'required|integer'
        ]);

        $this->user = $request->idUsers;

        $this->idConversa();

        Mensagem::where('idConversa', $this->conversa)
            ->where('enviante','user')
            ->update(['notificacao' => 1]);

        $mensagem = Mensagem::create([
            'idConversa' => $this->conversa,
            'idUsers' => $this->user,
            'idAdm' => auth('admin')->user()->idAdm,
            'mensagens' => $request->mensagem,
            'enviante' => 'adm',
            'status' => 'privada',
            'notificacao' => 0,
        ]);

        broadcast(new Mensagens($mensagem))->toOthers();

        return response()->json([
            'status' => 'ok',
            'mensagem' => $mensagem
        ]);
    }

    public function conversa()
    {
        $mensagens = Mensagem::where('idAdm', auth('admin')->user()->idAdm)
            ->orderBy('created_at', 'ASC')
            ->get()
            ->groupBy('idUsers');

        $userIds = $mensagens->keys()->toArray();

        $usuarios = User::whereIn('idUsers', $userIds)
            ->get()
            ->keyBy('idUsers');

        $abertas = [];
        $finalizadas = [];

        foreach ($mensagens as $idUser => $msgs) {
            $ultimoStatus = $msgs->last()->status;

            if (!isset($usuarios[$idUser])) {
                continue; // ignora usuários que não existem mais
            }

            $user = $usuarios[$idUser];

            if ($ultimoStatus === 'finalizada') {
                $finalizadas[] = $user;
            } else {
                $abertas[] = $user;
            }
        }

        return response()->json([
            'status' => 'ok',
            'abertas' => $abertas,
            'finalizadas' => $finalizadas
        ]);
    }

    /**
     * Retorna todas as mensagens de uma conversa específica.
     */
    public function getConversa($userId)
    {
        try {
            $this->user = $userId;

            $usuario = User::find($this->user);
            if (!$usuario) {
                return response()->json([
                    'status' => 'erro',
                    'mensagem' => 'Usuário não encontrado.'
                ], 404);
            }

            $mensagens = Mensagem::where('idAdm', auth('admin')->user()->idAdm)
                ->where('idUsers', $usuario->idUsers)
                ->orderBy('created_at', 'ASC')
                ->get();

            return response()->json([
                'status' => 'ok',
                'mensagens' => $mensagens
            ]);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'erro',
                'mensagem' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Finaliza a última conversa de um usuário.
     */
    public function finalizar(Request $request)
    {
        try {
            $request->validate([
                'idUsers' => 'required|integer'
            ]);

            $idUsers = $request->idUsers;

            $ultimaMsg = Mensagem::where('idAdm', auth('admin')->user()->idAdm)
                ->where('idUsers', $idUsers)
                ->whereNotNull('idConversa')
                ->orderBy('idMensagem', 'desc')
                ->first();

            if (!$ultimaMsg) {
                return response()->json([
                    'status' => 'erro',
                    'mensagem' => 'Nenhuma conversa encontrada para este usuário.'
                ], 404);
            }

            $idConversa = $ultimaMsg->idConversa;

            // Atualiza todas as mensagens da conversa para 'finalizada'
            Mensagem::where('idConversa', $idConversa)
                ->update(['status' => 'finalizada']);

            return response()->json([
                'status' => 'ok',
                'mensagem' => 'Conversa finalizada com sucesso.',
                'idConversa' => $idConversa
            ]);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'erro',
                'mensagem' => $th->getMessage()
            ], 500);
        }
    }
}