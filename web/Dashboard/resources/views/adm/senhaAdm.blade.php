@php
    $teste = true;
@endphp
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="icon" href="{{url('img/Globo.png')}}">
    <title>Senha ADM</title>
    <link rel="stylesheet" href="{{ asset('assetsAdm/css/senhaAdm.css') }}">
</head>
<body>
    <div class="container">
        <div class="top-con">
            <img class="logo" src="{{asset('img/globo.png')}}" alt="">
            <h1 class="tito">Alterar Senha</h1>
        </div>
        @if($teste)
            <form class="form-code" action="">
                <div class="texts">
                    <h1 class="text-info" id="primeiro">Verifique seu e-mail</h1>
                    <p class="text-info">Enviamos um código de verificação para o endereço de e-mail associado à sua conta.</p>
                    <p class="text-info" id="ultimo">Use esse código para confirmar sua identidade e redefinir sua senha:</p>
                </div>
                <div class="erro">
                    
                </div>
                <div class="code">
                    <div class="input-wrapper">
                        <input class="in-code" id="c-1" name="cA" type="text" maxlength="1">
                        <div class="caret"></div>
                    </div>
                    <div class="input-wrapper">
                        <input class="in-code" id="c-2" name="cB" type="text" maxlength="1">
                        <div class="caret"></div>
                    </div>
                    <div class="input-wrapper">
                        <input class="in-code" id="c-3" name="cC" type="text" maxlength="1">
                        <div class="caret"></div>
                    </div>
                    <div class="input-wrapper">
                        <input class="in-code" id="c-4" name="cD" type="text" maxlength="1">
                        <div class="caret"></div>
                    </div>
                    <div class="input-wrapper">
                        <input class="in-code" id="c-5" name="cE" type="text" maxlength="1">
                        <div class="caret"></div>
                    </div>
                    <div class="input-wrapper">
                        <input class="in-code" id="c-6" name="cF" type="text" maxlength="1">
                        <div class="caret"></div>
                    </div>
                </div>
                <div class="div-bot">
                    <button>Validar</button>
                </div>
                <div class="links">
                    <a href="/perfil-adm">Voltar</a>
                    <a href="/enviar-email">Reenviar código</a>
                </div>
            </form>
            <script>
                @if(session('code'))
                    let code = @json(session('code'));
                    console.log('Números no console:', code);
                @endif
            </script>
        @else
            
        @endif
    </div>
    <script src="{{ asset('assetsAdm/js/senhaAdm.js') }}"></script>
</body>
</html>