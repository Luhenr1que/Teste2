const frases = [
    'Seja bem-vindo à AquaDev!',
    'Nós criamos soluções para o seu negócio',
    'Conte com a gente!',
];

let index = 0;
let digitando = false;

document.addEventListener('DOMContentLoaded', () => {
    const textElement = document.querySelector('.txt .text');
    if (textElement) {
        startLoop(textElement);
    }
});

async function startLoop(element) {
    if (digitando) return;
    digitando = true;

    while (true) {
        await type(element, frases[index]);
        await wait(2000);
        await erase(element);
        index = (index + 1) % frases.length;
    }
}

async function type(element, texto) {
    let textoAtual = ''; 
    for (const letra of texto) {
        textoAtual += letra;
        element.textContent = textoAtual;
        await wait(100);
    }
}

async function erase(element) {
    let texto = element.textContent;
    for (let i = texto.length; i >= 0; i--) {
        element.textContent = texto.substring(0, i);
        await wait(50);
    }
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/* Slider */

let count = 1;
const slidesTotal = 4;
let intervalo = null;

const radios = document.querySelectorAll('input[name="radioBtn"]');
const labels = document.querySelectorAll('.btnManual');

function atualizarCorBotoes(slideIndex) {
  labels.forEach(label => label.style.backgroundColor = ''); 
  if (labels[slideIndex - 1]) {
    labels[slideIndex - 1].style.backgroundColor = '#797979ff'; 
  }
}

function iniciarSlides() {
  intervalo = setInterval(() => {
    document.getElementById('btn' + count).checked = true;
    atualizarCorBotoes(count);
    count++;
    if (count > slidesTotal) count = 1;
  }, 5000);
}

function parar() {
  clearInterval(intervalo);
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById('btn' + count).checked = true;
  atualizarCorBotoes(count);

  iniciarSlides();

  radios.forEach((radio, i) => {
    radio.addEventListener('change', () => {
      if (radio.checked) {
        count = i + 1; 
        atualizarCorBotoes(count);
        parar();
      }
    });
  });
});

const track = document.querySelector('.carousel-track');
const items = document.querySelectorAll('.carousel-item');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let index1 = 0;
const totalItems = items.length;
const visibleItems = 3;

nextBtn.addEventListener('click', () => {
    if (index1 < totalItems - visibleItems) {
        index1++;
    } else {
        index1 = 0;
    }
    updateCarousel();
});

prevBtn.addEventListener('click', () => {
    if (index1 > 0) {
        index1--;
    } else {
        index1 = totalItems - visibleItems;
    }
    updateCarousel();
});

function updateCarousel() {
    const itemWidth = items[0].offsetWidth;
    track.style.transform = `translateX(-${index1 * itemWidth}px)`;
}


    // Função para pegar parâmetros da URL
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }
    
    const status = getQueryParam('status'); 
    const modalBox = document.querySelectorAll('.blockModal');
    const modal = document.querySelectorAll('.containerModal');

    console.log(status);

    if (status === 'success') {  
      modalBox.forEach(el => {
        el.classList.add('sucesso');
      });
      modal.forEach(el => {
        el.classList.add('aper');
      });

       removeStatusFromURL();

      setTimeout(() =>{
            modalBox.forEach(el => {
          el.classList.remove('sucesso');
        });
        modal.forEach(el => {
          el.classList.remove('aper');
        },);
      },3000)
    } else if (status === 'error') {
      modalBox.forEach(el => {
        el.classList.add('erro');
      });
      modal.forEach(el => {
        el.classList.add('aper');
      });

       removeStatusFromURL();
       
      setTimeout(()=>{
            modalBox.forEach(el => {
          el.classList.remove('erro');
        });
        modal.forEach(el => {
          el.classList.remove('aper');
        });
      },3000)
    }

    function removeStatusFromURL() {
      const url = new URL(window.location);
      url.searchParams.delete('status');
      window.history.replaceState({}, document.title, url.toString());
    }
    