<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="{{ asset('css/chat.css') }}">
    <title>chat</title>
</head>
<body>
    <dialog id="edit" class="editar" onclick="fecharAoClicarFora(event)">
        <form class="container-edit">
            <div id="original">

            </div>
            <div class="campo-atualizado">
                <textarea id="atualizada" name="atualizada" placeholder="Escreva uma mensagem..." rows="1"></textarea>
                <div>
                    <button id="cancelar" type="button">Cancelar</button>
                    <button id="send-atualizado" type="submit">Enviar</button>
                </div>
            </div>
        </form>
    </dialog>

    <div class="contatos">
        <div class="conversa" onclick="conversa(1)">Carol</div>
        <div class="conversa" onclick="conversa(2)">Maria</div>
    </div>
    <div class="container">
        <div class="chat">
            <div class="chat-header">
                <h2>Chat Administrador</h2>
            </div>
            <div class="chat-messages" id="chat">
                
            </div>
            <div class="mensagem-form">
                <textarea id="mensagem" name="mensagem" placeholder="Escreva uma mensagem..." rows="1"></textarea>
                <button id="send" type="submit">Enviar</button>
            </div>
        </div>
    </div>
    <script src="{{ asset('js/chat.js')}}"></script>
</body>
</html>