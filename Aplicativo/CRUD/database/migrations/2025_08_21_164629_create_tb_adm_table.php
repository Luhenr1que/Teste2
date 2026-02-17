<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tb_adm', function (Blueprint $table) {
            $table->id('idAdm');
            $table->string('nomeAdm')->nullable();
            $table->string('imgAdm')->nullable();
            $table->string('cpfAdm', 30)->Unique()->nullable();
            $table->string('emailAdm')->unique()->nullable();
            $table->string('telefoneAdm', 30)->unique()->nullable();
            $table->string('temaAdm')->default('claro')->nullable();
            $table->string('senhaAdm');
            $table->string('status')->nullable();
            $table->timestamps();
        });

        // Insert dos 10 administradores
        $this->insertAdmins();
    }

    /**
     * Insert dos administradores
     */
    private function insertAdmins(): void
    {
        $admins = [
            [
                'nomeAdm' => 'João Silva',
                'cpfAdm' => '123.456.789-01',
                'emailAdm' => 'joao.silva@email.com',
                'telefoneAdm' => '(11) 99999-1111',
                'senhaAdm' => Hash::make('senha123'),
                'status' => 'ativo',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nomeAdm' => 'Maria Santos',
                'cpfAdm' => '234.567.890-12',
                'emailAdm' => 'maria.santos@email.com',
                'telefoneAdm' => '(11) 99999-2222',
                'senhaAdm' => Hash::make('senha123'),
                'status' => 'ativo',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nomeAdm' => 'Pedro Oliveira',
                'cpfAdm' => '345.678.901-23',
                'emailAdm' => 'pedro.oliveira@email.com',
                'telefoneAdm' => '(11) 99999-3333',
                'senhaAdm' => Hash::make('senha123'),
                'status' => 'ativo',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nomeAdm' => 'Ana Costa',
                'cpfAdm' => '456.789.012-34',
                'emailAdm' => 'ana.costa@email.com',
                'telefoneAdm' => '(11) 99999-4444',
                'senhaAdm' => Hash::make('senha123'),
                'status' => 'inativo',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nomeAdm' => 'Carlos Rodrigues',
                'cpfAdm' => '567.890.123-45',
                'emailAdm' => 'carlos.rodrigues@email.com',
                'telefoneAdm' => '(11) 99999-5555',
                'senhaAdm' => Hash::make('senha123'),
                'status' => 'ativo',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nomeAdm' => 'Fernanda Lima',
                'cpfAdm' => '678.901.234-56',
                'emailAdm' => 'fernanda.lima@email.com',
                'telefoneAdm' => '(11) 99999-6666',
                'senhaAdm' => Hash::make('senha123'),
                'status' => 'ativo',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nomeAdm' => 'Ricardo Almeida',
                'cpfAdm' => '789.012.345-67',
                'emailAdm' => 'ricardo.almeida@email.com',
                'telefoneAdm' => '(11) 99999-7777',
                'senhaAdm' => Hash::make('senha123'),
                'status' => 'inativo',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nomeAdm' => 'Juliana Pereira',
                'cpfAdm' => '890.123.456-78',
                'emailAdm' => 'juliana.pereira@email.com',
                'telefoneAdm' => '(11) 99999-8888',
                'senhaAdm' => Hash::make('senha123'),
                'status' => 'ativo',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nomeAdm' => 'Roberto Souza',
                'cpfAdm' => '901.234.567-89',
                'emailAdm' => 'roberto.souza@email.com',
                'telefoneAdm' => '(11) 99999-9999',
                'senhaAdm' => Hash::make('senha123'),
                'status' => 'ativo',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nomeAdm' => 'Amanda Ferreira',
                'cpfAdm' => '012.345.678-90',
                'emailAdm' => 'amanda.ferreira@email.com',
                'telefoneAdm' => '(11) 99999-0000',
                'senhaAdm' => Hash::make('senha123'),
                'status' => 'ativo',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ];

        // Inserir cada administrador
        foreach ($admins as $admin) {
            DB::table('tb_adm')->insert($admin);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_adm');
    }
};