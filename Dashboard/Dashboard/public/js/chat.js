const chat=document.getElementById('chat');
const bottomChat=document.getElementById('bottomChat');
const aberto=document.getElementById('aberto');
const finalizado=document.getElementById('finalizado');
const top1=document.getElementById('top-chat');

let user=0;
let nomeUsuarioAtual='';
const token=document.querySelector('meta[name="csrf-token"]').content;

async function enviarMensagem() {
    const textarea = document.getElementById('mensagem');
    if (!textarea) return;
    const mensagem = textarea.value.trim();
    if (!mensagem) return;

    // Validar se há usuário selecionado
    if (user === 0) {
        alert('Por favor, selecione uma conversa primeiro.');
        return;
    }

    try {
        const resposta = await fetch("/enviar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": token,
                "Accept": "application/json"
            },
            body: JSON.stringify({ 
                mensagem: mensagem, 
                idUsers: user 
            })
        });

        // Verificar o status da resposta primeiro
        if (!resposta.ok) {
            // Se for erro 500, provavelmente é problema no servidor
            if (resposta.status === 500) {
                const errorText = await resposta.text();
                console.error("Erro interno do servidor:", errorText);
                
                // Tentar extrair informação do erro HTML
                const parser = new DOMParser();
                const doc = parser.parseFromString(errorText, 'text/html');
                const errorElement = doc.querySelector('.exception-message');
                const errorMessage = errorElement ? errorElement.textContent : 'Erro interno do servidor';
                
                throw new Error(`Erro no servidor: ${errorMessage}`);
            }
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }

        // Tentar parsear como JSON
        const data = await resposta.json();
        
        if (data.status) {
            textarea.value = "";
            getMensagem();
        } else {
            console.error("Erro ao enviar mensagem:", data);
            alert("Erro: " + (data.message || "Falha ao enviar mensagem"));
        }
    } catch (erro) {
        console.error("Erro ao enviar mensagem:", erro);
        
        // Mensagem mais amigável para o usuário
        if (erro.message.includes("Column not found") || erro.message.includes("notificacao")) {
            alert("Erro de configuração do sistema. Contate o administrador.");
        } else {
            alert("Erro ao enviar mensagem: " + erro.message);
        }
    }
}

function attachEnterListener(){
    const textarea=document.getElementById('mensagem');
    if(!textarea)return;
    textarea.removeEventListener('keydown',onTextareaKeydown);
    textarea.addEventListener('keydown',onTextareaKeydown);
}

function onTextareaKeydown(e){
    if(e.key==="Enter"&&!e.shiftKey){
        e.preventDefault();
        enviarMensagem();
    }
}

function contato(id,test,nomeUsuario=''){
    user=id;
    nomeUsuarioAtual=nomeUsuario;
    getMensagem();
    atualizarTopChat();

    if(test==0){
        const safeNome=String(nomeUsuario).replace(/'/g,"\\'");
        bottomChat.innerHTML=`
            <div class="div-mensagem">
                <button id="final" onclick="finalizar(${user})">Finalizar Conversa</button>
                <textarea id="mensagem" name="mensagem" placeholder="Escreva uma mensagem" rows="1"></textarea>
                <button id="send" onclick="enviarMensagem()">Enviar</button>
            </div>
        `;
        attachEnterListener();
    }else bottomChat.innerHTML="";
}

function atualizarTopChat(){
    if(user==0){
        top1.innerHTML='';
    }else{
        top1.innerHTML=`
            <div class="info-contato">
                <span class="nome-usuario">${nomeUsuarioAtual}</span>
            </div>
        `;
    }
}

async function getContatos(){
    try{
        const route=await fetch(`/conversa`);
        const resposta=await route.json();

        aberto.innerHTML="";
        finalizado.innerHTML="";

        if(resposta.abertas&&resposta.abertas.length>0){
            resposta.abertas.forEach(userObj=>{
                const safeNome=String(userObj.nomeUsers).replace(/'/g,"\\'");
                aberto.innerHTML+=`
                    <div class="contato" onclick="contato(${userObj.idUsers},0,'${safeNome}')">
                        ${userObj.nomeUsers}
                    </div>
                `;
            });
        }else{
            aberto.innerHTML=`<div class="tudo">Nenhum contato em aberto encontrado</div>`;
        }

        if(resposta.finalizadas&&resposta.finalizadas.length>0){
            resposta.finalizadas.forEach(userObj=>{
                const safeNome=String(userObj.nomeUsers).replace(/'/g,"\\'");
                finalizado.innerHTML+=`
                    <div class="contato" onclick="contato(${userObj.idUsers},1,'${safeNome}')">
                        ${userObj.nomeUsers}
                    </div>
                `;
            });
        }else{
            finalizado.innerHTML=`<div class="nada">Nenhum contato finalizado encontrado</div>`;
        }
    }catch(erro){
        console.error('Erro ao carregar mensagens',erro);
    }
}

async function getMensagem(){
    if(user==0){
        chat.style.justifyContent="center";
        chat.style.alignItems="center";
        chat.style.gap="3vh";
        chat.innerHTML=`
            <div class="text-conversa">
                Selecione uma conversa em aberto.
            </div>
        `;
    }else{
        try{
            const route=await fetch(`/render/${user}`);
            const resposta=await route.json();

            chat.innerHTML="";
            chat.style.justifyContent="";
            chat.style.alignItems="";
            chat.style.gap="2vh";

            if(resposta.status==="ok"){
                resposta.mensagens.forEach(msg=>{
                    if(msg.enviante=="adm"){
                        chat.innerHTML+=`
                            <div class="config" style="flex-direction: row-reverse;">
                                <div class="a" id="m${msg.idMensagem}">${msg.mensagens}</div>
                                <div class="functions">
                                    <div id="img${msg.idMensagem}" class="but B" onclick="copiar('m${msg.idMensagem}','img${msg.idMensagem}')"><img src="../img/copiar.png" alt=""></div>
                                </div>
                            </div>
                        `;
                    }else{
                        chat.innerHTML+=`
                            <div class="config">
                                <div class="u" id="m${msg.idMensagem}">${msg.mensagens}</div>
                                <div class="functions">
                                    <div id="img${msg.idMensagem}" class="but B" onclick="copiar('m${msg.idMensagem}','img${msg.idMensagem}')"><img src="../img/copiar.png" alt=""></div>
                                </div>
                            </div>
                        `;
                    }
                });
                chat.scrollTop=chat.scrollHeight;
            }else chat.innerHTML="Nenhuma mensagem encontrada";
        }catch(erro){
            console.error('Erro ao carregar mensagens',erro);
        }
    }
}

function finalizar(userId){
    fetch('/finalizar',{
        method:'POST',
        headers:{
            "Content-Type":"application/json",
            "X-CSRF-TOKEN":token
        },
        body:JSON.stringify({idUsers:userId})
    }).catch(err=>console.error('Erro ao finalizar:',err));

    user=0;
    nomeUsuarioAtual='';
    atualizarTopChat();
    chat.innerHTML='';
    bottomChat.innerHTML='';
}

function copiar(id,img){
    const el = document.getElementById(id);
    if(!el)return;
    const texto = el.innerText || el.textContent;

    const icon = document.getElementById(img);
    icon.innerHTML = `<img src="../img/check.png">`;

    setTimeout(()=>{
        icon.innerHTML = `<img src="../img/copiar.png">`;
    },2000);

    navigator.clipboard.writeText(texto)
        .then(()=>console.log("Copiado:",texto))
        .catch(err=>console.error("Erro ao copiar:",err));
}

getMensagem();
getContatos();
atualizarTopChat();

setInterval(getMensagem,1500);
setInterval(getContatos,5000);