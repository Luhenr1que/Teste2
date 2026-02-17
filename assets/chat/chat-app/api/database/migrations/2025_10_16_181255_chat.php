<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

use function Laravel\Prompts\text;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('mensagens', function (Blueprint $table) { 
            $table->id();
            
           
            $table->unsignedBigInteger('idUsers');
            $table->foreign('idUsers')->references('idUsers')->on('users');
            
           
            $table->unsignedBigInteger('idAdm');
            $table->foreign('idAdm')->references('idAdm')->on('adm'); 
            
            $table->text('mensagens');
            $table->text('enviante');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tb_mensagem');
    }
};