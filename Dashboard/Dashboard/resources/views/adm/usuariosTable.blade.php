@if($usuarios->count() > 0)
<table class="tabela-usuarios">
    <thead>
        <tr class="tr-cabecalho">
            <th class="th-nome">
                <label class="label-th">Nome</label>
            </th>
            <th class="th-condicao">
                <label class="label-th">Condição</label>
            </th>
            <th class="th-email">
                <label class="label-th">Email</label>
            </th>
            <th class="th-crm">
                <label class="label-th">CRM</label>
            </th>
            <th class="th-cpf">
                <label class="label-th">CPF</label>
            </th>
            <th class="th-status">
                <label class="label-th">Status</label>
            </th>
            <th class="th-acoes">
                <label class="label-th">Ações</label>
            </th>
        </tr>
    </thead>
    <tbody>
        @foreach($usuarios as $usuario)
        <tr class="tr-dados">
            <td class="td-nome">{{Str::limit($usuario->nomeUsers, 20)}}</td>
            <td class="td-condicao" style="text-transform: capitalize;">{{$usuario->condicaoUsers}}</td>
            <td class="td-email">{{Str::limit($usuario->emailUsers, 40)}}</td>
            <td class="td-crm">{{$usuario->crmRneUsers}}</td>
            <td class="td-cpf">{{ preg_replace('/(\d{3})(\d{3})(\d{3})(\d{2})/', '$1.$2.$3-$4', $usuario->cpfUsers) }}</td>
            <td class="td-status">
                @if($usuario->statusUsers == 'ativo')
                <label class="textCor Verde">
                    {{$usuario->statusUsers}}
                </label>
                @elseif($usuario->statusUsers == 'inativo')
                <label class="textCor Vermelho">
                    {{$usuario->statusUsers}}
                </label>
                @else
                <label class="textCor Cinza">
                    {{$usuario->statusUsers}}
                </label>
                @endif
            </td>
            <td class="td-acoes">
                <div id="abrir" class="img-efeito" data-user-id="{{$usuario->idUsers}}">
                    <img class="img-excluir B" src="{{url('img/editar.png')}}" alt="Visualizar">
                </div>
                <div style="margin-left: 1.5vh;" id="excluir" class="img-efeito" data-user-id="{{$usuario->idUsers}}">
                    <img class="img-excluir B" src="{{url('img/lixo.png')}}" alt="Excluir">
                </div>
            </td>
        </tr>
        @endforeach
    </tbody>
</table>
@else
<div style="font-family: 'Poppins', sans-serif;" class="erro">
    <label>Nenhum Usuário Encontrado</label>
</div>
@endif