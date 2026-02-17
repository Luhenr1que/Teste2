<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="{{ asset('css/login.css') }}">
    <link rel="stylesheet" href="{{ asset('css/font.css') }}">
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
    <link rel="icon" href="{{ url('img/Globo.png') }}">
    <title>Login</title>
</head>

<body>
    <div id="container">
        <div id="ladoA">
            <div id="ladoA-conteudo">
                <img class="icon" src="{{ asset('img/imi.png') }}" alt="">
            </div>
        </div>

        <div id="ladoB">
            <div id="ladoB-conteudo">
                <form method="POST" action="/logar" id="loginForm">
                    @csrf
                    <div id="titulo" style="flex-direction: column;">
                        <h2>Login</h2>
                    </div>

                    <div style="color: #dc3545;" class="alert">
                        @if(session('mensagem'))
                            {{ session('mensagem') }}
                        @endif
                    </div>

                    <div class="inputs">
                        <label for="emailAdm">Email</label>
                        <input type="text" id="emailAdm" class="inpt inptL" name="emailAdm" placeholder="Digite o Email"
                            required>
                        <span class="error-message" id="emailAdmError"></span>
                    </div>

                    <div class="inputs" style="position: relative;">
                        <label for="senhaAdm">Senha</label>
                        <input type="password" id="senhaAdm" class="inpt inptL" name="senhaAdm"
                            placeholder="Digite a Senha" required>

                        <button type="button" class="cadeado" onclick="ocultaSenha()">
                            <img id="iconeSenha" style="height: 2.8vh; width: auto;"
                                src="{{ asset('img/trancar.png') }}" alt="Mostrar senha">
                        </button>
                        <span class="error-message" id="senhaAdmError"></span>
                    </div>

                    <div class="inputs" style="height: 10%;">
                        <button class="inptLB" type="submit">Entrar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <script>
        function ocultaSenha() {
            const senha = document.getElementById('senhaAdm');
            const icone = document.getElementById('iconeSenha');

            if (senha.type === 'password') {
                senha.type = 'text';
                icone.src = "{{ asset('img/desbloquear.png') }}";
                icone.alt = "Ocultar senha";
            } else {
                senha.type = 'password';
                icone.src = "{{ asset('img/trancar.png') }}";
                icone.alt = "Mostrar senha";
            }
        }
    </script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="{{ asset('js/login.js') }}"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</body>

</html>
