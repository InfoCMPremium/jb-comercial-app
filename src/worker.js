/**
 * Entrada da Área Comercial · JB Comércio Global
 *
 * Cloudflare Worker com endpoints seguros para o Google Apps Script.
 * As credenciais e URL do backend ficam protegidos em Secrets da Cloudflare.
 */
function reply(body, status = 200) {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "Access-Control-Allow-Origin": "*"
    }
  });
}

const DEFAULT_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyRRNRjuLsVJCzxga-CXPH_tMfBDLJubenFHDydu9ySTf4wf_B42jtzn7YJXYCFVbwx/exec";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const scriptUrl = env.APPS_SCRIPT_URL || DEFAULT_APPS_SCRIPT_URL;

    if (url.pathname === "/api/health") {
      return reply({ ok: true, service: "jb-comercial-app", version: "2.0.0" });
    }

    // 1. LOGIN & AUTENTICAÇÃO
    if (url.pathname === "/api/login" && request.method === "POST") {
      let codigo = "";
      try { codigo = String((await request.json()).codigo || "").trim(); } catch (_) {}
      if (!codigo) return reply({ ok: false, erro: "codigo" }, 400);

      const destino = new URL(scriptUrl);
      destino.searchParams.set("action", "obter");
      destino.searchParams.set("codigo", codigo);

      let dados;
      try {
        const resposta = await fetch(destino.toString(), { headers: { Accept: "application/json" } });
        dados = await resposta.json();
      } catch (_) {
        return reply({ ok: false, erro: "ligacao" }, 502);
      }

      if (!dados || !dados.ok) return reply({ ok: false, erro: "codigo" }, 401);

      return reply({
        ok: true,
        perfil: dados.perfil,
        nome: dados.nome,
        dados: dados.dados
      });
    }

    // 2. REGISTOS DE ATIVIDADE (Rotas, Visitas, Abastecimentos)
    if (url.pathname === "/api/registar" && request.method === "POST") {
      try {
        const formData = await request.formData();
        const bodyParams = new URLSearchParams();

        for (const [key, value] of formData.entries()) {
          bodyParams.append(key, value);
        }

        await fetch(scriptUrl, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: bodyParams.toString()
        });

        return reply({ ok: true });
      } catch (err) {
        return reply({ ok: false, erro: err.message }, 500);
      }
    }

    // 3. ATUALIZAR CLIENTE (Ficha / Contactos / Marcas)
    if (url.pathname === "/api/salvar_cliente" && request.method === "POST") {
      try {
        const dados = await request.json();
        const bodyParams = new URLSearchParams({
          action: "salvar_cliente",
          num_cliente: dados.num_cliente || "",
          cor: dados.cor || "",
          contacto: dados.contacto || "",
          telefone: dados.telefone || "",
          marcas: dados.marcas || "",
          obs: dados.obs || ""
        });

        await fetch(scriptUrl, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: bodyParams.toString()
        });

        return reply({ ok: true });
      } catch (err) {
        return reply({ ok: false, erro: err.message }, 500);
      }
    }

    // Entrega de ficheiros estáticos (HTML, JS, CSS, Leaflet)
    return await env.ASSETS.fetch(request);
  }
};
