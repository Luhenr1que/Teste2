<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Campanha extends Model
{
    use HasFactory;

    protected $table = 'tb_campanha';

    protected $primaryKey = 'idCampanha';

    protected $fillable = [
        'tituloCampanha',
        'descriCampanha',
        'cartazCampanha',
        'linkCampanha',
        'statusCampanha',
        'idOng',
    ];

    public function ong()
    {
        return $this->belongsTo(Ong::class, 'idOng', 'idOng');
    }
}
