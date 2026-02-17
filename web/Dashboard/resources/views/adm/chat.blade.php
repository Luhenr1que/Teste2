@extends('templetes.templateAdm')
@section('head')
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="{{asset('css/chat.css')}}">
    <title>Suporte</title>
@endsection
@section('titulo')
    Suporte
@endsection
@section('conteudo')
<div class="container">
    <div class="contatos">
        <div class="aberto">
            <div class="type-contatos">Em Aberto</div>
            <!-- <div class="contato-users" onclick="conversa(1)">Carol</div> -->
            <div id="aberto" class="f"></div>
        </div>
        <div class="fechado">
            <div class="type-contatos">Finalizados</div>
            <div id="finalizado"></div>
        </div>
    </div>
    <div class="chat">
        <div class="top-chat" id="top-chat">
            
        </div>
        <div class="mensagens" id="chat">
            
        </div>
        <div class="div-enviar" id="bottomChat">
        </div>
    </div>
</div>
<script src="{{asset('js/chat.js')}}"></script>
@endsection