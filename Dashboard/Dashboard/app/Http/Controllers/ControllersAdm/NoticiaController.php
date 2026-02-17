<?php

namespace App\Http\Controllers\ControllersAdm;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\ModelsNoticia\NoticiaModel;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class NoticiaController extends Controller
{
     public function criarNoticia(Request $request)
    {
        Log::info('=== INÍCIO CRIAÇÃO NOTÍCIA ===');
        
        $validated = $request->validate([
            'titulo' => 'required|string|max:500',
            'link' => 'nullable|url',
            'conteudo' => 'required|string',
            'imagem' => 'nullable', 
        ]);

        try {
            // Processar a imagem - CONVERTE AUTOMATICAMENTE PARA URL
            $imagemUrl = $this->processarImagem($request);

            // GERAR TRADUÇÕES
            $tituloPortugues = $request->titulo;
            $tituloIngles = $this->traduzirComGoogleTranslateGratis($tituloPortugues, 'en');
            $tituloEspanhol = $this->traduzirComGoogleTranslateGratis($tituloPortugues, 'es');
            
            $conteudoPortugues = $request->conteudo;
            $conteudoIngles = $this->traduzirComGoogleTranslateGratis($conteudoPortugues, 'en');
            $conteudoEspanhol = $this->traduzirComGoogleTranslateGratis($conteudoPortugues, 'es');
            
            // Criar resumos
            $resumoPortugues = $this->criarResumo($conteudoPortugues);
            $resumoIngles = $this->criarResumo($conteudoIngles);
            $resumoEspanhol = $this->criarResumo($conteudoEspanhol);

            // Link original
            $linkOriginal = $request->link;
            $linksArray = null;
            if ($linkOriginal) {
                $linksArray = [
                    $linkOriginal,
                    $this->criarLinkGoogleTranslate($linkOriginal, 'en'),
                    $this->criarLinkGoogleTranslate($linkOriginal, 'es')
                ];
            }

            // Salvar no banco
            $noticia = NoticiaModel::create([
                'tituloNoticia' => [
                    $tituloPortugues,
                    $tituloIngles,
                    $tituloEspanhol
                ],
                'conteudoNoticia' => [
                    $resumoPortugues,
                    $resumoIngles,
                    $resumoEspanhol
                ],
                'imgNoticia' => $imagemUrl, // JÁ É UMA URL
                'linkNoticia' => $linksArray,
                'statusNoticia' => 'ativa',
                'vistoNoticia' => 0
            ]);

            Log::info('Notícia criada com ID: ' . $noticia->idNoticia);

            return response()->json([
                'success' => true,
                'message' => 'Notícia criada com sucesso!',
                'noticia_id' => $noticia->idNoticia,
                'imagem_url' => $imagemUrl
            ]);

        } catch (\Exception $e) {
            Log::error('Erro: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Erro: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Método que processa a imagem e SEMPRE retorna uma URL
     * Aceita: URL, arquivo upload, base64
     */
    private function processarImagem(Request $request)
    {
        // Se não enviou imagem
        if (!$request->has('imagem') && !$request->hasFile('imagem')) {
            return null;
        }

        // 1. Se enviou uma URL válida
        $inputImagem = $request->input('imagem');
        if ($inputImagem && filter_var($inputImagem, FILTER_VALIDATE_URL)) {
            return $inputImagem;
        }

        // 2. Se enviou um arquivo via upload
        if ($request->hasFile('imagem')) {
            $arquivo = $request->file('imagem');
            
            // Valida o arquivo
            if (!$arquivo->isValid()) {
                throw new \Exception('Arquivo de imagem inválido');
            }

            // Valida o tipo MIME
            $mimeType = $arquivo->getMimeType();
            $tiposPermitidos = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
            
            if (!in_array($mimeType, $tiposPermitidos)) {
                throw new \Exception('Tipo de arquivo não permitido. Use: JPEG, PNG, GIF, WEBP ou SVG');
            }

            // Valida tamanho (5MB máximo)
            if ($arquivo->getSize() > 5242880) {
                throw new \Exception('Imagem muito grande. Máximo: 5MB');
            }

            // Gera nome único para o arquivo
            $nomeArquivo = time() . '_' . Str::random(10) . '.' . $arquivo->getClientOriginalExtension();
            
            // Faz upload para o storage público
            $caminho = $arquivo->storeAs('noticias', $nomeArquivo, 'public');
            
            // Retorna a URL completa
            return asset('storage/' . $caminho);
        }

        // 3. Se enviou imagem em base64
        if ($inputImagem && Str::startsWith($inputImagem, 'data:image')) {
            return $this->processarBase64($inputImagem);
        }

        // 4. Se é um caminho local (para compatibilidade)
        if ($inputImagem && is_string($inputImagem)) {
            // Verifica se parece um caminho de arquivo
            if (Str::contains($inputImagem, ['/', '\\', '.jpg', '.jpeg', '.png', '.gif'])) {
                // Tenta fazer upload se o arquivo existir
                if (file_exists($inputImagem)) {
                    $conteudo = file_get_contents($inputImagem);
                    $nomeArquivo = basename($inputImagem);
                    Storage::disk('public')->put('noticias/' . $nomeArquivo, $conteudo);
                    return asset('storage/noticias/' . $nomeArquivo);
                }
            }
        }

        return null;
    }

    /**
     * Processa imagem em base64
     */
    private function processarBase64($base64String)
    {
        try {
            // Extrai o tipo MIME e os dados
            if (!preg_match('/^data:image\/(\w+);base64,/', $base64String, $tipo)) {
                throw new \Exception('Formato base64 inválido');
            }
            
            $extensao = strtolower($tipo[1]);
            $dados = substr($base64String, strpos($base64String, ',') + 1);
            $dados = base64_decode($dados);
            
            if ($dados === false) {
                throw new \Exception('Falha ao decodificar base64');
            }
            
            // Gera nome único
            $nomeArquivo = time() . '_' . Str::random(10) . '.' . $extensao;
            $caminho = 'noticias/' . $nomeArquivo;
            
            // Salva no storage
            Storage::disk('public')->put($caminho, $dados);
            
            return asset('storage/' . $caminho);
            
        } catch (\Exception $e) {
            Log::warning('Erro ao processar base64: ' . $e->getMessage());
            return null;
        }
    }

    /**
     * Método ESPECÍFICO para upload via AJAX com preview
     */
    public function uploadImagem(Request $request)
    {
        try {
            $request->validate([
                'imagem' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:5120'
            ]);
            
            if ($request->hasFile('imagem')) {
                $arquivo = $request->file('imagem');
                $nomeArquivo = time() . '_' . Str::random(10) . '.' . $arquivo->getClientOriginalExtension();
                $caminho = $arquivo->storeAs('noticias', $nomeArquivo, 'public');
                
                $url = asset('storage/' . $caminho);
                
                return response()->json([
                    'success' => true,
                    'url' => $url,
                    'message' => 'Imagem enviada com sucesso!'
                ]);
            }
            
            return response()->json([
                'success' => false,
                'message' => 'Nenhuma imagem enviada'
            ], 400);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro: ' . $e->getMessage()
            ], 500);
        }
    }


    /**
     * TRADUÇÃO GRATUITA - Método PRINCIPAL que você deve usar
     */
    private function traduzirComGoogleTranslateGratis($texto, $idiomaAlvo)
    {
        if (empty($texto) || $idiomaAlvo === 'pt') {
            return $texto;
        }

        try {
            // URL da API não oficial do Google Translate
            $url = "https://translate.googleapis.com/translate_a/single";

            // Parâmetros da requisição
            $params = [
                'client' => 'gtx', // Google Translate XMLHttp
                'sl' => 'pt',      // Source language: Português
                'tl' => $idiomaAlvo, // Target language
                'dt' => 't',       // Get translation
                'q' => $texto      // Text to translate
            ];

            // Faz a requisição HTTP
            $response = Http::timeout(30)
                ->withOptions([
                    'verify' => false,
                    'headers' => [
                        'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                        'Accept' => 'application/json',
                    ]
                ])
                ->get($url, $params);

            if ($response->successful()) {
                $dados = $response->json();

                // A resposta vem assim: [[["Texto traduzido","Texto original",null,null,1]],null,"pt"]
                if (isset($dados[0][0][0])) {
                    $traducao = '';

                    // Percorre todos os segmentos da tradução
                    foreach ($dados[0] as $segmento) {
                        if (isset($segmento[0])) {
                            $traducao .= $segmento[0];
                        }
                    }

                    return $traducao ?: $texto;
                }
            }

            Log::warning('Resposta não esperada do Google Translate');
            return $texto;
        } catch (\Exception $e) {
            Log::warning('Erro na tradução gratuita: ' . $e->getMessage());

            // Fallback: Método alternativo caso o primeiro falhe
            return $this->traduzirAlternativaBackup($texto, $idiomaAlvo);
        }
    }

    /**
     * Método ALTERNATIVO caso o primeiro falhe
     */
    private function traduzirAlternativaBackup($texto, $idiomaAlvo)
    {
        try {
            // Outro endpoint alternativo
            $response = Http::timeout(30)
                ->withOptions(['verify' => false])
                ->get("https://clients5.google.com/translate_a/t", [
                    'client' => 'dict-chrome-ex',
                    'sl' => 'pt',
                    'tl' => $idiomaAlvo,
                    'q' => $texto
                ]);

            if ($response->successful()) {
                $dados = $response->json();
                if (isset($dados['sentences'][0]['trans'])) {
                    return $dados['sentences'][0]['trans'];
                }
            }
        } catch (\Exception $e) {
            Log::warning('Backup também falhou: ' . $e->getMessage());
        }

        // Último recurso: retorna o texto original
        return $texto;
    }

    /**
     * Cria resumo
     */
    private function criarResumo($texto, $limite = 150)
    {
        if (empty($texto)) return '';

        $texto = strip_tags($texto);
        $texto = trim($texto);

        if (strlen($texto) <= $limite) return $texto;

        $resumo = substr($texto, 0, $limite);
        $ultimoEspaco = strrpos($resumo, ' ');

        return $ultimoEspaco !== false
            ? substr($resumo, 0, $ultimoEspaco) . '...'
            : $resumo . '...';
    }

    /**
     * Cria link do Google Translate
     */
    private function criarLinkGoogleTranslate($urlOriginal, $idiomaAlvo)
    {
        $urlCodificada = urlencode($urlOriginal);
        return "https://translate.google.com/translate?hl={$idiomaAlvo}&sl=auto&tl={$idiomaAlvo}&u={$urlCodificada}";
    }

    /**
     * Método para criar notícia APENAS em português (sem tradução)
     */
    public function criarNoticiaApenasPortugues(Request $request)
    {
        $validated = $request->validate([
            'titulo' => 'required|string|max:500',
            'link' => 'nullable|url',
            'conteudo' => 'required|string',
            'imagem' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        try {
            $imagemPath = null;
            if ($request->hasFile('imagem')) {
                $imagemPath = $request->file('imagem')->store('noticias', 'public');
            }

            $resumo = $this->criarResumo($request->conteudo);

            $linksArray = null;
            if ($request->link) {
                $linksArray = [
                    $request->link, // Português
                    $this->criarLinkGoogleTranslate($request->link, 'en'), // Inglês
                    $this->criarLinkGoogleTranslate($request->link, 'es') // Espanhol
                ];
            }

            // Array SIMPLES com traduções pendentes
            $noticia = NoticiaModel::create([
                'tituloNoticia' => [
                    $request->titulo,          // Português
                    'Tradução pendente',       // Inglês
                    'Tradução pendente'        // Espanhol
                ],
                'conteudoNoticia' => [
                    $resumo,                   // Português
                    'Tradução pendente',       // Inglês
                    'Tradução pendente'        // Espanhol
                ],
                'imgNoticia' => $imagemPath,
                'linkNoticia' => $linksArray, // [pt, en, es] ou null
                'statusNoticia' => 'ativa',
                'vistoNoticia' => 0
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Notícia criada (traduções pendentes)',
                'noticia_id' => $noticia->idNoticia
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Método para ATUALIZAR traduções de uma notícia existente
     */
    public function atualizarTraducoes($idNoticia)
    {
        try {
            $noticia = NoticiaModel::findOrFail($idNoticia);

            // Pega o título em português (índice 0)
            $titulos = $noticia->tituloNoticia;
            $tituloPortugues = $titulos[0];

            // Pega o conteúdo em português (índice 0)
            $conteudos = $noticia->conteudoNoticia;
            $conteudoPortugues = $conteudos[0];

            // Traduz o título
            $tituloIngles = $this->traduzirComGoogleTranslateGratis($tituloPortugues, 'en');
            $tituloEspanhol = $this->traduzirComGoogleTranslateGratis($tituloPortugues, 'es');

            // Traduz o conteúdo
            $conteudoIngles = $this->traduzirComGoogleTranslateGratis($conteudoPortugues, 'en');
            $conteudoEspanhol = $this->traduzirComGoogleTranslateGratis($conteudoPortugues, 'es');

            // Cria resumos das traduções
            $resumoPortugues = $this->criarResumo($conteudoPortugues);
            $resumoIngles = $this->criarResumo($conteudoIngles);
            $resumoEspanhol = $this->criarResumo($conteudoEspanhol);

            // Atualiza a notícia
            $noticia->update([
                'tituloNoticia' => [
                    $tituloPortugues,
                    $tituloIngles,
                    $tituloEspanhol
                ],
                'conteudoNoticia' => [
                    $resumoPortugues,
                    $resumoIngles,
                    $resumoEspanhol
                ]
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Traduções atualizadas com sucesso!',
                'noticia_id' => $noticia->idNoticia
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro: ' . $e->getMessage()
            ], 500);
        }
    }
}
