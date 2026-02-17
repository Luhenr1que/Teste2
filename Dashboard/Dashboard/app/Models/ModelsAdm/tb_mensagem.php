<?php

namespace App\Models\ModelsAdm;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class tb_mensagem extends Model
{
    use HasFactory;

    protected $table = 'tb_mensagem';
    protected $primaryKey = 'idMensagem';

    protected $fillable = [
        'idConversa',
        'idUsers',
        'idAdm',
        'enviante',
        'mensagens',
        'status',
        'notificacao',
    ];
}
