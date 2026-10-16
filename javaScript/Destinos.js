// Galeria: troca a foto principal ao clicar nas miniaturas ou nas setas
const fotoPrincipal = document.getElementById("foto-principal");
const miniaturas = document.querySelectorAll(".mini");
const fotos = [fotoPrincipal.getAttribute("src")];
const textos = [fotoPrincipal.getAttribute("alt")];

miniaturas.forEach((mini) => {
    const img = mini.querySelector("img");
    fotos.push(img.getAttribute("src"));
    textos.push(img.getAttribute("alt"));
});

let atual = 0;

function mostrarFoto(indice) {
    atual = (indice + fotos.length) % fotos.length;
    fotoPrincipal.src = fotos[atual];
    fotoPrincipal.alt = textos[atual];

    miniaturas.forEach((mini, i) => {
        mini.classList.toggle("ativa", i + 1 === atual);
    });
}

miniaturas.forEach((mini, i) => {
    mini.addEventListener("click", () => mostrarFoto(i + 1));
});

document.getElementById("foto-anterior").addEventListener("click", () => mostrarFoto(atual - 1));
document.getElementById("foto-proxima").addEventListener("click", () => mostrarFoto(atual + 1));

// Filtros das fotos do passeio
const filtros = document.querySelectorAll(".filtro");
const cards = document.querySelectorAll(".foto-card");

filtros.forEach((botao) => {
    botao.addEventListener("click", () => {
        const categoria = botao.dataset.filtro;

        filtros.forEach((f) => f.classList.remove("ativo"));
        botao.classList.add("ativo");

        cards.forEach((card) => {
            card.hidden = categoria !== "todos" && card.dataset.categoria !== categoria;
        });
    });
});