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
        $paises = [
                'Afeganistão', 'África do Sul', 'Albânia', 'Alemanha', 'Andorra',
                'Angola', 'Anguilla', 'Antártida', 'Antígua e Barbuda', 'Arábia Saudita',
                'Argélia', 'Argentina', 'Armênia', 'Aruba', 'Austrália',
                'Áustria', 'Azerbaijão', 'Bahamas', 'Bahrein', 'Bangladesh',
                'Barbados', 'Bélgica', 'Belize', 'Benim', 'Bermudas',
                'Bielorrússia', 'Bolívia, Estado Plurinacional da', 'Bonaire, Santo Eustáquio e Saba', 'Bósnia e Herzegovina', 'Botsuana',
                'Brunei Darussalam', 'Bulgária', 'Burkina Faso', 'Burundi',
                'Butão', 'Cabo Verde', 'Camboja', 'Camarões', 'Canadá',
                'Catar', 'Cazaquistão', 'Chade', 'Chile', 'China',
                'Chipre', 'Colômbia', 'Comores', 'Congo', 'Congo, República Democrática do',
                'Coreia do Sul', 'Coreia do Norte', 'Costa do Marfim', 'Costa Rica', 'Croácia',
                'Cuba', 'Curaçau', 'Djibuti', 'Dominica', 'Egito',
                'El Salvador', 'Emirados Árabes Unidos', 'Equador', 'Eritreia', 'Eslováquia',
                'Eslovênia', 'Espanha', 'Essuatíni', 'Estados Unidos', 'Estônia',
                'Etiópia', 'Federação Russa', 'Fiji', 'Filipinas', 'Finlândia',
                'França', 'Gabão', 'Gâmbia', 'Gana', 'Geórgia',
                'Geórgia do Sul e Ilhas Sandwich do Sul', 'Gibraltar', 'Granada', 'Groenlândia', 'Guadalupe',
                'Guam', 'Guatemala', 'Guernsey', 'Guiana', 'Guiana Francesa',
                'Guiné', 'Guiné Equatorial', 'Guiné-Bissau', 'Haiti', 'Honduras',
                'Hong Kong', 'Hungria', 'Iêmen', 'Ilha Bouvet', 'Ilha Christmas',
                'Ilha de Man', 'Ilha Heard e Ilhas McDonald', 'Ilha Norfolk', 'Ilhas Åland', 'Ilhas Cayman',
                'Ilhas Cocos (Keeling)', 'Ilhas Cook', 'Ilhas Falkland (Malvinas)', 'Ilhas Marianas do Norte', 'Ilhas Marshall',
                'Ilhas Menores Distantes dos Estados Unidos', 'Ilhas Salomão', 'Ilhas Turcas e Caicos', 'Ilhas Virgens Americanas', 'Ilhas Virgens Britânicas',
                'Índia', 'Indonésia', 'Iraque', 'Irã, República Islâmica do', 'Irlanda',
                'Islândia', 'Israel', 'Itália', 'Jamaica', 'Japão',
                'Jersey', 'Jordânia', 'Kiribati', 'Kosovo', 'Kuwait',
                'Laos, República Democrática Popular do', 'Lesoto', 'Letônia', 'Líbano', 'Libéria',
                'Líbia', 'Liechtenstein', 'Lituânia', 'Luxemburgo', 'Macau',
                'Macedônia do Norte', 'Madagascar', 'Malaui', 'Malásia', 'Maldivas',
                'Mali', 'Malta', 'Marrocos', 'Martinica', 'Maurício',
                'Mauritânia', 'Mayotte', 'México', 'Micronésia, Estados Federados da', 'Mianmar',
                'Moldávia, República da', 'Mônaco', 'Mongólia', 'Montenegro', 'Montserrat',
                'Moçambique', 'Namíbia', 'Nauru', 'Nepal', 'Nicarágua',
                'Níger', 'Nigéria', 'Niue', 'Noruega', 'Nova Caledônia',
                'Nova Zelândia', 'Omã', 'Países Baixos', 'Paquistão', 'Palau',
                'Palestina, Estado da', 'Panamá', 'Papua Nova Guiné', 'Paraguai', 'Peru',
                'Pitcairn', 'Polinésia Francesa', 'Polônia', 'Porto Rico', 'Portugal',
                'Quênia', 'Quirguistão', 'Reino Unido', 'República Árabe da Síria', 'República Centro-Africana',
                'República Dominicana', 'Reunião', 'Romênia', 'Ruanda', 'Saara Ocidental',
                'Samoa', 'Samoa Americana', 'San Marino', 'Santa Helena, Ascensão e Tristão da Cunha', 'Santa Lúcia',
                'Santa Sé (Estado da Cidade do Vaticano)', 'São Bartolomeu', 'São Cristóvão e Neves', 'São Martinho (parte francesa)', 'São Martinho (parte holandesa)',
                'São Pedro e Miquelon', 'São Tomé e Príncipe', 'São Vicente e Granadinas', 'Senegal', 'Serra Leoa',
                'Sérvia', 'Seychelles', 'Singapura', 'Somália', 'Sri Lanka',
                'Sudão', 'Sudão do Sul', 'Suécia', 'Suíça', 'Suriname',
                'Svalbard e Jan Mayen', 'Tailândia', 'Taiwan, Província da China', 'Tajiquistão', 'Tanzânia, República Unida da',
                'Território Britânico do Oceano Índico', 'Territórios Franceses do Sul', 'Timor-Leste', 'Togo', 'Tokelau',
                'Tonga', 'Trindade e Tobago', 'Tunísia', 'Turcomenistão', 'Turquia',
                'Tuvalu', 'Ucrânia', 'Uganda', 'Uruguai', 'Uzbequistão',
                'Vanuatu', 'Venezuela', 'Vietnã', 'Wallis e Futuna', 'Zâmbia',
                'Zimbábue'
            ];
        $estados = ['SP', 'RJ', 'MG', 'RS', 'PR', 'SC', 'BA', 'PE', 'CE', 'DF'];
        $cidades = ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Porto Alegre', 'Curitiba', 'Florianopolis', 'Salvador', 'Recife', 'Fortaleza', 'Brasilia'];
        
        $emailsUtilizados = [];
        
        for ($i = 1; $i <= 100; $i++) {
            $condicao = $i <= 613 ? 'imigrante' : 'refugiado';
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
            
            // DECISÃO: Alguns usuários ficarão com documentos faltando
            // Cerca de 15% dos usuários terão algum documento faltante
            $temDocumentosIncompletos = rand(1, 100) <= 15;
            
            if ($temDocumentosIncompletos) {
                // Tipos de documentos que podem faltar
                $documentosFaltantes = [
                    'cpf' => rand(1, 100) <= 40, // 40% de chance de faltar CPF
                    'passaporte' => rand(1, 100) <= 30, // 30% de chance de faltar passaporte
                    'crm_rne' => rand(1, 100) <= 25, // 25% de chance de faltar CRM/RNE
                    'mercosul' => rand(1, 100) <= 35 // 35% de chance de faltar Mercosul
                ];
                
                // Aplica os documentos faltantes
                if ($documentosFaltantes['cpf']) $cpf = null;
                if ($documentosFaltantes['passaporte']) $passaporte = null;
                if ($documentosFaltantes['crm_rne']) $crmRne = null;
                if ($documentosFaltantes['mercosul']) $mercosul = null;
            }
            
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