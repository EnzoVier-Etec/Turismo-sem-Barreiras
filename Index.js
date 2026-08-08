const links = document.querySelectorAll('nav a');
links.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();                 // evita recarregar a página (troque por navegação real depois)
    links.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    link.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    // rola a barra até o link clicado ficar visível/centralizado
  });
});