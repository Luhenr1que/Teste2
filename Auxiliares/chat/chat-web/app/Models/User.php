<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use function Laravel\Prompts\password;

class user extends Model
{
    use HasFactory;
    
    protected $table = 'users'; 

    protected $fillable = [
        'idUsers',
        'name', 
        'email',
        'password',
        'created_at',
        'updated_at',
    ];
}
