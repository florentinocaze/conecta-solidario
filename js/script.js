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
