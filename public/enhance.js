// Integração de leitura do Histórico após o login existente.
// Não envia, altera ou grava qualquer registo.
(() => {
  const workspace = document.getElementById("workspace");
  const observer = new MutationObserver(async () => {
    if (workspace.hidden) return;
    observer.disconnect();
    const codigo = document.getElementById("codigo").value;
    try {
      const r = await fetch("/api/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ codigo })
      });
      const data = await r.json();
      if (!data.ok) return;
      const total = (tipo) => (data.dados?.[tipo]?.rows || []).length;
      const hint = document.querySelector("#historico .hint");
      hint.textContent = `Acesso de ${data.nome}: ${total("rotas")} Rotas · ${total("visitas")} Visitas · ${total("abastecimentos")} Abastecimentos.`;
      const hoje = document.querySelector("#hoje .hint");
      hoje.textContent = `Histórico consultado com acesso de ${data.nome}. Nenhum registo foi alterado.`;
      document.querySelectorAll("input[name=comercial]").forEach((input) => {
        input.value = data.nome;
      });
    } catch (_) {
      // O login original já apresenta qualquer erro ao utilizador.
    }
  });
  observer.observe(workspace, { attributes: true, attributeFilter: ["hidden"] });
})();

