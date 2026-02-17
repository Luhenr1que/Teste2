<?php

namespace App\Http\Controllers\ControllersAdm;

use App\Http\Controllers\Controller;
use App\Models\ModelsNoticia\NoticiaModel;
use App\Models\ModelsAdm as Admin;
use App\Models\ModelsUsuario\UsuarioModel as usuario;
use GuzzleHttp\Psr7\Query;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

use App\Models\ModelsAdm\tb_mensagem as Mensagem;

CONST PAGES = 15;
class homeController extends Controller
{

    
    public function  notificacaoVer(Request $request)
    {
        $idNoticia = $request->input('idNoticia');

        $noticia = NoticiaModel::find($idNoticia);

        if (!$noticia) {
            return response()->json(['error' => 'Notícia não encontrada'], 404);
        }

        $noticia->update(['vistoNoticia' => 1]);

        return response()->json(['success' => true]);
    }


    public function mostrarUsuarios()
    {
        $usuarios = usuario::paginate(PAGES);

        $usuariosTotal = usuario::count();

        $usuarioRe = usuario::where('condicaoUsers', 'refugiado')->count();

        $usuarioImi = usuario::where('condicaoUsers', 'imigrante')->count();

        return view('adm.usuarios', compact('usuarios', 'usuarioRe', 'usuarioImi', 'usuariosTotal'));
    }

    public function ajaxUsuarios(Request $request)
    {
        $query = usuario::query();

        if ($request->condicao && $request->condicao !== 'todos') {
            $query->where('condicaoUsers', $request->condicao);
        }

        if ($request->status && $request->status !== 'todos') {
            $query->where('statusUsers', $request->status);
        }

        if ($request->buscar) {
            $query->where('nomeUsers', 'LIKE', '%' . $request->buscar . '%');
        }


        $usuarios = $query->paginate(PAGES);

        if ($request->ajax()) {
            return response()->json([
                'tabela' => view('adm.usuariosTable', compact('usuarios'))->render(),
                'paginacao' => view('adm.paginatorUsuarios', ['paginator' => $usuarios])->render(),
            ]);
        }


        return view('adm.usuario', compact('usuarios'));
    }

    public function chamarUsuario(Request $request)
    {
        $user = usuario::find($request->id);

        return response()->json([
            'nome' => $user->nomeUsers,
            'dataNasci' => $user->dataNasciUsers,
            'paisOrigem' => $user->paisOrigemUsers,
            'email' => $user->emailUsers,
            'cpf' => $user->cpfUsers,
            'crm' => $user->crmRneUsers,
            'mercosul' => $user->mercosulUsers,
            'passaport' => $user->passaporteUsers,
            'status' => $user->statusUsers,
            'condicao' => $user->condicaoUsers,
            'telefone' => $user->telefoneUsers
            /*  'foto_perfil' => $user->foto_perfil ? asset('storage/' . $user->foto_perfil) : url('img/perfilP.png') */
        ]);
    }
        public function fotoUsuario(Request $request)
    {
        $user = usuario::find($request->id);

        return response()->json([
            "foto" => $user->imgUsers
                ? "http://127.0.0.1:8000" . $user->imgUsers
                : url('img/perfil.png')
        ]);
    }

    public function updateUsers(Request $request)
    {
        $user = usuario::find($request->idUsers);
        $user->update($request->all());
        return response()->json(['succeso' => true]);
    }

    public function excluirUsuario(Request $request)
    {
        $user = usuario::find($request->id);
        $user->update(['statusUsers' => 'deletado']);
        return response()->json(['succeso' => true]);
    }



    //---- Notificação de Mensagem ----//
    public function notificacaoMensagem()
    {
        $mensagens = Mensagem::where('idAdm', auth('admin')->user()->idAdm)
            ->where('status', '!=', 'finalizada')
            ->where('notificacao', 0)
            ->orderBy('created_at', 'DESC')
            ->get()
            ->groupBy('idUsers');

        $userIds = $mensagens->keys()->toArray();

        $usuarios = usuario::whereIn('idUsers', $userIds)
            ->get()
            ->keyBy('idUsers');

        $resultado = [];

        foreach ($mensagens as $idUser => $msgs) {

            $ultima = $msgs->first();

            $resultado[] = [
                'usuario' => $usuarios[$idUser],
                'mensagem' => $ultima,
                'tempo' => $ultima->created_at->diffForHumans()
            ];
        }

        return response()->json([
            'status' => 'ok',
            'notificacoes' => $resultado
        ]);
    }
}
