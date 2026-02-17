<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class adm extends Model
{
    use HasFactory;

    protected $table = 'adm'; 

    protected $fillable = [
        'idAdm',
        'name', 
        'email',
        'senha',
        'created_at',
        'updated_at',
    ];
}
