@extends('templetes.templateAdm')
@section('head')
<meta name="csrf-token" content="{{ csrf_token() }}">
<link rel="stylesheet" href="{{asset('assetsAdm/css/perfilAdm.css')}}">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11.7.0/dist/sweetalert2.min.css">
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.7.0/dist/sweetalert2.min.js"></script>
<title>Perfil</title>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
@endsection
@section('titulo')
Perfil
@endsection
@section('conteudo')
@php
$admin = Auth::guard('admin')->user();
@endphp
<!-- Não idente essa pagina risco de parar de funcionar (Culpa do Fabiano) -->
<div class="container-perfil" action="/up" method="POST" enctype="multipart/form-data">
    @csrf
    <div class="container-from">
        <button onclick="mudar()" class="editar B">
            <img src="{{ asset('img/editar.png') }}" alt="">
        </button>

        <div class="div-top-perfil">
            <div class="foto-perfil">
                <img class="img-perfil" src="{{$admin->imgAdm ? asset('img/adms/' . $admin->imgAdm) : asset('img/perfil.png')}}" alt="">

                <div class="overlay-text">Editar Imagem</div>
                <button style="display: none;" type="button" class="editar-foto" onclick="document.getElementById('imgAdm').click()">
                    <img src="#" alt="Editar foto">
                </button>
            </div>
            <input id="imgAdm" name="imgAdm" type="file" hidden onchange="previewImage(this)">
        </div>

        <div class="inputs">
            <div class="inpts">
                <div class="input-container">
                    <input
                        id="nome"
                        type="text"
                        class="input-field"
                        value="{{$admin->nomeAdm}}"
                        placeholder=""
                        disabled>
                    <label class="input-label">Nome</label>
                </div>
                <div class="input-container">
                    <input
                        id="email"
                        type="text"
                        class="input-field"
                        value="{{$admin->emailAdm}}"
                        placeholder="" disabled>
                    <label class="input-label">Email</label>
                </div>
            </div>

            <div class="inpts">
                <div class="input-container">
                    <input
                        id="telefoneAdm"
                        name="telefoneAdm"
                        inputmode="numeric" type="text"
                        class="input-field"
                        value="{{$admin->telefoneAdm}}"
                        placeholder="" disabled>
                    <label class="input-label">Telefone</label>
                </div>
                <div class="input-container">
                    <input
                        type="password"
                        class="input-field"
                        value="*******"
                        placeholder="" disabled style="filter: opacity(40%); cursor: not-allowed;">
                    <label style="filter: opacity(40%); cursor: not-allowed;" class="input-label">Senha</label>
                    <label id="troca-senha" class="troca-senha">Trocar senha</label>
                </div>
            </div>
            <div class="botao">
                <button disabled id="salva" style="filter: opacity(40%); cursor: not-allowed;">Salvar</button>
            </div>

        </div>

    </div>
</div>

<div id="container-modal" class="container-modal">
    <form action="{{route('update-senha')}}" method="POST" class="containerTrocarSenha">
        @csrf
        <div class="titulo">
            <h1 class="h1-titulo">Trocar senha</h1>
            <img class="x" src="{{url('img/close.png')}}" alt="">
        </div>

        <div class="trocaSenha">
            <div class="input-container2">
                <input
                    id="senhaA"
                    name="senhaA"
                    type="password"
                    class="input-field2"
                    placeholder="" require>
                <label class="input-label2">Senha antiga</label>
            </div>
            @error('senhaA')
            <div class="error-message" id="error-senhaA">senha errada</div>
            @else
            <div class="error-message" id="error-senhaA"></div>
            @enderror


            <div class="input-container2">
                <input
                    id="senhaN"
                    name="senhaN"
                    type="password"
                    class="input-field2"
                    placeholder="" require>
                <label class="input-label2">Senha nova</label>
            </div>
            <div class="error-message" id="error-senhaN"></div>

            <div class="input-container2">
                <input
                    id="senhaC"
                    name="senhaC"
                    type="password"
                    value="{{ old('senhaC') }}"
                    class="input-field2"
                    placeholder="" require>
                <label class="input-label2">Confirmar senha</label>
            </div>
            <div style="margin-bottom: 1vh;" class="error-message" id="error-senhaC"></div>
        </div>

        <div class="botoes-modal">
            <button type="button" class="button-from">Salvar</button>
        </div>

    </form>
</div>



<script src="{{asset('assetsAdm/js/perfil.js')}}"></script>
<script>
    $(document).ready(function() {
        let tema = localStorage.getItem('temaPreferido') || 'claro';

        @if(session('sucesso'))
        Swal.fire({
            icon: 'success',
            title: 'Sucesso!',
            text: "Senha atualizada com sucesso",
            timer: 2000,
            showConfirmButton: false,
            background: tema === 'escuro' ? 'var(--cor-fundoTable1)' : '#FFFFFF',
            color: tema === 'escuro' ? 'var(--cor-texto)' : '#333333'
        });
        @endif

        @if($errors -> has('senhaA') || $errors -> has('senhaN') || $errors -> has('senhaC'))
        $('#container-modal').addClass('action');
        @endif

        let imagemSelecionada = null;

        $('#imgAdm').change(function(e) {
            if (this.files && this.files[0]) {
                imagemSelecionada = this.files[0];
            }
        });

        function updateAdm() {
            let nome = $('#nome').val();
            let email = $('#email').val();
            let telefone = $('#telefoneAdm').val();

            Swal.fire({
                title: "Tem certeza?",
                text: "Você deseja atualizar seus dados??",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Sim, atualizar!",
                cancelButtonText: "Cancelar",
                background: tema === 'escuro' ? 'var(--cor-fundoTable1)' : '#FFFFFF',
                color: tema === 'escuro' ? 'var(--cor-texto)' : '#333333',
                customClass: {
                    title: 'swal-title',
                    confirmButton: 'btn-confirm',
                    cancelButton: 'btn-cancel'
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: 'Atualizando...',
                        background: tema === 'escuro' ? 'var(--cor-fundoTable1)' : '#FFFFFF',
                        color: tema === 'escuro' ? 'var(--cor-texto)' : '#333333',
                        allowOutsideClick: false,
                        didOpen: () => {
                            Swal.showLoading();
                        }
                    });

                    let usuario = new FormData()
                    usuario.append('nome', nome)
                    usuario.append('email', email)
                    usuario.append('telefone', telefone)

                    if (imagemSelecionada) {
                        usuario.append('imgAdm', imagemSelecionada);
                    }

                    $.ajax({
                        url: "{{route('admin.up')}}",
                        method: 'POST',
                        data: usuario,
                        processData: false,
                        contentType: false,
                        headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                        },
                        success: function() {
                            Swal.fire({
                                icon: "success",
                                title: "Pronto!",
                                text: "Dados atualizados.",
                                timer: 1500,
                                showConfirmButton: false,
                                background: tema === 'escuro' ? 'var(--cor-fundoTable1)' : '#FFFFFF',
                                color: tema === 'escuro' ? 'var(--cor-texto)' : '#333333'
                            }).then(() => {
                                location.reload();
                            });
                        },
                        error: function(e) {
                            Swal.fire({
                                icon: "error",
                                title: "erro!",
                                text: "erro ao atualizar usuario.",
                                timer: 1500,
                                showConfirmButton: false,
                                background: tema === 'escuro' ? 'var(--cor-fundoTable1)' : '#FFFFFF',
                                color: tema === 'escuro' ? 'var(--cor-texto)' : '#333333'
                            })
                            console.log(e)
                        }
                    })
                }
            })
        }

        $('#salva').click(function(e) {
            updateAdm()
        });

        $('#troca-senha').click(function(e) {
            if (!$('#troca-senha').hasClass('enabled')) {
                return;
            }
            console.log('opa')
            e.preventDefault()
            $('#container-modal').addClass('action');
        });

        $('.x').click(function(e) {
            console.log('opa')
            e.preventDefault()
            $('#container-modal').removeClass('action');
        });

        $('.button-from').click(function() {
            Swal.fire({
                title: "Tem certeza?",
                text: "Você deseja atualizar sua senha??",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Sim, atualizar!",
                cancelButtonText: "Cancelar",
                background: tema === 'escuro' ? 'var(--cor-fundoTable1)' : '#FFFFFF',
                color: tema === 'escuro' ? 'var(--cor-texto)' : '#333333',
                customClass: {
                    title: 'swal-title',
                    confirmButton: 'btn-confirm',
                    cancelButton: 'btn-cancel'
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    let form = document.querySelector('.containerTrocarSenha');
                    let formData = new FormData(form);

                    let senhaA = formData.get('senhaA');
                    let senhaN = formData.get('senhaN');
                    let senhaC = formData.get('senhaC');

                    let erros = validarSenhas(senhaA, senhaN, senhaC);

                    if (erros.length === 0) {
                        form.submit();
                    } else {
                        mostrarErrosSenha(erros);
                    }
                }
            })
        });

        function validarSenhas(senhaA, senhaN, senhaC) {
            let erros = [];

            const regras = [{
                    condicao: !senhaA,
                    mensagem: 'Senha antiga é obrigatória',
                    campo: 'senhaA'
                },
                {
                    condicao: !senhaN,
                    mensagem: 'Nova senha é obrigatória',
                    campo: 'senhaN'
                },
                {
                    condicao: !senhaC,
                    mensagem: 'Confirmação de senha é obrigatória',
                    campo: 'senhaC'
                },
                {
                    condicao: senhaN && senhaN.length < 6,
                    mensagem: 'Nova senha deve ter pelo menos 6 caracteres',
                    campo: 'senhaN'
                },
                {
                    condicao: senhaN !== senhaC,
                    mensagem: 'As senhas não coincidem',
                    campo: 'senhaC'
                }
            ];

            regras.forEach(regra => {
                if (regra.condicao) {
                    erros.push({
                        mensagem: regra.mensagem,
                        campo: regra.campo
                    });
                }
            });

            return erros;
        }

        function mostrarErrosSenha(erros) {
            limparErros();

            erros.forEach(erro => {
                $(`#error-${erro.campo}`).text(erro.mensagem).show();
                $(`#${erro.campo}`).addClass('error');
            });
        }

        function limparErros() {
            $('.error-message').text('').hide();
            $('.input-field2').removeClass('error');
        }

        $('.tema').click(function(e) {
            e.preventDefault()
            $('#container-modal2').css('display', 'flex')
        })

        $('.aescuro').click(function(e) {
            e.preventDefault()

            function trocarTema() {
                const temaAtual = document.documentElement.getAttribute('data-tema') || 'claro';
                const novoTema = temaAtual === 'claro' ? 'escuro' : 'claro';

                document.documentElement.setAttribute('data-tema', novoTema);

                // Salvar no backend
                fetch("/admin/trocar-tema", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': '{{ csrf_token() }}'
                    },
                    body: JSON.stringify({
                        tema: novoTema
                    })
                });
            }

            trocarTema();
        })

    })
</script>
@endsection