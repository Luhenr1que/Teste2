<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChatModel extends Model
{
    use HasFactory;
    
    protected $table = 'mensagens'; 

    protected $fillable = [
        'idUsers',
        'idAdm', 
        'enviante',
        'mensagem',
    ];

   
    public function user()
    {
        return $this->belongsTo(User::class, 'idUsers');
    }

    public function admin()
    {
        return $this->belongsTo(User::class, 'idAdm');
    }
}