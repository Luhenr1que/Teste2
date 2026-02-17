<?php

namespace App\Events;

use App\Models\ChatModel;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class Evento implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $mensagem;
    public $idAdmDestino;
    public $enviante;

    public function __construct(ChatModel $mensagem, $idAdmDestino, $enviante)
    {
        $this->mensagem = $mensagem;
        $this->idAdmDestino = $idAdmDestino;
        $this->enviante = $enviante;
    }

    public function broadcastOn()
    {
        
        return new Channel('chat.' . (string)$this->idAdmDestino);
    }

    public function broadcastAs()
    {
        return 'mensagem.enviada';
    }

    public function broadcastWith()
    {
        return [
            'idMensagem' => $this->mensagem->idMensagem, 
            'idUsers' => $this->mensagem->idUsers,
            'idAdm' => $this->mensagem->idAdm,
            'mensagens' => $this->mensagem->mensagens,
            'enviante' => $this->enviante,
            'notificacao'=>0,
            'idConversa'=>$this->mensagem->idConversa,
            'created_at' => $this->mensagem->created_at?->toDateTimeString() ?? now()->toDateTimeString()
        ];
    }
}