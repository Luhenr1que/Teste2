<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class adm extends Seeder
{
    /**
     * Run the database seeds.
     */
 public function run(): void
    {
        DB::table('tb_adm')->insert([
            'nomeAdm' => 'Administrador',
            'emailAdm' => 'admin@exemplo.com',
            'cpfAdm' => '12345678900',
            'telefoneAdm' => '+5511999999999',
            'senhaAdm' => Hash::make('123456'),
            'status' => 'ativo',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $this->command->info('Admin criado com sucesso!');
        $this->command->info('Email: admin@exemplo.com');
        $this->command->info('Senha: admin123');
    }
}
