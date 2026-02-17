@extends('templetes.templateAdm')
@section('head')
<title>Aparência</title>
<link rel="stylesheet" href="{{url('assetsAdm/css/aparencia.css')}}">
@endsection

@section('titulo')
Aparência
@endsection

@section('conteudo')
<div class="container">
    <div class="containerAparecencia">
        <div class="cardEscolherTema">
            <div class="legenda">
                <h2>Automático</h2>
            </div>
            <div class="cardTema" data-tema="sistema">
                <img class="icon" src="{{url('img/engrenagem.png')}}" alt="">
            </div>
        </div>

        <div class="cardEscolherTema">
            <div class="legenda">
                <h2>Modo escuro</h2>
            </div>
            <div class="cardTema" data-tema="escuro">
                <img class="icon" src="{{url('img/lua.png')}}" alt="">
            </div>
        </div>

        <div class="cardEscolherTema">
            <div class="legenda">
                <h2>Modo claro</h2>
            </div>
            <div class="cardTema" data-tema="claro">
                <img class="icon" src="{{url('img/brilho.png')}}" alt="">
            </div>
        </div>
    </div>
    
</div>

<script>
    

</script>


@endsection