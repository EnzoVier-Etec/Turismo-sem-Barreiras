/*
====================================================
TURISMO SEM BARREIRAS
JavaScript da página Home
====================================================
*/

document.addEventListener("DOMContentLoaded", function () {

    /* ==================================================
       ELEMENTOS DA PÁGINA
    ================================================== */

    const campoDestino = document.querySelector(".input-box input");
    const campoData = document.querySelectorAll(".input-box input")[1];

    const selects = document.querySelectorAll(".input-box select");

    const campoViajantes = selects[0];
    const campoNecessidade = selects[1];

    const botaoBuscar = document.querySelector(".search");

    const cardsDestinos = document.querySelectorAll(".destinos-grid .card");

    const botaoLogin = document.querySelector(".btn-login");

    const botaoChat = document.querySelector(".chat");


    /* ==================================================
       BUSCA PRINCIPAL
    ================================================== */

    if (botaoBuscar) {

        botaoBuscar.addEventListener("click", function () {

            const destino = campoDestino
                ? campoDestino.value.trim()
                : "";

            const data = campoData
                ? campoData.value
                : "";

            const viajantes = campoViajantes
                ? campoViajantes.value
                : "";

            const necessidade = campoNecessidade
                ? campoNecessidade.value
                : "";


            /* Verifica se o destino foi preenchido */

            if (destino === "") {

                mostrarMensagem(
                    "Digite um destino para realizar a busca."
                );

                if (campoDestino) {
                    campoDestino.focus();
                }

                return;
            }


            /* Verifica a data */

            if (campoData && campoData.value !== "") {

                const hoje = new Date();
                hoje.setHours(0, 0, 0, 0);

                const dataEscolhida = new Date(
                    campoData.value + "T00:00:00"
                );


                if (dataEscolhida < hoje) {

                    mostrarMensagem(
                        "Escolha uma data igual ou posterior a hoje."
                    );

                    campoData.focus();

                    return;
                }
            }


            /*
            Guarda os dados da busca.
            Eles podem ser utilizados posteriormente
            pela página de Pacotes.
            */

            const pesquisa = {
                destino: destino,
                data: data,
                viajantes: viajantes,
                necessidade: necessidade
            };


            sessionStorage.setItem(
                "pesquisaTurismo",
                JSON.stringify(pesquisa)
            );


            /*
            Vai para a página de pacotes.
            */

            window.location.href = "Pacotes.html";
        });
    }


    /* ==================================================
       ENTER NO CAMPO DE DESTINO
    ================================================== */

    if (campoDestino) {

        campoDestino.addEventListener("keydown", function (event) {

            if (event.key === "Enter") {

                event.preventDefault();

                if (botaoBuscar) {
                    botaoBuscar.click();
                }
            }
        });
    }


    /* ==================================================
       BOTÕES "VER PACOTES"
    ================================================== */

    cardsDestinos.forEach(function (card) {

        const botao = card.querySelector("button");

        if (!botao) {
            return;
        }


        botao.addEventListener("click", function () {

            const titulo = card.querySelector("h3");

            if (!titulo) {
                window.location.href = "Pacotes.html";
                return;
            }


            const destino = titulo.textContent.trim();


            /*
            Guarda o destino escolhido.
            */

            const pesquisa = {
                destino: destino,
                data: "",
                viajantes: "",
                necessidade: ""
            };


            sessionStorage.setItem(
                "pesquisaTurismo",
                JSON.stringify(pesquisa)
            );


            window.location.href = "Pacotes.html";
        });

    });


    /* ==================================================
       MENU
    ================================================== */

    const linksMenu = document.querySelectorAll("#menu a");

    linksMenu.forEach(function (link) {

        link.addEventListener("click", function () {

            /*
            Remove a classe active dos outros links.
            */

            linksMenu.forEach(function (item) {
                item.classList.remove("active");
            });


            /*
            Coloca active no link selecionado.
            */

            link.classList.add("active");

        });

    });


    /* ==================================================
       ROLAGEM SUAVE
    ================================================== */

    const linksInternos = document.querySelectorAll(
        'a[href^="#"]'
    );


    linksInternos.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const destino = link.getAttribute("href");

            if (
                !destino ||
                destino === "#"
            ) {
                return;
            }


            const elemento = document.querySelector(destino);

            if (elemento) {

                event.preventDefault();

                elemento.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    /* ==================================================
       CHAT
    ================================================== */

    if (botaoChat) {

        botaoChat.setAttribute(
            "aria-label",
            "Abrir atendimento"
        );

        botaoChat.setAttribute(
            "role",
            "button"
        );


        botaoChat.addEventListener("click", function () {

            abrirChat();

        });


        botaoChat.addEventListener("keydown", function (event) {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                abrirChat();

            }

        });

    }


    /* ==================================================
       FUNÇÃO DO CHAT
    ================================================== */

    function abrirChat() {

        /*
        Se o chat já estiver aberto,
        não cria outro.
        */

        const chatExistente =
            document.querySelector(".janela-chat");

        if (chatExistente) {

            chatExistente.remove();

            return;
        }


        const janela = document.createElement("div");

        janela.className = "janela-chat";

        janela.setAttribute(
            "role",
            "dialog"
        );

        janela.setAttribute(
            "aria-label",
            "Atendimento Turismo sem Barreiras"
        );


        janela.innerHTML = `

            <div class="chat-cabecalho">

                <strong>Turismo sem Barreiras</strong>

                <button
                    class="fechar-chat"
                    aria-label="Fechar atendimento"
                >
                    ×
                </button>

            </div>


            <div class="chat-corpo">

                <p>
                    Olá! 👋
                </p>

                <p>
                    Como podemos ajudar?
                </p>

                <button class="opcao-chat">
                    Encontrar um pacote
                </button>

                <button class="opcao-chat">
                    Dúvidas sobre acessibilidade
                </button>

                <button class="opcao-chat">
                    Falar com atendimento
                </button>

            </div>

        `;


        document.body.appendChild(janela);


        /*
        Botão fechar
        */

        const fechar =
            janela.querySelector(".fechar-chat");


        fechar.addEventListener("click", function () {

            janela.remove();

            if (botaoChat) {
                botaoChat.focus();
            }

        });


        /*
        Opções do chat
        */

        const opcoes =
            janela.querySelectorAll(".opcao-chat");


        opcoes.forEach(function (opcao) {

            opcao.addEventListener("click", function () {

                mostrarMensagem(
                    "Em breve um atendente poderá ajudar você."
                );

            });

        });


        /*
        Fecha com ESC
        */

        function fecharComEsc(event) {

            if (event.key === "Escape") {

                janela.remove();

                document.removeEventListener(
                    "keydown",
                    fecharComEsc
                );

                if (botaoChat) {
                    botaoChat.focus();
                }

            }

        }


        document.addEventListener(
            "keydown",
            fecharComEsc
        );

    }


    /* ==================================================
       MENSAGEM NA TELA
    ================================================== */

    function mostrarMensagem(texto) {

        /*
        Remove mensagem anterior.
        */

        const anterior =
            document.querySelector(".mensagem-site");

        if (anterior) {
            anterior.remove();
        }


        const mensagem =
            document.createElement("div");


        mensagem.className =
            "mensagem-site";


        mensagem.setAttribute(
            "role",
            "alert"
        );


        mensagem.textContent =
            texto;


        document.body.appendChild(mensagem);


        /*
        Remove automaticamente depois
        de alguns segundos.
        */

        setTimeout(function () {

            if (mensagem) {
                mensagem.remove();
            }

        }, 4000);

    }


    /* ==================================================
       ACESSIBILIDADE DOS CARDS
    ================================================== */

    cardsDestinos.forEach(function (card) {

        card.setAttribute(
            "tabindex",
            "0"
        );


        card.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    const botao =
                        card.querySelector("button");

                    if (botao) {
                        botao.click();
                    }

                }

            }
        );

    });


    /* ==================================================
       ACESSIBILIDADE DOS BOTÕES
    ================================================== */

    const botoes =
        document.querySelectorAll("button");


    botoes.forEach(function (botao) {

        botao.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {

                    botao.click();

                }

            }
        );

    });


    /* ==================================================
       DATA MÍNIMA
    ================================================== */

    if (campoData) {

        const hoje = new Date();

        const ano =
            hoje.getFullYear();

        const mes =
            String(
                hoje.getMonth() + 1
            ).padStart(2, "0");

        const dia =
            String(
                hoje.getDate()
            ).padStart(2, "0");


        campoData.min =
            `${ano}-${mes}-${dia}`;

    }


    /* ==================================================
       RECUPERAR PESQUISA ANTERIOR
    ================================================== */

    const pesquisaSalva =
        sessionStorage.getItem(
            "pesquisaTurismo"
        );


    if (pesquisaSalva) {

        try {

            const pesquisa =
                JSON.parse(pesquisaSalva);


            if (
                campoDestino &&
                pesquisa.destino
            ) {

                campoDestino.value =
                    pesquisa.destino;

            }


            if (
                campoData &&
                pesquisa.data
            ) {

                campoData.value =
                    pesquisa.data;

            }


            if (
                campoViajantes &&
                pesquisa.viajantes
            ) {

                campoViajantes.value =
                    pesquisa.viajantes;

            }


            if (
                campoNecessidade &&
                pesquisa.necessidade
            ) {

                campoNecessidade.value =
                    pesquisa.necessidade;

            }

        } catch (erro) {

            console.log(
                "Não foi possível recuperar a pesquisa."
            );

        }

    }


    /* ==================================================
       ANIMAÇÃO DOS ELEMENTOS AO ENTRAR NA TELA
    ================================================== */

    const elementosAnimados =
        document.querySelectorAll(
            ".card, .passos-grid > div, .agencia-section"
        );


    const observador =
        new IntersectionObserver(
            function (entradas) {

                entradas.forEach(function (entrada) {

                    if (entrada.isIntersecting) {

                        entrada.target.classList.add(
                            "aparecer"
                        );

                        observador.unobserve(
                            entrada.target
                        );

                    }

                });

            },
            {
                threshold: 0.15
            }
        );


    elementosAnimados.forEach(function (elemento) {

        observador.observe(elemento);

    });


    /* ==================================================
       LOG
    ================================================== */

    console.log(
        "Home.js carregado com sucesso!"
    );

});