document.addEventListener("DOMContentLoaded", () => {
    const inputs = document.querySelectorAll(".in-code");

    // Foca no primeiro input ao carregar a página
    if (inputs.length > 0) {
        inputs[0].focus();
    }

    inputs.forEach((input, index) => {

        // Ao digitar algo
        input.addEventListener("input", (e) => {
            let value = e.target.value;

            // Permite apenas números
            if (/[^0-9]/.test(value)) {
                e.target.value = ""; // limpa se não for número
                return;
            }

            // Se digitou algo válido, vai pro próximo input
            if (value.length > 0) {
                e.target.value = value[0]; // garante apenas 1 caractere
                if (index < inputs.length - 1) {
                    inputs[index + 1].focus();
                } else {
                    // último input, tira foco
                    e.target.blur();
                }
            }
        });

        // Permite voltar para o input anterior com backspace
        input.addEventListener("keydown", (e) => {
            if (e.key === "Backspace" && input.value.length === 0 && index > 0) {
                inputs[index - 1].focus();
            }
        });

        // Seleciona todo o conteúdo ao focar (substitui se digitar)
        input.addEventListener("focus", (e) => {
            e.target.select();
        });
    });
});
