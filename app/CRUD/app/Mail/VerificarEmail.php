<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class VerificarEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $nome;
    public $email;
    public $codigo;

    public function __construct($nome, $email, $codigo)
    {
        $this->nome = $nome;
        $this->email = $email;
        $this->codigo = $codigo;
    }

    public function build()
    {
        return $this->subject('Código de Verificação - Seu App')
                    ->view('welcome')
                    ->with([
                        'nome' => $this->nome,
                        'codigo' => $this->codigo
                    ]);
    }
}