<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Registro;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class NoticiaController extends Controller
{
     public function receberNoticias(Request $request)
    {
        // Log para debug
        Log::info('📥 Dados recebidos do bot:', $request->all());

        // Validação básica
        $validated = $request->validate([
            'tituloNoticia' => 'required|array|min:3',
            'descricoes' => 'required|array|min:3', 
            'links' => 'required|array|min:3',
            'imagem' => 'nullable|string'
        ]);

        try {
            DB::beginTransaction();

            // ✅ CORREÇÃO: Salvar APENAS 1 registro com todos os idiomas
            $noticia = Registro::create([
                'tituloNoticia'   => [
                    $validated['tituloNoticia'][0][0] ?? '', // Português
                    $validated['tituloNoticia'][1][0] ?? '', // Inglês  
                    $validated['tituloNoticia'][2][0] ?? ''  // Espanhol
                ],
                'conteudoNoticia' => [
                    $validated['descricoes'][0][0] ?? '', // Português
                    $validated['descricoes'][1][0] ?? '', // Inglês
                    $validated['descricoes'][2][0] ?? ''  // Espanhol
                ],
                'linkNoticia'     => [
                    $validated['links'][0][0] ?? '', // Português
                    $validated['links'][1][0] ?? '', // Inglês
                    $validated['links'][2][0] ?? ''  // Espanhol
                ],
                'imgNoticia'      => $validated['imagem'] ?? 'default-image.jpg',
                'StatusNoticia'   => 'analise'
            ]);

            DB::commit();
            // Adicione este log no controller para debug   
            Log::info('✅ DADOS RECEBIDOS NO CONTROLLER:', $request->all());
            Log::info("✅ Notícia salva com sucesso! ID: {$noticia->idNoticia}");

            return response()->json([
                'success' => true,
                'message' => 'Notícia salva com sucesso!',
                'id' => $noticia->idNoticia,
                'data' => $noticia
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            
            Log::error('❌ Erro ao salvar notícia:', [
                'erro' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Erro ao salvar notícia: ' . $e->getMessage()
            ], 500);
        }
    }
}