<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class tb_mensagem extends Model
{
    use HasFactory;
    
    protected $table = 'mensagens'; 

    protected $fillable = [
        'id',
        'idUsers',
        'idAdm',
        'enviante', 
        'mensagens', 
    ];
}
