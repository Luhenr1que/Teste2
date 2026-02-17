<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Registro extends Model
{
    use HasFactory;

    protected $table = 'tb_noticia'; 
    protected $primaryKey = 'idNoticia'; 
    public $timestamps = true; 

    protected $fillable = [
        'tituloNoticia',
        'conteudoNoticia',
        'imgNoticia',
        'linkNoticia',
        'idOng',
        'StatusNoticia',
    ];

    protected $casts = [
        'tituloNoticia'   => 'array',
        'conteudoNoticia' => 'array',
        'linkNoticia'     => 'array',
    ];
}
