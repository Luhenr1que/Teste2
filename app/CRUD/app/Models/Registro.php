<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Registro extends Model
{
    use HasFactory;

    public $timestamps = true;
    protected $table = 'users'; 
    protected $primaryKey = 'idUsers';

    protected $fillable = [
        'nomeUsers',
        'emailUsers',
        'imgUsers',
        'dataNasciUsers',
        'paisOrigemUsers',
        'telefoneUsers',
        'senhaUsers',
        'statusUsers',
        'condicaoUsers',
        'cpfUsers',
        'crmRneUsers',
        'mercosulUsers',
        'passaporteUsers',
        'lograUsers',
        'numeroUsers',
        'cepUsers',
        'bairroUsers',
        'ruaUsers',
        'cidadeUsers',
        'estadoUsers',
    ];
}