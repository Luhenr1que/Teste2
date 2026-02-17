<?php

namespace App\Models\ModelsAdm;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use App\Models\ModelsNoticia\NoticiaModel as Notificacao;
use App\Models\ModelsNoticia\NoticiaModel;

class Admin extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $table = 'tb_adm';
    protected $primaryKey = 'idAdm';
    protected $hidden = ['senhaAdm'];
    public $timestamps = true;
    protected $fillable = [
        'nomeAdm',
        'cpfAdm',
        'emailAdm',
        'telefoneAdm',
        'senhaAdm',
        'status',
        'imgAdm'
    ];

    //Muda a coluna de identificação do auth
    public function getAuthIdentifierName()
    {
        return 'emailAdm';
    }
    //Muda o valor q password recebe no auth
    public function getAuthPassword()
    {
        return $this->senhaAdm;
    }

    public function notificacoes()
    {
        return $this->belongsToMany(Notificacao::class, 'notificacao')
            ->withPivot('lida', 'lida_em')
            ->withTimestamps();
    }

    // Notificações não lidas
    public function notificacoesNaoLidas()
    {
        return $this->notificacoes()
            ->wherePivot('lida', false)
            ->ativas();
    }

    // Notificações lidas
    public function notificacoesLidas()
    {
        return $this->notificacoes()
            ->wherePivot('lida', true)
            ->ativas();
    }

    // Contador de notificações não lidas
    public function getContadorNotificacoesNaoLidasAttribute()
    {
        return $this->notificacoesNaoLidas()->count();
    }
}
