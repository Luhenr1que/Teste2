<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChatModel extends Model
{
    use HasFactory;
    
    protected $table = 'tb_mensagem'; 
    
    
    protected $primaryKey = 'idMensagem';

    
    protected $fillable = [
        'idUsers',
        'idAdm', 
        'enviante',
        'mensagens',
        'status',
        'idConversa',
        'notificacao'
    ];

    
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];
}