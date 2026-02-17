<?php

namespace App\Models\ModelsUsuario;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UsuarioModel extends Model
{
    use HasFactory;

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