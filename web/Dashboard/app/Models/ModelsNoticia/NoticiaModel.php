<?php

namespace App\Models\ModelsNoticia;

use App\Models\ModelsAdm\Admin;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class NoticiaModel extends Model
{
    use HasFactory;

    protected $table = 'tb_noticia';
    protected $primaryKey = 'idNoticia';
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
        'tituloNoticia',
        'conteudoNoticia',
        'imgNoticia',
        'linkNoticia',
        'statusNoticia',
        'vistoNoticia'
    ];

    protected $casts = [
        'tituloNoticia'   => 'array',
        'conteudoNoticia' => 'array',
        'linkNoticia'     => 'array',
    ];

    public function admins()
    {
        return $this->belongsToMany(Admin::class, 'notificacao')
            ->withPivot('lida', 'lida_em')
            ->withTimestamps();
    }
}
