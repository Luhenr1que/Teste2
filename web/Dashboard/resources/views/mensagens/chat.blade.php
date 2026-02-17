<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="{{ asset('css/chat.css') }}">
    <title>chat</title>
</head>
<body>
    <div class="container">
        <div class="chat">
            <div class="chat-header">
                <h2>Chat Administrador</h2>
            </div>
            <div class="chat-messages">

            </div>
            <form action="foi" class="mensagem-form">
                <textarea id="mensagem" placeholder="Escreva uma mensagem..." rows="1"></textarea>
                <button id="send">Enviar</button>
            </form>
        </div>
    </div>
    <script src="{{ asset('js/chat.js')}}"></script>
</body>
</html>