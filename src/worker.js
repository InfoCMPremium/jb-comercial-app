/**
 * Entrada da Área Comercial.
 *
 * Nesta fase o Worker só entrega os ficheiros estáticos e expõe uma verificação
 * técnica. Os futuros endpoints para o Google Apps Script serão acrescentados
 * aqui, onde códigos e chaves podem ficar em Secrets da Cloudflare — nunca no
 * navegador ou em ficheiros públicos.
 */
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/health") {
      return Response.json({ ok: true, service: "jb-comercial-app" });
    }

    return env.ASSETS.fetch(request);
  }
};

