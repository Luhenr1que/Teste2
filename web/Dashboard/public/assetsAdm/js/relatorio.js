document.querySelector('.abrir').addEventListener('click', function() {
    document.documentElement.style.setProperty('--display', 'flex')
})

document.querySelector('.sair').addEventListener('click', function() {
    document.documentElement.style.setProperty('--display', 'none')
})