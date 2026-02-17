<?php

namespace App\Http\Controllers\ControllersAdm;

use App\Http\Controllers\Controller;
use App\Models\ModelsAdm\Admin;
use App\Models\ModelsOng\OngModel;
use App\Models\ModelsAdm\CampanhaModel;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\ModelsNoticia\NoticiaModel;
use App\Models\ModelsOng\ModelCampanha;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

use function Laravel\Prompts\error;


class AdminController extends Controller
{
    //------------------VAILDAR_LOGIN------------------//
    public function validarLogin(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'emailAdm' => 'required|email',
                'senhaAdm' => 'required|min:6',
            ], [
                'emailAdm.required' => 'O e-mail é obrigatório.',
                'emailAdm.email' => 'Informe um e-mail válido.',

                'senhaAdm.required' => 'A senha é obrigatória.',
                'senhaAdm.min' => 'A senha deve ter pelo menos 6 caracteres.',
            ]);
            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            return response()->json(['message' => 'Validação OK!']);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        }
    }

    //------------------LOGAR------------------//
    public function logar(Request $request)
    {
        $credentials = [
            'emailAdm' => $request->emailAdm,
            'password' => $request->senhaAdm
        ];

        if (Auth::guard('admin')->attempt($credentials)) {
            return redirect('/dashboard');
        } else {
            return redirect('/')->with('mensagem', 'Email ou Senha incorretos');
        }
    }

    //------------------LOGOUT------------------//
    public function logout()
    {
        Auth::logout();
        return redirect('/');
    }

    //------------------VAILDAR_UPDATE------------------//
    public function validarUp(Request $request)
    {
        try {
            $admin = Auth::guard('admin')->user();

            $validator = Validator::make($request->all(), [
                'imgAdm' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
                'nomeAdm' => 'nullable|unique:tb_adm,nomeAdm,' . $admin->idAdm . ',idAdm',
                'cpfAdm' => 'nullable|unique:tb_adm,cpfAdm,' . $admin->idAdm . ',idAdm|regex:/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/',
                'telefoneAdm' => 'nullable|unique:tb_adm,telefoneAdm,' . $admin->idAdm . ',idAdm|regex:/^(\+55\s?)?\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/',
                'emailAdm' => 'nullable|email|unique:tb_adm,emailAdm,' . $admin->idAdm . ',idAdm',
            ], [
                //img
                'imgAdm.image' => 'O arquivo deve ser uma imagem válida.',
                'imgAdm.mimes' => 'A imagem deve ser jpeg, png, jpg ou gif.',
                'imgAdm.max' => 'A imagem não pode ultrapassar 2MB.',

                // Nome
                'nomeAdm.unique' => 'Este nome já está em uso.',

                // CPF
                'cpfAdm.unique' => 'Este CPF já está cadastrado.',
                'cpfAdm.regex'   => 'Informe um CPF válido.',

                // Telefone
                'telefoneAdm.unique' => 'Este telefone já está em uso.',
                'telefoneAdm.regex'  => 'Informe um telefone válido.',

                // Email
                'emailAdm.email'  => 'Informe um e-mail válido.',
                'emailAdm.unique' => 'Este e-mail já está cadastrado.',
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }
            return response()->json(['message' => 'Validação OK!']);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        }
    }

    //------------------UPDATE------------------//
    public function up(Request $request)
    {
        $admin = Admin::find(Auth::guard('admin')->user()->idAdm);

        if ($request->filled('nome')) {
            $admin->update(['nomeAdm' => $request->nome]);
        }

        if ($request->filled('telefone')) {
            $admin->update(['telefoneAdm' => $request->telefone]);
        }

        if ($request->filled('email')) {
            $admin->update(['emailAdm' =>  $request->email]);
        }

        if ($request->hasFile('imgAdm')) {
            $file = $request->file('imgAdm');
            $filename = time() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('img/adms'), $filename);
            $admin->imgAdm = $filename;
        }

        $admin->save();

        return response()->json(['sucesso' => true]);
    }

    public function updateSenha(Request $request)
    {
        $admin = Admin::find(Auth::guard('admin')->user()->idAdm);


        if (Hash::check($request->senhaA, $admin->senhaAdm)) {

            if ($request->senhaN !== $request->senhaC) {
                return back()->withErrors(['senhaN' => 'campo senhas diferentes']);
            } else {
                $admin->update(['senhaAdm' => Hash::make($request->senhaN)]);
                return redirect()->back()->with('sucesso', 'Senha atualizada com sucesso!');
            }
        } else {
            return back()->withErrors(['senhaA' => 'senha antiga errada']);
        }
    }
    //------------------CADASTRAR------------------//

    public function cadastrar(Request $request)
    {
        set_time_limit(120);
        $request->validate([
            'nomeAdm' => 'required|string|max:255',
            'cpfAdm' => 'nullable|string|min:10|max:14',
            'emailAdm' => 'required|email|unique:tb_adm,emailAdm',
            'telefoneAdm' => 'nullable|string',
            'senhaAdm' => 'required|string|min:4',
        ], [
            // nomeAdm
            'nomeAdm.required' => 'O nome é obrigatório.',
            'nomeAdm.string' => 'O nome deve ser um texto válido.',
            'nomeAdm.max' => 'O nome não pode ter mais que 255 caracteres.',

            // rgAdm
            'cpfAdm.string' => 'O CPF deve ser um texto.',
            'cpfAdm.min' => 'O CPF deve ter no mínimo 10 caracteres.',
            'cpfAdm.max' => 'O CPF deve ter no máximo 14 caracteres.',

            // emailAdm
            'emailAdm.required' => 'O e-mail é obrigatório.',
            'emailAdm.email' => 'Informe um e-mail válido.',
            'emailAdm.unique' => 'Este e-mail já está cadastrado.',

            // telefoneAdm
            'telefoneAdm.string' => 'O telefone deve ser um texto.',
            'telefoneAdm.regex' => 'Informe um telefone válido no formato (XX) XXXXX-XXXX.',

            // senhaAdm
            'senhaAdm.required' => 'A senha é obrigatória.',
            'senhaAdm.string' => 'A senha deve ser um texto.',
            'senhaAdm.min' => 'A senha deve ter pelo menos 4 caracteres.',
        ]);

        $admin = new Admin();
        $admin->nomeAdm = $request->input('nomeAdm');
        $admin->cpfAdm = $request->input('cpfAdm');
        $admin->emailAdm = $request->input('emailAdm');
        $admin->telefoneAdm = $request->input('telefoneAdm');
        $admin->senhaAdm = bcrypt($request->input('senhaAdm'));
        $admin->status = 'ativo';
        $admin->imgAdm = 'vazio.png';

        $admin->save();

        return response()->json([
            'success' => true,
            'message' => 'Administrador cadastrado com sucesso!',
        ], 201);
    }

    //------------------ATUALIZAR SENHA------------------//

    public function atualizarSenha(Request $request)
    {
        set_time_limit(120);
        $request->validate([
            'cA' => 'required|max:1',
            'cB' => 'required|max:1',
            'cC' => 'required|max:1',
            'cD' => 'required|max:1',
            'cE' => 'required|max:1',
            'cF' => 'required|max:1',
        ], [
            'cA.required' => 'Preencha todos os campos',
            'cA.max:1' => 'Apenas um digito por campo',

            'cB.required' => 'Preencha todos os campos',
            'cB.max:1' => 'Apenas um digito por campo',

            'cC.required' => 'Preencha todos os campos',
            'cC.max:1' => 'Apenas um digito por campo',

            'cD.required' => 'Preencha todos os campos',
            'cD.max:1' => 'Apenas um digito por campo',

            'cE.required' => 'Preencha todos os campos',
            'cE.max:1' => 'Apenas um digito por campo',

            'cF.required' => 'Preencha todos os campos',
            'cF.max:1' => 'Apenas um digito por campo',
        ]);
    }

    public function index(Request $request)
    {
        $noticias = NoticiaModel::orderBy('idNoticia', 'desc')->get();

        return view('adm.situacaoNoticia', compact('noticias'));
    }

    public function ListaNoticia(Request $request)
    {
        $query = NoticiaModel::query()->orderBy('idNoticia', 'desc');

        if ($request->situacao && $request->situacao !== 'tudo') {
            $query->where('StatusNoticia', $request->situacao);
        }

        if ($request->search) {
            $query->where('tituloNoticia', 'LIKE', '%' . $request->search . '%');
        }

        $noticias = $query->get();

        return view('adm.noticiaTable', compact('noticias'));
    }


    public function idAdm(string $id)
    {
        $adm = Admin::find($id);

        return view('adm.perfilAdm', compact('adm'));
    }

    public function aparenciaPage(){
        return view('adm.aparencia');
    }
}
