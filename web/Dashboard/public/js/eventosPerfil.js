document.querySelector("#aprova").addEventListener("click", function () {
    let tema = localStorage.getItem('temaPreferido')
    console.log("eee");
    Swal.fire({
        title: "Você quer aprovar essa notícia?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sim",
        cancelButtonText: "Não",
        background: tema === 'escuro' ? '#2C3440' : '#FFFFFF',
        customClass: {
            title: 'swal-title',
            confirmButton: 'btn-confirm',
            cancelButton: 'btn-cancel',
            background: 'modalBack' 
        },
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Notícia Ativada",
                icon: "success",
                showConfirmButton: false,
                showDenyButton: false,
                showCancelButton: false,
                heightAuto: false,
                scrollbarPadding: false,
                backdrop: true,
                background: tema === 'escuro' ? '#2C3440' : '#FFFFFF',
                customClass: {
                    title: 'swal-title',
                },
            })
            document.getElementById("acaoInput").value = "ativa";
            console.log("enviando formulário...");
            document.getElementById("formAtiva").submit();

        }
    });
});

document.querySelector("#negar2").addEventListener("click", function () {
    let tema = localStorage.getItem('temaPreferido')
    Swal.fire({
        title: "Você quer negar essa notícia?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sim",
        cancelButtonText: `Não`,
        heightAuto: true,
        scrollbarPadding: false,
        backdrop: true,
        background: tema === 'escuro' ? '#2C3440' : '#FFFFFF',
        customClass: {
            title: 'swal-title',
            confirmButton: 'btn-confirm',
            cancelButton: 'btn-cancel'
        },
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Notícia Negada",
                icon: "success",
                showConfirmButton: false,
                showDenyButton: false,
                showCancelButton: false,
                heightAuto: false,
                scrollbarPadding: false,
                backdrop: true,
                background: tema === 'escuro' ? '#2C3440' : '#FFFFFF',
                customClass: {
                    title: 'swal-title',
                },
            });
            document.getElementById("motivoInput").value = result.value;
            document.getElementById("formAtiva").submit();
        }
    });
});

function verificarSelecao() {
    const algumSelecionado = document.querySelectorAll('input[name="noticiaSelecionadas[]"]:checked').length > 0;

    document.getElementById("aprova").disabled = !algumSelecionado;
    document.getElementById("negar2").disabled = !algumSelecionado;
}

// roda ao carregar a página
verificarSelecao();

// roda sempre que um checkbox mudar
document.addEventListener("change", function (e) {
    if (e.target.name === "noticiaSelecionadas[]") {
        verificarSelecao();
    }
});
