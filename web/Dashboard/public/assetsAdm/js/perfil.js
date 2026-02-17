//-------------------- PREVIEW DE IMAGEM --------------------//
document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("imgAdm");
    const preview = document.querySelector(".foto-perfil .img-perfil");

    input.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            preview.src = e.target.result;
        };
        reader.readAsDataURL(file);
    });
});
//-------------------- FORMATAÇÃO DE CAMPOS --------------------//

function onlyDigits(str) {
    return str.replace(/\D/g, "");
}

function formatTelefone(value) {
    let digits = onlyDigits(value);
    let formatted = "";

    if (digits.length === 0) return formatted;

    if (digits.length <= 2) {
        formatted += digits; // só os dois primeiros dígitos
    } else if (digits.length <= 6) {
        formatted += `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    } else if (digits.length <= 10) {
        // telefone fixo
        formatted += `(${digits.slice(0, 2)}) ${digits.slice(
            2,
            6
        )}-${digits.slice(6)}`;
    } else {
        // celular
        formatted += `(${digits.slice(0, 2)}) ${digits.slice(
            2,
            7
        )}-${digits.slice(7, 11)}`;
    }

    return formatted;
}

//-------------------- VALIDAÇÃO DE CAMPOS --------------------//
$(document).ready(function () {
    const inputTel = document.getElementById("telefoneAdm");

    inputTel.addEventListener("input", function () {
        const el = this;
        const oldVal = el.value;
        const oldDigitsLeft = onlyDigits(
            oldVal.slice(0, el.selectionStart)
        ).length;

        const formatted = formatTelefone(oldVal);
        el.value = formatted;

        // mantém cursor no lugar certo
        let count = 0;
        let newPos = 0;
        while (newPos < formatted.length && count < oldDigitsLeft) {
            if (/\d/.test(formatted[newPos])) count++;
            newPos++;
        }
        el.setSelectionRange(newPos, newPos);
    });
    const erros = {
        imgAdm: false,
        nomeAdm: false,
        cpfAdm: false,
        telefoneAdm: false,
        emailAdm: false,
    };

    function validarCampo(nomeCampo, feedbackId) {
        let timer;
        $("#" + nomeCampo).on("input change", function () {
            clearTimeout(timer);
            const value = this.type === "file" ? this.files[0] : $(this).val();
            const formData = new FormData();
            formData.append(
                "_token",
                $('meta[name="csrf-token"]').attr("content")
            );
            if (value) formData.append(nomeCampo, value);

            timer = setTimeout(function () {
                $.ajax({
                    url: "/validar2.0",
                    method: "POST",
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function () {
                        erros[nomeCampo] = false;
                        $("#" + feedbackId).text("");
                    },
                    error: function (xhr) {
                        const errors = xhr.responseJSON?.errors || {};
                        $("#" + feedbackId).text(
                            errors[nomeCampo] ? errors[nomeCampo][0] : ""
                        );
                        erros[nomeCampo] = !!errors[nomeCampo];
                    },
                });
            }, 500);
        });
    }

    // Campos a validar
    ["imgAdm", "nomeAdm", "cpfAdm", "telefoneAdm", "emailAdm"].forEach(
        (campo) => {
            validarCampo(campo, campo + "-feedback");
        }
    );

    //-------------------- SUBMISSÃO DO FORMULÁRIO --------------------//
    $("form.container-perfil").on("submit", function (e) {
        e.preventDefault();

        if (Object.values(erros).some((v) => v)) {
            return false; // evita submit se houver erros
        }

        const formData = new FormData(this);
        $.ajax({
            url: "/validar2.0",
            method: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function () {
                e.currentTarget.submit();
            },
            error: function (xhr) {
                if (xhr.status === 422) {
                    const errors = xhr.responseJSON.errors;
                    for (let campo in errors) {
                        $("#" + campo + "-feedback").text(errors[campo][0]);
                        erros[campo] = true;
                    }
                }
            },
        });
    });
});


// Atualizar a função mudar() para incluir a foto
function mudar() {
    const inputs = document.querySelectorAll('.input-field');
    const labels = document.querySelectorAll('.input-label');
    const trocaSenha = document.getElementById('troca-senha');
    const salvaBtn = document.getElementById('salva');
    const fotoPerfil = document.querySelector('.foto-perfil');
    const imgPerfil = document.querySelector('.img-perfil');
    
    // Verifica se está atualmente desabilitado
    const isDisabled = document.getElementById('nome').disabled;
    
    if (isDisabled) {
        // Ativa os campos (exceto senha)
        inputs.forEach(input => {
            if (input.type !== 'password') {
                input.disabled = false;
                input.style.filter = 'opacity(100%)';
                input.style.cursor = 'text';
            }
        });
        
        // Ativa os labels (exceto do campo de senha)
        labels.forEach(label => {
            if (!label.classList.contains('troca-senha') && 
                label.textContent !== 'Senha') {
                label.style.filter = 'opacity(100%)';
                label.style.cursor = 'text';
                label.classList.add('active');
            }
        });
        
        // Ativa a foto de perfil
        fotoPerfil.classList.add('active');
        imgPerfil.style.cursor = 'pointer';
        
        trocaSenha.style.filter = 'opacity(100%)';
        trocaSenha.style.cursor = 'pointer';
        trocaSenha.classList.add('enabled');
        
        salvaBtn.disabled = false;
        salvaBtn.style.filter = 'opacity(100%)';
        salvaBtn.style.cursor = 'pointer';
        
    } else {
        // Desativa os campos (exceto senha)
        inputs.forEach(input => {
            if (input.type !== 'password') {
                input.disabled = true;
                input.style.filter = 'opacity(40%)';
                input.style.cursor = 'not-allowed';
            }
        });
        
        // Desativa os labels (exceto do campo de senha)
        labels.forEach(label => {
            if (!label.classList.contains('troca-senha') && 
                label.textContent !== 'Senha') {
                label.style.filter = 'opacity(40%)';
                label.style.cursor = 'not-allowed';
                label.classList.remove('active');
            }
        });
        
        // Desativa a foto de perfil
        fotoPerfil.classList.remove('active');
        imgPerfil.style.cursor = 'not-allowed';
        
        trocaSenha.style.filter = 'opacity(40%)';
        trocaSenha.style.cursor = 'not-allowed';
        trocaSenha.classList.remove('enabled');
        
        salvaBtn.disabled = true;
        salvaBtn.style.filter = 'opacity(40%)';
        salvaBtn.style.cursor = 'not-allowed';
    }
}

// Função para preview da imagem
function previewImage(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        const imgPerfil = document.querySelector('.img-perfil');
        
        reader.onload = function(e) {
            imgPerfil.src = e.target.result;
        };
        
        reader.readAsDataURL(input.files[0]);
    }
}

// Clique na imagem para abrir o file input (apenas quando ativo)
document.querySelector('.img-perfil').addEventListener('click', function() {
    if (document.querySelector('.foto-perfil').classList.contains('active')) {
        document.getElementById('imgAdm').click();
    }
});