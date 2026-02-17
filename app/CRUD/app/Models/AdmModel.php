<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AdmModel extends Model
{
    use HasFactory;
     protected $table = 'tb_adm'; 
    protected $fillable = ['idAdm','name','email'];
}
