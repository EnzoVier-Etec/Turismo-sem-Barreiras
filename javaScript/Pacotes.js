/*
====================================================
TURISMO SEM BARREIRAS
JavaScript da página de Pacotes
====================================================
*/

document.addEventListener("DOMContentLoaded", function () {

    /* ==================================================
       ELEMENTOS
    ================================================== */

    const cards = Array.from(
        document.querySelectorAll(".pacote-card")
    );

    const grid = document.querySelector(".pacotes-grid");

    const filtros = document.querySelectorAll(
        ".filtros select"
    );

    const checkboxes = document.querySelectorAll(
        ".check input[type='checkbox']"
    );

    const ordenacao = document.querySelector(
        ".ordenacao select"
    );

    const contador = document.querySelector(
        ".titulo-pagina p"
    );


    /* ==================================================
       DADOS DOS PACOTES
    ================================================== */

    const dadosPacotes = [

        {
            regiao: "Sul",
            cidade: "Foz do Iguaçu",
            deficiencias: [
                "fisica",
                "mobilidade",
                "visual",
                "auditiva"
            ],
            transporte: true,
            hospedagem: true,
            passeio: true,
            duracao: 3,
            preco: 1590,
            avaliacao: 4.9,
            saida: "21 de ago."
        },

        {
            regiao: "Nordeste",
            cidade: "Salvador",
            deficiencias: [
                "fisica",
                "mobilidade",
                "visual",
                "auditiva"
            ],
            transporte: true,
            hospedagem: true,
            passeio: true,
            duracao: 4,
            preco: 1690,
            avaliacao: 4.8,
            saida: "21 de ago."
        },

        {
            regiao: "Sul",
            cidade: "Foz do Iguaçu",
            deficiencias: [
                "fisica",
                "mobilidade",
                "visual",
                "auditiva"
            ],
            transporte: true,
            hospedagem: true,
            passeio: true,
            duracao: 3,
            preco: 1790,
            avaliacao: 4.7,
            saida: "21 de ago."
        },

        {
            regiao: "Sudeste",
            cidade: "Rio de Janeiro",
            deficiencias: [
                "fisica",
                "mobilidade",
                "visual",
                "auditiva"
            ],
            transporte: true,
            hospedagem: true,
            passeio: true,
            duracao: 4,
            preco: 1890,
            avaliacao: 4.8,
            saida: "21 de ago."
        },

        {
            regiao: "Sul",
            cidade: "Gramado",
            deficiencias: [
                "fisica",
                "mobilidade",
                "visual",
                "auditiva"
            ],
            transporte: true,
            hospedagem: true,
            passeio: true,
            duracao: 5,
            preco: 2290,
            avaliacao: 4.8,
            saida: "21 de ago."
        },

        {
            regiao: "Nordeste",
            cidade: "Lençóis Maranhenses",
            deficiencias: [
                "fisica",
                "mobilidade",
                "visual"
            ],
            transporte: true,
            hospedagem: true,
            passeio: true,
            duracao: 4,
            preco: 3290,
            avaliacao: 4.8,
            saida: "21 de ago."
        },

        {
            regiao: "Centro-Oeste",
            cidade: "Bonito",
            deficiencias: [
                "fisica",
                "mobilidade",
                "visual"
            ],
            transporte: true,
            hospedagem: true,
            passeio: true,
            duracao: 5,
            preco: 3290,
            avaliacao: 4.8,
            saida: "21 de ago."
        },

        {
            regiao: "Nordeste",
            cidade: "Fernando de Noronha",
            deficiencias: [
                "fisica",
                "mobilidade",
                "visual"
            ],
            transporte: true,
            hospedagem: true,
            passeio: true,
            duracao: 5,
            preco: 4890,
            avaliacao: 4.9,
            saida: "21 de ago."
        }

    ];


    /* ==================================================
       GUARDAR ORDEM ORIGINAL
    ================================================== */

    cards.forEach(function (card, index) {

        card.dataset.indice = index;

        card.dataset.ordemOriginal = index;

    });


    /* ==================================================
       RECUPERAR PESQUISA DA HOME
    ================================================== */

    let pesquisaHome = null;

    const pesquisaSalva =
        sessionStorage.getItem("pesquisaTurismo");


    if (pesquisaSalva) {

        try {

            pesquisaHome = JSON.parse(
                pesquisaSalva
            );

        } catch (erro) {

            console.log(
                "Erro ao recuperar pesquisa da Home."
            );

        }

    }


    /* ==================================================
       NORMALIZAR TEXTO
    ================================================== */

    function normalizar(texto) {

        if (!texto) {
            return "";
        }

        return texto
            .toString()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .trim();

    }


    /* ==================================================
       CONVERTER NECESSIDADE DA HOME
    ================================================== */

    function converterDeficiencia(texto) {

        const valor = normalizar(texto);


        if (
            valor.includes("fisic") ||
            valor.includes("cadeir") ||
            valor.includes("mobil")
        ) {

            return "fisica";

        }


        if (valor.includes("visual")) {

            return "visual";

        }


        if (valor.includes("auditiv")) {

            return "auditiva";

        }


        if (valor.includes("intelect")) {

            return "intelectual";

        }


        return "";

    }


    /* ==================================================
       ENCONTRAR DESTINO
    ================================================== */

    function destinoCombina(card, destino) {

        if (!destino) {
            return true;
        }


        const busca = normalizar(destino);

        const textoCard = normalizar(
            card.textContent
        );


        /*
        Se o destino digitado aparecer
        no card, considera compatível.
        */

        if (textoCard.includes(busca)) {
            return true;
        }


        /*
        Alguns nomes podem ser digitados
        de formas diferentes.
        */

        const equivalencias = {

            "rio": "rio de janeiro",

            "rio de janeiro": "rio",

            "foz": "foz do iguacu",

            "foz do iguacu": "foz",

            "lencois": "lencois maranhenses",

            "lencois maranhenses": "lencois",

            "fernando": "fernando de noronha",

            "fernando de noronha": "fernando",

            "bonito": "bonito",

            "gramado": "gramado",

            "salvador": "salvador"

        };


        if (
            equivalencias[busca] &&
            textoCard.includes(
                equivalencias[busca]
            )
        ) {

            return true;

        }


        return false;

    }


    /* ==================================================
       MOSTRAR PESQUISA DA HOME
    ================================================== */

    function mostrarPesquisaHome() {

        if (!pesquisaHome) {
            return;
        }


        const destino =
            pesquisaHome.destino || "";

        const necessidade =
            pesquisaHome.necessidade || "";


        if (
            destino === "" &&
            necessidade === ""
        ) {
            return;
        }


        let resumo =
            document.querySelector(
                ".resumo-pesquisa"
            );


        if (!resumo) {

            resumo =
                document.createElement("div");

            resumo.className =
                "resumo-pesquisa";


            const titulo =
                document.querySelector(
                    ".titulo-pagina"
                );


            if (titulo) {

                titulo.appendChild(
                    resumo
                );

            }

        }


        let texto = "Pesquisa realizada";

        if (destino) {

            texto +=
                " para: " + destino;

        }


        if (necessidade) {

            texto +=
                " | Necessidade: " +
                necessidade;

        }


        resumo.textContent = texto;

    }


    /* ==================================================
       FILTRO PRINCIPAL
    ================================================== */

    function aplicarFiltros() {

        const regiaoSelecionada =
            filtros[0]
                ? filtros[0].value
                : "Todas";


        const deficienciaSelecionada =
            filtros[1]
                ? filtros[1].value
                : "Qualquer";


        const precoSelecionado =
            filtros[2]
                ? filtros[2].value
                : "Qualquer";


        const duracaoSelecionada =
            filtros[3]
                ? filtros[3].value
                : "Qualquer";


        /*
        Preço máximo
        */

        let precoMaximo =
            Infinity;


        if (
            precoSelecionado !==
            "Qualquer"
        ) {

            precoMaximo =
                parseInt(
                    precoSelecionado
                        .replace(/\D/g, "")
                );

        }


        /*
        Duração
        */

        let duracaoFiltro =
            null;


        if (
            duracaoSelecionada ===
            "Até 3 dias"
        ) {

            duracaoFiltro = 3;

        }

        else if (
            duracaoSelecionada !==
            "Qualquer"
        ) {

            duracaoFiltro =
                parseInt(
                    duracaoSelecionada
                );

        }


        /*
        Necessidade da Home
        */

        const necessidadeHome =
            pesquisaHome
                ? converterDeficiencia(
                    pesquisaHome.necessidade
                )
                : "";


        /*
        Destino da Home
        */

        const destinoHome =
            pesquisaHome
                ? pesquisaHome.destino
                : "";


        let quantidade =
            0;


        cards.forEach(function (card, index) {

            const dados =
                dadosPacotes[index];


            let mostrar = true;


            /* REGIÃO */

            if (
                regiaoSelecionada !==
                "Todas" &&
                dados.regiao !==
                regiaoSelecionada
            ) {

                mostrar = false;

            }


            /* DEFICIÊNCIA DO FILTRO */

            if (
                mostrar &&
                deficienciaSelecionada !==
                "Qualquer"
            ) {

                const deficiencia =
                    converterDeficiencia(
                        deficienciaSelecionada
                    );


                if (
                    !dados.deficiencias.includes(
                        deficiencia
                    )
                ) {

                    mostrar = false;

                }

            }


            /* DEFICIÊNCIA VINDO DA HOME */

            if (
                mostrar &&
                necessidadeHome
            ) {

                if (
                    !dados.deficiencias.includes(
                        necessidadeHome
                    )
                ) {

                    mostrar = false;

                }

            }


            /* DESTINO VINDO DA HOME */

            if (
                mostrar &&
                destinoHome
            ) {

                if (
                    !destinoCombina(
                        card,
                        destinoHome
                    )
                ) {

                    mostrar = false;

                }

            }


            /* PREÇO */

            if (
                mostrar &&
                dados.preco >
                precoMaximo
            ) {

                mostrar = false;

            }


            /* DURAÇÃO */

            if (
                mostrar &&
                duracaoFiltro !== null
            ) {

                if (
                    duracaoSelecionada ===
                    "Até 3 dias"
                ) {

                    if (
                        dados.duracao > 3
                    ) {

                        mostrar = false;

                    }

                }

                else {

                    if (
                        dados.duracao !==
                        duracaoFiltro
                    ) {

                        mostrar = false;

                    }

                }

            }


            /* ACESSIBILIDADE */

            if (
                mostrar &&
                checkboxes[0] &&
                checkboxes[0].checked
            ) {

                if (!dados.transporte) {

                    mostrar = false;

                }

            }


            if (
                mostrar &&
                checkboxes[1] &&
                checkboxes[1].checked
            ) {

                if (!dados.hospedagem) {

                    mostrar = false;

                }

            }


            if (
                mostrar &&
                checkboxes[2] &&
                checkboxes[2].checked
            ) {

                if (!dados.passeio) {

                    mostrar = false;

                }

            }


            /* MOSTRAR OU ESCONDER */

            if (mostrar) {

                card.style.display = "";

                quantidade++;

            }

            else {

                card.style.display = "none";

            }

        });


        ordenarPacotes();

        atualizarContador(
            quantidade
        );

        verificarNenhumResultado(
            quantidade
        );

    }


    /* ==================================================
       ORDENAÇÃO
    ================================================== */

    function ordenarPacotes() {

        if (!grid || !ordenacao) {
            return;
        }


        const opcao =
            ordenacao.value;


        const cardsOrdenados =
            [...cards];


        cardsOrdenados.sort(
            function (a, b) {

                const dadosA =
                    dadosPacotes[
                        parseInt(
                            a.dataset.indice
                        )
                    ];


                const dadosB =
                    dadosPacotes[
                        parseInt(
                            b.dataset.indice
                        )
                    ];


                if (
                    opcao ===
                    "Menor preço"
                ) {

                    return (
                        dadosA.preco -
                        dadosB.preco
                    );

                }


                if (
                    opcao ===
                    "Maior preço"
                ) {

                    return (
                        dadosB.preco -
                        dadosA.preco
                    );

                }


                if (
                    opcao ===
                    "Melhor avaliação"
                ) {

                    return (
                        dadosB.avaliacao -
                        dadosA.avaliacao
                    );

                }


                /*
                Próxima saída:
                mantém a ordem original.
                */

                return (
                    parseInt(
                        a.dataset.ordemOriginal
                    ) -
                    parseInt(
                        b.dataset.ordemOriginal
                    )
                );

            }
        );


        cardsOrdenados.forEach(
            function (card) {

                grid.appendChild(card);

            }
        );

    }


    /* ==================================================
       CONTADOR
    ================================================== */

    function atualizarContador(
        quantidade
    ) {

        if (!contador) {
            return;
        }


        if (quantidade === 0) {

            contador.textContent =
                "Nenhum pacote encontrado.";

            return;

        }


        contador.textContent =
            quantidade +
            (
                quantidade === 1
                    ? " pacote encontrado"
                    : " pacotes encontrados"
            ) +
            " com acessibilidade auditada";

    }


    /* ==================================================
       NENHUM RESULTADO
    ================================================== */

    function verificarNenhumResultado(
        quantidade
    ) {

        let mensagem =
            document.querySelector(
                ".sem-resultados"
            );


        if (
            quantidade === 0
        ) {

            if (!mensagem) {

                mensagem =
                    document.createElement(
                        "div"
                    );

                mensagem.className =
                    "sem-resultados";

                mensagem.setAttribute(
                    "role",
                    "status"
                );

                mensagem.innerHTML = `
                    <strong>
                        Nenhum pacote encontrado
                    </strong>

                    <p>
                        Tente mudar os filtros
                        ou pesquisar outro destino.
                    </p>

                    <button
                        type="button"
                        class="btn-limpar-resultados"
                    >
                        Limpar filtros
                    </button>
                `;

                grid.appendChild(
                    mensagem
                );


                const botao =
                    mensagem.querySelector(
                        ".btn-limpar-resultados"
                    );


                botao.addEventListener(
                    "click",
                    limparFiltros
                );

            }

        }

        else {

            if (mensagem) {

                mensagem.remove();

            }

        }

    }


    /* ==================================================
       LIMPAR FILTROS
    ================================================== */

    function limparFiltros() {

        filtros.forEach(
            function (select) {

                select.selectedIndex = 0;

            }
        );


        checkboxes.forEach(
            function (checkbox) {

                checkbox.checked = false;

            }
        );


        /*
        Também limpa a pesquisa
        que veio da Home.
        */

        sessionStorage.removeItem(
            "pesquisaTurismo"
        );


        pesquisaHome = null;


        const resumo =
            document.querySelector(
                ".resumo-pesquisa"
            );


        if (resumo) {
            resumo.remove();
        }


        aplicarFiltros();

    }


    /* ==================================================
       BOTÃO LIMPAR FILTROS
    ================================================== */

    const tituloFiltros =
        document.querySelector(
            ".filtros h3"
        );


    if (tituloFiltros) {

        const botaoLimpar =
            document.createElement(
                "button"
            );


        botaoLimpar.textContent =
            "Limpar filtros";


        botaoLimpar.type =
            "button";


        botaoLimpar.className =
            "limpar-filtros";


        tituloFiltros.appendChild(
            botaoLimpar
        );


        botaoLimpar.addEventListener(
            "click",
            limparFiltros
        );

    }


    /* ==================================================
       BOTÕES DOS CARDS
    ================================================== */

    cards.forEach(function (card, index) {

        const botao =
            card.querySelector("button");


        if (!botao) {
            return;
        }


        botao.addEventListener(
            "click",
            function () {

                abrirDetalhes(
                    card,
                    dadosPacotes[index]
                );

            }
        );

    });


    /* ==================================================
       MODAL DE DETALHES
    ================================================== */

    function abrirDetalhes(
        card,
        dados
    ) {

        const titulo =
            card.querySelector(
                ".titulo-avaliacao h3"
            );


        const descricao =
            card.querySelector(
                ".descricao"
            );


        const agencia =
            card.querySelector(
                ".pacote-info > small"
            );


        const tags =
            card.querySelector(
                ".tags"
            );


        const modal =
            document.createElement(
                "div"
            );


        modal.className =
            "modal-pacote";


        modal.setAttribute(
            "role",
            "dialog"
        );


        modal.setAttribute(
            "aria-modal",
            "true"
        );


        modal.innerHTML = `

            <div class="modal-conteudo">

                <button
                    class="fechar-modal"
                    aria-label="Fechar detalhes"
                >
                    ×
                </button>

                <h2>
                    ${titulo
                        ? titulo.textContent
                        : "Detalhes do pacote"}
                </h2>

                <p class="modal-destino">
                    ${dados.cidade}
                </p>

                <p>
                    ${
                        descricao
                            ? descricao.textContent
                            : ""
                    }
                </p>

                <p>
                    <strong>Agência:</strong>
                    ${
                        agencia
                            ? agencia.textContent
                            : ""
                    }
                </p>

                <p>
                    <strong>Duração:</strong>
                    ${dados.duracao} dias
                </p>

                <p>
                    <strong>Avaliação:</strong>
                    ★ ${dados.avaliacao}
                </p>

                <p>
                    <strong>Próxima saída:</strong>
                    ${dados.saida}
                </p>

                <p class="modal-preco">
                    A partir de
                    <strong>
                        R$ ${dados.preco
                            .toLocaleString(
                                "pt-BR"
                            )}
                    </strong>
                </p>

                <div class="modal-acessibilidade">

                    <strong>
                        Acessibilidade
                    </strong>

                    ${
                        tags
                            ? tags.innerHTML
                            : ""
                    }

                </div>

                <button
                    class="fechar-modal-final"
                >
                    Fechar
                </button>

            </div>

        `;


        document.body.appendChild(
            modal
        );


        const fechar =
            modal.querySelector(
                ".fechar-modal"
            );


        const fecharFinal =
            modal.querySelector(
                ".fechar-modal-final"
            );


        function fecharModal() {

            modal.remove();

            document.removeEventListener(
                "keydown",
                fecharComEsc
            );

            if (card) {

                const botao =
                    card.querySelector(
                        "button"
                    );

                if (botao) {
                    botao.focus();
                }

            }

        }


        fechar.addEventListener(
            "click",
            fecharModal
        );


        fecharFinal.addEventListener(
            "click",
            fecharModal
        );


        modal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target === modal
                ) {

                    fecharModal();

                }

            }
        );


        function fecharComEsc(event) {

            if (
                event.key === "Escape"
            ) {

                fecharModal();

            }

        }


        document.addEventListener(
            "keydown",
            fecharComEsc
        );


        fechar.focus();

    }


    /* ==================================================
       ESTILOS DOS ELEMENTOS CRIADOS PELO JS
    ================================================== */

    const estilo =
        document.createElement(
            "style"
        );


    estilo.textContent = `

        .resumo-pesquisa {
            margin-top: 12px;
            padding: 12px 16px;
            border-radius: 10px;
            background: #e8f4f4;
            color: #185f63;
            font-size: 14px;
            font-weight: bold;
        }

        .limpar-filtros {
            display: block;
            margin-top: 10px;
            width: 100%;
            min-height: 38px;
            padding: 8px 10px;
            border: 1px solid #100633;
            border-radius: 8px;
            background: white;
            color: #100633;
            cursor: pointer;
            font-size: 12px;
            font-weight: bold;
        }

        .limpar-filtros:hover {
            background: #100633;
            color: white;
        }

        .sem-resultados {
            grid-column: 1 / -1;
            padding: 45px 20px;
            text-align: center;
            border: 1px solid #ddd;
            border-radius: 15px;
            background: white;
        }

        .sem-resultados strong {
            display: block;
            color: #100633;
            font-size: 20px;
            margin-bottom: 10px;
        }

        .sem-resultados p {
            color: #666;
            font-size: 15px;
            margin-bottom: 20px;
        }

        .btn-limpar-resultados {
            min-height: 44px;
            padding: 10px 20px;
            border: none;
            border-radius: 22px;
            background: #100633;
            color: white;
            cursor: pointer;
            font-weight: bold;
        }

        .modal-pacote {
            position: fixed;
            inset: 0;
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            background: rgba(0, 0, 0, 0.65);
        }

        .modal-conteudo {
            position: relative;
            width: min(600px, 100%);
            max-height: 90vh;
            overflow-y: auto;
            padding: 30px;
            border-radius: 18px;
            background: white;
            color: #171442;
        }

        .modal-conteudo h2 {
            padding-right: 35px;
            margin-bottom: 8px;
            font-size: 24px;
        }

        .modal-destino {
            color: #009fa3;
            font-weight: bold;
            margin-bottom: 15px;
        }

        .modal-conteudo p {
            margin: 10px 0;
            line-height: 1.5;
        }

        .modal-preco {
            font-size: 17px;
        }

        .modal-preco strong {
            font-size: 22px;
        }

        .modal-acessibilidade {
            margin-top: 20px;
        }

        .modal-acessibilidade > strong {
            display: block;
            margin-bottom: 10px;
        }

        .modal-acessibilidade .tags {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
        }

        .fechar-modal {
            position: absolute;
            top: 12px;
            right: 15px;
            width: 42px;
            height: 42px;
            border: none;
            border-radius: 50%;
            background: #100633;
            color: white;
            font-size: 25px;
            cursor: pointer;
        }

        .fechar-modal-final {
            width: 100%;
            min-height: 46px;
            margin-top: 20px;
            border: none;
            border-radius: 25px;
            background: #100633;
            color: white;
            font-size: 15px;
            font-weight: bold;
            cursor: pointer;
        }

        @media (max-width: 600px) {

            .modal-conteudo {
                padding: 22px;
            }

            .modal-conteudo h2 {
                font-size: 20px;
            }

        }

    `;


    document.head.appendChild(
        estilo
    );


    /* ==================================================
       ATUALIZAR FILTROS
    ================================================== */

    filtros.forEach(function (select) {

        select.addEventListener(
            "change",
            aplicarFiltros
        );

    });


    checkboxes.forEach(
        function (checkbox) {

            checkbox.addEventListener(
                "change",
                aplicarFiltros
            );

        }
    );


    if (ordenacao) {

        ordenacao.addEventListener(
            "change",
            aplicarFiltros
        );

    }


    /* ==================================================
       INICIALIZAÇÃO
    ================================================== */

    mostrarPesquisaHome();

    aplicarFiltros();


    console.log(
        "Pacotes.js carregado com sucesso!"
    );

});