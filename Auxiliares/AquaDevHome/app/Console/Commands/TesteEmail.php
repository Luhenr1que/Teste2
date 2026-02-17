<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class TesteEmail extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'teste:email';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Testa o envio de email via Laravel';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        try {
            Mail::raw('Teste de envio de email via Laravel', function ($message) {
                $message->to('aquadev.of@gmail.com')
                        ->subject('Teste de Email Laravel');
            });
            $this->info('Email enviado com sucesso!');
        } catch (\Exception $e) {
            $this->error('Erro ao enviar email: ' . $e->getMessage());
        }
    }
}
