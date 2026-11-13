/**
 * Entrada da Área Comercial.
 *
 * Nesta fase o Worker só entrega os ficheiros estáticos e expõe uma verificação
 * técnica. Os futuros endpoints para o Google Apps Script serão acrescentados
 * aqui, onde códigos e chaves podem ficar em Secrets da Cloudflare — nunca no
 * navegador ou em ficheiros públicos.
 */
function reply(body, status = 200) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" }
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/health") {
      return reply({ ok: true, service: "jb-comercial-app" });
    }

    // Mantém o código de acesso fora da URL pública da aplicação. O Worker
    // comunica com o Apps Script no servidor e só devolve a resposta validada.
    if (url.pathname === "/api/login" && request.method === "POST") {
      if (!env.APPS_SCRIPT_URL) {
        return reply({ ok: false, erro: "integração ainda não configurada" }, 503);
      }
      let codigo = "";
      try { codigo = String((await request.json()).codigo || "").trim(); } catch (_) {}
      if (!codigo) return reply({ ok: false, erro: "codigo" }, 400);

      const destino = new URL(env.APPS_SCRIPT_URL);
      destino.searchParams.set("action", "obter");
      destino.searchParams.set("codigo", codigo);
      let dados;
      try {
        const resposta = await fetch(destino, { headers: { Accept: "application/json" } });
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

    const asset = await env.ASSETS.fetch(request);
    if (url.pathname === "/" && asset.headers.get("content-type")?.includes("text/html")) {
      const html = (await asset.text()).replace("</body>", '<script src="/enhance.js"></script></body>');
      return new Response(html, { headers: asset.headers });
    }
    return asset;
  }
};

