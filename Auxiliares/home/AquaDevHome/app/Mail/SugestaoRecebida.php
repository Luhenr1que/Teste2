<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SugestaoRecebida extends Mailable
{
    use Queueable, SerializesModels;

    public $nome;
    public $email;
    public $desc;

    public function __construct($nome, $email, $desc)
    {
        $this->nome = $nome;
        $this->email = $email;
        $this->desc = $desc;
    }

    public function build()
    {
        return $this->subject('Sugestão do Usuario')
                    ->markdown('emails.sugestao');
    }
}
