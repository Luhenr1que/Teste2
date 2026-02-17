<?php

namespace App\Http\Controllers;

use App\Mail\VerificarEmail;
use Illuminate\Http\Request;
use App\Models\Registro;
use Illuminate\Support\Facades\Hash; 
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;
use App\Events\Evento;
use App\Models\ChatModel;
use App\Models\AdmModel;


class RegistroController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $registro = Registro::all();
        return response()->json($registro);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
  public function store(Request $request)
{
    $request->validate([
        'nomeUsers' => 'required|string',
        'emailUsers' => 'required|string|email',
        'dataNasciUsers' => 'required|string',
        'paisOrigemUsers' => 'required|string',
        'telefoneUsers' => 'required|string',
        'senhaUsers' => 'required|string|min:6',
    ]);

    $usuario = Registro::create([
        'nomeUsers' => $request->nomeUsers,
        'emailUsers' => $request->emailUsers,
        'dataNasciUsers' => $request->dataNasciUsers, 
        'paisOrigemUsers' => $request->paisOrigemUsers, 
        'telefoneUsers' => $request->telefoneUsers, 
        'senhaUsers' => bcrypt($request->senhaUsers),
    ]);

    $idUsuario = $usuario->idUsers;

    return response()->json([
        'message' => 'Usuário criado com sucesso!',
        'data' => $usuario,
        'id' => $idUsuario,

    ], 201);
}

public function updateDocuments(Request $request, $idUsers)
{
    $request->validate([
        'cpfUsers' => 'nullable|sometimes|string|max:14',
        'crmRneUsers' => 'nullable|sometimes|string|max:20',
        'mercosulUsers' => 'nullable|sometimes|string|max:20',
        'passaporteUsers' => 'nullable|sometimes|string|max:20',
        'condicaoUsers' => 'nullable|sometimes|string',
    ], [
        'cpfUsers.max' => 'CPF deve ter no máximo 14 caracteres',
        'crmRneUsers.max' => 'CRNM/RNE deve ter no máximo 20 caracteres',
        'mercosulUsers.max' => 'Mercosul deve ter no máximo 20 caracteres',
        'passaporteUsers.max' => 'Passaporte deve ter no máximo 20 caracteres',
        'condicaoUsers.string' => 'Condição deve ser uma string',
    ]);

    $usuario = Registro::find($idUsers);

    if (!$usuario) {
        return response()->json([
            'message' => 'Usuário não encontrado',
        ], 404);
    }

    // Atualiza apenas os campos que foram enviados
    $campos = ['cpfUsers', 'crmRneUsers', 'mercosulUsers', 'passaporteUsers', 'condicaoUsers'];
    
    foreach ($campos as $campo) {
        if ($request->has($campo)) {
            $usuario->$campo = $request->$campo;
        }
    }

    $usuario->save();

    return response()->json([
        'message' => 'Documentos atualizados com sucesso!',
        'data' => $usuario
    ], 200);
}
    public function updateEndereco(Request $request, $idUsers)
{
    $request->validate([
        'lograUsers'=> 'nullable|sometimes|string',
        'numeroUsers'=> 'nullable|sometimes|string',
        'cepUsers'=> 'nullable|sometimes|string',
        'bairroUsers'=> 'nullable|sometimes|string',
        'ruaUsers'=> 'nullable|sometimes|string',
        'cidadeUsers'=> 'nullable|sometimes|string',
        'estadoUsers'=> 'nullable|sometimes|string',
    ]);

    $usuario = Registro::find($idUsers);

    if (!$usuario) {
        return response()->json([
            'message' => 'Usuário não encontrado',
        ], 404);
    }

    // Atualiza apenas os campos que foram enviados
    $campos = ['lograUsers','numeroUsers','cepUsers','bairroUsers','ruaUsers','cidadeUsers','estadoUsers',];
    
    foreach ($campos as $campo) {
        if ($request->has($campo)) {
            $usuario->$campo = $request->$campo;
        }
    }

    $usuario->save();

    return response()->json([
        'message' => 'Endereço atualizado com sucesso!',
        'data' => $usuario
    ], 200);
}

    public function show(string $id)
{
    $transacao = Registro::find($id);

    if (!$transacao) {
        return response()->json(
            ['mensagem' => 'Transação não encontrada'],
            404
        );
    }

    return response()->json($transacao);
}


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
public function update(Request $request, $email, $senhaAtual, $statusUsers)
{
    // Validação dos campos que vêm do body
    $request->validate([
        'emailUsers' => 'sometimes|required|string|email',
        'senhaUsers' => 'sometimes|required|string|min:6',
    ]);

    // Buscar usuário pelo email
    $usuario = Registro::where('emailUsers', $email)->first();

    if (!$usuario) {
        return response()->json(['message' => 'Usuário não encontrado'], 404);
    }

    // Verificar a senha atual usando o parâmetro da URL
    if (!Hash::check($senhaAtual, $usuario->senhaUsers)) {
        return response()->json(['message' => 'Senha atual incorreta'], 401);
    }
    if($usuario->$statusUsers=== 'deletado'){
        return response()->json(['message' => 'Ususario deletado'], 401);
    }

    $idUsuario = $usuario->idUsers;

    // Atualizar campos enviados
    if ($request->filled('emailUsers')) {
        $usuario->emailUsers = $request->emailUsers;
    }

    if ($request->filled('senhaUsers')) {
        $usuario->senhaUsers = bcrypt($request->senhaUsers);
    }

    $usuario->save();

    return response()->json([
        'message' => 'Usuário atualizado com sucesso!',
        'usuario' => $usuario,
        'id' => $idUsuario,
    ]);

}
public function verificarConta(Request $request, $email, $senhaAtual)
{
    // Validação dos campos que vêm do body
    $request->validate([
        'emailUsers' => 'sometimes|required|string|email',
        'senhaUsers' => 'sometimes|required|string|min:6',
    ]);

    // Buscar usuário pelo email
    $usuario = Registro::where('emailUsers', $email)->first();
    
    if (!$usuario) {
        return response()->json(['message' => 'Usuário não encontrado'], 404);
    }

    if ($usuario->statusUsers === 'deletado') {
        return response()->json(['message' => 'Conta deletada']);
    }


    // Verificar a senha atual usando o parâmetro da URL
    if (!Hash::check($senhaAtual, $usuario->senhaUsers)) {
        return response()->json(['message' => 'Senha atual incorreta'], 401);
    }

    // Atualizar campos enviados
    
  

    return response()->json([
        'message' => True,
        'usuario' => $usuario,
    ]);

}


    /**
     * Remove the specified resource from storage.
     */
    public function AtualizarP(Request $request, string $id)
{
    // Validação dos campos
    $request->validate([
        'emailUsers' => 'sometimes|required|string|email',
        'nomeUsers' => 'sometimes|required|string|min:2',
        'telefoneUsers' => 'sometimes|required|string',
    ]);

    $usuario = Registro::find($id);

    if (!$usuario) {
        return response()->json(['message' => 'Usuário não encontrado2'], 404);
    }

    // Atualizar campos enviados no body
    if ($request->filled('emailUsers')) {
        $usuario->emailUsers = $request->emailUsers;
    }

    if ($request->filled('nomeUsers')) {
        $usuario->nomeUsers = $request->nomeUsers; // Fixed: was setting senhaUsers
    }

    if ($request->filled('telefoneUsers')) {
        $usuario->telefoneUsers = $request->telefoneUsers;
    }

    $usuario->save();

    return response()->json([
        'message' => 'Usuário atualizado com sucesso!',
        'usuario' => $usuario,
        'id' => $usuario->idUsers,
    ]);
}
  public function destroy(Request $request,string $id)
{
    $registro = Registro::find($id);

    if ($registro) {
        $registro->statusUsers = 'deletado'; // Atribui o valor diretamente
        $registro->save(); // Salva a alteração no banco
        
        // Ou usando update() se preferir
        // $registro->update(['ststusUsers' => 'deletado']);
    } else {
        // Tratar o caso onde o registro não foi encontrado
        return response()->json(['error' => 'Registro não encontrado'], 404);
    }
    }
    public function email(Request $request){
    $request->validate([
        'nomeUsers' => 'required|string|max:255',
        'emailUsers' => 'required|email',
    ]);
    
    try {
        $nome = $request->nomeUsers;
        $email = $request->emailUsers;
        
        // ✅ GERA o código aqui mesmo
        $codigo = rand(10000, 99999);
        
        // ✅ SALVA na session (se necessário)
        Session::put('codigo_verificacao', $codigo);
        Session::put('email_verificacao', $email);
        
        // ✅ Envia o email com o código
        Mail::to($email)->send(new VerificarEmail($nome, $email, $codigo));

        return response()->json([
            'success' => true,
            'codigo' => $codigo, // ✅ Retorna o código gerado
            'email' => $email,
            'message' => 'Email enviado com sucesso'
        ]);
        
    } catch (\Exception $e) { 
        Log::error('Erro ao enviar email: '.$e->getMessage());
        return response()->json([
            'success' => false,
            'message' => 'Erro ao enviar email: ' . $e->getMessage()
        ], 500);
    }
}
public function atualizarSenha(Request $request, string $id)
{
    Log::info('Dados recebidos no Laravel:', $request->all());
    Log::info('ID recebido:', ['id' => $id]);
    
    $request->validate([
        'senha' => 'required|string|min:6',
    ]);

    $registro = Registro::find($id);

    if (!$registro) {
        return response()->json(['error' => 'Registro não encontrado'], 404);
    }

    $registro->senhaUsers = bcrypt($request->senha);
    $registro->save(); 

    return response()->json([
        'success' => true,
        'message' => 'Senha atualizada com sucesso'
    ]);
}
public function uploadFoto(Request $request) {
    try {
        $request->validate([
            'foto' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'idUsers' => 'required|integer'
        ]);

        $user = Registro::find($request->idUsers);
        if (!$user) {
            return response()->json(['success' => false, 'message' => 'Usuário não encontrado'], 404);
        }

        // 1. DELETAR FOTO ANTERIOR (se existir)
        if ($user->imgUsers) {
            // Extrai apenas o nome do arquivo da URL completa
            $caminhoAntigo = parse_url($user->imgUsers, PHP_URL_PATH);
            $nomeArquivoAntigo = basename($caminhoAntigo);
            
            $caminhoCompletoAntigo = public_path('uploads/perfil/' . $nomeArquivoAntigo);
            
            if (file_exists($caminhoCompletoAntigo)) {
                unlink($caminhoCompletoAntigo);
                Log::info('Foto anterior deletada: ' . $nomeArquivoAntigo);
            }
        }

        // 2. CRIAR NOME PERSONALIZADO PARA A NOVA FOTO
        $image = $request->file('foto');
        $extensao = $image->getClientOriginalExtension();
        
        // Nome do arquivo: perfil_[id]_[timestamp].[extensao]
        $nomeArquivo = 'perfil_' . $user->idUsers . '_' . time() . '.' . $extensao;
        
        // 3. CRIAR PASTA SE NÃO EXISTIR
        $pastaDestino = public_path('uploads/perfil');
        if (!file_exists($pastaDestino)) {
            mkdir($pastaDestino, 0755, true);
            Log::info('Pasta criada: ' . $pastaDestino);
        }

        // 4. MOVER ARQUIVO PARA A PASTA
        $image->move($pastaDestino, $nomeArquivo);

        // 5. SALVAR URL NO BANCO (usando IP fixo para evitar problemas)
        $fotoUrl = '/uploads/perfil/' . $nomeArquivo;
        
        $user->imgUsers = $fotoUrl;
        $user->save();

        // 6. LOG PARA DEBUG
        Log::info('Foto salva:', [
            'usuario_id' => $user->idUsers,
            'nome_arquivo' => $nomeArquivo,
            'caminho' => $fotoUrl,
            'tamanho' => filesize($pastaDestino . '/' . $nomeArquivo) . ' bytes'
        ]);

        return response()->json([
            'success' => true,
            'fotoUrl' => $fotoUrl,
            'nomeArquivo' => $nomeArquivo, // ← Retorna o nome do arquivo também
            'message' => 'Foto atualizada com sucesso'
        ]);

    } catch (\Exception $e) {
        Log::error('Erro no upload: ' . $e->getMessage());
        return response()->json([
            'success' => false,
            'message' => 'Erro ao fazer upload: ' . $e->getMessage()
        ], 500);
    }
}
}