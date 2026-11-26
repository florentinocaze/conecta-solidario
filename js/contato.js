// CONTATO: formulário e mapa
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-voluntario");
  const sucesso = document.getElementById("form-sucesso");
  const nomeSucesso = document.getElementById("nome-sucesso");
  const telefone = document.getElementById("telefone");
  const mensagem = document.getElementById("mensagem");
  const contador = document.getElementById("contador");

  if (telefone) {
    telefone.addEventListener("input", () => {
      const d = telefone.value.replace(/\D/g, "").slice(0, 11);
      let t = d;
      if (d.length > 10) t = `(${d.slice(0, 2)}) ${d.slice(2, 3)} ${d.slice(3, 7)}-${d.slice(7)}`;
      else if (d.length > 6) t = `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
      else if (d.length > 2) t = `(${d.slice(0, 2)}) ${d.slice(2)}`;
      else if (d.length > 0) t = `(${d}`;
      telefone.value = t;
    });
  }

  if (mensagem && contador) {
    mensagem.addEventListener("input", () => {
      contador.textContent = mensagem.value.length;
    });
  }

  // Validação e envio simulado
  if (form) {
    const grupoForma = form.querySelector("fieldset");

    const marcarGrupo = () => {
      const ok = form.querySelector('input[name="forma"]:checked');
      grupoForma.classList.toggle("was-invalid-group", !ok && form.classList.contains("was-validated"));
    };

    form.querySelectorAll('input[name="forma"]').forEach((r) => r.addEventListener("change", marcarGrupo));

    form.addEventListener("submit", (evento) => {
      evento.preventDefault();
      form.classList.add("was-validated");
      marcarGrupo();

      if (!form.checkValidity()) {
        evento.stopPropagation();
        const primeiroInvalido = form.querySelector(":invalid");
        if (primeiroInvalido) primeiroInvalido.focus();
        return;
      }

      // Não há backend: apenas simulamos o envio.
      nomeSucesso.textContent = form.nome.value.trim().split(" ")[0];
      sucesso.classList.remove("d-none");
      sucesso.focus();
      sucesso.scrollIntoView({ behavior: "smooth", block: "center" });

      form.reset();
      form.classList.remove("was-validated");
      grupoForma.classList.remove("was-invalid-group");
      if (contador) contador.textContent = "0";
    });

    form.addEventListener("reset", () => {
      form.classList.remove("was-validated");
      grupoForma.classList.remove("was-invalid-group");
      if (contador) contador.textContent = "0";
    });
  }

  // Mapa: troca o local exibido no iframe
  const mapa = document.getElementById("mapa");
  const botoesMapa = document.querySelectorAll(".btn-mapa");

  botoesMapa.forEach((botao) => {
    botao.addEventListener("click", () => {
      mapa.src = `https://www.google.com/maps?q=${encodeURIComponent(botao.dataset.local)}&output=embed`;

      botoesMapa.forEach((b) => {
        const ativo = b === botao;
        b.classList.toggle("active", ativo);
        b.classList.toggle("btn-primary", ativo);
        b.classList.toggle("btn-outline-primary", !ativo);
        b.setAttribute("aria-pressed", String(ativo));
      });
    });
  });
});
