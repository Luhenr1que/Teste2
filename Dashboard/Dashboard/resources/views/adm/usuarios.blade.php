@extends('templetes.templateAdm')
@section('head')

<title>Usuarios</title>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11.7.0/dist/sweetalert2.min.css">
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.7.0/dist/sweetalert2.min.js"></script>
<meta name="csrf-token" content="{{ csrf_token() }}">
<link rel="stylesheet" href="{{url('assetsAdm/css/usuarios.css')}}">

@endsection

@section('titulo')
usuários
@endsection

@section('conteudo')
<div class="container">
    <div class="containerTabela">
        <!-- KPIs -->
        <div class="containerKPIs">
            @for ($i = 0; $i < 3; $i++)
                <div class="cardA">
                <img class="img-icon" src="
                    @if($i == 0)
                        {{ url('img/conjutoPessoasB.png') }}
                    @elseif($i == 1)
                        {{ url('img/imigrante.png') }}
                    @else
                        {{ url('img/refugiado.png') }}
                    @endif
                    " alt="">
                <div class="titulos">
                    <label class="label-card" for="">
                        @if($i == 0)
                        Total
                        @elseif($i == 1)
                        Imigrantes
                        @else
                        Refugiados
                        @endif
                    </label>
                    <label class="label-dados" for="">
                        @if($i == 0)
                        {{$usuariosTotal}}
                        @elseif($i == 1)
                        {{$usuarioImi}}
                        @else
                        {{$usuarioRe}}
                        @endif
                    </label>
                </div>
        </div>
        @endfor
    </div>

    <div class="inputs">
        <div class="cima">
            <div class="titulo">
                <label class="label-titulo" for=""> Gerenciamento de  Usuários</label>
            </div>
        </div>

        <div class="baixo">

            <input id="buscarUsuarios" class="filtro-usuario" type="text" placeholder="Buscar">
            <div class="filtro2">
                <select class="seletStyle" name="" id="condicao">
                    <option value="" disabled selected>Condição</option>
                    <option value="todos">Todos</option>
                    <option value="imigrante">Imigrante</option>
                    <option value="refugiado">Refugiado</option>
                </select>

                <select class="seletStyle" name="" id="status">
                    <option value="" disabled selected>Status</option>
                    <option value="todos">Todos</option>
                    <option value="ativo">Ativo</option>
                    <option value="inativo">Inativo</option>
                </select>
            </div>
        </div>
    </div>

    <div id="tabela" class="tabela">
        @include('adm.usuariosTable', ['usuarios' => $usuarios])
    </div>
    <div class="paginacao">
        {{$usuarios->links('adm.paginatorUsuarios')}}
    </div>
</div>
</div>

<div class="container-modal-ver">
    <div class="containerVer">
        <div class="esqueda">
            <div class="container-img">
                <img class="img-perfil" src="{{url('img/perfil.png')}}" alt="">
            </div>
            <div class="dados-naoEditar">
                <div class="input-container">
                    <input id="nome" type="text" class="input-field" placeholder="" disabled>
                    <label class="input-label c">Nome</label>
                </div>
                <div class="input-container">
                    <input id="email" type="text" class="input-field" placeholder="" disabled>
                    <label class="input-label c">Email</label>
                </div>
                <div class="input-container">
                    <input id="nasci" type="text" class="input-field" placeholder="" disabled>
                    <label class="input-label c">Data de Nascimento</label>
                </div>
                <div class="input-container">
                    <input id="pais" type="text" class="input-field" placeholder="" disabled>
                    <label class="input-label c">País de Origem</label>
                </div>
                <div class="input-container">
                    <input style="text-transform: capitalize;" id="condicaoModal" type="text" class="input-field" placeholder="" disabled>
                    <label class="input-label c">Condição</label>
                </div>
            </div>
        </div>

        <div class="direita">
            <div class="tituloModal">
                <h1 class="tituloVer">Documentos</h1>
            </div>
            <div class="dadosEditar">
                <div class="input-container2">
                    <input id="cpf" type="text" class="input-field2" placeholder="">
                    <label class="input-label2">CPF</label>
                </div>
                <div class="input-container2">
                    <input id="crm" type="text" class="input-field2" placeholder="">
                    <label class="input-label2">CRM</label>
                </div>
                <div class="input-container2">
                    <input id="mercosul" type="text" class="input-field2" placeholder="">
                    <label class="input-label2">Mercosul</label>
                </div>
                <div class="input-container2">
                    <input id="passaport" type="text" class="input-field2" placeholder="">
                    <label class="input-label2">Passaporte</label>
                </div>
                <div class="input-container2">
                    <select style="color: #646464;" class="input-field2" name="" id="statusModal">
                        <option value="ativo">Ativo</option>
                        <option value="inativo">Inativo</option>
                    </select>
                    <label class="input-label2">Status</label>
                </div>
            </div>

            <div class="flutuante">
                <button style="background-color: #818181ff;" id="fecha" class="botao">Voltar</button>
                <button id="update" class="botao" style="background-color: #1a4579;">Editar</button>
            </div>
        </div>

    </div>
</div>

<script>
    let tema = localStorage.getItem('temaPreferido')
    const totalPaginas = {{ $usuarios->lastPage() }};

    $(document).ready(function() {
        let currentPage = 1;
        let userId = null;

        function chamarUsuarios(page = 1) {
            let condicao = $('#condicao').val();
            let status = $('#status').val();
            let buscar = $('#buscarUsuarios').val();

            $.ajax({
                url: "{{ route('filtro-usuarios') }}",
                method: "GET",
                data: {
                    condicao: condicao,
                    status: status,
                    buscar: buscar,
                    page: page
                },
                success: function(response) {
                    $('#tabela').html(response.tabela);
                    $('.paginacao').html(response.paginacao);
                    currentPage = page;
                    history.pushState(null, null, '?page=' + page);
                },
                error: function() {
                    alert('erro ao buscar usuario');
                }
            });
        }

        // Eventos de filtro
        $('#buscarUsuarios').on('input', function() {
            chamarUsuarios(1);
        });

        $('#condicao').change(function() {
            chamarUsuarios(1);
        });

        $('#status').change(function() {
            chamarUsuarios(1);
        });

        // Paginação
        $(document).on('click', '.pagination a', function(e) {
            e.preventDefault();
            let page = $(this).attr('href').split('page=')[1];
            chamarUsuarios(page);
        });

        // Transformar "..." em input
        $(document).on("click", ".ellipsis-btn", function() {
            let li = $(this).closest("li");
            
            li.html(`
                <input type="number" min="1" max="${totalPaginas}" 
                    class="page-input"
                    placeholder="..."
                    style="width: 5vh; padding: 0.5vh 0.8vh; font-size: 2vh; border-radius: 0.6481vh; text-align: center;">
            `);

            li.find("input").focus();
        });

        // ENTER no input → ir para página digitada
        $(document).on("keypress", ".page-input", function(e) {
            if (e.which == 13) {
                let page = parseInt($(this).val());

                if (page >= 1 && page <= totalPaginas) {
                    chamarUsuarios(page);
                } else {
                    $(this).css("border", "0.1852vh solid red");
                    setTimeout(() => {
                        $(this).css("border", "");
                    }, 2000);
                }
            }
        });

        // Foco fora do input também deve processar
        $(document).on("blur", ".page-input", function() {
            let page = parseInt($(this).val());
            
            if (page >= 1 && page <= totalPaginas) {
                chamarUsuarios(page);
            }
        });

        // Modal visualizar
        $(document).on('click', '#abrir', function() {
            userId = $(this).data('user-id');
            carregatDados(userId);
            $('.container-modal-ver').addClass('action');
            $('body').css('overflow', 'hidden');
            
            $.ajax({
                url: "/foto-usuario",
                method: "GET",
                data: { id: userId },
                success: function(response) {
                    console.log("FOTO:", response.foto);
                    $(".img-perfil").attr("src", response.foto).addClass("fotoPerfilUsuario");
                },
                error: function(err) {
                    console.log(err);
                }
            });
        });

        // Fechar modal
        $('#fecha').click(function(e) {
            e.preventDefault();
            $('body').css('overflow', 'auto');
            $('.container-modal-ver').removeClass('action');
        });

        // Carregar dados do usuário no modal
        function carregatDados(userId) {
            $.ajax({
                url: "{{ route('chamar-usuarios') }}",
                method: 'GET',
                data: { id: userId },
                success: function(response) {

                    const [ano,mes,dia] = response.dataNasci.split('-')

                    const dataNascimento = `${dia}/${mes}/${ano}` 

                    const cpfFormatado = response.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')

                    
                    // dados não editáveis
                    $('#nome').val(response.nome);
                    $('#email').val(response.email);
                    $('#nasci').val(dataNascimento);
                    $('#pais').val(response.paisOrigem);

                    // dados editáveis
                    $('#cpf').val(cpfFormatado);
                    $('#crm').val(response.crm);
                    $('#mercosul').val(response.mercosul);
                    $('#passaport').val(response.passaport);
                    $('#condicaoModal').val(response.condicao);
                    $('#statusModal').val(response.status);
                },
                error: function() {
                    alert('dados não encontrados');
                }
            });
        }

        // Atualizar usuário
        $('#update').click(function(e) {
            e.preventDefault();

            Swal.fire({
                title: "Tem certeza?",
                text: "Você deseja atualizar este usuário?",
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

                        cpf = $('#cpf').val().replace(/[^a-zA-Z0-9]/g, '');

                    let formData = {
                        idUsers: userId,
                        cpfUsers: cpf,
                        crmRneUsers: $('#crm').val(),
                        mercosulUsers: $('#mercosul').val(),
                        passaporteUsers: $('#passaport').val(),
                        statusUsers: $('#statusModal').val(),
                        condicaoUsers: $('#condicaoModal').val()
                    };
                    $.ajax({
                        url: "{{ route('update-usuarios') }}",
                        method: 'POST',
                        data: formData,
                        headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                        },
                        success: function() {
                            $('.container-modal-ver').removeClass('action');
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
                        error: function() {
                            Swal.fire({
                                icon: "error",
                                title: "Erro!",
                                text: "Erro ao atualizar dados.",
                                timer: 1500,
                                showConfirmButton: false,
                                background: tema === 'escuro' ? 'var(--cor-fundoTable1)' : '#FFFFFF',
                                color: tema === 'escuro' ? 'var(--cor-texto)' : '#333333'
                            });
                        }
                    });
                }
            });
        });

        // Excluir usuário
        $(document).on('click', '#excluir', function(e) {
            userId = $(this).data('user-id');
            e.preventDefault();
            
            Swal.fire({
                title: "Tem certeza?",
                text: "Você deseja deletar este usuário?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Sim!",
                cancelButtonText: "Cancelar",
                background: tema === 'escuro' ? 'var(--cor-fundoTable1)' : '#FFFFFF',
                color: tema === 'escuro' ? 'var(--cor-texto)' : '#333333',
                customClass: {
                    confirmButton: 'btn-confirm',
                    cancelButton: 'btn-cancel'
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: 'Excluindo...',
                        background: tema === 'escuro' ? 'var(--cor-fundoTable1)' : '#FFFFFF',
                        color: tema === 'escuro' ? 'var(--cor-texto)' : '#333333',
                        allowOutsideClick: false,
                        didOpen: () => {
                            Swal.showLoading();
                        }
                    });

                    $.ajax({
                        url: "{{ route('excluir-usuarios') }}",
                        method: 'POST',
                        data: { id: userId },
                        headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                        },
                        success: function() {
                            Swal.fire({
                                icon: "success",
                                title: "Pronto!",
                                text: "Usuário excluído.",
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
                                title: "Erro!",
                                text: "Erro ao excluir usuário.",
                                timer: 1500,
                                showConfirmButton: false,
                                background: tema === 'escuro' ? 'var(--cor-fundoTable1)' : '#FFFFFF',
                                color: tema === 'escuro' ? 'var(--cor-texto)' : '#333333'
                            });
                            console.log(e);
                        }
                    });
                }
            });
        });

        $(document).on('input', '#cpf', function() {
            let cpf = $(this).val().replace(/\D/g, "");

                if (cpf.length > 11) cpf = cpf.slice(0, 11);

                cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
                cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
                cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

                $(this).val(cpf);

        })

        $(document).on('input', '#crm', function() {
            let crm = $(this).val()

            if (crm.length > 10) crm = crm.slice(0,10)

            $(this).val(crm)
        })

        $(document).on('input', '#mercosul', function() {
            let mercosul = $(this).val()

            if (mercosul.length > 8) mercosul = mercosul.slice(0,8)

            $(this).val(mercosul)
        })

        $(document).on('input', '#passaport', function() {
            let passaport = $(this).val().replace(/[^a-zA-Z0-9]/g, "")

            if (passaport.length > 8) passaport = passaport.slice(0,8)

                passaport = passaport.replace(/^([a-zA-Z]{2})([a-zA-Z]+)/, '1$')

            $(this).val(passaport)
        })
    });
</script>
@endsection