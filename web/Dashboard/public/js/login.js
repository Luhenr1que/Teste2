// Funções para validação visual
function showError(inputId, message) {
    const input = document.getElementById(inputId);
    const errorSpan = document.getElementById(inputId + 'Error');

    input.classList.add('input-error');
    input.classList.remove('input-success');

    if (errorSpan) {
        errorSpan.textContent = message;
        errorSpan.classList.add('show');
    }
}

function showSuccess(inputId) {
    const input = document.getElementById(inputId);
    const errorSpan = document.getElementById(inputId + 'Error');

    input.classList.remove('input-error');
    input.classList.add('input-success');

    if (errorSpan) {
        errorSpan.classList.remove('show');
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validação em tempo real apenas para os campos existentes
function setupRealTimeValidation() {
    document.getElementById('emailAdm').addEventListener('input', function () {
        if (!this.value.trim() || !isValidEmail(this.value)) {
            showError('emailAdm', 'Email inválido');
        } else {
            showSuccess('emailAdm');
        }
    });

    document.getElementById('senhaAdm').addEventListener('input', function () {
        if (!this.value.trim() || this.value.length < 6) {
            showError('senhaAdm', 'Senha minima de 6 digitos');
        } else {
            showSuccess('senhaAdm');
        }
    });
}

document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    // Mostra loading
    Swal.fire({
        title: 'Carregando...',
        width: 400,
        text: 'Por favor, aguarde',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        showConfirmButton: false,
        didOpen: () => Swal.showLoading()
    });

    try {
        const formData = new FormData(this);

        const response = await fetch(this.action, {
            method: this.method,
            body: formData
        });

        Swal.close();

        if (response.ok) {
            this.submit();
        } else {
            Swal.fire("Erro", "Algo deu errado no login", "error");
        }

    } catch (err) {
        Swal.close();
        Swal.fire("Erro", "Falha de conexão", "error");
    }
});

// Inicializar validação quando a página carregar
document.addEventListener('DOMContentLoaded', function () {
    setupRealTimeValidation();
});







