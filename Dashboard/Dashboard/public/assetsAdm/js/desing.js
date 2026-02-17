const atual = window.location.pathname;

// Variável global para controlar o estado do menu de configurações
let isConfigMenuOpen = window.location.href.includes('perfil-page') || window.location.href.includes('aparencia-page');

const itens = [
    { id: 'dashboard', url: 'dashboard', img: 'dP', normal: '/img/home.png', hover: '/img/homeP.png' },
    { id: 'noticias', url: 'situacao-noticia', img: 'nP', normal: '/img/icones/noticia.png', hover: '/img/icones/noticiaP.png' },
    { id: 'suporte', url: 'suporte', img: 'sP', normal: '/img/conversacao.png', hover: '/img/conversacaoP.png' },
    { id: 'perfil', url: 'perfil-page', img: 'pP', normal: '/img/icones/definicoes.png', hover: '/img/icones/definicoesP.png' },
    { id: 'sair', url: 'logout', img: 'lP', normal: '/img/icones/sair.png', hover: '/img/icones/sairP.png' },
    { id: 'usuarios', url: 'usuarios', img: 'uP', normal: '/img/icones/user1.png', hover: '/img/icones/user1p.png' }
];

// Itens do submenu de configurações
const submenuItens = [
    { 
        elemento: '.submenu-item:nth-child(1)', // Perfil
        img: '.submenu-item:nth-child(1) .submenu-icone',
        normal: '/img/icones/perfil.png', 
        hover: '/img/icones/perfilP.png',
        url: 'perfil-page'
    },
    { 
        elemento: '.submenu-item:nth-child(2)', // Aparência
        img: '.submenu-item:nth-child(2) .submenu-icone',
        normal: '/img/icones/aparencia.png', 
        hover: '/img/icones/aparenciaP.png',
        url: 'aparencia-page'
    }
];

itens.forEach(item => {
    const elemento = document.getElementById(item.id);
    if (elemento) {
        const imagem = document.getElementById(item.img);

        // Para o item de configurações, só aplica o hover se não estiver ativo
        if (item.id === 'configuracoes') {
            elemento.addEventListener('mouseenter', () => {
                if (!isConfigMenuOpen) {
                    if (imagem) imagem.src = item.hover;
                }
            });

            elemento.addEventListener('mouseleave', () => {
                if (!isConfigMenuOpen) {
                    if (imagem) imagem.src = item.normal;
                }
            });
        } else {
            // Para os outros itens, comportamento normal
            elemento.addEventListener('mouseenter', () => {
                if (atual.includes(item.url)) return;
                if (imagem) imagem.src = item.hover;
            });

            elemento.addEventListener('mouseleave', () => {
                if (atual.includes(item.url)) return;
                if (imagem) imagem.src = item.normal;
            });
        }
    }
});

// Adicionar hover para os itens do submenu
function setupSubmenuHover() {
    submenuItens.forEach(item => {
        const elemento = document.querySelector(item.elemento);
        const imagem = document.querySelector(item.img);
        
        if (elemento && imagem) {
            elemento.addEventListener('mouseenter', () => {
                // Só muda o ícone se não for a página atual
                if (!window.location.href.includes(item.url)) {
                    imagem.src = item.hover;
                }
            });

            elemento.addEventListener('mouseleave', () => {
                // Só volta ao normal se não for a página atual
                if (!window.location.href.includes(item.url)) {
                    imagem.src = item.normal;
                }
            });
        }
    });
}

// Função para toggle do submenu de configurações
function toggleSubmenu() {
    const submenu = document.getElementById('submenu-configuracoes');
    const seta = document.getElementById('seta-config');
    const configItem = document.getElementById('configuracoes');
    const icon = document.getElementById('pP');
    
    if (isConfigMenuOpen) {
        submenu.style.display = 'none';
        seta.classList.remove('rotated');
        configItem.classList.remove('active');
        configItem.style.backgroundColor = '';
        icon.src = '/img/icones/definicoes.png';
        isConfigMenuOpen = false;
    } else {
        submenu.style.display = 'block';
        seta.classList.add('rotated');
        configItem.classList.add('active');
        configItem.style.backgroundColor = '#163149c7';
        icon.src = '/img/icones/definicoesP.png';
        isConfigMenuOpen = true;
        
        // Configurar o hover dos itens do submenu quando ele é aberto
        setTimeout(setupSubmenuHover, 100);
    }
}

// Configurar hover dos itens do submenu quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    // Se o submenu já estiver aberto (por estar em uma das páginas), configurar o hover
    if (isConfigMenuOpen) {
        setTimeout(setupSubmenuHover, 100);
    }
});

// Fechar submenu ao clicar fora
// document.addEventListener('click', function(event) {
//     const configMenu = document.querySelector('.configuracoes-menu');
//     const submenu = document.getElementById('submenu-configuracoes');
//     const seta = document.getElementById('seta-config');
//     const configItem = document.getElementById('configuracoes');
//     const icon = document.getElementById('pP');
    
//     if (!configMenu.contains(event.target)) {
//         // Só fecha se não estiver em uma página do submenu
//         if (!window.location.href.includes('perfil-page') && !window.location.href.includes('aparencia-page')) {
//             submenu.style.display = 'none';
//             seta.classList.remove('rotated');
//             configItem.classList.remove('active');
//             configItem.style.backgroundColor = '';
//             icon.src = '/img/icones/definicoes.png';
//             isConfigMenuOpen = false;
//         }
//     }
// });

function posicionarModal() {
    const sino = document.querySelector('.container-sino');
    const modal = document.querySelector('.modalNotificacao');
    
    if (sino && modal) {
        const rect = sino.getBoundingClientRect();
        
        // Posiciona o modal abaixo do sino
        modal.style.top = (rect.bottom + window.scrollY + 10) + 'px';
        modal.style.right = (window.innerWidth - rect.right - 10) + 'px';
    }
}

// Evento único para o sino
document.querySelector('.container-sino').addEventListener('click', function () {
    const modal = document.querySelector('.modalNotificacao');
    
    if (modal.style.display === "flex") {
        document.body.style.overflow = "auto";
        modal.style.display = "none";
    } else {
        posicionarModal();
        document.body.style.overflow = "hidden";
        modal.style.display = "flex";
    }
});

// Fechar modal ao clicar fora
document.addEventListener('click', function(event) {
    const modal = document.querySelector('.modalNotificacao');
    const sino = document.querySelector('.container-sino');
    
    if (modal.style.display === "flex" && 
        !modal.contains(event.target) && 
        !sino.contains(event.target)) {
        document.body.style.overflow = "auto";
        modal.style.display = "none";
    }
});

// Reposiciona quando a janela é redimensionada
window.addEventListener('resize', function() {
    const modal = document.querySelector('.modalNotificacao');
    if (modal.style.display === 'flex') {
        posicionarModal();
    }
});

function visuM(el) {
    const id = el.getAttribute('data-id');
    fetch('/VistoNotificacao', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
        },
        body: JSON.stringify({ idNoticia: id })
    })
        .then(response => response.json())
        .then(data => {
            window.location.href = '/situacao-noticia';
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}


// 🔥 Estas funções AGORA são globais e podem ser usadas pelo switch
    function alterarTema(tema) {
        localStorage.setItem('temaPreferido', tema);
        salvarTemaCookie(tema);
        aplicarTema(tema);
        atualizarCardsAtivos(tema);
        sincronizarSwitch();
    }

    function aplicarTema(tema) {
        $('body').removeClass('tema-claro tema-escuro');
        $('body').addClass('tema-' + tema);
    }

    function salvarTemaCookie(tema) {
        const dataExpiracao = new Date();
        dataExpiracao.setFullYear(dataExpiracao.getFullYear() + 1);
        document.cookie = `temaPreferido=${tema}; expires=${dataExpiracao.toUTCString()}; path=/; samesite=lax`;
    }

    function getTemaCookie() {
        const valor = `; ${document.cookie}`;
        const partes = valor.split(`; temaPreferido=`);
        if (partes.length === 2) return partes.pop().split(';').shift();
        return null;
    }

    function atualizarCardsAtivos(tema) {
        $('.cardTema').removeClass('ativo');
        $(`.cardTema[data-tema="${tema}"]`).addClass('ativo');
    }

    function aplicarTemaSalvo() {
        let temaSalvo = localStorage.getItem('temaPreferido') || getTemaCookie();
        if (!temaSalvo) temaSalvo = 'claro';
        aplicarTema(temaSalvo);
        atualizarCardsAtivos(temaSalvo);
    }

    function sincronizarSwitch() {
        const tema = localStorage.getItem('temaPreferido') || getTemaCookie();

        if (tema === 'claro') {
            toggle.classList.add('ativo');
            iconSwitch.src = "img/brilho.png";
        } else {
            toggle.classList.remove('ativo');
            iconSwitch.src = "img/lua.png";
        }
    }


    // --------------------------------------------------------
    // 🔥 Document Ready (somente o que precisa ficar aqui)
    // --------------------------------------------------------
    $(document).ready(function() {

        aplicarTemaSalvo();
        sincronizarSwitch();

        // Clique nos cards
        $('.cardTema').click(function() {
            const tema = $(this).data('tema');
            alterarTema(tema);
        });
    });

    const toggle = document.getElementById('switchTema');
    const iconSwitch = document.getElementById('iconSwitch');

    toggle.addEventListener('click', () => {

        toggle.classList.toggle('ativo');

        if (toggle.classList.contains('ativo')) {
            alterarTema('claro');
            iconSwitch.src = "img/brilho.png ";
        } else {
            alterarTema('escuro');
            iconSwitch.src = "img/lua.png";
        }
    });

let ultimoHTML = "";

async function Notificacao() {
    try {
        const resposta = await fetch('/notificacao-mensagem');
        const dados = await resposta.json();

        if (dados.status !== 'ok') return;

        const lista = document.getElementById('notificacoesMensagens');
        const numeroSpan = document.getElementById('numberNotificacao');

        let baseBlade = numeroSpan.innerText.trim(); // "0", "5" ou "+9"

        if (baseBlade === "+9") {
            baseBlade = 9;
        } else {
            baseBlade = parseInt(baseBlade) || 0;
        }

        let novoHTML = "";
        let countFetch = dados.notificacoes.length;

        if (countFetch === 0) {
            novoHTML = `
                <div class="estado-vazio">
                    <p style="font-size: 2vh;">Nenhuma nova mensagem</p>
                </div>
            `;
        } else {
            dados.notificacoes.forEach(item => {
                novoHTML += `
                    <div class="card" data-id="${item.mensagem.idMensagem}" onclick="abrirChat(${item.usuario.idUsers})">
                        <div class="cardLadoA">
                            <div id="bola">&nbsp;</div>
                            <div class="div-img-user">
                                <img class="imgUser" src="../../img/${item.usuario.imgUsers ?? 'perfil.png'}">
                            </div>
                        </div>
                        <div class="cardLadoB">
                            <div class="dadosNotificacaoUser">
                                <div class="nomeUser">
                                    ${item.usuario.nomeUsers} 
                                </div>
                                <div class="textUser">
                                    ${item.mensagem.mensagens.substring(0, 100)}
                                </div>
                            </div>
                        </div>
                        <div class="cardLadoC">
                            <span style="font-family: 'Poppins', sans-serif;">
                                ${item.tempo}
                            </span>
                        </div>
                    </div>
                `;
            });
        }
        let total = baseBlade + countFetch;

        if (total === 0) {
            numeroSpan.style.display = "none";
        } else {
            numeroSpan.style.display = "block";
            numeroSpan.innerText = total > 9 ? "+9" : total;
        }

        if (novoHTML !== ultimoHTML) {
            lista.innerHTML = novoHTML;
            ultimoHTML = novoHTML;
        }

    } catch (e) {
        console.log("Erro ao buscar notificações:", e);
    }
}

Notificacao();
setInterval(Notificacao, 1000);
