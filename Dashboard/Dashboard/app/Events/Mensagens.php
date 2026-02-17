<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use App\Models\ModelsAdm\tb_mensagem as Mensagem;

class Mensagens implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $mensagem;

    public function __construct(Mensagem $mensagem)
    {
        $this->mensagem = $mensagem;
    }

    public function broadcastOn()
    {
        return new PrivateChannel('chat.' . $this->mensagem->idConversa);
    }

    public function broadcastWith()
    {
        return [
            'idMensagem' => $this->mensagem->idMensagem,
            'idConversa' => $this->mensagem->idConversa,
            'idUsers'    => $this->mensagem->idUsers,
            'idAdm'      => $this->mensagem->idAdm,
            'enviante'   => $this->mensagem->enviante,
            'mensagens'  => $this->mensagem->mensagens,
            'status'     => $this->mensagem->status,
            'created_at' => $this->mensagem->created_at,
        ];
    }
}