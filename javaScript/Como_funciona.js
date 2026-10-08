document.addEventListener("DOMContentLoaded", function () {

    /* ==============================
       ANIMAÇÃO DOS CARDS
    ============================== */

    const elementos = document.querySelectorAll(".selo, .beneficio");

    const prefereMenosMovimento =
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefereMenosMovimento) {

        elementos.forEach(function (elemento) {
            elemento.classList.add("visivel");
        });

    } else {

        const observer = new IntersectionObserver(
            function (entradas, observador) {

                entradas.forEach(function (entrada) {

                    if (entrada.isIntersecting) {

                        entrada.target.classList.add("visivel");

                        observador.unobserve(entrada.target);
                    }

                });

            },
            {
                threshold: 0.15
            }
        );

        elementos.forEach(function (elemento) {
            observer.observe(elemento);
        });
    }


    /* ==============================
       LINK "VER PACOTES"
    ============================== */

    const botoesPacotes =
        document.querySelectorAll(".link-etapa, .btn-pacotes");

    botoesPacotes.forEach(function (botao) {

        botao.addEventListener("click", function () {

            sessionStorage.setItem(
                "origemPacotes",
                "Como funciona"
            );

        });

    });


    /* ==============================
       ACESSIBILIDADE DO TECLADO
    ============================== */

    const links = document.querySelectorAll("a");

    links.forEach(function (link) {

        link.addEventListener("keydown", function (event) {

            if (event.key === "Enter") {
                link.click();
            }

        });

    });


    /* ==============================
       ANIMAÇÃO SUAVE PARA ÂNCORAS
    ============================== */

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const destino = link.getAttribute("href");

            if (destino === "#") {
                event.preventDefault();
                return;
            }

            const elemento = document.querySelector(destino);

            if (elemento) {

                event.preventDefault();

                elemento.scrollIntoView({
                    behavior: prefereMenosMovimento ? "auto" : "smooth"
                });

            }

        });

    });


    console.log("Página Como funciona carregada com sucesso.");

});