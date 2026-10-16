/*
====================================================
TURISMO SEM BARREIRAS
JavaScript - Central de Ajuda
====================================================
*/

document.addEventListener("DOMContentLoaded", function () {


    /* ==================================================
       BOTÃO FLUTUANTE DE ATENDIMENTO
    ================================================== */

    const botaoAtendimento =
        document.querySelector(".but-touch");


    const botaoOpcoes =
        document.querySelector(".botao-atendimento");


    if (botaoAtendimento) {

        botaoAtendimento.addEventListener(
            "click",
            abrirAtendimento
        );

    }


    if (botaoOpcoes) {

        botaoOpcoes.addEventListener(
            "click",
            abrirAtendimento
        );

    }


    /* ==================================================
       FUNÇÃO DE ATENDIMENTO
    ================================================== */

    function abrirAtendimento() {

        const modalExistente =
            document.querySelector(
                ".modal-atendimento"
            );


        if (modalExistente) {

            fecharModal(modalExistente);

            return;

        }


        const modal =
            document.createElement("div");


        modal.className =
            "modal-atendimento";


        modal.setAttribute(
            "role",
            "dialog"
        );


        modal.setAttribute(
            "aria-modal",
            "true"
        );


        modal.setAttribute(
            "aria-labelledby",
            "titulo-atendimento"
        );


        modal.innerHTML = `

            <div class="modal-atendimento-conteudo">

                <button
                    type="button"
                    class="fechar-atendimento"
                    aria-label="Fechar opções de atendimento"
                >
                    ×
                </button>


                <h2 id="titulo-atendimento">
                    Como podemos ajudar?
                </h2>


                <p>
                    Escolha uma das opções de contato
                    abaixo.
                </p>


                <div class="opcoes-atendimento">


                    <a
                        href="tel:08001234567"
                        class="opcao-atendimento"
                    >

                        <strong>
                            ☎ Telefone
                        </strong>

                        <span>
                            0800 123 4567
                        </span>

                    </a>


                    <a
                        href="mailto:ola@turismosembarreiras.com.br"
                        class="opcao-atendimento"
                    >

                        <strong>
                            ✉ E-mail
                        </strong>

                        <span>
                            ola@turismosembarreiras.com.br
                        </span>

                    </a>


                    <button
                        type="button"
                        class="opcao-atendimento copiar-email"
                    >

                        <strong>
                            📋 Copiar e-mail
                        </strong>

                        <span>
                            Copiar endereço para contato
                        </span>

                    </button>


                </div>


                <p
                    class="mensagem-copia"
                    aria-live="polite"
                ></p>

            </div>

        `;


        document.body.appendChild(modal);


        /* ==================================================
           BOTÃO FECHAR
        ================================================== */

        const botaoFechar =
            modal.querySelector(
                ".fechar-atendimento"
            );


        botaoFechar.addEventListener(
            "click",
            function () {

                fecharModal(modal);

            }
        );


        /* ==================================================
           COPIAR E-MAIL
        ================================================== */

        const botaoCopiar =
            modal.querySelector(
                ".copiar-email"
            );


        const mensagem =
            modal.querySelector(
                ".mensagem-copia"
            );


        botaoCopiar.addEventListener(
            "click",
            async function () {

                const email =
                    "ola@turismosembarreiras.com.br";


                try {

                    await navigator.clipboard.writeText(
                        email
                    );


                    mensagem.textContent =
                        "E-mail copiado com sucesso!";


                } catch (erro) {

                    mensagem.textContent =
                        "Não foi possível copiar automaticamente. E-mail: " +
                        email;

                }

            }
        );


        /* ==================================================
           CLICAR FORA DO MODAL
        ================================================== */

        modal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target === modal
                ) {

                    fecharModal(modal);

                }

            }
        );


        /* ==================================================
           ESC FECHA O MODAL
        ================================================== */

        function escParaFechar(event) {

            if (
                event.key === "Escape"
            ) {

                fecharModal(modal);

            }

        }


        document.addEventListener(
            "keydown",
            escParaFechar
        );


        /* ==================================================
           FOCO
        ================================================== */

        botaoFechar.focus();


        /* ==================================================
           FUNÇÃO FECHAR
        ================================================== */

        function fecharModal(elemento) {

            elemento.remove();


            document.removeEventListener(
                "keydown",
                escParaFechar
            );


            if (botaoAtendimento) {
                botaoAtendimento.focus();
            }

        }

    }


    /* ==================================================
       ACESSIBILIDADE DOS LINKS DO MENU
    ================================================== */

    const linksMenu =
        document.querySelectorAll(
            "#menu a"
        );


    linksMenu.forEach(
        function (link) {

            link.addEventListener(
                "keydown",
                function (event) {

                    if (
                        event.key === "Enter"
                    ) {

                        link.click();

                    }

                }
            );

        }
    );


    /* ==================================================
       ROLAGEM SUAVE
    ================================================== */

    const linksInternos =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    linksInternos.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function (event) {

                    const destino =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !destino ||
                        destino === "#"
                    ) {

                        return;

                    }


                    const elemento =
                        document.querySelector(
                            destino
                        );


                    if (elemento) {

                        event.preventDefault();


                        elemento.scrollIntoView({
                            behavior: "smooth"
                        });

                    }

                }
            );

        }
    );


    /* ==================================================
       ANIMAÇÃO DOS CARDS
    ================================================== */

    const cards =
        document.querySelectorAll(
            ".contato-card"
        );


    if (
        "IntersectionObserver"
        in window
    ) {

        const observador =
            new IntersectionObserver(
                function (entradas) {

                    entradas.forEach(
                        function (entrada) {

                            if (
                                entrada.isIntersecting
                            ) {

                                entrada.target.classList.add(
                                    "card-visivel"
                                );


                                observador.unobserve(
                                    entrada.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.15
                }
            );


        cards.forEach(
            function (card) {

                observador.observe(card);

            }
        );

    }


    /* ==================================================
       TECLA ESC NAS DÚVIDAS
    ================================================== */

    const duvidas =
        document.querySelectorAll(
            ".lista-duvidas details"
        );


    duvidas.forEach(
        function (duvida) {

            const resumo =
                duvida.querySelector(
                    "summary"
                );


            resumo.addEventListener(
                "keydown",
                function (event) {

                    if (
                        event.key === "Enter" ||
                        event.key === " "
                    ) {

                        event.preventDefault();

                        duvida.open =
                            !duvida.open;

                    }

                }
            );

        }
    );


    console.log(
        "Central_ajuda.js carregado com sucesso!"
    );

});