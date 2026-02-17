<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('notificacao', function (Blueprint $table) {
            $table->id('idNotificacao');
            $table->boolean('lidoNotificacao')->default(0)->nullable();
            $table->foreignId('idAdm')->references('idAdm')->on('tb_adm')->onDelete('cascade');
            $table->foreignId('idNoticia')->references('idNoticia')->on('tb_noticia')->onDelete('cascade');
            $table->timestamp('lida_em')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notificacao');
    }
};
