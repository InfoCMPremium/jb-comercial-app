(() => {
  const workspace = document.getElementById("workspace");
  const labels = {
    rotas: "Rotas", visitas: "Visitas", abastecimentos: "Abastecimentos"
  };
  const observer = new MutationObserver(async () => {
    if (workspace.hidden) return;
    observer.disconnect();
    const codigo = document.getElementById("codigo").value;
    try {
      const response = await fetch("/api/login", {
        method: "POST", headers: { "content-type": "application/json" },
        body: JSON.stringify({ codigo })
      });
      const data = await response.json();
      if (!data.ok) return;
      document.querySelectorAll("input[name=comercial]").forEach((input) => input.value = data.nome);
      document.getElementById("perfil").textContent =
        data.nome + " · " + (data.perfil === "admin" ? "Administração" : "Comercial");
      renderHistory(data);
    } catch (_) {}
  });
  observer.observe(workspace, { attributes: true, attributeFilter: ["hidden"] });

  function renderHistory(data) {
    const panel = document.getElementById("historico");
    const nomes = new Set();
    Object.values(data.dados || {}).forEach((tipo) => {
      const index = (tipo.cols || []).indexOf("comercial");
      (tipo.rows || []).forEach((row) => { if (index >= 0 && row[index]) nomes.add(row[index]); });
    });
    panel.innerHTML = '<h1>Histórico Comercial</h1>' +
      '<div class="sub" id="hist-tabs"></div>' +
      '<p><label>Comercial <select id="hist-com"><option value="">Todos</option></select></label></p>' +
      '<div class="hint" id="hist-info"></div><div style="overflow:auto" id="hist-table"></div>';
    const select = document.getElementById("hist-com");
    if (data.perfil !== "admin") select.closest("p").hidden = true;
    [...nomes].sort().forEach((nome) => {
      const option = document.createElement("option"); option.value = option.textContent = nome; select.append(option);
    });
    let current = "rotas";
    const draw = () => {
      const source = data.dados[current] || { cols: [], rows: [] };
      const iCom = source.cols.indexOf("comercial");
      const rows = (source.rows || []).filter((row) => !select.value || row[iCom] === select.value);
      document.getElementById("hist-info").textContent =
        data.nome + " · " + rows.length + " registo(s) de " + labels[current] + ".";
      const headers = ["Data/Hora resposta"].concat(source.cols);
      const html = '<table style="border-collapse:collapse;width:100%;font-size:12px"><thead><tr>' +
        headers.map((h) => '<th style="text-align:left;padding:8px;border-bottom:1px solid #cbd5e1;white-space:nowrap">' + escape(h) + '</th>').join("") +
        '</tr></thead><tbody>' + rows.map((row) => '<tr>' +
        row.map((v) => '<td style="padding:8px;border-bottom:1px solid #e2e8f0;vertical-align:top">' + escape(v) + '</td>').join("") +
        '</tr>').join("") + '</tbody></table>';
      document.getElementById("hist-table").innerHTML = rows.length ? html : '<p>Sem registos com estes filtros.</p>';
    };
    Object.keys(labels).forEach((type) => {
      const button = document.createElement("button"); button.textContent = labels[type];
      if (type === current) button.className = "on";
      button.onclick = () => { current = type; document.querySelectorAll("#hist-tabs button").forEach((b) => b.classList.remove("on")); button.classList.add("on"); draw(); };
      document.getElementById("hist-tabs").append(button);
    });
    select.onchange = draw; draw();
  }
  function escape(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, (c) => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c]));
  }
})();

