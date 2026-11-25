document.addEventListener("DOMContentLoaded", () => {
  /* Header: fecha o menu do celular ao clicar num link */
  const menu = document.getElementById("menu-principal");

  if (menu) {
    const linksDoMenu = menu.querySelectorAll(".nav-link, .btn");

    linksDoMenu.forEach((link) => {
      link.addEventListener("click", () => {
        // Só fecha se o menu estiver aberto (no celular/tablet)
        if (menu.classList.contains("show")) {
          bootstrap.Collapse.getOrCreateInstance(menu).hide();
        }
      });
    });
  }
});
  /* Filtro por categoria dos projetos sociais */
  const botoesFiltro = document.querySelectorAll(".filtro-projeto");
  const cardsProjeto = document.querySelectorAll(".card-projeto");

  botoesFiltro.forEach((botao) => {
    botao.addEventListener("click", () => {
      const categoria = botao.dataset.filtro;
      botoesFiltro.forEach((item) => {
        const ativo = item === botao;
        item.classList.toggle("active", ativo);
        item.classList.toggle("btn-primary", ativo);
        item.classList.toggle("btn-outline-primary", !ativo);
        item.setAttribute("aria-pressed", String(ativo));
      });

      cardsProjeto.forEach((card) => {
        card.hidden = categoria !== "todos" && card.dataset.categoria !== categoria;
      });
    });
  });

  /* Preenche o modal com os dados do card selecionado */
  const modalProjeto = document.getElementById("modalProjeto");
  if (modalProjeto) {
    modalProjeto.addEventListener("show.bs.modal", (evento) => {
      const botao = evento.relatedTarget;
      if (!botao) return;
      document.getElementById("modalProjetoTitulo").textContent = botao.dataset.titulo || "Projeto social";
      document.getElementById("modalProjetoDescricao").textContent = botao.dataset.descricao || "";
      document.getElementById("modalProjetoApoio").textContent = botao.dataset.apoio || "";
      document.getElementById("modalProjetoLink").href = botao.dataset.link || "#";
    });
  }
/* Alternância entre tema claro e escuro */
document.addEventListener("DOMContentLoaded", () => {
  const botaoTema = document.getElementById("botao-tema");

  if (!botaoTema) return;

  const iconeTema = botaoTema.querySelector("i");

  // Recupera o tema salvo
  const temaSalvo = localStorage.getItem("tema");
  const temaInicial = temaSalvo || "light";

  document.documentElement.setAttribute("data-bs-theme", temaInicial);

  function atualizarBotao(tema) {
    if (!iconeTema) return;

    if (tema === "dark") {
      iconeTema.className = "bi bi-sun-fill";
      botaoTema.setAttribute("aria-label", "Ativar tema claro");
      botaoTema.setAttribute("aria-pressed", "true");
    } else {
      iconeTema.className = "bi bi-moon-fill";
      botaoTema.setAttribute("aria-label", "Ativar tema escuro");
      botaoTema.setAttribute("aria-pressed", "false");
    }
  }

  atualizarBotao(temaInicial);

  botaoTema.addEventListener("click", () => {
    const temaAtual = document.documentElement.getAttribute("data-bs-theme");
    const novoTema = temaAtual === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-bs-theme", novoTema);
    localStorage.setItem("tema", novoTema);

    atualizarBotao(novoTema);
  });
});