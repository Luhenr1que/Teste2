var confirma = document.querySelector('.confirma');

var negar = document.querySelector('.negar');

var acaoInput = document.getElementById('acaoInput');

confirma.addEventListener('click', function () {
  console.log('eee')

  Swal.fire({
    title: "Você quer ativar a campanha?",
    icon: 'question',
    showDenyButton: true,
    confirmButtonText: "Sim",
    denyButtonText: `Não`,
    heightAuto: false,
    scrollbarPadding: false,
    backdrop: true
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: 'campanha ativada',
        icon: 'success',
        showDenyButton: false,
        heightAuto: false,
        scrollbarPadding: false,
        backdrop: true

      }).then(() => {
        acaoInput.value = 'ativa';
        document.getElementById('formAprovacao').submit();
      });
    }

  });
})


negar.addEventListener('click', function () {
  console.log('eee')

  Swal.fire({
    title: "Você quer negar a campanha?",
    icon: 'question',
    showDenyButton: true,
    confirmButtonText: "Sim",
    denyButtonText: `Não`,
    heightAuto: false,
    scrollbarPadding: false,
    backdrop: true
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: 'Campanha negada',
        icon: 'success',
        showDenyButton: false,
        heightAuto: false,
        scrollbarPadding: false,
        backdrop: true

      }).then(() => {
        
        document.getElementById('formAprovacao').submit();
      });
    }

  });
})


document.querySelector('.abrir').addEventListener('click', function() {
    document.documentElement.style.setProperty('--display', 'flex')
})

document.querySelector('.sair').addEventListener('click', function() {
    document.documentElement.style.setProperty('--display', 'none')
})