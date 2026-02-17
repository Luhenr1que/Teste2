const dialog = document.getElementById("edit");
let idMensagemEditando = null;

function fechar() {
    dialog.close();
}

function fecharAoClicarFora(event) {
    if (event.target === dialog) {
        fechar();
    }
}

const token = document.querySelector('meta[name="csrf-token"]').content;
const sendBtn = document.getElementById('send');
const textarea = document.getElementById('mensagem');
const chat = document.getElementById('chat');

async function enviarMensagem() {
    const mensagem = textarea.value.trim();
    if (!mensagem) return;

    try {
        const resposta = await fetch("/enviar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": token
            },
            body: JSON.stringify({ mensagem })
        });

        const data = await resposta.json();

        if (data.status) {
            textarea.value = "";
            getMensagem();
        } else {
            console.error("Erro ao enviar mensagem:", data);
        }
    } catch (erro) {
        console.error("Erro ao enviar mensagem:", erro);
    }
}

sendBtn.addEventListener("click", enviarMensagem);

textarea.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        enviarMensagem();
    }
});

const lineHeight = parseFloat(getComputedStyle(textarea).lineHeight);
const maxHeight = lineHeight * 3;

textarea.addEventListener('input', () => {
    textarea.style.height = 'auto';
    const newHeight = Math.min(textarea.scrollHeight, maxHeight);
    textarea.style.height = newHeight + 'px';
    textarea.style.overflowY = textarea.scrollHeight > maxHeight ? 'auto' : 'hidden';
    sendBtn.style.height = textarea.style.height;
});

async function apagar(idMensagem) {
    try {
        const resposta = await fetch(`/apagar/${idMensagem}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": token
            },
        });

        const data = await resposta.json();

        if (data.status) {
            getMensagem();
        } else {
            console.error("Erro ao apagar mensagem: ", data);
        }
    } catch (Erro) {
        console.error("Erro: ", Erro);
    }
}

async function abrir(idMensagem) {
    idMensagemEditando = idMensagem;

    const textoOriginal = document.getElementById(`m${idMensagem}`).textContent.trim();

    document.getElementById("original").innerHTML = `<p>${textoOriginal}</p>`;
    document.getElementById("atualizada").value = textoOriginal;

    dialog.showModal();
}

// 🟢 ENVIAR EDIÇÃO
document.getElementById("send-atualizado").addEventListener("click", async (e) => {
    e.preventDefault(); // evita reload do form

    const mensagem = document.getElementById("atualizada").value.trim();
    if (!mensagem) return;

    try {
        const resposta = await fetch(`/editar/${idMensagemEditando}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": token
            },
            body: JSON.stringify({ atualizada: mensagem }) // ← nome certo que o controller espera
        });

        const data = await resposta.json();

        if (data.status === "ok") {
            fechar();
            getMensagem();
        } else {
            console.error("Erro ao editar mensagem:", data);
        }
    } catch (erro) {
        console.error("Erro ao editar mensagem:", erro);
    }
});

document.getElementById("cancelar").addEventListener("click", fechar);

async function copiar(idM) {
    try {
        const texto = document.getElementById(idM).textContent.trim();
        await navigator.clipboard.writeText(texto);
        console.log("Texto copiado!");
    } catch (err) {
        console.error("Erro ao copiar:", err);
    }
}

let user = 1;
function conversa(id) {
    user = id;
}
async function getMensagem() {
    try {
        const route = await fetch(`/render/${user}`);
        const resposta = await route.json();

        chat.innerHTML = "";
        if (resposta.status === "ok") {
            resposta.mensagens.forEach(msg => {
                if (msg.enviante === "adm") {
                    chat.innerHTML += `
                        <div class="config" style="flex-direction: row-reverse;">
                            <div class="a" id="m${msg.id}">${msg.mensagens}</div>
                            <div class="functions">
                                <div class="but" onclick="apagar(${msg.id})">Apagar</div>
                                <div class="but" onclick="abrir(${msg.id})">Editar</div>
                                <div class="but" onclick="copiar('m${msg.id}')">Copiar</div>
                            </div>
                        </div>
                    `;
                } else {
                    chat.innerHTML += `
                        <div class="config">
                            <div class="u" id="m${msg.id}">${msg.mensagens}</div>
                            <div class="functions">
                                <div class="but" onclick="apagar(${msg.id})">Apagar</div>
                                <div class="but" onclick="copiar('m${msg.id}')">Copiar</div>
                            </div>
                        </div>
                    `;
                }
            });
        } else {
            chat.innerHTML = "Nenhuma mensagem encontrada";
        }
    } catch (erro) {
        console.error('Erro ao carregar mensagens', erro);
    }
}

setInterval(getMensagem, 1000);
getMensagem();