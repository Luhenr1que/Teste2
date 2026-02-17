 document.addEventListener("DOMContentLoaded", function () {
    function verDados() {
        fetch("/checar", {
            method: "GET",
            headers: {
                "X-CSRF-Token": document
                    .querySelector('meta[name="csrf-token"]')
                    .getAttribute("content"),
            },
        })
            .then((res) => res.json())
            .then((data) => {
                document.getElementById("user-valor").innerHTML =data.users;
                document.getElementById("percentual-user").innerHTML = data.percentual[0];

                document.getElementById("noticia-valor").innerHTML = data.noticias;
                document.getElementById("percentual-noticia").innerHTML = data.percentual[1];

                document.getElementById("ong-valor").innerHTML = data.ongs;
                document.getElementById("percentual-ong").innerHTML = data.percentual[2];
            })
            .catch((err) => console.error("Erro: ", err));
    }
    setInterval(verDados, 3000);

    verDados();
});
 

