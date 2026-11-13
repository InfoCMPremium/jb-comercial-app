# Configuração necessária na Cloudflare

Antes de ativar o login, criar no Worker a Secret de texto:

| Nome | Valor |
| --- | --- |
| `APPS_SCRIPT_URL` | URL atual do Web App do Google Apps Script |

Esta Secret não entra no GitHub nem é enviada ao navegador. A criação será
feita no painel Cloudflare quando a interface de login estiver ligada.

