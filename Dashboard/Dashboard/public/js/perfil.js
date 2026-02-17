document.getElementById('todos').checked = true;
function abrirEditar(){ $('#sobrePor').addClass("fechar"); }
function fecharEditar(){ $('#sobrePor').removeClass("fechar"); }

$(document).ready(function() {
    let erros = {
        imgAdm: false,
        nomeAdm: false,
        cpfAdm: false,
        telefoneAdm: false,
        emailAdm: false
    };

    function validarCampo(nomeCampo, feedbackId) {
        let timer;
        $('#' + nomeCampo).on('input change', function() {
            clearTimeout(timer);
            var value = this.type === 'file' ? this.files[0] : $(this).val();
            var formData = new FormData();
            formData.append('_token', $('meta[name="csrf-token"]').attr('content'));
            if(value) formData.append(nomeCampo, value);

            timer = setTimeout(function() {
                $.ajax({
                    url: "/validar2.0",
                    method: "POST",
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function() {
                        erros[nomeCampo] = false;
                        $('#' + feedbackId).text('');
                    },
                    error: function(xhr) {
                        var errors = xhr.responseJSON.errors || {};
                        $('#' + feedbackId).text(errors[nomeCampo] ? errors[nomeCampo][0] : '');
                        erros[nomeCampo] = !!errors[nomeCampo];
                    }
                });
            }, 500);
        });
    }

    validarCampo('imgAdm', 'img-feedback');
    validarCampo('nomeAdm', 'nome-feedback');
    validarCampo('cpfAdm', 'cpf-feedback');
    validarCampo('telefoneAdm', 'telefone-feedback');
    validarCampo('emailAdm', 'email-feedback');

    $('form.container-perfil').on('submit', function(e) {
        e.preventDefault();

        if(Object.values(erros).some(v => v)) {
            //essa parte
            return false;
        }

        var formData = new FormData(this);
        $.ajax({
            url: "/validar2.0",
            method: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function() {
                e.currentTarget.submit();
            },
            error: function(xhr) {
                if(xhr.status === 422) {
                    var errors = xhr.responseJSON.errors;
                    for(let campo in errors) {
                        $('#'+campo+'-feedback').text(errors[campo][0]);
                        erros[campo] = true;
                    }
                    
                    //essa parte
                }
            }
        });
    });

});




