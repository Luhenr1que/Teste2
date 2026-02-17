/* Botão switch */
let trilho = document.getElementById('trilho')
let indicador = document.getElementById('indicador')



/* modo escuro */

const container = document.getElementById('container')
const navBar = document.getElementById('navBar')
const navText = document.querySelectorAll('.navText')
const logo = document.getElementById('logoImg')
const temaImg = document.getElementById('temaImg')
const onda = document.querySelectorAll('.onda')
const txtSobre = document.querySelectorAll('.sobreNos h1')
const txtSobre2 = document.querySelectorAll('.sobreNos h2')
const sobre = document.querySelectorAll('.sobreNos')
const linguagem = document.querySelectorAll('.linguagem')
const ling = document.querySelectorAll('.ling')
const contato = document.querySelectorAll('.contato')
const form = document.querySelectorAll('.form-container')
const inputSingle = document.querySelectorAll('.input-single')
const input = document.querySelectorAll('.input')
const card = document.querySelectorAll('.card')
const footer = document.querySelectorAll('.footer')
const logos = document.querySelectorAll('.logos')
const bdAni = document.querySelectorAll('.bgAnimation')
const colorBox = document.querySelectorAll('.colorBox')
const select = document.querySelectorAll('.input-select')

const tema = localStorage.getItem('container','navbar')

function aplicarTema (tema){
    if(tema ==='dark'){
        container.classList.remove('light')
        container.classList.add('dark')
        navBar.classList.remove('light')
        navBar.classList.add('dark')
        logo.src= './img/AquaDev_Menor2.png'
        temaImg.src="./img/night.png"
        trilho.classList.add('dark');
        trilho.classList.remove('light');

        select.forEach(el => {
            el.classList.add('dark');
        });
        colorBox.forEach(el => {
            el.classList.add('dark');
        });
        bdAni.forEach(el => {
            el.classList.add('dark');
        });
        logos.forEach(el => {
            el.classList.add('dark');
        });
        footer.forEach(el => {
            el.classList.add('dark');
        });
        card.forEach(el => {
            el.classList.add('dark');
        });
        contato.forEach(el => {
            el.classList.add('dark');
        });
        inputSingle.forEach(el => {
            el.classList.add('dark');
        });
        input.forEach(el => {
            el.classList.add('dark');
        });
        form.forEach(el => {
            el.classList.add('dark');
        });
        linguagem.forEach(el => {
            el.classList.add('dark');
        });

        ling.forEach(el => {
            el.classList.add('dark');
        });

        sobre.forEach(el => {
            el.classList.add('dark');
        });

        txtSobre.forEach(titulo => {
            titulo.classList.add('dark');
        });

        txtSobre2.forEach(titulo => {
            titulo.classList.add('dark');
        });

        navText.forEach(link =>{
            link.classList.remove('light')
            link.classList.add('dark')            
        })
        onda.forEach(onda =>{
            onda.classList.add('dark')            
        })
        console.log('yes')
    }else{
        container.classList.remove('dark')
        container.classList.add('light')
        navBar.classList.remove('dark')
        navBar.classList.add('light')
        logo.src= './img/AquaDev_Menor.png'
        temaImg.src="./img/sun.png"
        trilho.classList.add('light');
        trilho.classList.remove('dark');

        select.forEach(el => {
            el.classList.remove('dark');
        });
        colorBox.forEach(el => {
            el.classList.remove('dark');
        });
        bdAni.forEach(el => {
            el.classList.remove('dark');
        });
        logos.forEach(el => {
            el.classList.remove('dark');
        });
        footer.forEach(el => {
            el.classList.remove('dark');
        });
        card.forEach(el => {
            el.classList.remove('dark');
        });
        contato.forEach(el => {
            el.classList.remove('dark');
        });
        inputSingle.forEach(el => {
            el.classList.remove('dark');
        });
        input.forEach(el => {
            el.classList.remove('dark');
        });
        form.forEach(el => {
            el.classList.remove('dark');
        });
        linguagem.forEach(el => {
            el.classList.remove('dark');
        });
        ling.forEach(el => {
            el.classList.remove('dark');
        });

        sobre.forEach(el => {
            el.classList.remove('dark');
        });


        txtSobre.forEach(titulo => {
            titulo.classList.remove('dark');
        });
        txtSobre2.forEach(titulo => {
            titulo.classList.remove('dark');
        });

        navText.forEach(link =>{
            link.classList.remove('dark')
            link.classList.add('light')            
        })
        onda.forEach(onda =>{
            onda.classList.remove('dark')          
        })

        console.log('no')
    }
}

const temaSalvo = localStorage.getItem('tema') || 'light';
aplicarTema(temaSalvo)

trilho.addEventListener('click', () =>{
    const newTema = container.classList.contains('light') ? 'dark' : 'light'
    aplicarTema(newTema)
    localStorage.setItem('tema', newTema)
})
