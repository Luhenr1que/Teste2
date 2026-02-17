<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Mail\PropostaRecebida;
use App\Mail\DuvidaRecebida;
use App\Mail\SugestaoRecebida;
use App\Mail\OutroRecebida;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class ContatoController extends Controller
{
    public function enviar(Request $request)
    {
        $request->validate([
            'nome' => 'required|string|max:255',
            'email' => 'required|email',
            'desc' => 'required|string',
        ]);

        $nome = $request->input('nome');
        $email = $request->input('email');
        $desc = $request->input('desc');

        $opcoes = $request->input('opcoes');
        

        switch($opcoes){
            case 'proposta':
                try{
                    Mail::to('aquadev.of@gmail.com')->send(new PropostaRecebida($nome, $email, $desc));
                    
                    return redirect('/?status=success#contatos');            
                } catch (\Exception $e){
                    Log::error('Erro ao enviar proposta: '.$e->getMessage());

                    return redirect('/?status=error#contatos');
                }
                break;
            
            case 'duvida':
                try{
                    Mail::to('aquadev.of@gmail.com')->send(new DuvidaRecebida($nome, $email, $desc));
                    
                    return redirect('/?status=success#contatos');            
                } catch (\Exception $e){
                    Log::error('Erro ao enviar proposta: '.$e->getMessage());

                    return redirect('/?status=error#contatos');
                }
                break;

            case 'sugestao':
                try{
                    Mail::to('aquadev.of@gmail.com')->send(new SugestaoRecebida($nome, $email, $desc));
                    
                    return redirect('/?status=success#contatos');            
                } catch (\Exception $e){
                    Log::error('Erro ao enviar proposta: '.$e->getMessage());

                    return redirect('/?status=error#contatos');
                }
                break;

            case 'outro':
                try{
                    Mail::to('aquadev.of@gmail.com')->send(new OutroRecebida($nome, $email, $desc));
                    
                    return redirect('/?status=success#contatos');            
                } catch (\Exception $e){
                    Log::error('Erro ao enviar proposta: '.$e->getMessage());

                    return redirect('/?status=error#contatos');
                }
                break;
            
        }

    }
}