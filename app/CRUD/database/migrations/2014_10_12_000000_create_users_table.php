<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id('idUsers');
            $table->string('nomeUsers')->nullable();
            $table->date('dataNasciUsers')->nullable();
            $table->string('paisOrigemUsers')->nullable();
            $table->string('statusUsers')->nullable();
            $table->string('condicaoUsers')->nullable();
            $table->string('emailUsers')->unique()->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->char('telefoneUsers', 30)->unique()->nullable();
            $table->string('crmRneUsers')->nullable();
            $table->string('cpfUsers')->nullable();
            $table->string('mercosulUsers')->nullable();
            $table->string('passaporteUsers')->nullable();
            $table->string('lograUsers')->nullable();
            $table->integer('numeroUsers')->nullable();
            $table->char('cepUsers', 20)->nullable();
            $table->string('bairroUsers')->nullable();
            $table->string('cidadeUsers')->nullable();
            $table->string('estadoUsers')->nullable();
            $table->string('senhaUsers');
            $table->string('imgUsers')->nullable();
            $table->timestamps();
        });

        $this->insertUsers();
    }

    private function insertUsers(): void
    {
        $users = [];
        $nomes = [
            "Alejandro", "Santiago", "Diego", "Sebastian", "Mateo", "Nicolas", "Samuel", "Daniel", "Emmanuel", "Gabriel",
            "Carlos", "Javier", "Miguel", "Jose", "Juan", "Luis", "Pedro", "Rafael", "Ricardo", "Fernando",
            "Andres", "Felipe", "Manuel", "Roberto", "David", "Jorge", "Eduardo", "Pablo", "Raul", "Sergio",
            "Alberto", "Francisco", "Antonio", "Enrique", "Oscar", "Rodrigo", "Gustavo", "Hector", "Ignacio", "Joaquin",
            "Guillermo", "Cesar", "Ramon", "Victor", "Angel", "Mario", "Alfonso", "Ruben", "Adrian", "Julian",
            "Valentina", "Sofia", "Isabella", "Camila", "Valeria", "Mariana", "Gabriela", "Sara", "Daniela", "Lucia",
            "Maria", "Ana", "Carmen", "Dolores", "Josefina", "Teresa", "Rosa", "Luisa", "Elena", "Clara",
            "Patricia", "Laura", "Andrea", "Paola", "Carolina", "Fernanda", "Natalia", "Vanessa", "Alejandra", "Gloria",
            "Beatriz", "Silvia", "Raquel", "Monica", "Veronica", "Liliana", "Catalina", "Jimena", "Ximena", "Estefania",
            "Adriana", "Monica", "Ruth", "Olga", "Irene", "Alicia", "Margarita", "Rocio", "Consuelo", "Esperanza",
            "Angelica", "Miriam", "Noemi", "Rebeca", "Esther", "Judith", "Leticia", "Yolanda", "Elsa", "Ines"
        ];
        
        $sobrenomes = [
            "Silva", "Santos", "Oliveira", "Souza", "Rodrigues", "Ferreira", "Alves", "Pereira", "Lima", "Gomes",
            "Costa", "Ribeiro", "Martins", "Carvalho", "Almeida", "Pinto", "Mendes", "Nunes", "Soares", "Vieira",
            "Monteiro", "Moreira", "Cardoso", "Rocha", "Ramos", "Cunha", "Cavalcanti", "Dias", "Castro", "Correia",
            "Henrique", "Araujo", "Melo", "Coelho", "Pires", "Freitas", "Barbosa", "Teixeira", "Borges", "Xavier",
            "Lopes", "Goncalves", "Batista", "Miranda", "Andrade", "Campos", "Mota", "Nascimento", "Siqueira", "Marques",
            "Machado", "Bezerra", "Azevedo", "Fernandes", "Brito", "Vasconcelos", "Tavares", "Guimaraes", "Moura", "Dantas",
            "Fonseca", "Pimentel", "Maia", "Maciel", "Barros", "Figueiredo", "Albuquerque", "Cordeiro", "Assis", "Farias",
            "Peixoto", "Faria", "Leal", "Macedo", "Viana", "Reis", "Amaral", "Menezes", "Zimmermann", "Klein",
            "Schmidt", "Weber", "Hoffmann", "Schneider", "Richter", "Bauer", "Krause", "Lange", "Werner", "Schulz",
            "Vogel", "Keller", "Frank", "Wolf", "Jung", "Huber", "Graf", "Sommer", "Schubert", "Friedrich"
        ];
        
        $provedores = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com', 'icloud.com', 'protonmail.com'];
        $paises = ['Brasil', 'Argentina', 'Colombia', 'Peru', 'Chile', 'Venezuela', 'Equador', 'Bolivia', 'Paraguai', 'Uruguai'];
        $estados = ['SP', 'RJ', 'MG', 'RS', 'PR', 'SC', 'BA', 'PE', 'CE', 'DF'];
        $cidades = ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Porto Alegre', 'Curitiba', 'Florianopolis', 'Salvador', 'Recife', 'Fortaleza', 'Brasilia'];
        
        $emailsUtilizados = [];
        
        for ($i = 1; $i <= 200; $i++) {
            $condicao = $i <= 113 ? 'imigrante' : 'refugiado';
            $status = $i % 6 == 0 ? 'inativo' : 'ativo';
            
            $nome = $nomes[array_rand($nomes)];
            $sobrenome = $sobrenomes[array_rand($sobrenomes)];
            $nomeCompleto = $nome . ' ' . $sobrenome;
            
            // Remove acentos para o email
            $nomeSemAcento = $this->removerAcentos($nome);
            $sobrenomeSemAcento = $this->removerAcentos($sobrenome);
            
            // Geração de email único e mais realista
            do {
                $variacoesEmail = [
                    strtolower($nomeSemAcento) . '.' . strtolower($sobrenomeSemAcento) . rand(1, 999),
                    strtolower($nomeSemAcento) . strtolower($sobrenomeSemAcento) . rand(1, 999),
                    strtolower(substr($nomeSemAcento, 0, 1)) . strtolower($sobrenomeSemAcento) . rand(1, 999),
                    strtolower($nomeSemAcento) . rand(1, 999),
                    strtolower($sobrenomeSemAcento) . rand(1, 999)
                ];
                
                $email = $variacoesEmail[array_rand($variacoesEmail)] . '@' . $provedores[array_rand($provedores)];
            } while (in_array($email, $emailsUtilizados));
            
            $emailsUtilizados[] = $email;
            
            // Geração de CPF válido
            $cpf = $this->gerarCPF();
            
            // Geração de passaporte realista (formato brasileiro: AA123456)
            $letrasPassaporte = chr(rand(65, 90)) . chr(rand(65, 90));
            $passaporte = $letrasPassaporte . str_pad(rand(1, 999999), 6, '0', STR_PAD_LEFT);
            
            // Geração de CRM/RNE realista
            $crmRne = 'RNE' . str_pad(rand(1000000, 9999999), 7, '0', STR_PAD_LEFT);
            
            // Geração de Mercosul realista
            $mercosul = 'MC' . str_pad(rand(100000, 999999), 6, '0', STR_PAD_LEFT);
            
            $ano = rand(2020, 2025);
            $mes = rand(1, 12);
            $dia = rand(1, 28);
            $data = "{$ano}-" . str_pad($mes, 2, '0', STR_PAD_LEFT) . "-" . str_pad($dia, 2, '0', STR_PAD_LEFT);
            
            $users[] = [
                'nomeUsers' => $nomeCompleto,
                'dataNasciUsers' => date('Y-m-d', strtotime('-'.rand(18,65).' years')),
                'paisOrigemUsers' => $paises[array_rand($paises)],
                'statusUsers' => $status,
                'condicaoUsers' => $condicao,
                'emailUsers' => $email,
                'telefoneUsers' => '+55119' . str_pad(rand(10000000, 99999999), 8, '0', STR_PAD_LEFT),
                'crmRneUsers' => $crmRne,
                'cpfUsers' => $cpf,
                'mercosulUsers' => $mercosul,
                'passaporteUsers' => $passaporte,
                'lograUsers' => 'Rua ' . $sobrenomes[array_rand($sobrenomes)] . ' ' . ['Silva', 'Almeida', 'Oliveira', 'Santos'][array_rand([0,1,2,3])],
                'numeroUsers' => rand(1, 1000),
                'cepUsers' => str_pad(rand(10000000, 99999999), 8, '0', STR_PAD_LEFT),
                'bairroUsers' => 'Bairro ' . $sobrenomes[array_rand($sobrenomes)],
                'cidadeUsers' => $cidades[array_rand($cidades)],
                'estadoUsers' => $estados[array_rand($estados)],
                'senhaUsers' => bcrypt('senha123'),
                'created_at' => $data . ' ' . str_pad(rand(0, 23), 2, '0', STR_PAD_LEFT) . ':' . str_pad(rand(0, 59), 2, '0', STR_PAD_LEFT) . ':' . str_pad(rand(0, 59), 2, '0', STR_PAD_LEFT),
                'updated_at' => $data . ' ' . str_pad(rand(0, 23), 2, '0', STR_PAD_LEFT) . ':' . str_pad(rand(0, 59), 2, '0', STR_PAD_LEFT) . ':' . str_pad(rand(0, 59), 2, '0', STR_PAD_LEFT)
            ];
        }

        DB::table('users')->insert($users);
    }

    /**
     * Remove acentos de uma string
     */
    private function removerAcentos($string): string
    {
        $acentos = [
            'á' => 'a', 'à' => 'a', 'ã' => 'a', 'â' => 'a', 'ä' => 'a',
            'é' => 'e', 'è' => 'e', 'ê' => 'e', 'ë' => 'e',
            'í' => 'i', 'ì' => 'i', 'î' => 'i', 'ï' => 'i',
            'ó' => 'o', 'ò' => 'o', 'õ' => 'o', 'ô' => 'o', 'ö' => 'o',
            'ú' => 'u', 'ù' => 'u', 'û' => 'u', 'ü' => 'u',
            'ç' => 'c', 'ñ' => 'n',
            'Á' => 'A', 'À' => 'A', 'Ã' => 'A', 'Â' => 'A', 'Ä' => 'A',
            'É' => 'E', 'È' => 'E', 'Ê' => 'E', 'Ë' => 'E',
            'Í' => 'I', 'Ì' => 'I', 'Î' => 'I', 'Ï' => 'I',
            'Ó' => 'O', 'Ò' => 'O', 'Õ' => 'O', 'Ô' => 'O', 'Ö' => 'O',
            'Ú' => 'U', 'Ù' => 'U', 'Û' => 'U', 'Ü' => 'U',
            'Ç' => 'C', 'Ñ' => 'N'
        ];
        
        return strtr($string, $acentos);
    }

    /**
     * Gera um CPF válido
     */
    private function gerarCPF(): string
    {
        $noveDigitos = '';
        for ($i = 0; $i < 9; $i++) {
            $noveDigitos .= rand(0, 9);
        }

        // Calcula primeiro dígito verificador
        $soma = 0;
        for ($i = 0; $i < 9; $i++) {
            $soma += $noveDigitos[$i] * (10 - $i);
        }
        $resto = $soma % 11;
        $primeiroDigito = ($resto < 2) ? 0 : 11 - $resto;

        // Calcula segundo dígito verificador
        $soma = 0;
        for ($i = 0; $i < 9; $i++) {
            $soma += $noveDigitos[$i] * (11 - $i);
        }
        $soma += $primeiroDigito * 2;
        $resto = $soma % 11;
        $segundoDigito = ($resto < 2) ? 0 : 11 - $resto;

        return $noveDigitos . $primeiroDigito . $segundoDigito;
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};