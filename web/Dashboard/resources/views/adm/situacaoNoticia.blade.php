<!-- Arquivo Blade unificado: situacaoNoticia.blade.php -->

@extends('templetes.templateAdm')
@section('head')
<link rel="stylesheet" href="{{url('assetsAdm/css/admOngs.css')}}">
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11.7.0/dist/sweetalert2.min.css">
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.7.0/dist/sweetalert2.min.js"></script>
<meta name="csrf-token" content="{{ csrf_token() }}">
<title>Noticia</title>
@php
$adm = Auth::guard('admin')->user();
@endphp
@endsection

@section('titulo')
notícias
@endsection
@section('idAdm')
{{$adm->idAd}}
@endsection

@section('conteudo')
<div class="container">
    <div class="cardTabela">
        <div id="filtroo" class="filtro">
            <div class="select-input">
                <select id='select' class="select-buscar">
                    <option class="option-buscar" value="tudo">Todos</option>
                    <option class="option-buscar" value="ativa">Aprovados</option>
                    <option class="option-buscar" value="negado">Negados</option>
                    <option class="option-buscar" value="analise">Analise</option>
                </select>
                <input id="buscaNoticia" class="input-busca" type="text" placeholder="Buscar">
            </div>

            <div class="botoes-acao">
                <button type="button" id="criar" class="botao-criar modalCriarNoticia"><img src="{{ asset('img/icones/adicionar.png') }}" alt=""></button>

                <button type="button" name="acao" id="aprova" value="ativa" class="botao-aprovar" disabled><img src="{{ asset('img/icones/certo.png') }}" alt=""></button>

                <button type="button" id="negar2" class="botao-negar" disabled><img src="{{ asset('img/icones/errado.png') }}" alt=""></button>

            </div>
        </div>

        <form id="formAtiva" class="from-noticia" action="/update-Noticia" method="post">
            <input type="hidden" id="acaoInput" name="acao" />
            <input type="hidden" id="motivoInput" name="motivo" />
            @csrf

            <div id="cards-container" class="cards-estilo-noticias">
                @include('adm.noticiaTable', ['noticias' => $noticias])
            </div>
        </form>
    </div>
</div>


<div class="containerModalNoticia">
    <div class="criarNoticia">
        <div class="tituloCriarNoticia">
            <h2 class="miniTitulo">Criar Notícia</h2>
            <img class="x" src="{{url('img/close.png')}}" alt="">
        </div>
        <div class="corpoCriarNoticia">
            <div class="imgNoticia">
                <img class="imgCriarNoticia" src="{{url('img/add-image1.png')}}" onclick="document.getElementById('imgNoticiaImagem').click()">

                <input id="imgNoticiaImagem" class="inputArquivo" type="file" hidden onchange="previewImage(this)">

            </div>
            <div class="formularioNoticia">
                <label class="textoInput" for="titulo">Titulo da Notícia</label>
                <input class="inputText" placeholder="Titulo da Noticia" id="titulo" type="text">
                <label class="textoInput" for="link">link da notícia</label>
                <input class="inputText" placeholder="Ex: https://www.cnnbrasil.com.br/" id="link" type="text">
                <label class="textoInput" for="conteudo">conteudo da notícia </label>
                <textarea class="conteudoNoticia" placeholder="Descrição da Notícia" name="" id="conteudo"></textarea>
                <div class="botoesFrom">
                    <button class="botaoNoticia">Criar</button>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    document.addEventListener("DOMContentLoaded", () => {
        const input = document.getElementById("#imgNoticiaImagem");
        const preview = document.querySelector(".imgNoticia .imgCriarNoticia");

        input.addEventListener("change", (event) => {
            const file = event.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (e) => {
                preview.src = e.target.result;
            };
            reader.readAsDataURL(file);
        });
    });


    function previewImage(input) {
        if (input.files && input.files[0]) {
            const reader = new FileReader();
            const imgPerfil = document.querySelector('.imgCriarNoticia');

            reader.onload = function(e) {
                imgPerfil.src = e.target.result;
            };

            reader.readAsDataURL(input.files[0]);
        }
    }

    $(document).ready(function() {
        let tema = localStorage.getItem('temaPreferido') || 'claro';

        function atualizarTabela() {
            let situacao = $('#select').val();
            let search = $('#buscaNoticia').val();

            $.ajax({
                url: "{{ route('admin.filtro-noticia') }}",
                method: 'GET',
                data: {
                    situacao: situacao,
                    search: search
                },
                success: function(response) {
                    $('#cards-container').html(response);
                },
                error: function() {
                    alert('Erro ao buscar noticias.');
                }
            });
        }

        $('#buscaNoticia').on('input', function() {
            atualizarTabela();
        });

        $('#select').change(function() {
            atualizarTabela();
        });

        $('.modalCriarNoticia').click(function(e) {
            e.preventDefault();
            $('.containerModalNoticia').css('display', 'flex');
            $('body').css('overflow', 'hidden');
        });

        $('.x').click(function() {
            $('.containerModalNoticia').css('display', 'none');
            $('body').css('overflow', 'auto');
        });

        $('.botaoNoticia').click(function(e) {
            e.preventDefault();

            let titulo = $('#titulo').val();
            let link = $('#link').val(); // Note: id="link"
            let conteudo = $('#conteudo').val();
            let imagem = $('#imgNoticiaImagem')[0].files[0];

            if (!titulo || !conteudo) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Campos Obrigatórios',
                    text: "Por favor, preencha todos os campos obrigatórios.",
                    timer: 2000,
                    showConfirmButton: false,
                    background: tema === 'escuro' ? 'var(--cor-fundoTable1)' : '#FFFFFF',
                    color: tema === 'escuro' ? 'var(--cor-texto)' : '#333333'

                });
                return;
            }

            Swal.fire({
                title: "Criar notícia?",
                text: "Deseja criar a notícia?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Sim, criar!",
                cancelButtonText: "Cancelar",
                background: tema == 'escuro' ? 'var(--cor-fundoTable1)' : '#FFFFFF',
                color: tema == 'escuro' ? 'var(--cor-texto)' : '#333333',
                customClass: {
                    confirmButton: 'btn-confirm',
                    cancelButton: 'btn-cancel'
                }
            }).then((result) => {
                if (result.isConfirmed) {

                    Swal.fire({
                        title: 'Criando notícia...',
                        background: tema === 'escuro' ? 'var(--cor-fundoTable1)' : '#FFFFFF',
                        color: tema === 'escuro' ? 'var(--cor-texto)' : '#333333',
                        allowOutsideClick: false,
                        didOpen: () => {
                            Swal.showLoading();
                        }
                    });

                    let formData = new FormData();
                    formData.append('titulo', titulo);
                    formData.append('link', link || '');
                    formData.append('conteudo', conteudo);
                    if (imagem) {
                        formData.append('imagem', imagem);
                    }
                    formData.append('_token', '{{ csrf_token() }}');

                    $.ajax({
                        url: "{{ route('insert-noticia') }}",
                        method: 'POST',
                        data: formData,
                        processData: false,
                        contentType: false,
                        beforeSend: function() {
                            Swal.showLoading();
                        },
                        success: function(response) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Sucesso!',
                                text: "Notícia criada com sucesso com sucesso",
                                timer: 2000,
                                showConfirmButton: false,
                                background: tema === 'escuro' ? 'var(--cor-fundoTable1)' : '#FFFFFF',
                                color: tema === 'escuro' ? 'var(--cor-texto)' : '#333333'

                            }).then(() => {
                                $('#titulo, #link, #conteudo').val('');
                                $('#imgNoticiaImagem').val('');
                                $('.containerModalNoticia').hide();
                                $('body').css('overflow', 'auto');
                                atualizarTabela();
                            });
                        },
                        error: function(xhr) {
                            console.log('Erro:', xhr.responseJSON);
                            if (xhr.status === 422) {
                                let errorMsg = xhr.responseJSON.message || 'Erro de validação';
                                Swal.fire('Erro!', errorMsg, 'error');
                            } else {
                                Swal.fire('Erro!', 'Erro ao criar notícia', 'error');
                            }
                        }
                    });
                }
            });
        });
    });




    /*   function criarLinkComTradutor(urlOriginal, idiomaAlvo) {
  return https://translate.google.com/translate?hl=${idiomaAlvo}&sl=auto&tl=${idiomaAlvo}&u=${encodeURIComponent(urlOriginal)};
}

async function traduzirNoticia(noticia, targetLang, sourceLang) {
  try {
    console.log(🔄 Traduzindo de ${LANGUAGE_NAMES[sourceLang]} para ${LANGUAGE_NAMES[targetLang]}...);

    // Adiciona delay maior para evitar bloqueio
    await delay(3000 + Math.random() * 4000);

    const [tituloTraduzido, descricaoTraduzida] = await Promise.all([
      translate(noticia.title, { from: sourceLang, to: targetLang }),
      noticia.description ? translate(noticia.description, { from: sourceLang, to: targetLang }) : Promise.resolve('')
    ]);

    return {
      ...noticia,
      title: tituloTraduzido || noticia.title,
      description: descricaoTraduzida || noticia.description,
      translated: true,
      originalLanguage: sourceLang,
      translatedUrl: criarLinkComTradutor(noticia.url, LANGUAGE_CODES[targetLang])
    };
  } catch (error) {
    console.error(❌ Erro na tradução de ${sourceLang} para ${targetLang}:, error.message);

    // Retorna a notícia original se a tradução falhar
    return {
      ...noticia,
      translated: false,
      originalLanguage: sourceLang,
      translatedUrl: noticia.url
    };
  }
} */
</script>

<script src="{{url('js/eventosPerfil.js')}}"></script>
@endsection