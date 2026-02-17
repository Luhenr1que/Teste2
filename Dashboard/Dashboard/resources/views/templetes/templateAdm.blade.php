@php
$admin = Auth::guard('admin')->user();
use Illuminate\Support\Str;

// Verifica se o submenu deve estar aberto
$isConfigMenuOpen = request()->routeIs('admin.perfil-page') || request()->routeIs('admin.aparencia-page');
@endphp
<!DOCTYPE html>
<html lang="pt-br">

<head>
    {{-- Cabeça Padrão --}}
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="icon" href="{{url('img/globo.png')}}">

    {{-- Links pra Estilização --}}
    <link rel="stylesheet" href="{{ asset('css/admTemplate.css')}} ">
    <link rel="stylesheet" href="{{ asset('assetsAdm/css/temas.css')}} ">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @yield('head')
</head>

<body>
    <div class="barra-lateral">
        <div class="div-logo">
            <img class="logo" src="{{ asset('img/icon.png') }}" alt="">
        </div>

        <div class="itens">
            <div class="legal">
                <div onclick="window.location.href='{{ route('admin.dashboard') }}'"
                    style="{{ request()->routeIs('admin.dashboard') ? 'background-color: #163149c7;' : '' }}"
                    class="navegacao" id="dashboard">

                    <img id="dP" class="icones"
                        src="{{ request()->routeIs('admin.dashboard') ? asset('img/homeP.png') : asset('img/home.png') }}">

                    <div class="text-icones">
                        Inicio
                    </div>
                </div>
            </div>

            <div class="legal">
                <div onclick="window.location.href='{{ route('admin.situacao-noticia') }}'" style="{{ request()->routeIs('admin.situacao-noticia') ? 'background-color: #163149c7;' : '' }}" class="navegacao" id="noticias">

                    <img id="nP" class="icones" src="{{ request()->routeIs('admin.situacao-noticia') ? asset('img/icones/noticiaP.png') : asset('img/icones/noticia.png') }}">

                    <div onClick="" class="text-icones">
                        Notícias
                    </div>
                </div>
            </div>

            <div class="legal">
                <div onclick="window.location.href='{{ route('admin.usuarios') }}'" style="{{ request()->routeIs('admin.usuarios') ? 'background-color: #163149c7;' : '' }}" class="navegacao" id="usuarios">

                    <img id="uP" class="icones" src="{{ request()->routeIs('admin.usuarios') ? asset('img/icones/user1p.png') : asset('img/icones/user1.png') }}" class="navegacao">

                    <div onClick="" class="text-icones">
                        Usuários
                    </div>
                </div>
            </div>
            <div class="legal">
                <div onclick="window.location.href='{{ route('admin.suporte') }}'" style="{{ request()->routeIs('admin.suporte') ? 'background-color: #163149c7;' : '' }}" class="navegacao" id="suporte">

                    <img id="sP" class="icones" src="{{ request()->routeIs('admin.suporte') ? asset('img/conversacaoP.png') : asset('img/conversacao.png') }}">

                    <div class="text-icones">
                        Suporte
                    </div>
                </div>
            </div>
            {{-- Menu Configurações com Submenu --}}
            <div class="legal">
                <div onclick="window.location.href='{{ route('admin.perfil-page') }}'" style="{{ request()->routeIs('admin.perfil-page') ? 'background-color: #163149c7;' : '' }}" class="navegacao" id="perfil">

                    <img id="pP" class="icones" src="{{ request()->routeIs('admin.perfil-page') ? asset('img/icones/definicoesP.png') : asset('img/icones/definicoes.png') }}">

                    <div class="text-icones">
                        Perfil
                    </div>
                </div>
            </div>
            <!-- <div class="configuracoes-menu">
                <div onclick="toggleSubmenu()"
                    style="{{ $isConfigMenuOpen ? 'background-color: #163149c7;' : '' }}"
                    class="navegacao configuracoes-main {{ $isConfigMenuOpen ? 'active' : '' }}"
                    id="configuracoes">

                    <img id="pP" class="icones"
                        src="{{ $isConfigMenuOpen ? asset('img/icones/definicoesP.png') : asset('img/icones/definicoes.png') }}">

                    <div class="text-icones">
                        Configurações
                    </div>
                    <img id="seta-config" class="seta-icone {{ $isConfigMenuOpen ? 'rotated' : '' }}" src="{{ asset('img/icones/seta-baixo.png') }}" alt="Seta">
                </div>

                <div class="submenu" id="submenu-configuracoes" style="{{ $isConfigMenuOpen ? 'display: block;' : 'display: none;' }}">
                    <div onclick="window.location.href='{{ route('admin.perfil-page') }}'"
                        style="{{ request()->routeIs('admin.perfil-page') ? 'background-color: #0c223b;' : '' }}"
                        class="submenu-item">
                        <img class="submenu-icone" src="{{ request()->routeIs('admin.perfil-page') ? asset('img/icones/perfilP.png') : asset('img/icones/perfil.png') }}" alt="Perfil">
                        <span class="submenu-texto">Perfil</span>
                    </div>
                    <div onclick="window.location.href='{{ route('admin.aparencia-page') }}'"
                        style="{{ request()->routeIs('admin.aparencia-page') ? 'background-color: #163149c7;' : '' }}"
                        class="submenu-item">
                        <img class="submenu-icone" src="{{ request()->routeIs('admin.aparencia-page') ? asset('img/icones/aparenciaP.png') : asset('img/icones/aparencia.png') }}" alt="Aparência">
                        <span class="submenu-texto">Aparência</span>
                    </div>
                </div>
            </div> -->
            <div class="legal">
                <div onclick="window.location.href='/logout'" class="navegacao" id="sair">
                    <img id="lP" class="icones" src="{{asset('img/icones/sair.png')}}">
                    <div class="text-icones">
                        Sair
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="conteudo-template">
        <div class="barra-vertical">
            <div class="laboA">
                <h1 class="titulo-page">@yield('titulo')</h1>
            </div>

            <div class="ladoB">
                <div class="toggle" id="switchTema">
                    <div class="ball">
                        <img src="{{url('img/lua.png')}}" class="iconSwitch" id="iconSwitch">
                    </div>
                </div>
                <div class="container-sino">
                    <div style="{{ count($notificacaoNovas) > 0 ? 'display: block;' : 'display: none;' }}" class="numNoti" id="numberNotificacao">
                        @if (count($notificacaoNovas) > 9)
                        +9
                        @else
                        {{ count($notificacaoNovas) }}
                        @endif
                    </div>
                    <img id="notificacao" src="{{url('img/sinoBranco.png')}}" class="sino">
                </div>
                <div class="nome">
                    <label class="label-adm">{{ $admin->nomeAdm }}</label>
                </div>
                <div onclick="window.location.href='{{ route('admin.perfil-page') }}'" class="div-administrador">
                    <img class="fotoI" src="{{$admin->imgAdm ? asset('img/adms/' . $admin->imgAdm) : asset('img/perfilB.png') }}" alt="Foto do administrador">
                </div>
            </div>
        </div>
        @yield('conteudo')
    </div>

    <div class="modalNotificacao">
        <div class="tituloModal1">
            <label class="label-tituloModal" id="label-tituloModalP">Notificações</label>
        </div>
        <div class="conteudo">
            <div class="subtitulo">
                <label class="label-tituloModal">Mensagens</label>
            </div>
            <div id="notificacoesMensagens"></div>
            
            <div class="subtitulo">
                <label class="label-tituloModal">Notícias</label>
            </div>
            <!-- somente deus sabe de onde vem essa variavel -->
            @if(count($notificacaoNovas) > 0)
            @foreach($notificacaoNovas as $novas)
            <div data-id="{{ $novas->idNoticia }}" onclick="visuM(this)" class="card">
                <div class="cardLadoA">
                    <div id="bola">&nbsp;</div>
                    <img class="cartaNotifica" src="{{ $novas->imgNoticia }}" alt="Notificação">
                </div>
                <div class="cardLadoB">
                    <label class="label-tituloNoticia">{{Str::limit($novas->tituloNoticia[0], 100)}}</label>
                </div>
                <div class="cardLadoC">
                    <span style="font-family: 'Poppins', sans-serif;">
                        @php
                        $createdAt = \Carbon\Carbon::parse($novas->created_at);
                        $now = \Carbon\Carbon::now();
                        $diffInHours = $createdAt->diffInHours($now);
                        $diffInDays = $createdAt->diffInDays($now);

                        if ($diffInHours < 1) {
                            $diffInMinutes=$createdAt->diffInMinutes($now);
                            if ($diffInMinutes < 1) {
                                echo 'Agora' ;
                                } else {
                                echo $diffInMinutes . ' min' ;
                                }
                                } elseif ($diffInHours < 24) {
                                echo $diffInHours . ' h' ;
                                } elseif ($diffInDays < 7) {
                                echo $diffInDays . ' dia' . ($diffInDays> 1 ? 's' : '');
                                } else {
                                echo $createdAt->format('d/m');
                                }
                                @endphp
                    </span>
                </div>
            </div>
            @endforeach
            @else
            <div class="estado-vazio">
                <p style="font-size: 2vh;">Nenhuma Noticia nova</p>
            </div>
            @endif

            <!-- <div style="border-top: 0.2vh solid #e1e1e1" class="subtitulo">
                <label class="label-tituloModal">Suporte</label>
            </div>

            @if(count($notificacaoNovas) > 0)
            @foreach($notificacaoNovas as $novas)
            <div class="card">
                <div class="cardLadoA">
                    <img class="cartaNotifica" src="{{ $novas->imgNoticia }}" alt="Notificação">
                </div>
                <div class="cardLadoB">
                    <label class="label-tituloNoticia">{{Str::limit($novas->tituloNoticia[0], 100)}}</label>
                </div>
                <div class="cardLadoC">
                    <span style="font-family: 'Poppins', sans-serif;">
                        @php
                        $createdAt = \Carbon\Carbon::parse($novas->created_at);
                        $now = \Carbon\Carbon::now();
                        $diffInHours = $createdAt->diffInHours($now);
                        $diffInDays = $createdAt->diffInDays($now);

                        if ($diffInHours < 1) {
                            $diffInMinutes=$createdAt->diffInMinutes($now);
                            if ($diffInMinutes < 1) {
                                echo 'Agora' ;
                                } else {
                                echo $diffInMinutes . ' min' ;
                                }
                                } elseif ($diffInHours < 24) {
                                echo $diffInHours . ' h' ;
                                } elseif ($diffInDays < 7) {
                                echo $diffInDays . ' dia' . ($diffInDays> 1 ? 's' : '');
                                } else {
                                echo $createdAt->format('d/m');
                                }
                                @endphp
                    </span>
                </div>
            </div>
            @endforeach
            @else
            <div class="estado-vazio">
                <p>Nenhuma mensagem nova</p>
            </div>
            @endif -->
        </div>
    </div>

    <script src="{{ asset('assetsAdm/js/desing.js') }}"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            function carregarTema() {
                let tema = localStorage.getItem('temaPreferido');

                if (!tema) {
                    tema = getCookie('temaPreferido');
                }

                // 3. Aplicar tema
                document.body.className = 'tema-' + tema;
            }

            function detectarTemaSistema() {
                if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    return 'escuro';
                } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
                    return 'claro';
                }
                return 'padrao';
            }

            function getCookie(nome) {
                const valor = `; ${document.cookie}`;
                const partes = valor.split(`; ${nome}=`);
                if (partes.length === 2) return partes.pop().split(';').shift();
                return null;
            }

            carregarTema();


            if (window.matchMedia) {
                window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
                    const temaUsuario = localStorage.getItem('temaPreferido') || getCookie('temaPreferido');
                    if (!temaUsuario || temaUsuario === 'sistema') {
                        carregarTema();
                    }
                });
            }
        });

        export {tema};
    </script>


    <script src="{{ asset('assetsAdm/js/desing.js') }}"></script>
</body>

</html>