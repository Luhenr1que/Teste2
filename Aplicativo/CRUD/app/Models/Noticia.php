<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Noticia extends Model
{
    use HasFactory;

    public $timestamps = true;
    protected $table = 'tb_noticia'; 
    protected $primaryKey = 'idNoticia';

    protected $fillable = [
        'tituloNoticia',
        'conteudoNoticia',
        'imgNoticia',
        'linkNoticia',
        'StatusNoticia',
        'idOng'
    ];
}