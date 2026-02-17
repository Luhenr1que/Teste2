<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tb_mensagem', function (Blueprint $table) { 
            $table->id('idMensagem');
        
            $table->unsignedBigInteger('idConversa')->nullable();
            $table->unsignedBigInteger('idUsers')->nullable();
            $table->unsignedBigInteger('idAdm')->nullable();
        
            $table->text('mensagens')->nullable();
            $table->string('enviante')->nullable();
            $table->string('status')->nullable();
        
            $table->timestamps();
        
            $table->foreign('idUsers')
                ->references('idUsers')->on('users')
                ->onDelete('cascade');
        
            $table->foreign('idAdm')
                ->references('idAdm')->on('tb_adm')
                ->onDelete('cascade');
        });
      
    }

    public function down(): void
    {
        Schema::dropIfExists('tb_mensagem');
    }
    
};
