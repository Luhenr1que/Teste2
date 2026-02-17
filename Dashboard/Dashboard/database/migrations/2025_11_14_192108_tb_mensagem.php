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
            $table->unsignedBigInteger('notificacao')->nullable();
        });
        $this->insertMensagens();
    }

    public function down(): void
    {
        Schema::dropIfExists('tb_mensagem');
    }
    public function insertMensagens(): void
    {
        DB::table('tb_mensagem')->insert([
            // Usuário 1 – 5 mensagens
            [
                'idConversa' => null, 'idUsers' => 1, 'idAdm' => 10,
                'mensagens' => 'Olá, estou com problemas para acessar minha conta.',
                'enviante' => 'user', 'status' => 'publico',
                'created_at' => now(), 'updated_at' => now()
            ],
            [
                'idConversa' => null, 'idUsers' => 1, 'idAdm' => 10,
                'mensagens' => 'Parece que minha senha não está funcionando.',
                'enviante' => 'user', 'status' => 'publico',
                'created_at' => now(), 'updated_at' => now()
            ],
            [
                'idConversa' => null, 'idUsers' => 1, 'idAdm' => 10,
                'mensagens' => 'Já tentei redefinir mas o e-mail nunca chega.',
                'enviante' => 'user', 'status' => 'publico',
                'created_at' => now(), 'updated_at' => now()
            ],
            [
                'idConversa' => null, 'idUsers' => 1, 'idAdm' => 10,
                'mensagens' => 'Será que podem verificar isso?',
                'enviante' => 'user', 'status' => 'publico',
                'created_at' => now(), 'updated_at' => now()
            ],
        
            // Usuário 2 – 2 mensagens
            [
                'idConversa' => null, 'idUsers' => 2, 'idAdm' => 10,
                'mensagens' => 'Boa tarde, quero atualizar meu número de telefone.',
                'enviante' => 'user', 'status' => 'publico',
                'created_at' => now(), 'updated_at' => now()
            ],
            [
                'idConversa' => null, 'idUsers' => 2, 'idAdm' => 10,
                'mensagens' => 'Tem como fazer isso pelo app?',
                'enviante' => 'user', 'status' => 'publico',
                'created_at' => now(), 'updated_at' => now()
            ],
        
            // Usuário 3 – 1 mensagem
            [
                'idConversa' => null, 'idUsers' => 3, 'idAdm' => 10,
                'mensagens' => 'Minha conta foi bloqueada após várias tentativas, podem me ajudar?',
                'enviante' => 'user', 'status' => 'publico',
                'created_at' => now(), 'updated_at' => now()
            ],
        
            // Usuário 4 – 4 mensagens
            [
                'idConversa' => null, 'idUsers' => 4, 'idAdm' => 10,
                'mensagens' => 'Queria entender melhor sobre o suporte premium.',
                'enviante' => 'user', 'status' => 'publico',
                'created_at' => now(), 'updated_at' => now()
            ],
            [
                'idConversa' => null, 'idUsers' => 4, 'idAdm' => 10,
                'mensagens' => 'Vi que existem planos diferentes no site.',
                'enviante' => 'user', 'status' => 'publico',
                'created_at' => now(), 'updated_at' => now()
            ],
            [
                'idConversa' => null, 'idUsers' => 4, 'idAdm' => 10,
                'mensagens' => 'Qual deles tem atendimento 24h?',
                'enviante' => 'user', 'status' => 'publico',
                'created_at' => now(), 'updated_at' => now()
            ],
        
            // Usuário 5 – 3 mensagens
            [
                'idConversa' => null, 'idUsers' => 5, 'idAdm' => 10,
                'mensagens' => 'O app trava sempre que tento abrir o chat.',
                'enviante' => 'user', 'status' => 'publico',
                'created_at' => now(), 'updated_at' => now()
            ],
            [
                'idConversa' => null, 'idUsers' => 5, 'idAdm' => 10,
                'mensagens' => 'Já reinstalei duas vezes mas continua igual.',
                'enviante' => 'user', 'status' => 'publico',
                'created_at' => now(), 'updated_at' => now()
            ],
            [
                'idConversa' => null, 'idUsers' => 5, 'idAdm' => 10,
                'mensagens' => 'Podem ver o que pode ser?',
                'enviante' => 'user', 'status' => 'publico',
                'created_at' => now(), 'updated_at' => now()
            ],
        
            // Usuário 6 – 7 mensagens
            [
                'idConversa' => null, 'idUsers' => 6, 'idAdm' => 10,
                'mensagens' => 'Estou tentando alterar meu endereço mas não salva.',
                'enviante' => 'user', 'status' => 'publico',
                'created_at' => now(), 'updated_at' => now()
            ],
            [
                'idConversa' => null, 'idUsers' => 6, 'idAdm' => 10,
                'mensagens' => 'Fica carregando e volta para o endereço antigo.',
                'enviante' => 'user', 'status' => 'publico',
                'created_at' => now(), 'updated_at' => now()
            ],
            [
                'idConversa' => null, 'idUsers' => 6, 'idAdm' => 10,
                'mensagens' => 'Tentei pelo navegador também, mas dá o mesmo erro.',
                'enviante' => 'user', 'status' => 'publico',
                'created_at' => now(), 'updated_at' => now()
            ],
            [
                'idConversa' => null, 'idUsers' => 6, 'idAdm' => 10,
                'mensagens' => 'Tem algo que posso fazer?',
                'enviante' => 'user', 'status' => 'publico',
                'created_at' => now(), 'updated_at' => now()
            ],
        
            // Usuário 7 – 2 mensagens
            [
                'idConversa' => null, 'idUsers' => 7, 'idAdm' => 10,
                'mensagens' => 'Estou com dúvidas sobre pagamento via boleto.',
                'enviante' => 'user', 'status' => 'publico',
                'created_at' => now(), 'updated_at' => now()
            ],
            [
                'idConversa' => null, 'idUsers' => 7, 'idAdm' => 10,
                'mensagens' => 'Vocês aceitam boleto recorrente?',
                'enviante' => 'user', 'status' => 'publico',
                'created_at' => now(), 'updated_at' => now()
            ],
        
            // Usuário 8 – 6 mensagens
            [
                'idConversa' => null, 'idUsers' => 8, 'idAdm' => 10,
                'mensagens' => 'Queria saber se vão lançar a atualização nova ainda este mês.',
                'enviante' => 'user', 'status' => 'publico',
                'created_at' => now(), 'updated_at' => now()
            ],
            [
                'idConversa' => null, 'idUsers' => 8, 'idAdm' => 10,
                'mensagens' => 'Vi nos comentários que prometeram algumas melhorias.',
                'enviante' => 'user', 'status' => 'publico',
                'created_at' => now(), 'updated_at' => now()
            ],
            [
                'idConversa' => null, 'idUsers' => 8, 'idAdm' => 10,
                'mensagens' => 'Estou aguardando principalmente o novo sistema de alertas.',
                'enviante' => 'user', 'status' => 'publico',
                'created_at' => now(), 'updated_at' => now()
            ],
        
            // Usuário 9 – 3 mensagens
            [
                'idConversa' => null, 'idUsers' => 9, 'idAdm' => 10,
                'mensagens' => 'Tenho um cupom mas ele não funciona no checkout.',
                'enviante' => 'user', 'status' => 'publico',
                'created_at' => now(), 'updated_at' => now()
            ],
            [
                'idConversa' => null, 'idUsers' => 9, 'idAdm' => 10,
                'mensagens' => 'Diz que está expirado, mas recebi hoje.',
                'enviante' => 'user', 'status' => 'publico',
                'created_at' => now(), 'updated_at' => now()
            ],
        
            // Usuário 10 – 5 mensagens
            [
                'idConversa' => null, 'idUsers' => 10, 'idAdm' => 10,
                'mensagens' => 'Como funciona o processo de reembolso?',
                'enviante' => 'user', 'status' => 'publico',
                'created_at' => now(), 'updated_at' => now()
            ],
            [
                'idConversa' => null, 'idUsers' => 10, 'idAdm' => 10,
                'mensagens' => 'Comprei um produto errado e queria devolver.',
                'enviante' => 'user', 'status' => 'publico',
                'created_at' => now(), 'updated_at' => now()
            ],
            [
                'idConversa' => null, 'idUsers' => 10, 'idAdm' => 10,
                'mensagens' => 'Ainda não usei nada, está lacrado.',
                'enviante' => 'user', 'status' => 'publico',
                'created_at' => now(), 'updated_at' => now()
            ],
        
            // Usuários 11 a 20 — mensagens curtas e realistas
            ...array_map(fn($id) => [
                'idConversa' => null,
                'idUsers' => $id,
                'idAdm' => 10,
                'mensagens' => 'Olá, preciso de suporte.',
                'enviante' => 'user',
                'status' => 'publico',
                'created_at' => now(),
                'updated_at' => now(),
            ], range(11, 20)),
        ]);        
    }
};
