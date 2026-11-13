/**
 * JB Comercio Global - Portal Comercial Pro v2 (Resumo Diario)
 * Build: 20261113-1736
 */

const GAS = "https://script.google.com/macros/s/AKfycbyRRNRjuLsVJCzxga-CXPH_tMfBDLJubenFHDydu9ySTf4wf_B42jtzn7YJXYCFVbwx/exec";

function ok(body) {
  return Response.json(body, {
    headers: { "Cache-Control": "no-store", "Access-Control-Allow-Origin": "*" }
  });
}
function err(body, status) {
  return Response.json(body, {
    status: status || 400,
    headers: { "Cache-Control": "no-store", "Access-Control-Allow-Origin": "*" }
  });
}

const APP_HTML = `<!doctype html>
<html lang="pt-PT">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
  <title>JB Com\u00C3\u00A9rcio Global \u00C2\u00B7 Portal Comercial</title>
  
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

  <style>
    :root {
      --primary: #1a3d6d;
      --primary-hover: #132d52;
      --navy-dark: #0f2746;
      --rota-blue: #1e3a8a;
      --bg: #f1f5f9;
      --card-bg: #ffffff;
      --border: #cbd5e1;
      --text: #1e293b;
      --muted: #64748b;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 0;
      background: var(--bg);
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      color: var(--text);
      -webkit-font-smoothing: antialiased;
    }

    /* Utilit\u00C3\u00A1rios */
    .jbp-hide { display: none !important; }

    /* LAYOUT BASE */
    .jbp-header {
      background: #0f2746;
      color: #fff;
      padding: 12px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 2px 8px rgba(15,39,70,.25);
      position: sticky;
      top: 0;
      z-index: 1000;
    }
    .jbp-brand {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .jbp-logo-sm {
      width: 36px;
      height: 36px;
      background: #f59e0b;
      color: #0f2746;
      font-weight: 800;
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
    }
    .jbp-brand strong { font-size: 15px; letter-spacing: -.2px; }
    .jbp-brand small { display: block; font-size: 11px; color: #94a3b8; }

    .jbp-nav {
      display: flex;
      gap: 6px;
      background: rgba(255,255,255,0.08);
      padding: 4px;
      border-radius: 8px;
    }
    .jbp-nav-btn {
      background: transparent;
      border: 0;
      color: #cbd5e1;
      font-weight: 600;
      font-size: 13px;
      padding: 8px 14px;
      border-radius: 6px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all .15s;
      font-family: inherit;
    }
    .jbp-nav-btn:hover { background: rgba(255,255,255,0.12); color: #fff; }
    .jbp-nav-btn.active {
      background: #fff;
      color: #0f2746;
      font-weight: 700;
      box-shadow: 0 2px 6px rgba(0,0,0,.15);
    }

    .jbp-user-pill {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 12.5px;
    }
    .jbp-btn-sair {
      background: rgba(239, 68, 68, 0.15);
      color: #fca5a5;
      border: 1px solid rgba(239, 68, 68, 0.3);
      padding: 5px 12px;
      border-radius: 6px;
      font-weight: 600;
      font-size: 12px;
      cursor: pointer;
      font-family: inherit;
      transition: all .15s;
    }
    .jbp-btn-sair:hover { background: #dc2626; color: #fff; border-color: #dc2626; }

    /* TELAS / PAIN\u00C3\u2030IS */
    .jbp-panel { display: none; }
    .jbp-panel.active { display: block; }

    /* TELA DE LOGIN */
    .jbp-login-wrap {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      background: radial-gradient(circle at 50% 20%, #1a3d6d 0%, #0a192f 100%);
    }
    .jbp-login-card {
      background: #fff;
      border-radius: 16px;
      padding: 36px 32px;
      width: 100%;
      max-width: 420px;
      box-shadow: 0 20px 40px rgba(0,0,0,.35);
      text-align: center;
    }
    .jbp-login-logo {
      width: 64px;
      height: 64px;
      background: #1a3d6d;
      color: #f59e0b;
      font-weight: 800;
      font-size: 26px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 16px;
      margin: 0 auto 16px;
      box-shadow: 0 8px 16px rgba(26,61,109,.25);
    }
    .jbp-login-card h1 { margin: 0 0 6px; font-size: 22px; color: #0f2746; font-weight: 800; }
    .jbp-login-card p { margin: 0 0 24px; font-size: 13px; color: #64748b; }
    .jbp-login-input {
      width: 100%;
      padding: 14px 16px;
      font-size: 15px;
      border: 1.5px solid #cbd5e1;
      border-radius: 10px;
      outline: none;
      text-align: center;
      letter-spacing: 1px;
      font-weight: 600;
      transition: all .15s;
    }
    .jbp-login-input:focus { border-color: #1a3d6d; box-shadow: 0 0 0 3px rgba(26,61,109,.15); }
    .jbp-login-btn {
      width: 100%;
      margin-top: 14px;
      padding: 14px;
      background: #1a3d6d;
      color: #fff;
      border: 0;
      border-radius: 10px;
      font-size: 15px;
      font-weight: 700;
      cursor: pointer;
      font-family: inherit;
      transition: all .15s;
    }
    .jbp-login-btn:hover { background: #132d52; }
    .jbp-login-btn:disabled { opacity: .6; cursor: not-allowed; }
    .jbp-login-erro { margin-top: 12px; font-size: 13px; color: #dc2626; font-weight: 600; min-height: 18px; }

    /* ========================================================== */
    /* 0. RESUMO DI\u00C3\u0081RIO (PAINEL INTELIGENTE)                      */
    /* ========================================================== */
    #jbp-panel-painel {
      max-width: 1300px;
      margin: 20px auto;
      padding: 0 16px 40px;
    }
    .cockpit-banner {
      background: linear-gradient(135deg, #1a3d6d 0%, #0f2746 100%);
      color: #fff;
      border-radius: 14px;
      padding: 22px 26px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 16px;
      margin-bottom: 20px;
      box-shadow: 0 6px 16px rgba(15,39,70,.25);
    }
    .cockpit-banner h2 { margin: 0 0 4px; font-size: 22px; font-weight: 800; letter-spacing: -.2px; }
    .cockpit-banner p { margin: 0; font-size: 13.5px; color: #cbd5e1; }
    .cockpit-cta-btn {
      background: #f59e0b;
      color: #0f172a;
      border: 0;
      padding: 10px 18px;
      border-radius: 8px;
      font-weight: 800;
      font-size: 13px;
      cursor: pointer;
      transition: all .15s;
      font-family: inherit;
    }
    .cockpit-cta-btn:hover { background: #d97706; transform: translateY(-1px); }

    .cockpit-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 14px;
      margin-bottom: 20px;
    }
    .cockpit-card {
      background: #fff;
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 18px 20px;
      display: flex;
      flex-direction: column;
      box-shadow: 0 1px 3px rgba(0,0,0,.04);
      transition: transform .15s;
    }
    .cockpit-card:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,.06); }
    .cockpit-card-title {
      font-size: 12px;
      font-weight: 700;
      color: var(--muted);
      text-transform: uppercase;
      letter-spacing: .5px;
      margin-bottom: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .cockpit-card-val {
      font-size: 28px;
      font-weight: 800;
      color: var(--primary);
      margin-bottom: 4px;
      letter-spacing: -.5px;
    }
    .cockpit-card-sub {
      font-size: 12px;
      color: var(--muted);
    }

    .cockpit-sugestao-box {
      background: #fff;
      border: 1px solid #fed7aa;
      border-left: 6px solid #f97316;
      border-radius: 12px;
      padding: 18px 22px;
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 14px;
      box-shadow: 0 2px 6px rgba(249,115,22,.08);
    }
    .cockpit-sugestao-info h3 { margin: 0 0 4px; font-size: 16px; color: #9a3412; font-weight: 700; }
    .cockpit-sugestao-info p { margin: 0; font-size: 13px; color: #475569; }

    /* Feed de Atividades do Admin */
    .admin-feed-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 12.5px;
    }
    .admin-feed-table th {
      background: #f8fafc;
      padding: 9px 12px;
      text-align: left;
      font-weight: 700;
      color: #475569;
      border-bottom: 1.5px solid #e2e8f0;
    }
    .admin-feed-table td {
      padding: 10px 12px;
      border-bottom: 1px solid #f1f5f9;
      color: #1e293b;
    }
    .admin-feed-table tr:hover td { background: #f8fafc; }

    /* ========================================================== */
    /* 1. MAPA & CRM                                              */
    /* ========================================================== */
    .jbm-bar {
      background: #fff;
      padding: 10px 16px;
      border-bottom: 1px solid var(--border);
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
    }
    .jbm-search {
      flex: 1;
      min-width: 220px;
      position: relative;
    }
    .jbm-search input {
      width: 100%;
      padding: 9px 12px 9px 34px;
      border: 1px solid var(--border);
      border-radius: 8px;
      font-size: 13px;
      font-family: inherit;
      outline: none;
    }
    .jbm-search input:focus { border-color: var(--primary); }
    .jbm-search::before {
      content: "\u00F0\u0178\u201D\u008D";
      position: absolute;
      left: 10px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 13px;
      opacity: .6;
    }

    .jbm-filters {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
      align-items: center;
    }
    .jbm-btn-filter {
      padding: 6px 12px;
      border-radius: 20px;
      border: 1px solid var(--border);
      background: #fff;
      font-size: 12px;
      font-weight: 600;
      color: var(--text);
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 5px;
      transition: all .15s;
    }
    .jbm-btn-filter:hover { background: #f8fafc; }
    .jbm-btn-filter.active { background: #0f2746; color: #fff; border-color: #0f2746; }
    .jbm-btn-filter .dot { width: 8px; height: 8px; border-radius: 50%; }
    .dot-verde { background: #22c55e; }
    .dot-laranja { background: #f97316; }
    .dot-amarelo { background: #eab308; }
    .dot-lilas { background: #a855f7; }

    .jbm-btn-rota-top {
      background: var(--rota-blue);
      color: #fff;
      border: 0;
      padding: 8px 14px;
      border-radius: 8px;
      font-weight: 700;
      font-size: 12.5px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      font-family: inherit;
    }
    .jbm-btn-rota-top:hover { background: #172554; }

    .jbm-body {
      display: flex;
      height: calc(100vh - 120px);
      position: relative;
    }
    .jbm-map-wrap {
      flex: 1;
      height: 100%;
      position: relative;
    }
    #jbm-mapa { width: 100%; height: 100%; }

    .jbm-sidebar {
      width: 380px;
      background: #fff;
      border-left: 1px solid var(--border);
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .jbm-sidebar-header {
      padding: 12px 16px;
      border-bottom: 1px solid var(--border);
      background: #f8fafc;
    }
    .jbm-sidebar-header-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }
    .jbm-sort-group {
      display: flex;
      gap: 4px;
    }
    .jbm-sort-btn {
      padding: 4px 8px;
      font-size: 11px;
      border: 1px solid var(--border);
      background: #fff;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 600;
      color: var(--muted);
    }
    .jbm-sort-btn.active { background: #0f2746; color: #fff; border-color: #0f2746; }

    .jbm-card-list {
      flex: 1;
      overflow-y: auto;
      padding: 8px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    /* CARD DE CLIENTE COM SUPER DESTAQUE NO NOME E N\u00C3\u0161MERO */
    .jbm-card {
      background: #fff;
      border: 1px solid var(--border);
      border-left: 5px solid #94a3b8;
      border-radius: 10px;
      padding: 12px 14px;
      cursor: pointer;
      transition: all .15s;
    }
    .jbm-card:hover {
      box-shadow: 0 4px 12px rgba(0,0,0,.08);
      transform: translateY(-1px);
    }
    .jbm-card.cor-verde { border-left-color: #22c55e; }
    .jbm-card.cor-laranja { border-left-color: #f97316; }
    .jbm-card.cor-amarelo { border-left-color: #eab308; }
    .jbm-card.cor-lilas { border-left-color: #a855f7; }

    .jbm-card-top {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 8px;
      margin-bottom: 4px;
    }
    .jbm-card-nome {
      font-size: 15px;
      font-weight: 800;
      color: #0f2746;
      line-height: 1.3;
    }
    .jbm-card-num {
      font-size: 12.5px;
      font-weight: 800;
      color: #1e3a8a;
      background: #e0e7ff;
      padding: 3px 8px;
      border-radius: 6px;
      white-space: nowrap;
    }
    .jbm-card-morada { font-size: 12px; color: var(--muted); margin-bottom: 6px; }
    .jbm-progress-bar { width: 100%; height: 5px; background: #f1f5f9; border-radius: 3px; overflow: hidden; margin: 3px 0 6px; }
    .jbm-progress-fill { height: 100%; }
    .jbm-progress-fill.verde { background: #22c55e; }
    .jbm-progress-fill.laranja { background: #f97316; }
    .jbm-progress-fill.amarelo { background: #eab308; }
    .jbm-progress-fill.lilas { background: #a855f7; }

    .jbm-card-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 11px;
    }
    .jbm-tag-status {
      padding: 2px 7px;
      border-radius: 4px;
      font-weight: 700;
      font-size: 10.5px;
    }
    .jbm-tag-status.em-dia { background: #dcfce7; color: #15803d; }
    .jbm-tag-status.a-vencer { background: #fef3c7; color: #b45309; }
    .jbm-tag-status.em-atraso { background: #fee2e2; color: #b91c1c; }
    .jbm-tag-status.potencial { background: #f3e8ff; color: #7e22ce; }

    /* MODAIS */
    .jbm-modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(15,23,42,.6);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2000;
      padding: 16px;
      backdrop-filter: blur(4px);
    }
    .jbm-modal {
      background: #fff;
      border-radius: 14px;
      width: 100%;
      max-width: 580px;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 20px 40px rgba(0,0,0,.3);
      display: flex;
      flex-direction: column;
    }
    .jbm-modal-header {
      background: linear-gradient(135deg, #0f2746 0%, #1a3d6d 100%);
      color: #fff;
      padding: 18px 22px;
      border-radius: 14px 14px 0 0;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 12px;
    }
    .jbm-modal-body {
      padding: 20px 22px;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .jbm-btn-close {
      background: transparent;
      border: 0;
      font-size: 22px;
      color: #cbd5e1;
      cursor: pointer;
      line-height: 1;
      padding: 0;
      transition: color .15s;
    }
    .jbm-btn-close:hover { color: #fff; }

    .jbm-grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }
    .jbm-campo {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }
    .jbm-campo label {
      font-size: 11.5px;
      font-weight: 700;
      color: var(--muted);
      text-transform: uppercase;
      letter-spacing: .5px;
    }
    .jbm-campo input, .jbm-campo select, .jbm-campo textarea {
      padding: 9px 12px;
      border: 1px solid var(--border);
      border-radius: 8px;
      font-size: 13px;
      font-family: inherit;
      color: var(--text);
    }
    .jbm-campo input:focus, .jbm-campo select:focus, .jbm-campo textarea:focus {
      outline: none;
      border-color: var(--primary);
    }

    .jbm-gps-group {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    .jbm-btn-gps {
      flex: 1;
      min-width: 140px;
      padding: 10px;
      border-radius: 8px;
      font-weight: 700;
      font-size: 12.5px;
      text-align: center;
      text-decoration: none;
      cursor: pointer;
      border: 1px solid transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      font-family: inherit;
    }
    .jbm-btn-gmaps { background: #e0f2fe; color: #0369a1; border-color: #bae6fd; }
    .jbm-btn-waze { background: #fef3c7; color: #b45309; border-color: #fde68a; }
    .jbm-btn-visita { background: #dcfce7; color: #15803d; border-color: #bbf7d0; }

    /* FILTROS DE COR NO PLANEADOR DE ROTA */
    .rota-cor-btn {
      padding: 7px 11px;
      font-size: 12px;
      font-weight: 700;
      border-radius: 8px;
      border: 1.5px solid #cbd5e1;
      background: #fff;
      color: #334155;
      cursor: pointer;
      transition: all .15s;
      display: flex;
      align-items: center;
      gap: 5px;
      user-select: none;
    }
    .rota-cor-btn:hover { background: #f1f5f9; border-color: #94a3b8; }
    .rota-cor-btn.active {
      background: #0f2746;
      color: #fff;
      border-color: #0f2746;
      box-shadow: 0 2px 6px rgba(15,39,70,.25);
    }

    /* ========================================================== */
    /* 2. REGISTAR ATIVIDADE (FORMUL\u00C3\u0081RIOS)                        */
    /* ========================================================== */
    #jbp-panel-registos {
      max-width: 900px;
      margin: 20px auto;
      padding: 0 16px 40px;
    }
    .jb-wrap {
      background: #fff;
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 24px;
      box-shadow: 0 2px 8px rgba(0,0,0,.04);
    }
    .jb-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 20px;
      border-bottom: 1px solid #f1f5f9;
      padding-bottom: 14px;
    }
    .jb-logo-badge {
      width: 44px;
      height: 44px;
      background: #1a3d6d;
      color: #f59e0b;
      font-weight: 800;
      font-size: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 10px;
    }
    .jb-header h2 { margin: 0; font-size: 18px; color: #0f2746; font-weight: 800; }
    .jb-header p { margin: 2px 0 0; font-size: 12.5px; color: var(--muted); }

    .jb-tabs {
      display: flex;
      gap: 6px;
      background: #f1f5f9;
      padding: 4px;
      border-radius: 10px;
      margin-bottom: 20px;
    }
    .jb-tab {
      flex: 1;
      padding: 10px;
      border: 0;
      background: transparent;
      border-radius: 8px;
      font-weight: 700;
      font-size: 13px;
      color: var(--muted);
      cursor: pointer;
      transition: all .15s;
      font-family: inherit;
    }
    .jb-tab.active { background: #fff; color: #0f2746; box-shadow: 0 2px 6px rgba(0,0,0,.08); }

    .jb-form { display: none; flex-direction: column; gap: 14px; }
    .jb-form.active { display: flex; }

    .jb-row {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 12px;
    }
    .jb-form label {
      display: flex;
      flex-direction: column;
      gap: 5px;
      font-size: 12.5px;
      font-weight: 600;
      color: #334155;
    }
    .jb-form input, .jb-form select, .jb-form textarea {
      padding: 10px 12px;
      border: 1px solid var(--border);
      border-radius: 8px;
      font-size: 13px;
      font-family: inherit;
      color: var(--text);
    }
    .jb-form input:focus, .jb-form select:focus, .jb-form textarea:focus {
      outline: none;
      border-color: var(--primary);
    }

    .jb-hora-wrap { display: flex; gap: 6px; }
    .jb-hora-wrap input { flex: 1; }
    .jb-btn-agora {
      padding: 0 12px;
      background: #e8eef6;
      color: #1a3d6d;
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      font-weight: 700;
      font-size: 12px;
      cursor: pointer;
      transition: all .15s;
      white-space: nowrap;
    }
    .jb-btn-agora:hover { background: #1a3d6d; color: #fff; border-color: #1a3d6d; }

    .jb-marcas-wrap {
      display: flex;
      flex-direction: column;
      gap: 8px;
      background: #f8fafc;
      padding: 14px;
      border-radius: 10px;
      border: 1px solid #e2e8f0;
    }
    .jb-marcas-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
      gap: 8px;
    }
    .jb-chip {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 9px 10px;
      background: #fff;
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 500;
      color: #334155;
      cursor: pointer;
      user-select: none;
      transition: all .15s;
    }
    .jb-chip:hover { background: #f1f5f9; border-color: #94a3b8; }
    .jb-chip.checked {
      background: #0f2746;
      color: #fff;
      border-color: #0f2746;
    }
    .jb-chip input { margin: 0; }

    .jb-btn-submeter {
      background: #1a3d6d;
      color: #fff;
      border: 0;
      padding: 14px;
      border-radius: 10px;
      font-weight: 800;
      font-size: 14.5px;
      cursor: pointer;
      margin-top: 6px;
      font-family: inherit;
      transition: all .15s;
    }
    .jb-btn-submeter:hover { background: #132d52; }
    .jb-btn-submeter:disabled { opacity: .6; cursor: not-allowed; }

    .jb-msg-submissao {
      padding: 12px 14px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 600;
      display: none;
    }
    .jb-msg-submissao.ok { display: block; background: #dcfce7; color: #15803d; border: 1px solid #bbf7d0; }
    .jb-msg-submissao.erro { display: block; background: #fee2e2; color: #b91c1c; border: 1px solid #fecaca; }

    /* ========================================================== */
    /* 3. HIST\u00C3\u201CRICO & DASHBOARD DE KPIs                           */
    /* ========================================================== */
    #jbp-panel-historico {
      max-width: 1300px;
      margin: 20px auto;
      padding: 0 16px 40px;
    }
    .jbh-wrap {
      background: #fff;
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 20px;
      box-shadow: 0 2px 8px rgba(0,0,0,.04);
    }
    .jbh-top-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
      margin-bottom: 16px;
    }
    .jbh-tabs {
      display: flex;
      gap: 6px;
      background: #f1f5f9;
      padding: 4px;
      border-radius: 8px;
    }
    .jbh-tab {
      padding: 8px 14px;
      border: 0;
      background: transparent;
      border-radius: 6px;
      font-weight: 700;
      font-size: 12.5px;
      color: var(--muted);
      cursor: pointer;
      font-family: inherit;
    }
    .jbh-tab.active { background: #fff; color: #0f2746; box-shadow: 0 1px 3px rgba(0,0,0,.08); }

    .jbh-kpis {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 10px;
      margin-bottom: 16px;
    }
    .jbh-kpi-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 12px 14px;
    }
    .jbh-kpi-card-title { font-size: 11px; font-weight: 700; color: var(--muted); text-transform: uppercase; }
    .jbh-kpi-card-val { font-size: 22px; font-weight: 800; color: var(--primary); margin-top: 4px; }

    .jbh-atalhos-data {
      display: flex;
      gap: 6px;
      align-items: center;
      flex-wrap: wrap;
      margin-bottom: 14px;
      font-size: 12px;
    }
    .jbh-btn-atalho {
      padding: 5px 10px;
      border: 1px solid var(--border);
      background: #fff;
      border-radius: 6px;
      font-size: 11.5px;
      font-weight: 600;
      cursor: pointer;
    }
    .jbh-btn-atalho.active { background: #0f2746; color: #fff; border-color: #0f2746; }

    .jbh-filtros-bar {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      align-items: center;
      margin-bottom: 14px;
    }
    .jbh-filtros-bar input, .jbh-filtros-bar select {
      padding: 7px 10px;
      border: 1px solid var(--border);
      border-radius: 6px;
      font-size: 12.5px;
      font-family: inherit;
    }

    .jbh-table-wrap {
      overflow-x: auto;
      border: 1px solid var(--border);
      border-radius: 8px;
    }
    .jbh-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 12px;
      white-space: nowrap;
    }
    .jbh-table th {
      background: #f8fafc;
      padding: 9px 12px;
      text-align: left;
      font-weight: 700;
      color: #475569;
      border-bottom: 1.5px solid #cbd5e1;
      position: sticky;
      top: 0;
    }
    .jbh-table td {
      padding: 9px 12px;
      border-bottom: 1px solid #e2e8f0;
      color: #1e293b;
    }
    .jbh-table tr:hover td { background: #f8fafc; }
  </style>
</head>
<body>

  <!-- TELA DE LOGIN -->
  <div class="jbp-login-wrap" id="jbp-login-view">
    <div class="jbp-login-card">
      <div class="jbp-login-logo">JB</div>
      <h1>Portal Comercial</h1>
      <p>Introduza o seu c\u00C3\u00B3digo pessoal para aceder ao sistema integrado.</p>
      <form id="jbp-login-form">
        <input type="password" id="jbp-login-code" class="jbp-login-input" placeholder="Ex: verajb26" autofocus required>
        <button type="submit" id="jbp-btn-login" class="jbp-login-btn">Entrar no Portal</button>
        <div class="jbp-login-erro" id="jbp-login-erro"></div>
      </form>
    </div>
  </div>

  <!-- APLICA\u00C3\u2021\u00C3\u0192O PRINCIPAL (P\u00C3\u201CS-LOGIN) -->
  <div id="jbp-app-view" class="jbp-hide">
    
    <header class="jbp-header">
      <div class="jbp-brand">
        <div class="jbp-logo-sm">JB</div>
        <div>
          <strong>JB COM\u00C3\u2030RCIO GLOBAL</strong>
          <small>Portal Comercial Integrado</small>
        </div>
      </div>

      <nav class="jbp-nav">
        <button type="button" class="jbp-nav-btn active" data-tab="painel">\u00E2\u0161\u00A1 Resumo Di\u00C3\u00A1rio</button>
        <button type="button" class="jbp-nav-btn" data-tab="mapa">\u00F0\u0178\u2014\u00BA\u00EF\u00B8\u008F Mapa de Clientes</button>
        <button type="button" class="jbp-nav-btn" data-tab="registos">\u00F0\u0178\u201C\u009D Registar Atividade</button>
        <button type="button" class="jbp-nav-btn" data-tab="historico">\u00F0\u0178\u201C\u0160 Hist\u00C3\u00B3rico & Relat\u00C3\u00B3rios</button>
      </nav>

      <div class="jbp-user-pill">
        <span>\u00F0\u0178\u2018\u00A4 <strong id="jbp-user-nome">Comercial</strong> (<span id="jbp-user-perfil">...</span>)</span>
        <button type="button" class="jbp-btn-sair" id="jbp-btn-sair">Sair</button>
      </div>
    </header>

    <!-- ABA 0: RESUMO DI\u00C3\u0081RIO -->
    <section class="jbp-panel active" id="jbp-panel-painel">
      <div class="cockpit-banner">
        <div style="flex:1;">
          <h2 id="cockpit-ola">Resumo Di\u00C3\u00A1rio \u00F0\u0178\u2018\u2039</h2>
          <p id="cockpit-sub-ola">Assistente operacional e acompanhamento de atividade em tempo real.</p>
        </div>

        <!-- A\u00C3\u00A7\u00C3\u00B5es do Comercial (ocultas para Admin) -->
        <div id="cockpit-comercial-actions" style="display:flex;gap:8px;flex-wrap:wrap;">
          <button type="button" class="cockpit-cta-btn" id="cockpit-btn-rota-sugerida">\u00F0\u0178\u0161\u2014 Ver Rota Sugerida de Hoje</button>
          <button type="button" class="jbp-nav-btn" id="cockpit-btn-visita-proxima" style="background:#fff;color:#0f2746;font-weight:700;">\u00F0\u0178\u201C\u008D Visitar Mais Pr\u00C3\u00B3ximo</button>
        </div>

        <!-- Controlo da Administra\u00C3\u00A7\u00C3\u00A3o (oculto para Comercial) -->
        <div id="cockpit-admin-controls" class="jbp-hide" style="display:flex;align-items:center;gap:10px;background:rgba(255,255,255,0.15);padding:8px 14px;border-radius:8px;backdrop-filter:blur(4px);">
          <label for="admin-sel-comercial" style="font-weight:700;font-size:13px;color:#fff;white-space:nowrap;">\u00F0\u0178\u2018\u00A4 Filtrar Comercial:</label>
          <select id="admin-sel-comercial" style="padding:6px 12px;border-radius:6px;border:1px solid #cbd5e1;font-weight:700;font-size:13px;color:#0f2746;background:#fff;cursor:pointer;">
            <option value="">Todos os Comerciais</option>
          </select>
        </div>
      </div>

      <!-- Caixa de Sugest\u00C3\u00A3o Inteligente de Rota (Apenas Comercial) -->
      <div class="cockpit-sugestao-box" id="cockpit-box-sugestao">
        <div class="cockpit-sugestao-info">
          <h3 id="cockpit-sugestao-titulo">\u00F0\u0178\u2019\u00A1 Sugest\u00C3\u00A3o de Rota Priorit\u00C3\u00A1ria</h3>
          <p id="cockpit-sugestao-txt">Identific\u00C3\u00A1mos clientes com prazo de visita vencido que deves contactar hoje.</p>
        </div>
        <button type="button" class="jbm-btn-rota-top" id="cockpit-btn-aplicar-rota">\u00E2\u0161\u00A1 Tra\u00C3\u00A7ar Rota no Mapa</button>
      </div>

      <!-- M\u00C3\u00A9tricas / Cockpit Cards -->
      <div class="cockpit-grid">
        <div class="cockpit-card">
          <div class="cockpit-card-title">\u00F0\u0178\u0161\u00A8 Visitas em Atraso <span style="color:#dc2626;">Cr\u00C3\u00ADtico</span></div>
          <div class="cockpit-card-val" id="cockpit-val-atraso" style="color:#dc2626;">0</div>
          <div class="cockpit-card-sub" id="cockpit-sub-atraso">Lojas que ultrapassaram o ciclo regular (30/45/60d)</div>
        </div>

        <div class="cockpit-card">
          <div class="cockpit-card-title">\u00E2\u008F\u00B3 A Vencer esta Semana <span style="color:#d97706;">Aten\u00C3\u00A7\u00C3\u00A3o</span></div>
          <div class="cockpit-card-val" id="cockpit-val-vencer" style="color:#d97706;">0</div>
          <div class="cockpit-card-sub">Lojas no limite da janela de visita recomendada</div>
        </div>

        <div class="cockpit-card">
          <div class="cockpit-card-title">\u00F0\u0178\u0178\u00A2 Clientes em Dia <span style="color:#16a34a;">Saud\u00C3\u00A1vel</span></div>
          <div class="cockpit-card-val" id="cockpit-val-dia" style="color:#16a34a;">0</div>
          <div class="cockpit-card-sub">Lojas com relacionamento ativo e visitas recentes</div>
        </div>

        <div class="cockpit-card">
          <div class="cockpit-card-title">\u00F0\u0178\u201C\u00A6 Total de Encomendas <span style="color:#1a3d6d;">Neg\u00C3\u00B3cio</span></div>
          <div class="cockpit-card-val" id="cockpit-val-encomendas">0</div>
          <div class="cockpit-card-sub" id="cockpit-sub-encomendas">Novas encomendas reportadas nos registos</div>
        </div>
      </div>

      <!-- Feed / Painel para Admin (Atividade recente da equipa) -->
      <div id="cockpit-admin-section" class="jbp-hide" style="background:#fff;border:1px solid var(--border);border-radius:12px;padding:20px;margin-bottom:20px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
          <div>
            <h3 style="margin:0 0 4px;font-size:16px;color:#0f2746;font-weight:800;">\u00F0\u0178\u201C\u2039 \u00C3\u0161ltimas Visitas Registadas pela Equipa</h3>
            <p style="margin:0;font-size:12.5px;color:var(--muted);">Acompanhamento em direto dos relat\u00C3\u00B3rios de visita submetidos.</p>
          </div>
          <button type="button" class="jbm-sort-btn" id="cockpit-admin-ver-tudo">Ver Hist\u00C3\u00B3rico Completo \u00E2\u2020\u2019</button>
        </div>
        <div style="overflow-x:auto;">
          <table class="admin-feed-table" id="cockpit-admin-feed-table">
            <thead>
              <tr>
                <th>Data & Hora</th>
                <th>Comercial</th>
                <th>Loja</th>
                <th>Localidade</th>
                <th>Nova Encomenda?</th>
                <th>Marca Nova?</th>
                <th>Observa\u00C3\u00A7\u00C3\u00B5es</th>
              </tr>
            </thead>
            <tbody id="cockpit-admin-feed-tbody"></tbody>
          </table>
        </div>
      </div>

      <!-- Bloco de Lojas Priorit\u00C3\u00A1rias Recomendadas (Comercial) -->
      <div id="cockpit-comercial-section" style="background:#fff;border:1px solid var(--border);border-radius:12px;padding:20px;">
        <div class="jbm-sidebar-header-row" style="margin-bottom:12px;">
          <div>
            <strong style="font-size:15px;color:#0f2746;font-weight:800;">\u00F0\u0178\u017D\u00AF Lojas Priorit\u00C3\u00A1rias Recomendadas para Hoje</strong>
            <div style="font-size:12px;color:var(--muted);margin-top:2px;">Ordenadas por maior urg\u00C3\u00AAncia e tempo sem visita</div>
          </div>
        </div>
        <div id="cockpit-lista-urgentes" style="display:grid;grid-template-columns:repeat(auto-fit, minmax(300px, 1fr));gap:12px;"></div>
      </div>
    </section>

    <!-- ABA 1: MAPA & CRM COMERCIAL -->
    <section class="jbp-panel" id="jbp-panel-mapa">
      <div class="jbm-bar">
        <div class="jbm-search">
          <input type="text" id="jbm-busca" placeholder="Procurar cliente por nome, n\u00C3\u00BAmero ou localidade...">
        </div>

        <div class="jbm-filters">
          <button type="button" class="jbm-btn-filter active" data-cor="todas">Todas (<span id="cnt-todas">0</span>)</button>
          <button type="button" class="jbm-btn-filter" data-cor="verde"><span class="dot dot-verde"></span>Verde (<span id="cnt-verde">0</span>)</button>
          <button type="button" class="jbm-btn-filter" data-cor="laranja"><span class="dot dot-laranja"></span>Laranja (<span id="cnt-laranja">0</span>)</button>
          <button type="button" class="jbm-btn-filter" data-cor="amarelo"><span class="dot dot-amarelo"></span>Amarelo (<span id="cnt-amarelo">0</span>)</button>
          <button type="button" class="jbm-btn-filter" data-cor="lilas"><span class="dot dot-lilas"></span>Lil\u00C3\u00A1s (<span id="cnt-lilas">0</span>)</button>
        </div>

        <button type="button" class="jbm-btn-rota-top" id="jbm-btn-abrir-rota">
          <span>\u00F0\u0178\u0161\u2014</span> Planear Rota
        </button>
        <button type="button" class="jbm-sort-btn" id="jbm-btn-gps" style="padding:8px 12px;font-size:12.5px;">
          \u00F0\u0178\u201C\u008D GPS Atual
        </button>
      </div>

      <div class="jbm-body">
        <div class="jbm-map-wrap">
          <div id="jbm-mapa"></div>
        </div>

        <div class="jbm-sidebar">
          <div class="jbm-sidebar-header">
            <div class="jbm-sidebar-header-row">
              <strong style="font-size:13px;color:#0f2746;">Lojas Encontradas (<span id="jbm-cont-visiveis">0</span>)</strong>
              <div class="jbm-sort-group">
                <button type="button" class="jbm-sort-btn active" id="jbm-sort-urgencia">Urg\u00C3\u00AAncia</button>
                <button type="button" class="jbm-sort-btn" id="jbm-sort-dias">Dias</button>
                <button type="button" class="jbm-sort-btn" id="jbm-sort-nome">Nome</button>
              </div>
            </div>
          </div>

          <div class="jbm-card-list" id="jbm-card-list"></div>
        </div>
      </div>
    </section>

    <!-- ABA 2: REGISTAR ATIVIDADE -->
    <section class="jbp-panel" id="jbp-panel-registos">
      <div class="jb-wrap">
        <div class="jb-header">
          <div class="jb-logo-badge">JB</div>
          <div>
            <h2>Registar Atividade Di\u00C3\u00A1ria</h2>
            <p>Registo imediato de visitas, planeamento de rotas e combust\u00C3\u00ADvel.</p>
          </div>
        </div>

        <div class="jb-tabs" id="jbr-tabs">
          <button type="button" class="jb-tab active" data-target="visitas">\u00F0\u0178\u201C\u008D Visita a Loja</button>
          <button type="button" class="jb-tab" data-target="rotas">\u00F0\u0178\u203A\u00A3\u00EF\u00B8\u008F Rota Di\u00C3\u00A1ria</button>
          <button type="button" class="jb-tab" data-target="abastecimentos">\u00E2\u203A\u00BD Combust\u00C3\u00ADvel</button>
        </div>

        <!-- FORMUL\u00C3\u0081RIO 1: VISITA -->
        <form class="jb-form active" id="jb-form-visitas" data-tipo="visitas">
          <input type="hidden" name="comercial" class="jbp-field-comercial">

          <div class="jb-row">
            <label>J\u00C3\u00A1 \u00C3\u00A9 cliente?
              <select name="ja_cliente" id="jbr-ja-cliente">
                <option value="Sim">Sim (Cliente habitual)</option>
                <option value="N\u00C3\u00A3o">N\u00C3\u00A3o (Potencial cliente / Prospe\u00C3\u00A7\u00C3\u00A3o)</option>
              </select>
            </label>
            <!-- Vis\u00C3\u00ADvel se Sim -->
            <label id="jbr-wrap-busca">Pesquisar / Selecionar Loja
              <input type="text" id="jbr-busca-cliente" list="jbr-dl-clientes" placeholder="N\u00C2\u00BA ou nome da loja...">
              <datalist id="jbr-dl-clientes"></datalist>
            </label>
          </div>

          <div class="jb-row">
            <!-- N\u00C2\u00BA do Cliente s\u00C3\u00B3 \u00C3\u00A9 exibido se J\u00C3\u00A1 \u00C3\u00A9 Cliente = Sim -->
            <label id="jbr-wrap-nif">N\u00C2\u00BA do Cliente
              <input type="text" name="nif" id="jbr-nif" required placeholder="Preenchido ao pesquisar">
            </label>
            <label id="jbr-wrap-loja">Nome da Loja
              <input type="text" name="loja" id="jbr-loja" required placeholder="Nome da loja">
            </label>
          </div>

          <div class="jb-row">
            <label>Morada
              <input type="text" name="morada" id="jbr-morada" required placeholder="Morada da loja">
            </label>
            <label>Localidade
              <input type="text" name="localidade" id="jbr-localidade" required placeholder="Localidade">
            </label>
          </div>

          <div class="jb-row">
            <label>Pessoa de Contacto
              <input type="text" name="contacto" id="jbr-contacto" required placeholder="Nome do respons\u00C3\u00A1vel">
            </label>
            <label>Telefone
              <input type="tel" name="telefone" id="jbr-telefone" placeholder="Telefone ou telem\u00C3\u00B3vel">
            </label>
          </div>

          <div class="jb-row">
            <label>Data da Visita
              <input type="date" name="dia" id="jbr-dia" required>
            </label>
            <label>Hora de Entrada
              <div class="jb-hora-wrap">
                <input type="time" name="entrada" id="jbr-entrada" required>
                <button type="button" class="jb-btn-agora" data-target="jbr-entrada">\u00E2\u008F\u00B1\u00EF\u00B8\u008F Agora</button>
              </div>
            </label>
            <label>Hora de Sa\u00C3\u00ADda
              <div class="jb-hora-wrap">
                <input type="time" name="saida" id="jbr-saida" required>
                <button type="button" class="jb-btn-agora" data-target="jbr-saida">\u00E2\u008F\u00B1\u00EF\u00B8\u008F Agora</button>
              </div>
            </label>
          </div>

          <div class="jb-row">
            <!-- Encomenda s\u00C3\u00B3 para clientes habituais -->
            <label id="jbr-wrap-encomenda">Efetuou Nova Encomenda?
              <select name="nova_encomenda" id="jbr-nova-encomenda">
                <option value="N\u00C3\u00A3o">N\u00C3\u00A3o</option>
                <option value="Sim">Sim</option>
              </select>
            </label>
            <label>Comprou Marca Nova?
              <select name="marca_nova" id="jbr-marca-nova">
                <option value="N\u00C3\u00A3o" selected>N\u00C3\u00A3o</option>
                <option value="Sim">Sim</option>
              </select>
            </label>
          </div>

          <!-- S\u00C3\u00B3 aparece quando Comprou Marca Nova = Sim -->
          <div class="jb-marcas-wrap jbp-hide" id="jbr-wrap-marcas">
            <span style="font-size:13px;font-weight:700;color:#0f2746;">Selecione as marcas compradas:</span>
            <div class="jb-marcas-grid">
              <label class="jb-chip"><input type="checkbox" value="Caderno Inteligente"> Caderno Inteligente</label>
              <label class="jb-chip"><input type="checkbox" value="Topstick"> Topstick</label>
              <label class="jb-chip"><input type="checkbox" value="Nostalgic-Art"> Nostalgic-Art</label>
              <label class="jb-chip"><input type="checkbox" value="Cavallini"> Cavallini</label>
              <label class="jb-chip"><input type="checkbox" value="Cool Bottles"> Cool Bottles</label>
              <label class="jb-chip"><input type="checkbox" value="Happily"> Happily</label>
              <label class="jb-chip"><input type="checkbox" value="Newpen"> Newpen</label>
              <label class="jb-chip"><input type="checkbox" value="Parlamondo"> Parlamondo</label>
            </div>
            <input type="hidden" name="quais_marcas" id="jbr-quais-marcas">
          </div>

          <label>Observa\u00C3\u00A7\u00C3\u00B5es da Visita
            <textarea name="observacoes" id="jbr-obs" rows="3" placeholder="Resumo da conversa, artigos apresentados, interesses futuros..."></textarea>
          </label>

          <button type="submit" class="jb-btn-submeter" id="jbr-btn-submeter-visita">Submeter Registo de Visita</button>
          <div class="jb-msg-submissao" id="jbr-msg-visitas"></div>
        </form>

        <!-- FORMUL\u00C3\u0081RIO 2: ROTA DI\u00C3\u0081RIA -->
        <form class="jb-form" id="jb-form-rotas" data-tipo="rotas">
          <input type="hidden" name="comercial" class="jbp-field-comercial">

          <div class="jb-row">
            <label>Data da Rota
              <input type="date" name="data" id="jbr-rota-data" required>
            </label>
            <label>Ponto de Partida
              <input type="text" name="inicio" required placeholder="Ex: Porto, Vila do Conde...">
            </label>
            <label>Destino Final
              <input type="text" name="fim" required placeholder="Ex: Porto, Escrit\u00C3\u00B3rio...">
            </label>
          </div>

          <label>Paragens Interm\u00C3\u00A9dias / Lojas Visitadas
            <input type="text" name="paragens" required placeholder="Ex: Maia, Trofa, Famalic\u00C3\u00A3o...">
          </label>

          <label>Observa\u00C3\u00A7\u00C3\u00B5es da Rota
            <textarea name="observacoes" rows="3" placeholder="Notas sobre tr\u00C3\u00A2nsito, imprevistos ou reuni\u00C3\u00B5es adicionais..."></textarea>
          </label>

          <button type="submit" class="jb-btn-submeter">Submeter Rota Di\u00C3\u00A1ria</button>
          <div class="jb-msg-submissao" id="jbr-msg-rotas"></div>
        </form>

        <!-- FORMUL\u00C3\u0081RIO 3: ABASTECIMENTO -->
        <form class="jb-form" id="jb-form-abastecimentos" data-tipo="abastecimentos">
          <input type="hidden" name="comercial" class="jbp-field-comercial">

          <div class="jb-row">
            <label>Quil\u00C3\u00B3metros no Painel (Km)
              <input type="number" name="km_antes" required placeholder="Ex: 180949">
            </label>
            <label>Valor Total (\u00E2\u201A\u00AC)
              <input type="number" step="0.01" name="valor" required placeholder="Ex: 70.00">
            </label>
          </div>

          <label>Fotografia do Tal\u00C3\u00A3o / Fatura
            <input type="file" id="jbr-foto-input" accept="image/*" capture="environment">
            <input type="hidden" name="foto_base64" id="jbr-foto-base64">
            <small style="font-size:11.5px;color:var(--muted);margin-top:2px;">A foto \u00C3\u00A9 comprimida automaticamente no telem\u00C3\u00B3vel para envio r\u00C3\u00A1pido.</small>
          </label>

          <button type="submit" class="jb-btn-submeter">Submeter Abastecimento</button>
          <div class="jb-msg-submissao" id="jbr-msg-abastecimentos"></div>
        </form>
      </div>
    </section>

    <!-- ABA 3: HIST\u00C3\u201CRICO & DASHBOARD DE KPIs -->
    <section class="jbp-panel" id="jbp-panel-historico">
      <div class="jbh-wrap">
        <div class="jbh-top-bar">
          <div style="display:flex;align-items:center;gap:10px;">
            <div class="jb-logo-badge" style="width:36px;height:36px;font-size:15px;">JB</div>
            <div>
              <strong style="font-size:16px;color:#0f2746;">Hist\u00C3\u00B3rico & Relat\u00C3\u00B3rios de Atividade</strong>
              <div style="font-size:11.5px;color:var(--muted);">Consulta detalhada com filtros e exporta\u00C3\u00A7\u00C3\u00A3o.</div>
            </div>
          </div>
          <div class="jbh-acoes" style="display:flex;gap:8px;">
            <button type="button" class="jbp-nav-btn" id="jbh-btn-imprimir" style="background:#f1f5f9;color:#0f2746;">\u00F0\u0178\u2013\u00A8\u00EF\u00B8\u008F Imprimir Tabela</button>
            <button type="button" class="jbp-nav-btn" id="jbh-btn-atualizar" style="background:#1a3d6d;color:#fff;">\u00F0\u0178\u201D\u201E Atualizar Dados</button>
          </div>
        </div>

        <div class="jbh-tabs" id="jbh-tabs">
          <button type="button" class="jbh-tab active" data-tipo="visitas">Visitas</button>
          <button type="button" class="jbh-tab" data-tipo="rotas">Rotas</button>
          <button type="button" class="jbh-tab" data-tipo="abastecimentos">Abastecimentos</button>
        </div>

        <!-- DASHBOARD DE KPIs DO HIST\u00C3\u201CRICO -->
        <div class="jbh-kpis" id="jbh-kpis"></div>

        <!-- ATALHOS DE PER\u00C3\u008DODO -->
        <div class="jbh-atalhos-data">
          <span style="font-weight:700;color:#475569;">Filtrar per\u00C3\u00ADodo:</span>
          <button type="button" class="jbh-btn-atalho" id="jbh-dt-hoje">Hoje</button>
          <button type="button" class="jbh-btn-atalho" id="jbh-dt-semana">Esta semana</button>
          <button type="button" class="jbh-btn-atalho" id="jbh-dt-mes">Este m\u00C3\u00AAs</button>
          <button type="button" class="jbh-btn-atalho active" id="jbh-dt-tudo">Tudo</button>
          <button type="button" class="jbh-btn-atalho" id="jbh-dt-limpar" style="margin-left:auto;color:#b91c1c;border-color:#fecaca;">Limpar filtros</button>
        </div>

        <!-- FILTROS ADICIONAIS -->
        <div class="jbh-filtros-bar">
          <input type="text" id="jbh-q" placeholder="Pesquisar loja, comercial, localidade..." style="flex:1;min-width:200px;">
          <input type="date" id="jbh-de" title="Data inicial">
          <input type="date" id="jbh-ate" title="Data final">
          <select id="jbh-sel-com" class="jbp-hide">
            <option value="">Todos os comerciais</option>
          </select>
        </div>

        <div class="jbh-table-wrap" id="jbh-table-cont"></div>
      </div>
    </section>

  </div>

  <!-- MODAL: FICHA DO CLIENTE (DESTAQUE NO NOME E N\u00C3\u0161MERO) -->
  <div class="jbm-modal-overlay jbp-hide" id="jbm-modal">
    <div class="jbm-modal">
      <div class="jbm-modal-header">
        <div style="display:flex;flex-direction:column;gap:6px;width:100%;min-width:0;">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;">
            <span class="jbm-card-num" id="modal-num" style="font-size:16px;font-weight:800;padding:5px 14px;background:#f59e0b;color:#0f172a;border-radius:8px;box-shadow:0 2px 4px rgba(0,0,0,.15);letter-spacing:.5px;">#0000</span>
            <button type="button" class="jbm-btn-close" id="modal-btn-close">\u00E2\u0153\u2022</button>
          </div>
          <h2 id="modal-nome" style="margin:4px 0 0;font-size:20px;font-weight:800;color:#ffffff;line-height:1.25;word-break:break-word;">Nome da Loja</h2>
          <div style="font-size:13px;color:#cbd5e1;display:flex;align-items:center;gap:6px;" id="modal-sub">
            \u00F0\u0178\u201C\u008D Localidade \u00C2\u00B7 Morada
          </div>
        </div>
      </div>

      <div class="jbm-modal-body">
        <div class="jbm-campo">
          <label>Navegar para o cliente</label>
          <div class="jbm-gps-group">
            <a href="#" target="_blank" class="jbm-btn-gps jbm-btn-gmaps" id="modal-link-gmaps">\u00F0\u0178\u2014\u00BA\u00EF\u00B8\u008F Google Maps</a>
            <a href="#" target="_blank" class="jbm-btn-gps jbm-btn-waze" id="modal-link-waze">\u00F0\u0178\u0161\u2014 Waze</a>
            <button type="button" class="jbm-btn-gps jbm-btn-visita" id="modal-btn-ir-visita">\u00F0\u0178\u201C\u009D Registar Visita</button>
          </div>
        </div>

        <div class="jbm-grid-2">
          <div class="jbm-campo">
            <label>Classifica\u00C3\u00A7\u00C3\u00A3o (Cor)</label>
            <select id="modal-cor">
              <option value="verde">\u00F0\u0178\u0178\u00A2 Verde (Melhor Cliente - 30 dias)</option>
              <option value="laranja">\u00F0\u0178\u0178\u00A0 Laranja (Mediano - 45 dias)</option>
              <option value="amarelo">\u00F0\u0178\u0178\u00A1 Amarelo (Baixas compras - 60 dias)</option>
              <option value="lilas">\u00F0\u0178\u0178\u00A3 Lil\u00C3\u00A1s (Potencial Cliente)</option>
            </select>
          </div>
          <div class="jbm-campo">
            <label>\u00C3\u0161ltima Visita</label>
            <input type="text" id="modal-dias" readonly style="background:#f8fafc;font-weight:700;">
          </div>
        </div>

        <div class="jbm-campo">
          <label>Morada Completa</label>
          <input type="text" id="modal-morada">
        </div>

        <div class="jbm-grid-2">
          <div class="jbm-campo">
            <label>Pessoa de Contacto</label>
            <input type="text" id="modal-contacto">
          </div>
          <div class="jbm-campo">
            <label>Telefone</label>
            <input type="tel" id="modal-telefone">
          </div>
        </div>

        <div class="jbm-campo">
          <label>Marcas que Vende (Atuais)</label>
          <div class="jb-marcas-grid" id="modal-marcas-grid">
            <label class="jb-chip"><input type="checkbox" value="Caderno Inteligente"> Caderno Inteligente</label>
            <label class="jb-chip"><input type="checkbox" value="Topstick"> Topstick</label>
            <label class="jb-chip"><input type="checkbox" value="Nostalgic-Art"> Nostalgic-Art</label>
            <label class="jb-chip"><input type="checkbox" value="Cavallini"> Cavallini</label>
            <label class="jb-chip"><input type="checkbox" value="Cool Bottles"> Cool Bottles</label>
            <label class="jb-chip"><input type="checkbox" value="Happily"> Happily</label>
            <label class="jb-chip"><input type="checkbox" value="Newpen"> Newpen</label>
            <label class="jb-chip"><input type="checkbox" value="Parlamondo"> Parlamondo</label>
          </div>
        </div>

        <div class="jbm-campo">
          <label>Observa\u00C3\u00A7\u00C3\u00B5es do Cliente</label>
          <textarea id="modal-obs" rows="2" placeholder="Notas sobre h\u00C3\u00A1bitos de compra, hor\u00C3\u00A1rios preferenciais..."></textarea>
        </div>

        <button type="button" class="jb-btn-submeter" id="modal-btn-guardar" style="margin-top:0;">Guardar Altera\u00C3\u00A7\u00C3\u00B5es na Ficha</button>
        <div id="modal-msg" style="font-size:12.5px;font-weight:600;text-align:center;min-height:16px;"></div>
      </div>
    </div>
  </div>

  <!-- MODAL: PLANEADOR DE ROTA (COM SELE\u00C3\u2021\u00C3\u0192O POR CORES) -->
  <div class="jbm-modal-overlay jbp-hide" id="jbm-modal-rota">
    <div class="jbm-modal" style="max-width:700px;">
      <div class="jbm-modal-header">
        <div style="display:flex;align-items:center;gap:10px;">
          <span style="font-size:22px;">\u00F0\u0178\u0161\u2014</span>
          <div>
            <strong style="font-size:16px;color:#fff;">Planeador de Rota Otimizada</strong>
            <div style="font-size:12px;color:#cbd5e1;">Selecione os clientes por cores ou individualmente para calcular o melhor itiner\u00C3\u00A1rio.</div>
          </div>
        </div>
        <button type="button" class="jbm-btn-close" id="rota-btn-close">\u00E2\u0153\u2022</button>
      </div>

      <div class="jbm-modal-body">
        
        <!-- SELE\u00C3\u2021\u00C3\u0192O R\u00C3\u0081PIDA POR CORES / ESTADOS -->
        <div style="background:#f8fafc;padding:12px 14px;border-radius:10px;border:1px solid #e2e8f0;">
          <div style="font-size:12px;font-weight:800;color:#0f2746;margin-bottom:8px;text-transform:uppercase;letter-spacing:.5px;">
            \u00F0\u0178\u017D\u00AF Sele\u00C3\u00A7\u00C3\u00A3o R\u00C3\u00A1pida por Cores & Prioridade:
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;" id="rota-picker-cores">
            <button type="button" class="rota-cor-btn" data-status="em-atraso" style="border-color:#fca5a5;color:#991b1b;">\u00F0\u0178\u201D\u00B4 Em Atraso (+45d)</button>
            <button type="button" class="rota-cor-btn" data-status="a-vencer" style="border-color:#fde68a;color:#92400e;">\u00F0\u0178\u0178\u00A0 Aten\u00C3\u00A7\u00C3\u00A3o (+30d)</button>
            <button type="button" class="rota-cor-btn" data-cor="verde">\u00F0\u0178\u0178\u00A2 Verdes (Melhores)</button>
            <button type="button" class="rota-cor-btn" data-cor="laranja">\u00F0\u0178\u0178\u00A0 Laranjas (M\u00C3\u00A9dios)</button>
            <button type="button" class="rota-cor-btn" data-cor="amarelo">\u00F0\u0178\u0178\u00A1 Amarelos (Baixas Compras)</button>
            <button type="button" class="rota-cor-btn" data-cor="lilas">\u00F0\u0178\u0178\u00A3 Lil\u00C3\u00A1s (Potenciais)</button>
          </div>
        </div>

        <div style="display:flex;gap:8px;align-items:center;margin-top:4px;">
          <input type="text" id="rota-busca" placeholder="Filtrar lojas por nome ou localidade..." style="flex:1;padding:8px 12px;border:1px solid var(--border);border-radius:8px;font-size:13px;">
          <button type="button" class="jbm-sort-btn" id="rota-selecionar-todos" style="padding:8px 12px;">Selecionar Todos</button>
          <button type="button" class="jbm-sort-btn" id="rota-limpar-selecao" style="padding:8px 12px;color:#b91c1c;border-color:#fecaca;">Limpar</button>
        </div>

        <div style="max-height:240px;overflow-y:auto;border:1px solid var(--border);border-radius:8px;padding:6px;background:#fff;" id="rota-lista-clientes"></div>

        <div id="rota-resumo" style="background:#f1f5f9;padding:12px 14px;border-radius:8px;font-size:13px;font-weight:700;display:flex;justify-content:space-between;align-items:center;">
          <span id="rota-txt-resumo">Nenhum cliente selecionado</span>
          <button type="button" class="jbm-btn-rota-top" id="rota-btn-calcular" style="padding:8px 16px;">\u00E2\u0161\u00A1 Calcular Rota</button>
        </div>

        <div id="rota-links-nav" class="jbp-hide" style="display:flex;gap:8px;margin-top:6px;">
          <a href="#" target="_blank" class="jbm-btn-gps jbm-btn-gmaps" id="rota-link-gmaps" style="padding:10px;">\u00F0\u0178\u2014\u00BA\u00EF\u00B8\u008F Abrir Rota Completa no Google Maps</a>
          <button type="button" class="jbm-btn-gps" id="rota-btn-limpar-mapa" style="background:#fee2e2;color:#991b1b;border-color:#fecaca;padding:10px;">Limpar Rota do Mapa</button>
        </div>
      </div>
    </div>
  </div>

  <script>
  (function () {
    var estado = {
      autenticado: false,
      codigo: '',
      nome: '',
      perfil: '',
      adminComercialFiltro: '',
      dados: { rotas: { cols: [], rows: [] }, visitas: { cols: [], rows: [] }, abastecimentos: { cols: [], rows: [] } },
      tipoHist: 'visitas',
      limiteHist: 100,
      filtrosColHist: {}
    };

    var DATA_INICIO_CONTROLO = '2026-11-09';
    var PRAZOS = { verde: 30, laranja: 45, amarelo: 60, lilas: null };

    // BASE DE CLIENTES REAL
    var CLIENTES_BASE = [
      {num:"6918",nome:"100\u00AA P\u00E1gina, Livraria Lda",morada:"Av. Central 118/120, 4710-229",localidade:"Braga",lat:41.551444,lng:-8.421766,cor:"verde",faturacao:0,contacto:"",telefone:"",marcas:""},
      {num:"4042",nome:"Abinepal",morada:"Rua Albano Coelho Lima,467, 4810-356 Guimar\u00E3es",localidade:"Braga",lat:41.4425,lng:-8.2918,cor:"verde",faturacao:0,contacto:"",telefone:"",marcas:""},
      {num:"17386",nome:"Afiaoconhecimento",morada:"Avenida D. Manuel I, n\u00BA 2358, 4585-013 Baltar",localidade:"Porto",lat:41.192088,lng:-8.38801,cor:"laranja",faturacao:0,contacto:"",telefone:"",marcas:""},
      {num:"20180",nome:"Almeida & Neves",morada:"Alameda S. Damaso, 69/70, 4801-909 Guimar\u00E3es",localidade:"Braga",lat:41.4442,lng:-8.2901,cor:"laranja",faturacao:0,contacto:"",telefone:"",marcas:""},
      {num:"4705",nome:"ALTF4 - Inform\u00E1tica, Lda#",morada:"Rua Armindo Costa Azevedo Jr., Loja 65, 4785-099 Trofa",localidade:"Porto",lat:41.3364,lng:-8.5599,cor:"amarelo",faturacao:0,contacto:"",telefone:"",marcas:""},
      {num:"2846",nome:"Ariosa Papelaria e Livraria",morada:"Rua D.Afonso henriques, 86",localidade:"Porto",lat:41.158539,lng:-8.635536,cor:"verde",faturacao:0,contacto:"",telefone:"",marcas:""},
      {num:"10760",nome:"Armaz\u00E9m Costa",morada:"Rua da Ribeira, n\u00BA132, 4770-207 Famalic\u00E3o",localidade:"Braga",lat:41.4082,lng:-8.5196,cor:"amarelo",faturacao:0,contacto:"",telefone:"",marcas:""},
      {num:"19759",nome:"As Amorinhas",morada:"Rua Beato Miguel de Carvalho n\u00BA 46, 4710-356 Braga",localidade:"Braga",lat:41.551344,lng:-8.413779,cor:"laranja",faturacao:0,contacto:"",telefone:"",marcas:""},
      {num:"20236",nome:"Baby Prendas",morada:"Av Doutor Jaime Barros, n 214, 4595-204 Pa\u00E7os de Ferreira",localidade:"Porto",lat:41.2778,lng:-8.3764,cor:"lilas",faturacao:0,contacto:"",telefone:"",marcas:""},
      {num:"19873",nome:"Babylandia",morada:"Av. dos Bombeiros Volunt\u00E1rios, 1669, 4585-013 Baltar",localidade:"Porto",lat:41.192088,lng:-8.38801,cor:"lilas",faturacao:0,contacto:"",telefone:"",marcas:""},
      {num:"19480",nome:"Baby's love",morada:"Av Abade de Priscos, n40, 4730-305 Vila Verde",localidade:"Braga",lat:41.6492,lng:-8.4357,cor:"laranja",faturacao:0,contacto:"",telefone:"",marcas:""},
      {num:"19403",nome:"Batata Doce",morada:"Rua 31 de Janeiro, n\u00BA119, 4600-043 Amarante",localidade:"Porto",lat:41.268661,lng:-8.077307,cor:"verde",faturacao:0,contacto:"",telefone:"",marcas:""},
      {num:"17018",nome:"Bazar Moderno",morada:"Rua Rainha D. Maria II, n.\u00BA 84-90, 4800-431 Guimar\u00E3es",localidade:"Braga",lat:41.442603,lng:-8.293095,cor:"verde",faturacao:0,contacto:"",telefone:"",marcas:""},
      {num:"13815",nome:"Cantinho das Letras Unipessoal, Lda.",morada:"Rua Monsenhor Vieira Castro, 272, 4820-279  Fafe",localidade:"Braga",lat:41.4504,lng:-8.1706,cor:"amarelo",faturacao:0,contacto:"",telefone:"",marcas:""},
      {num:"15968",nome:"Capitulo7",morada:"Rua Quinta da Igreja, Loja 5, 4760-715 Ribeir\u00E3o - Famalic\u00E3o",localidade:"Braga",lat:41.360614,lng:-8.559313,cor:"laranja",faturacao:0,contacto:"",telefone:"",marcas:""},
      {num:"19482",nome:"Casa da Capela",morada:"Rua de S\u00E3o Francisco, 8, 4650-311 Barcelos",localidade:"Braga",lat:41.5316,lng:-8.6190,cor:"laranja",faturacao:0,contacto:"",telefone:"",marcas:""},
      {num:"19435",nome:"Casa dos Neves",morada:"Rua Fernandes Tom\u00E1s, 789, 4000-429 Porto",localidade:"Porto",lat:41.168204,lng:-8.689219,cor:"verde",faturacao:0,contacto:"",telefone:"",marcas:""},
      {num:"7845",nome:"Livraria Gomes",morada:"Rua Dr. Narciso Alves Cunha, 4940-538 Paredes de Coura",localidade:"Viana do Castelo",lat:41.910444,lng:-8.559224,cor:"amarelo",faturacao:0,contacto:"",telefone:"",marcas:""},
      {num:"10668",nome:"Contipaper - Artigos de Papel. e Escrit\u00F3rio, Lda.",morada:"Rua da Cooperativa, 23, 4590-552 Pa\u00E7os de Ferreira",localidade:"Porto",lat:41.2778,lng:-8.3764,cor:"verde",faturacao:0,contacto:"",telefone:"",marcas:""},
      {num:"20176",nome:"Conto de Fadas",morada:"Alameda 5 de Outubro, 66, 4900-515 Viana de Castelo",localidade:"Viana do Castelo",lat:41.691417,lng:-8.827272,cor:"laranja",faturacao:0,contacto:"",telefone:"",marcas:""},
      {num:"19872",nome:"Dois a Dois",morada:"Estrada da Abelheira 1398, 4900-438 Viana do Castelo",localidade:"Viana do Castelo",lat:41.705436,lng:-8.82668,cor:"laranja",faturacao:0,contacto:"",telefone:"",marcas:""},
      {num:"943",nome:"Eurodidacta",morada:"Rua da Feira n\u00BA262 4700-271",localidade:"Viana do Castelo",lat:41.556151,lng:-8.432447,cor:"verde",faturacao:0,contacto:"",telefone:"",marcas:""},
      {num:"19494",nome:"Farm Kids",morada:"Largo S. Jo\u00E3o de Souto 14/15, 4700-326 Braga",localidade:"Braga",lat:41.549948,lng:-8.425152,cor:"lilas",faturacao:0,contacto:"",telefone:"",marcas:""},
      {num:"11146",nome:"Flash Gift",morada:"Rua Conde S\u00E3o Bento, 100, 4785-296 Trofa",localidade:"Porto",lat:41.337426,lng:-8.559319,cor:"laranja",faturacao:0,contacto:"",telefone:"",marcas:""},
      {num:"263",nome:"Fontenova - Livraria e Papelaria Unipessoal, Lda.",morada:"Rua Lu\u00EDs de Cam\u00F5es n\u00BA142 R/C, 4760-100 Vila Nova Famalic\u00E3o",localidade:"Braga",lat:41.4082,lng:-8.5196,cor:"verde",faturacao:0,contacto:"",telefone:"",marcas:""},
      {num:"19017",nome:"Gadgetpositivity Lda",morada:"Largo Mira Torre n\u00BA24, 4620-586 Lousada",localidade:"Porto",lat:41.2774,lng:-8.2833,cor:"lilas",faturacao:0,contacto:"",telefone:"",marcas:""},
      {num:"110",nome:"Gandias-Soc. de Representa\u00E7\u00F5es, Lda.",morada:"Av. Central, 116, 4710-229 Braga",localidade:"Braga",lat:41.551444,lng:-8.421766,cor:"verde",faturacao:0,contacto:"",telefone:"",marcas:""},
      {num:"17554",nome:"Gotu, LDA",morada:"Rua Da Igreja, N\u00BA 200, V.F.S.Pedro, 4750-847 Barcelos",localidade:"Braga",lat:41.5316,lng:-8.6190,cor:"laranja",faturacao:0,contacto:"",telefone:"",marcas:""},
      {num:"20165",nome:"Grafphit",morada:"Rua grande n 22, 4900-542 Viana do Castelo",localidade:"Viana do Castelo",lat:41.691997,lng:-8.82813,cor:"amarelo",faturacao:0,contacto:"",telefone:"",marcas:""},
      {num:"7358",nome:"Ideal Lcc - Livraria, Papelaria e Embalagens, Lda",morada:"Rua da Ra\u00EDnha n\u00BA34, 4801-909 Guimar\u00E3es",localidade:"Braga",lat:41.4425,lng:-8.2918,cor:"verde",faturacao:0,contacto:"",telefone:"",marcas:""},
      {num:"20178",nome:"Ideias & Mimos, Lda",morada:"Avenida Central, n\u00BA33, C.C.Avenida, Loja 29/30, 4710-218 Braga",localidade:"Braga",lat:41.5511,lng:-8.4280,cor:"lilas",faturacao:0,contacto:"",telefone:"",marcas:""},
      {num:"20177",nome:"Ikoo",morada:"Pra\u00E7a Doutor Luis, 32 4590-529 Pa\u00E7os de Ferreira",localidade:"Porto",lat:41.2778,lng:-8.3764,cor:"lilas",faturacao:0,contacto:"",telefone:"",marcas:""},
      {num:"20159",nome:"Joval",morada:"Zona Industrial do Socorro, Lt 10, 4820-011 Fafe",localidade:"Braga",lat:41.456212,lng:-8.14006,cor:"amarelo",faturacao:0,contacto:"",telefone:"",marcas:""},
      {num:"20314",nome:"LaPan\u00F3plia",morada:"R. Augusto Sim\u00F5es 1453, 4470-137 Maia",localidade:"Porto",lat:41.2335,lng:-8.6217,cor:"lilas",faturacao:0,contacto:"",telefone:"",marcas:""},
      {num:"3034",nome:"Linhamagenta",morada:"Rua da Infanta Dona Maria, N\u00BA25, 1\u00BA Dto., 4050-350 Porto",localidade:"Porto",lat:41.154492,lng:-8.618064,cor:"verde",faturacao:0,contacto:"",telefone:"",marcas:""},
      {num:"15600",nome:"Little Cloud",morada:"Rua Cidade de N Dola, N\u00BA 77, 4150-207 Porto",localidade:"Porto",lat:41.1579,lng:-8.6291,cor:"verde",faturacao:0,contacto:"",telefone:"",marcas:""},
      {num:"3274",nome:"Livraria A Lu\u00EDsa",morada:"Praca Lu\u00EDs de Cam\u00F5es n\u00BA107, 4480-719 Vila do Conde",localidade:"Porto",lat:41.352617,lng:-8.747684,cor:"verde",faturacao:0,contacto:"",telefone:"",marcas:""},
      {num:"6604",nome:"Livraria Papelaria Minerva",morada:"Rua da Junqueira n\u00BA15, 4490-519 P\u00F3voa de Varzim",localidade:"Porto",lat:41.379937,lng:-8.76525,cor:"verde",faturacao:0,contacto:"",telefone:"",marcas:""},
      {num:"17442",nome:"Livraria Porto",morada:"R. de Diogo Botelho 1327, 4169-005 Porto",localidade:"Porto",lat:41.1544,lng:-8.6746,cor:"amarelo",faturacao:0,contacto:"",telefone:"",marcas:""},
      {num:"19249",nome:"Livraria Porto Editora",morada:"Pra\u00E7a de D. Filipa de Lencastre, 42 4050-259 Porto",localidade:"Porto",lat:41.147857,lng:-8.61262,cor:"verde",faturacao:0,contacto:"",telefone:"",marcas:""},
      {num:"16611",nome:"Livraria Z\u00E9",morada:"Av. Joaquim Leite de Carvalho, N\u00BA 16, 4600-019 Amarante",localidade:"Porto",lat:41.2713,lng:-8.0776,cor:"laranja",faturacao:0,contacto:"",telefone:"",marcas:""},
      {num:"4047",nome:"Livraria, Papelaria Sta Teresinha",morada:"Av. 25 de Abril, Edificio Via Sol R/C - L, 4930-595 Valen\u00E7a",localidade:"Viana do Castelo",lat:42.0286,lng:-8.6339,cor:"amarelo",faturacao:0,contacto:"",telefone:"",marcas:""},
      {num:"9322",nome:"Loja UP",morada:"Pra\u00E7a Gomes Teixeira, s/n, 4099-002 Porto",localidade:"Porto",lat:41.14634,lng:-8.615639,cor:"laranja",faturacao:0,contacto:"",telefone:"",marcas:""},
      {num:"4067",nome:"Marques & H Ferreira Lda.",morada:"Av Pedro Guedes edif Riviera 2,356 D, 4560-452 Penafiel",localidade:"Porto",lat:41.2062,lng:-8.2842,cor:"laranja",faturacao:0,contacto:"",telefone:"",marcas:""},
      {num:"19147",nome:"MeowMeow Babies & kids",morada:"Av. Doutor Arthur Soares, 328, 4700-363 Braga",localidade:"Braga",lat:41.558302,lng:-8.423876,cor:"lilas",faturacao:0,contacto:"",telefone:"",marcas:""},
      {num:"13687",nome:"Minl\u00E2ndia Gift Store",morada:"Rua Sobre o Vale, 66 n\u00BA 5 4585-522",localidade:"Porto",lat:41.1925,lng:-8.3881,cor:"laranja",faturacao:0,contacto:"",telefone:"",marcas:""},
      {num:"18944",nome:"MoonGift",morada:"Rua 25 de Abril n\u00BA97, 4420-356 Porto",localidade:"Porto",lat:41.139328,lng:-8.540467,cor:"verde",faturacao:0,contacto:"",telefone:"",marcas:""},
      {num:"7492",nome:"Multiklip",morada:"Rua da Gandra, n\u00BA5/7, 4705-731 Celeir\u00F3s",localidade:"Braga",lat:41.51017,lng:-8.452515,cor:"verde",faturacao:0,contacto:"",telefone:"",marcas:""},
      {num:"20194",nome:"NU Concept Store",morada:"Rua das doze Casas, 72, 4000-193 Porto",localidade:"Porto",lat:41.1579,lng:-8.6291,cor:"lilas",faturacao:0,contacto:"",telefone:"",marcas:""},
      {num:"19810",nome:"Olio Mel",morada:"EN 105, 201, 1 andar, sala 1, 4815-135 Lordelo, Guimar\u00E3es",localidade:"Braga",lat:41.2389,lng:-8.4128,cor:"laranja",faturacao:0,contacto:"",telefone:"",marcas:""},
      {num:"20166",nome:"Papelar",morada:"Rua Costa Cabral, 61, 4200-221 Porto",localidade:"Porto",lat:41.1579,lng:-8.6291,cor:"verde",faturacao:0,contacto:"",telefone:"",marcas:""},
      {num:"18199",nome:"Papelaria 100 letras",morada:"Rua Professor Lu\u00EDs Mendes Ara\u00FAjo, n\u00BA 38, 4605-034 Vila Me\u00E3",localidade:"Porto",lat:41.24923,lng:-8.193061,cor:"laranja",faturacao:0,contacto:"",telefone:"",marcas:""},
      {num:"6877",nome:"Papelaria ABC- Formas d' Escrever",morada:"E. N. 209, edificio Lord, loja 4437, 4580-439 Lordelo",localidade:"Porto",lat:41.240117,lng:-8.412852,cor:"verde",faturacao:0,contacto:"",telefone:"",marcas:""},
      {num:"18474",nome:"Papelaria Aguarela",morada:"Rua Eng\u00BA. Alexandre Aranha, 245, 4590-591 Pa\u00E7os de Ferreira",localidade:"Porto",lat:41.2778,lng:-8.3764,cor:"laranja",faturacao:0,contacto:"",telefone:"",marcas:""},
      {num:"18568",nome:"Papelaria Arim",morada:"Rua de S\u00E3o Roque da Lameira, N\u00BA 476, 4350-299 Porto",localidade:"Porto",lat:41.1579,lng:-8.6291,cor:"amarelo",faturacao:0,contacto:"",telefone:"",marcas:""},
      {num:"7482",nome:"Papelaria Bracara",morada:"Pra\u00E7a General Humberto Delgado,47 - Loja 63, 4715-115 S\u00E3o Jos\u00E9 de L\u00E1zaro",localidade:"Braga",lat:41.54268,lng:-8.410259,cor:"verde",faturacao:0,contacto:"",telefone:"",marcas:""},
      {num:"214",nome:"Papelaria Continental",morada:"Rua da Cooperativa, 23, 4590-552 Pa\u00E7os de Ferreira",localidade:"Porto",lat:41.2778,lng:-8.3764,cor:"verde",faturacao:0,contacto:"",telefone:"",marcas:""},
      {num:"13077",nome:"Papelaria da Vila",morada:"Edif\u00EDcio Fonte da Vila - Rua do Corgo, 884, 4910-603 Caminha",localidade:"Viana do Castelo",lat:41.871157,lng:-8.835467,cor:"laranja",faturacao:0,contacto:"",telefone:"",marcas:""},
      {num:"4576",nome:"Papelaria Mil\u00E9nio",morada:"Rua de Santiago n\u00BA1389, 4835-247 Braga",localidade:"Braga",lat:41.5511,lng:-8.4280,cor:"amarelo",faturacao:0,contacto:"",telefone:"",marcas:""},
      {num:"17441",nome:"Papelaria Modelo",morada:"Largo dos L\u00F3ios, n\u00BA 76, 4050-338 Porto",localidade:"Porto",lat:41.145465,lng:-8.612393,cor:"verde",faturacao:0,contacto:"",telefone:"",marcas:""},
      {num:"12512",nome:"Papelaria Quinta do Vinhal",morada:"Rua Amadeu Mesquita, Lote 75 Loja 1, 4760-117 Vila Nova de Famalic\u00E3o",localidade:"Braga",lat:41.410871,lng:-8.522512,cor:"verde",faturacao:0,contacto:"",telefone:"",marcas:""},
      {num:"19838",nome:"Papelaria Ribeirinha",morada:"Rua do Salteiro n\u00BA231, 4485-399 Macieira da Maia",localidade:"Porto",lat:41.3355,lng:-8.681326,cor:"laranja",faturacao:0,contacto:"",telefone:"",marcas:""},
      {num:"20132",nome:"Papelaria Riscos e Rabiscos",morada:"Av. Narciso Ferreira 136, 4765-202",localidade:"Braga",lat:41.390887,lng:-8.396805,cor:"laranja",faturacao:0,contacto:"",telefone:"",marcas:""},
      {num:"3000",nome:"Papelaria Rochalves#",morada:"Urbanizacao da Boavista-Fra\u00E7\u00E3o E n\u00BA5, 4950-425 Mazedo-Mon\u00E7\u00E3o",localidade:"Viana do Castelo",lat:42.0722,lng:-8.4811,cor:"amarelo",faturacao:0,contacto:"",telefone:"",marcas:""},
      {num:"18747",nome:"Papelaria Sousa Ribeiro",morada:"Centro Comercial Norteshopping, Loja 0428, 4460-841 Porto",localidade:"Porto",lat:41.180449,lng:-8.655697,cor:"verde",faturacao:0,contacto:"",telefone:"",marcas:""},
      {num:"186",nome:"Papelarte",morada:"Rua da Telha, 16 4445-219",localidade:"Porto",lat:41.1579,lng:-8.6291,cor:"amarelo",faturacao:0,contacto:"",telefone:"",marcas:""},
      {num:"6543",nome:"Papelix#",morada:"Rua Central de Casais n\u00BA140, 4745-035 Alvarelhos- Trofa",localidade:"Porto",lat:41.3167,lng:-8.5833,cor:"amarelo",faturacao:0,contacto:"",telefone:"",marcas:""},
      {num:"15983",nome:"PC Convida, Lda",morada:"Alameda de S. Damaso, C.C.S.Francsico, Loja 58, 4810-286  Guimar\u00E3es",localidade:"Braga",lat:41.441361,lng:-8.293071,cor:"verde",faturacao:0,contacto:"",telefone:"",marcas:""},
      {num:"19495",nome:"Petit boo",morada:"Rua Professor Manuel Baganha 263, 4350-009 Porto",localidade:"Porto",lat:41.163178,lng:-8.585405,cor:"lilas",faturacao:0,contacto:"",telefone:"",marcas:""},
      {num:"15280",nome:"Pintassilgo no Mundo dos Pequenotes Unipessoal,Lda",morada:"Pra\u00E7a Marqu\u00EAs de Pombal, Loja 35, 4490-442 P\u00F3voa de Varzim",localidade:"Porto",lat:41.381123,lng:-8.761046,cor:"laranja",faturacao:0,contacto:"",telefone:"",marcas:""},
      {num:"20243",nome:"Pirolito\u00B4s",morada:"Rua Maria Ant\u00F3nia Neto, 140, 4620-523 Lousada",localidade:"Porto",lat:41.2774,lng:-8.2833,cor:"lilas",faturacao:0,contacto:"",telefone:"",marcas:""},
      {num:"12527",nome:"Puroflow",morada:"Rua Dr. Pinto Mesquita, 39, 4620-661 Lousada",localidade:"Porto",lat:41.2774,lng:-8.2833,cor:"verde",faturacao:0,contacto:"",telefone:"",marcas:""},
      {num:"14493",nome:"Sarrabisco",morada:"Avenida de S.Tom\u00E9, Edif\u00EDcio N.\u00AA Sr.\u00AA dos Ch\u00E3os, 4580-792 Paredes",localidade:"Porto",lat:41.2053,lng:-8.3308,cor:"laranja",faturacao:0,contacto:"",telefone:"",marcas:""},
      {num:"20175",nome:"Sementinha",morada:"Av. S\u00E3o Jo\u00E3o de Deus, n\u00BA 17-23, 4910-107 Caminha",localidade:"Viana do Castelo",lat:41.875128,lng:-8.836791,cor:"laranja",faturacao:0,contacto:"",telefone:"",marcas:""},
      {num:"13874",nome:"Sisters B",morada:"Avenida Antonio Pinto Lopes, n\u00BA 424, 4580-311 Baltar",localidade:"Porto",lat:41.175316,lng:-8.350478,cor:"laranja",faturacao:0,contacto:"",telefone:"",marcas:""},
      {num:"18318",nome:"Tabacaria Gomes",morada:"Rua de S\u00E3o Jo\u00E3o 9 e11",localidade:"Viana do Castelo",lat:41.694291,lng:-8.827335,cor:"amarelo",faturacao:0,contacto:"",telefone:"",marcas:""},
      {num:"5988",nome:"Velhotes Lda.#",morada:"Rua Gil Eanes, 21, 4400-165 Vila Nova de Gaia",localidade:"Porto",lat:41.1239,lng:-8.6118,cor:"verde",faturacao:0,contacto:"",telefone:"",marcas:""}
    ];

    var clientes = CLIENTES_BASE.map(function (c) {
      return Object.assign({}, c, {
        ultimaVisitaData: null,
        ultimaVisitaFormatada: '',
        ultimaVisitaTexto: 'Sem hist\u00C3\u00B3rico recente',
        diasSemVisita: null,
        estadoVisita: 'em-dia',
        urgenciaScore: 0,
        distanciaKm: null,
        marker: null
      });
    });

    var loginView = document.getElementById('jbp-login-view');
    var appView = document.getElementById('jbp-app-view');
    var loginForm = document.getElementById('jbp-login-form');
    var loginCode = document.getElementById('jbp-login-code');
    var loginErro = document.getElementById('jbp-login-erro');
    var btnLogin = document.getElementById('jbp-btn-login');

    document.querySelectorAll('.jbp-nav-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        document.querySelectorAll('.jbp-nav-btn').forEach(function (b) { b.classList.remove('active'); });
        document.querySelectorAll('.jbp-panel').forEach(function (p) { p.classList.remove('active'); });
        btn.classList.add('active');
        var tabId = 'jbp-panel-' + btn.dataset.tab;
        var p = document.getElementById(tabId);
        if (p) p.classList.add('active');
        if (btn.dataset.tab === 'mapa' && map) {
          setTimeout(function () { map.invalidateSize(); }, 200);
        }
      });
    });

    function tentarLogin(codigo, automatico) {
      if (!codigo) return;
      btnLogin.disabled = true;
      loginErro.textContent = 'A validar acesso...';

      fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ codigo: codigo })
      })
      .then(function (r) { return r.json(); })
      .then(function (res) {
        if (!res || !res.ok) {
          throw new Error(res && res.erro === 'codigo' ? 'C\u00C3\u00B3digo de acesso incorreto.' : 'Erro de valida\u00C3\u00A7\u00C3\u00A3o.');
        }

        estado.autenticado = true;
        estado.codigo = codigo;
        estado.nome = res.nome || 'Comercial';
        estado.perfil = res.perfil || 'comercial';
        estado.dados = res.dados || estado.dados;

        try { localStorage.setItem('jb_portal_codigo', codigo); } catch (e) {}

        document.getElementById('jbp-user-nome').textContent = estado.nome;
        document.getElementById('jbp-user-perfil').textContent = estado.perfil === 'admin' ? 'Administra\u00C3\u00A7\u00C3\u00A3o' : 'Comercial';
        document.querySelectorAll('.jbp-field-comercial').forEach(function (inp) { inp.value = estado.nome; });

        loginView.classList.add('jbp-hide');
        appView.classList.remove('jbp-hide');

        inicializarApp();
      })
      .catch(function (e) {
        btnLogin.disabled = false;
        loginErro.textContent = e.message || 'Erro ao ligar ao servidor.';
        if (automatico) {
          loginView.classList.remove('jbp-hide');
          appView.classList.add('jbp-hide');
        }
      });
    }

    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      tentarLogin(loginCode.value.trim(), false);
    });

    document.getElementById('jbp-btn-sair').addEventListener('click', function () {
      try { localStorage.removeItem('jb_portal_codigo'); } catch (e) {}
      estado.autenticado = false;
      estado.codigo = '';
      appView.classList.add('jbp-hide');
      loginView.classList.remove('jbp-hide');
      loginCode.value = '';
      loginErro.textContent = '';
      btnLogin.disabled = false;
    });

    var appIniciada = false;
    function inicializarApp() {
      sincronizarVisitasNoMapa();
      filtrarClientes();
      inicializarCockpit();
      inicializarRegistos();
      inicializarHistorico();
      if (!appIniciada) {
        inicializarMapa();
        appIniciada = true;
      }
    }

    // SINCRONIZAR VISITAS
    function sincronizarVisitasNoMapa() {
      var visitasRows = (estado.dados && estado.dados.visitas && estado.dados.visitas.rows) || [];
      var cols = (estado.dados && estado.dados.visitas && estado.dados.visitas.cols) || [];

      var iNif = cols.indexOf('nif');
      var iDia = cols.indexOf('dia');
      var iLoja = cols.indexOf('loja');

      var visitasPorCliente = {};
      visitasRows.forEach(function (r) {
        var idxNif = r.length > cols.length ? iNif + 1 : iNif;
        var idxDia = r.length > cols.length ? iDia + 1 : iDia;
        var idxLoja = r.length > cols.length ? iLoja + 1 : iLoja;

        var nif = String(r[idxNif] || '').trim();
        var loja = String(r[idxLoja] || '').trim().toLowerCase();
        var diaStr = String(r[idxDia] || '').trim();

        if (diaStr) {
          var d = new Date(diaStr.slice(0, 10));
          if (!isNaN(d.getTime())) {
            if (nif) {
              if (!visitasPorCliente[nif] || d > visitasPorCliente[nif]) visitasPorCliente[nif] = d;
            }
            if (loja) {
              if (!visitasPorCliente[loja] || d > visitasPorCliente[loja]) visitasPorCliente[loja] = d;
            }
          }
        }
      });

      clientes.forEach(function (c) {
        var d = visitasPorCliente[c.num] || visitasPorCliente[(c.nome || '').toLowerCase()];
        if (d) {
          c.ultimaVisitaData = d;
          c.ultimaVisitaFormatada = formatarDataPT(d);
        } else {
          c.ultimaVisitaData = null;
          c.ultimaVisitaFormatada = '';
        }
        avaliarEstadoCliente(c);
      });
    }

    function avaliarEstadoCliente(c) {
      var hoje = new Date();
      var dataControlo = new Date(DATA_INICIO_CONTROLO);

      if (c.cor === 'lilas') {
        c.estadoVisita = 'potencial';
        c.ultimaVisitaTexto = c.ultimaVisitaData ? 'Visitado em ' + c.ultimaVisitaFormatada : 'Potencial Cliente (Sem Hist\u00C3\u00B3rico)';
        c.diasSemVisita = c.ultimaVisitaData ? Math.floor((hoje - c.ultimaVisitaData) / 86400000) : null;
        c.urgenciaScore = 0;
        return;
      }

      var diasSemVisita;
      if (c.ultimaVisitaData) {
        diasSemVisita = Math.floor((hoje - c.ultimaVisitaData) / 86400000);
        c.ultimaVisitaTexto = '\u00C3\u0161ltima: ' + c.ultimaVisitaFormatada + ' (' + diasSemVisita + 'd atr\u00C3\u00A1s)';
      } else {
        diasSemVisita = Math.floor((hoje - dataControlo) / 86400000);
        c.ultimaVisitaTexto = 'Sem visitas desde o in\u00C3\u00ADcio do controlo (' + diasSemVisita + 'd)';
      }
      c.diasSemVisita = diasSemVisita;

      var prazoMax = PRAZOS[c.cor] || 45;
      if (diasSemVisita > prazoMax) {
        c.estadoVisita = 'em-atraso';
        c.urgenciaScore = 100 + (diasSemVisita - prazoMax);
      } else if (diasSemVisita >= prazoMax - 7) {
        c.estadoVisita = 'a-vencer';
        c.urgenciaScore = 50 + (diasSemVisita - (prazoMax - 7));
      } else {
        c.estadoVisita = 'em-dia';
        c.urgenciaScore = diasSemVisita / prazoMax;
      }
    }

    function formatarDataPT(d) {
      if (!d) return '';
      var dia = ('0' + d.getDate()).slice(-2);
      var mes = ('0' + (d.getMonth() + 1)).slice(-2);
      var ano = d.getFullYear();
      return dia + '/' + mes + '/' + ano;
    }

    // ==========================================
    // 0. RESUMO DI\u00C3\u0081RIO (L\u00C3\u201CGICA ADAPTATIVA)
    // ==========================================
    function inicializarCockpit() {
      var ehAdmin = estado.perfil === 'admin';
      var visitasRows = (estado.dados && estado.dados.visitas && estado.dados.visitas.rows) || [];
      var cols = (estado.dados && estado.dados.visitas && estado.dados.visitas.cols) || [];

      // Controlos visuais de Comercial vs Admin
      var comActions = document.getElementById('cockpit-comercial-actions');
      var comSection = document.getElementById('cockpit-comercial-section');
      var boxSugestao = document.getElementById('cockpit-box-sugestao');
      var adminControls = document.getElementById('cockpit-admin-controls');
      var adminSection = document.getElementById('cockpit-admin-section');

      if (ehAdmin) {
        document.getElementById('cockpit-ola').textContent = 'Painel Executivo \u00E2\u20AC\u201D JB Com\u00C3\u00A9rcio Global';
        document.getElementById('cockpit-sub-ola').textContent = 'Acompanhamento geral da atividade comercial, cobertura e alertas cr\u00C3\u00ADticos.';
        comActions.classList.add('jbp-hide');
        boxSugestao.classList.add('jbp-hide');
        adminControls.classList.remove('jbp-hide');
        adminSection.classList.remove('jbp-hide');
        comSection.classList.add('jbp-hide');

        // Popular dropdown de comerciais
        var selCom = document.getElementById('admin-sel-comercial');
        var valorAtual = selCom.value;
        selCom.innerHTML = '<option value="">Todos os Comerciais</option>';
        var distinctComs = new Set();
        visitasRows.forEach(function (r) {
          var nomeC = r[1] || r[0];
          if (nomeC && nomeC !== 'undefined') distinctComs.add(nomeC);
        });
        distinctComs.forEach(function (c) {
          var opt = document.createElement('option');
          opt.value = c;
          opt.textContent = c;
          selCom.appendChild(opt);
        });
        selCom.value = estado.adminComercialFiltro || valorAtual || '';
        selCom.onchange = function () {
          estado.adminComercialFiltro = this.value;
          var hSel = document.getElementById('jbh-sel-com');
          if (hSel) hSel.value = this.value;
          inicializarCockpit();
        };

        // Renderizar feed recente do Admin
        renderizarAdminFeed();
      } else {
        var nome = estado.nome || 'Comercial';
        document.getElementById('cockpit-ola').textContent = 'Ol\u00C3\u00A1, ' + nome + '! \u00F0\u0178\u2018\u2039';
        document.getElementById('cockpit-sub-ola').textContent = 'Aqui est\u00C3\u00A1 o teu assistente de visitas e controlo de objetivos em tempo real.';
        comActions.classList.remove('jbp-hide');
        adminControls.classList.add('jbp-hide');
        adminSection.classList.add('jbp-hide');
        comSection.classList.remove('jbp-hide');
      }

      // C\u00C3\u00A1lculo de M\u00C3\u00A9tricas (Atraso, Vencer, Em Dia, Encomendas)
      var atrasoCount = 0;
      var vencerCount = 0;
      var diaCount = 0;
      var urgentes = [];

      clientes.forEach(function (c) {
        if (c.estadoVisita === 'em-atraso') {
          atrasoCount++;
          urgentes.push(c);
        } else if (c.estadoVisita === 'a-vencer') {
          vencerCount++;
          urgentes.push(c);
        } else if (c.estadoVisita === 'em-dia') {
          diaCount++;
        }
      });

      document.getElementById('cockpit-val-atraso').textContent = atrasoCount;
      document.getElementById('cockpit-val-vencer').textContent = vencerCount;
      document.getElementById('cockpit-val-dia').textContent = diaCount;

      // Total de encomendas (filtrado por comercial se o admin tiver selecionado)
      var totalEnc = 0;
      var iEnc = cols.indexOf('nova_encomenda');
      var iCom = cols.indexOf('comercial');
      visitasRows.forEach(function (r) {
        var idxEnc = r.length > cols.length ? iEnc + 1 : iEnc;
        var idxCom = r.length > cols.length ? iCom + 1 : iCom;
        var comVal = r[idxCom] || '';
        if (estado.adminComercialFiltro && comVal !== estado.adminComercialFiltro) return;
        if (!ehAdmin && comVal && comVal !== estado.nome) return;
        if (idxEnc >= 0 && r[idxEnc] === 'Sim') totalEnc++;
      });
      document.getElementById('cockpit-val-encomendas').textContent = totalEnc;

      // Ordenar urgentes por maior n\u00C3\u00BAmero de dias sem visita
      urgentes.sort(function (a, b) { return (b.diasSemVisita || 0) - (a.diasSemVisita || 0); });

      // Se for Comercial, renderiza as lojas priorit\u00C3\u00A1rias e caixa de sugest\u00C3\u00A3o
      if (!ehAdmin) {
        var contUrg = document.getElementById('cockpit-lista-urgentes');
        contUrg.innerHTML = '';
        var topUrgentes = urgentes.slice(0, 6);

        if (!topUrgentes.length) {
          contUrg.innerHTML = '<p style="font-size:13px;color:var(--muted);padding:10px;">\u00F0\u0178\u017D\u2030 Excelente trabalho! N\u00C3\u00A3o h\u00C3\u00A1 lojas em atraso de momento.</p>';
          boxSugestao.classList.add('jbp-hide');
        } else {
          boxSugestao.classList.remove('jbp-hide');
          document.getElementById('cockpit-sugestao-titulo').textContent = '\u00F0\u0178\u2019\u00A1 Rota Priorit\u00C3\u00A1ria Recomendada (' + Math.min(topUrgentes.length, 5) + ' Lojas)';
          document.getElementById('cockpit-sugestao-txt').textContent = 'Lojas que mais precisam de contacto: ' + topUrgentes.slice(0, 3).map(function(c){return c.nome;}).join(', ') + '...';

          topUrgentes.forEach(function (c) {
            var card = document.createElement('div');
            card.className = 'jbm-card cor-' + c.cor;
            card.style.margin = '0';
            card.innerHTML = 
              '<div class="jbm-card-top">' +
                '<span class="jbm-card-nome">' + c.nome + '</span>' +
                '<span class="jbm-card-num">#' + c.num + '</span>' +
              '</div>' +
              '<div class="jbm-card-morada">\u00F0\u0178\u201C\u008D ' + c.localidade + ' \u00C2\u00B7 <strong>' + c.diasSemVisita + ' dias sem visita</strong></div>' +
              '<div class="jbm-card-footer" style="margin-top:6px;">' +
                '<span class="jbm-tag-status ' + (c.estadoVisita === 'em-atraso' ? 'em-atraso' : 'a-vencer') + '">' +
                  (c.estadoVisita === 'em-atraso' ? '\u00E2\u0161\u00A0\u00EF\u00B8\u008F Em atraso' : '\u00E2\u008F\u00B3 A vencer') +
                '</span>' +
                '<button type="button" class="jbm-sort-btn" style="background:#e0f2fe;color:#0369a1;border-color:#7dd3fc;font-weight:700;">Ver Ficha</button>' +
              '</div>';
            card.addEventListener('click', function () { abrirFichaCliente(c); });
            contUrg.appendChild(card);
          });
        }

        document.getElementById('cockpit-btn-aplicar-rota').onclick = function () {
          rotaClientesSelecionados.clear();
          topUrgentes.forEach(function (c) { rotaClientesSelecionados.add(c.num); });
          document.querySelector('.jbp-nav-btn[data-tab="mapa"]').click();
          document.getElementById('jbm-btn-abrir-rota').click();
        };

        document.getElementById('cockpit-btn-rota-sugerida').onclick = function () {
          document.getElementById('cockpit-btn-aplicar-rota').click();
        };

        document.getElementById('cockpit-btn-visita-proxima').onclick = function () {
          document.querySelector('.jbp-nav-btn[data-tab="mapa"]').click();
          document.getElementById('jbm-btn-gps').click();
        };
      }
    }

    function renderizarAdminFeed() {
      var tbody = document.getElementById('cockpit-admin-feed-tbody');
      tbody.innerHTML = '';
      var itens = prepararItensHistorico().visitas || [];
      var filtrados = itens.filter(function (it) {
        if (estado.adminComercialFiltro && it.comercial !== estado.adminComercialFiltro) return false;
        return true;
      });

      var ultimos = filtrados.slice(0, 8);
      if (!ultimos.length) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;color:var(--muted);padding:14px;">Nenhum registo de visita encontrado para o filtro selecionado.</td></tr>';
        return;
      }

      ultimos.forEach(function (it) {
        var tr = document.createElement('tr');
        var dataHora = (it.dia || (it.ts ? it.ts.slice(0,10) : '\u00E2\u20AC\u201D')) + (it.entrada ? ' \u00C3\u00A0s ' + it.entrada : '');
        var badgeEnc = it.nova_encomenda === 'Sim' ? '<span style="color:#15803d;font-weight:800;">Sim \u00F0\u0178\u201C\u00A6</span>' : '<span style="color:#94a3b8;">N\u00C3\u00A3o</span>';
        var badgeMarca = it.marca_nova === 'Sim' ? '<span style="color:#0369a1;font-weight:800;">Sim \u00E2\u00AD\u0090</span>' : '<span style="color:#94a3b8;">N\u00C3\u00A3o</span>';

        tr.innerHTML = 
          '<td><strong>' + dataHora + '</strong></td>' +
          '<td>' + (it.comercial || '\u00E2\u20AC\u201D') + '</td>' +
          '<td><strong>' + (it.loja || '\u00E2\u20AC\u201D') + '</strong>' + (it.nif ? ' <small style="color:var(--muted);">(#' + it.nif + ')</small>' : '') + '</td>' +
          '<td>' + (it.localidade || '\u00E2\u20AC\u201D') + '</td>' +
          '<td>' + badgeEnc + '</td>' +
          '<td>' + badgeMarca + '</td>' +
          '<td style="max-width:240px;overflow:hidden;text-overflow:ellipsis;" title="' + (it.observacoes || '') + '">' + (it.observacoes || '\u00E2\u20AC\u201D') + '</td>';
        tbody.appendChild(tr);
      });

      document.getElementById('cockpit-admin-ver-tudo').onclick = function () {
        document.querySelector('.jbp-nav-btn[data-tab="historico"]').click();
      };
    }

    // ==========================================
    // 1. MAPA & CRM
    // ==========================================
    var map = null;
    var markersLayer = null;
    var rotaLayer = null;
    var userLocationMarker = null;
    var filtroCorAtivo = 'todas';
    var ordenacaoAtiva = 'urgencia';
    var termoBusca = '';
    var gpsAtivo = false;

    function inicializarMapa() {
      map = L.map('jbm-mapa').setView([41.25, -8.45], 10);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '\u00C2\u00A9 OpenStreetMap'
      }).addTo(map);

      markersLayer = L.layerGroup().addTo(map);
      rotaLayer = L.layerGroup().addTo(map);

      atualizarContadores();
      filtrarClientes();
    }

    function criarIcone(c) {
      var corHex = { verde: '#22c55e', laranja: '#f97316', amarelo: '#eab308', lilas: '#a855f7' }[c.cor] || '#64748b';
      var badgeHtml = c.estadoVisita === 'em-atraso' ? '<div style="position:absolute;top:-4px;right:-4px;background:#dc2626;color:#fff;border-radius:50%;width:14px;height:14px;font-size:9px;font-weight:900;display:flex;align-items:center;justify-content:center;border:1.5px solid #fff;">!</div>' : '';

      return L.divIcon({
        className: 'jbm-pin-custom',
        html: '<div style="position:relative;width:24px;height:24px;background:' + corHex + ';border:2px solid #fff;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,.35);cursor:pointer;">' + badgeHtml + '</div>',
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });
    }

    function atualizarContadores() {
      var contagens = { todas: clientes.length, verde: 0, laranja: 0, amarelo: 0, lilas: 0 };
      clientes.forEach(function (c) {
        if (contagens[c.cor] !== undefined) contagens[c.cor]++;
      });
      document.getElementById('cnt-todas').textContent = contagens.todas;
      document.getElementById('cnt-verde').textContent = contagens.verde;
      document.getElementById('cnt-laranja').textContent = contagens.laranja;
      document.getElementById('cnt-amarelo').textContent = contagens.amarelo;
      document.getElementById('cnt-lilas').textContent = contagens.lilas;
    }

    function filtrarClientes() {
      var lista = clientes.filter(function (c) {
        if (filtroCorAtivo !== 'todas' && c.cor !== filtroCorAtivo) return false;
        if (termoBusca) {
          var t = termoBusca.toLowerCase();
          var matchNome = (c.nome || '').toLowerCase().indexOf(t) >= 0;
          var matchNum = String(c.num || '').indexOf(t) >= 0;
          var matchLoc = (c.localidade || '').toLowerCase().indexOf(t) >= 0;
          if (!matchNome && !matchNum && !matchLoc) return false;
        }
        return true;
      });

      // Ordenar
      if (ordenacaoAtiva === 'urgencia') {
        lista.sort(function (a, b) { return b.urgenciaScore - a.urgenciaScore; });
      } else if (ordenacaoAtiva === 'dias') {
        lista.sort(function (a, b) { return (b.diasSemVisita || 0) - (a.diasSemVisita || 0); });
      } else if (ordenacaoAtiva === 'nome') {
        lista.sort(function (a, b) { return a.nome.localeCompare(b.nome); });
      }

      document.getElementById('jbm-cont-visiveis').textContent = lista.length;
      renderCards(lista);
      renderPins(lista);
    }

    function renderCards(lista) {
      var cont = document.getElementById('jbm-card-list');
      cont.innerHTML = '';
      if (!lista.length) {
        cont.innerHTML = '<p style="text-align:center;color:var(--muted);padding:20px;font-size:12.5px;">Nenhum cliente encontrado.</p>';
        return;
      }

      lista.forEach(function (c) {
        var card = document.createElement('div');
        card.className = 'jbm-card cor-' + c.cor;

        var tagCls = c.estadoVisita;
        var tagTxt = c.estadoVisita === 'em-atraso' ? '\u00E2\u0161\u00A0\u00EF\u00B8\u008F Em atraso' : (c.estadoVisita === 'a-vencer' ? '\u00E2\u008F\u00B3 A vencer' : (c.cor === 'lilas' ? 'Potencial' : 'Em dia'));

        var maxP = PRAZOS[c.cor] || 45;
        var perc = c.diasSemVisita ? Math.min(100, (c.diasSemVisita / maxP) * 100) : 0;

        card.innerHTML = 
          '<div class="jbm-card-top">' +
            '<span class="jbm-card-nome">' + c.nome + '</span>' +
            '<span class="jbm-card-num">#' + c.num + '</span>' +
          '</div>' +
          '<div class="jbm-card-morada">\u00F0\u0178\u201C\u008D ' + c.localidade + (c.distanciaKm != null ? ' \u00C2\u00B7 <strong>' + c.distanciaKm.toFixed(1) + 'km</strong>' : '') + '</div>' +
          '<div class="jbm-progress-bar"><div class="jbm-progress-fill ' + tagCls + '" style="width:' + (c.cor === 'lilas' ? 100 : perc) + '%"></div></div>' +
          '<div class="jbm-card-footer">' +
            '<span style="color:var(--muted);">' + c.ultimaVisitaTexto + '</span>' +
            '<span class="jbm-tag-status ' + tagCls + '">' + tagTxt + '</span>' +
          '</div>';

        card.addEventListener('click', function () { abrirFichaCliente(c); });
        cont.appendChild(card);
      });
    }

    function renderPins(lista) {
      if (!markersLayer) return;
      markersLayer.clearLayers();
      var bounds = [];

      lista.forEach(function (c) {
        if (!c.lat || !c.lng) return;
        var marker = L.marker([c.lat, c.lng], { icon: criarIcone(c) });
        marker.on('click', function () { abrirFichaCliente(c); });
        markersLayer.addLayer(marker);
        bounds.push([c.lat, c.lng]);
      });

      if (bounds.length && !gpsAtivo) {
        map.fitBounds(bounds, { padding: [30, 30] });
      }
    }

    document.querySelectorAll('.jbm-btn-filter').forEach(function (btn) {
      btn.addEventListener('click', function () {
        document.querySelectorAll('.jbm-btn-filter').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        filtroCorAtivo = btn.dataset.cor;
        filtrarClientes();
      });
    });

    document.getElementById('jbm-busca').addEventListener('input', function () {
      termoBusca = this.value.trim();
      filtrarClientes();
    });

    document.getElementById('jbm-sort-urgencia').addEventListener('click', function () { setOrdenacao('urgencia', this); });
    document.getElementById('jbm-sort-dias').addEventListener('click', function () { setOrdenacao('dias', this); });
    document.getElementById('jbm-sort-nome').addEventListener('click', function () { setOrdenacao('nome', this); });

    function setOrdenacao(tipo, btn) {
      ordenacaoAtiva = tipo;
      document.querySelectorAll('.jbm-sort-btn').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      filtrarClientes();
    }

    // GPS & Geolocaliza\u00C3\u00A7\u00C3\u00A3o
    var btnGps = document.getElementById('jbm-btn-gps');
    btnGps.addEventListener('click', function () {
      if (!navigator.geolocation) {
        alert('Geolocaliza\u00C3\u00A7\u00C3\u00A3o n\u00C3\u00A3o suportada no seu dispositivo.');
        return;
      }
      btnGps.textContent = 'A localizar...';

      navigator.geolocation.getCurrentPosition(function (pos) {
        var lat = pos.coords.latitude;
        var lng = pos.coords.longitude;
        gpsAtivo = true;

        if (userLocationMarker) map.removeLayer(userLocationMarker);
        userLocationMarker = L.circleMarker([lat, lng], {
          radius: 9,
          fillColor: '#3b82f6',
          color: '#fff',
          weight: 2,
          opacity: 1,
          fillOpacity: 0.9
        }).addTo(map);

        map.setView([lat, lng], 13);
        btnGps.textContent = '\u00F0\u0178\u201C\u008D Localizado';

        // Calcular dist\u00C3\u00A2ncias
        clientes.forEach(function (c) {
          if (c.lat && c.lng) {
            c.distanciaKm = calcularDistancia(lat, lng, c.lat, c.lng);
          }
        });
        filtrarClientes();
      }, function (err) {
        alert('N\u00C3\u00A3o foi poss\u00C3\u00ADvel obter a sua localiza\u00C3\u00A7\u00C3\u00A3o: ' + err.message);
        btnGps.textContent = '\u00F0\u0178\u201C\u008D GPS Atual';
      }, { enableHighAccuracy: true });
    });

    function calcularDistancia(lat1, lon1, lat2, lon2) {
      var R = 6371;
      var dLat = (lat2 - lat1) * Math.PI / 180;
      var dLon = (lon2 - lon1) * Math.PI / 180;
      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      return R * c;
    }

    // FICHA DO CLIENTE
    var clienteModalAtivo = null;
    var modalFicha = document.getElementById('jbm-modal');

    function abrirFichaCliente(c) {
      clienteModalAtivo = c;
      document.getElementById('modal-num').textContent = '#' + c.num;
      document.getElementById('modal-nome').textContent = c.nome;
      document.getElementById('modal-sub').textContent = '\u00F0\u0178\u201C\u008D ' + c.localidade + (c.morada ? ' \u00C2\u00B7 ' + c.morada : '');
      document.getElementById('modal-cor').value = c.cor;
      document.getElementById('modal-morada').value = c.morada || '';
      document.getElementById('modal-contacto').value = c.contacto || '';
      document.getElementById('modal-telefone').value = c.telefone || '';
      document.getElementById('modal-dias').value = c.ultimaVisitaTexto;
      document.getElementById('modal-obs').value = c.obs || '';

      document.getElementById('modal-link-gmaps').href = 'https://www.google.com/maps/dir/?api=1&destination=' + c.lat + ',' + c.lng;
      document.getElementById('modal-link-waze').href = 'https://waze.com/ul?ll=' + c.lat + ',' + c.lng + '&navigate=yes';

      var marcasArr = (c.marcas || '').split(',').map(function (m) { return m.trim(); });
      document.querySelectorAll('#modal-marcas-grid .jb-chip').forEach(function (chip) {
        var inp = chip.querySelector('input');
        var sel = marcasArr.indexOf(inp.value) >= 0;
        inp.checked = sel;
        chip.classList.toggle('checked', sel);
      });

      document.getElementById('modal-msg').textContent = '';
      modalFicha.classList.remove('jbp-hide');
    }

    document.getElementById('modal-btn-close').addEventListener('click', function () {
      modalFicha.classList.add('jbp-hide');
    });

    document.getElementById('modal-btn-ir-visita').addEventListener('click', function () {
      if (!clienteModalAtivo) return;
      modalFicha.classList.add('jbp-hide');
      preencherFormularioVisita(clienteModalAtivo);
      document.querySelector('.jbp-nav-btn[data-tab="registos"]').click();
      document.querySelector('#jbr-tabs button[data-target="visitas"]').click();
    });

    document.getElementById('modal-btn-guardar').addEventListener('click', function () {
      if (!clienteModalAtivo) return;
      var c = clienteModalAtivo;
      var btn = this;
      btn.disabled = true;
      var msg = document.getElementById('modal-msg');
      msg.textContent = 'A guardar altera\u00C3\u00A7\u00C3\u00B5es...';
      msg.style.color = '#1e293b';

      c.cor = document.getElementById('modal-cor').value;
      c.morada = document.getElementById('modal-morada').value.trim();
      c.contacto = document.getElementById('modal-contacto').value.trim();
      c.telefone = document.getElementById('modal-telefone').value.trim();
      c.obs = document.getElementById('modal-obs').value.trim();

      var selMarcas = [];
      document.querySelectorAll('#modal-marcas-grid input:checked').forEach(function (i) { selMarcas.push(i.value); });
      c.marcas = selMarcas.join(', ');

      var fd = new FormData();
      fd.append('tipo', 'editar_cliente');
      fd.append('comercial', estado.nome);
      fd.append('num', c.num);
      fd.append('nome', c.nome);
      fd.append('cor', c.cor);
      fd.append('morada', c.morada);
      fd.append('contacto', c.contacto);
      fd.append('telefone', c.telefone);
      fd.append('marcas', c.marcas);
      fd.append('obs', c.obs);

      fetch('/api/registar', {
        method: 'POST',
        body: fd
      })
      .then(function (r) { return r.json(); })
      .then(function () {
        avaliarEstadoCliente(c);
        atualizarContadores();
        filtrarClientes();
        inicializarCockpit();

        msg.textContent = 'Altera\u00C3\u00A7\u00C3\u00B5es guardadas com sucesso!';
        msg.style.color = '#15803d';
        setTimeout(function () { modalFicha.classList.add('jbp-hide'); }, 1200);
      })
      .catch(function () {
        avaliarEstadoCliente(c);
        atualizarContadores();
        filtrarClientes();
        inicializarCockpit();
        msg.textContent = 'Guardado localmente no mapa!';
        msg.style.color = '#15803d';
        setTimeout(function () { modalFicha.classList.add('jbp-hide'); }, 1200);
      })
      .finally(function () { btn.disabled = false; });
    });

    // ==========================================
    // PLANEADOR DE ROTA COM SELE\u00C3\u2021\u00C3\u0192O POR CORES
    // ==========================================
    var modalRota = document.getElementById('jbm-modal-rota');
    var rotaClientesSelecionados = new Set();
    var rotaCoresAtivas = new Set();

    document.getElementById('jbm-btn-abrir-rota').addEventListener('click', function () { abrirModalRota(); });
    document.getElementById('rota-btn-close').addEventListener('click', function () { modalRota.classList.add('jbp-hide'); });

    function abrirModalRota() {
      var cont = document.getElementById('rota-lista-clientes');
      cont.innerHTML = '';

      clientes.forEach(function (c) {
        var row = document.createElement('label');
        row.style.cssText = 'display:flex;align-items:center;gap:8px;padding:7px 8px;border-bottom:1px solid #f1f5f9;font-size:12.5px;cursor:pointer;';
        
        var chk = document.createElement('input');
        chk.type = 'checkbox';
        chk.value = c.num;
        chk.checked = rotaClientesSelecionados.has(c.num);

        chk.addEventListener('change', function () {
          if (chk.checked) rotaClientesSelecionados.add(c.num);
          else rotaClientesSelecionados.delete(c.num);
          atualizarResumoRota();
        });

        var dot = c.estadoVisita === 'em-atraso' ? '\u00F0\u0178\u201D\u00B4' : (c.estadoVisita === 'a-vencer' ? '\u00F0\u0178\u0178\u00A0' : (c.cor === 'verde' ? '\u00F0\u0178\u0178\u00A2' : (c.cor === 'laranja' ? '\u00F0\u0178\u0178\u00A0' : (c.cor === 'amarelo' ? '\u00F0\u0178\u0178\u00A1' : '\u00F0\u0178\u0178\u00A3'))));
        
        row.appendChild(chk);
        row.innerHTML += '<span style="font-size:13px;">' + dot + '</span>' +
          '<span style="font-weight:800;color:#0f2746;">#' + c.num + ' - ' + c.nome + '</span>' +
          '<span style="color:#64748b;font-size:11.5px;margin-left:auto;">' + c.localidade + ' \u00C2\u00B7 ' + (c.diasSemVisita != null ? c.diasSemVisita + 'd' : 'Novo') + '</span>';

        cont.appendChild(row);
      });

      atualizarResumoRota();
      modalRota.classList.remove('jbp-hide');
    }

    function atualizarResumoRota() {
      var n = rotaClientesSelecionados.size;
      document.getElementById('rota-txt-resumo').textContent = n + ' cliente(s) selecionado(s)';
      document.getElementById('rota-btn-calcular').disabled = n < 2;
    }

    // Filtros de sele\u00C3\u00A7\u00C3\u00A3o r\u00C3\u00A1pida por cores / estado
    document.querySelectorAll('#rota-picker-cores .rota-cor-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var cor = this.dataset.cor;
        var status = this.dataset.status;
        var chave = cor || status;

        if (rotaCoresAtivas.has(chave)) {
          rotaCoresAtivas.delete(chave);
          this.classList.remove('active');
          // Desmarcar clientes deste grupo
          clientes.forEach(function (c) {
            var match = cor ? (c.cor === cor) : (c.estadoVisita === status);
            if (match) rotaClientesSelecionados.delete(c.num);
          });
        } else {
          rotaCoresAtivas.add(chave);
          this.classList.add('active');
          // Marcar clientes deste grupo
          clientes.forEach(function (c) {
            var match = cor ? (c.cor === cor) : (c.estadoVisita === status);
            if (match) rotaClientesSelecionados.add(c.num);
          });
        }

        // Atualizar checkboxes no DOM do modal
        document.querySelectorAll('#rota-lista-clientes input[type=checkbox]').forEach(function (chk) {
          chk.checked = rotaClientesSelecionados.has(chk.value);
        });

        atualizarResumoRota();
      });
    });

    document.getElementById('rota-selecionar-todos').addEventListener('click', function () {
      document.querySelectorAll('#rota-lista-clientes input[type=checkbox]').forEach(function (i) {
        i.checked = true;
        rotaClientesSelecionados.add(i.value);
      });
      atualizarResumoRota();
    });

    document.getElementById('rota-limpar-selecao').addEventListener('click', function () {
      document.querySelectorAll('#rota-lista-clientes input[type=checkbox]').forEach(function (i) { i.checked = false; });
      rotaClientesSelecionados.clear();
      rotaCoresAtivas.clear();
      document.querySelectorAll('#rota-picker-cores .rota-cor-btn').forEach(function (b) { b.classList.remove('active'); });
      atualizarResumoRota();
    });

    document.getElementById('rota-busca').addEventListener('input', function () {
      var t = this.value.toLowerCase().trim();
      document.querySelectorAll('#rota-lista-clientes label').forEach(function (lbl) {
        var txt = lbl.textContent.toLowerCase();
        lbl.style.display = (txt.indexOf(t) >= 0) ? 'flex' : 'none';
      });
    });

    document.getElementById('rota-btn-calcular').addEventListener('click', function () {
      var sel = clientes.filter(function (c) { return rotaClientesSelecionados.has(c.num); });
      if (sel.length < 2) return;
      var btn = this;
      btn.disabled = true;
      btn.textContent = 'A otimizar rota...';

      var coordsStr = sel.map(function (c) { return c.lng + ',' + c.lat; }).join(';');
      var urlOsrm = 'https://router.project-osrm.org/trip/v1/driving/' + coordsStr + '?source=first&destination=last&roundtrip=false&geometries=geojson&overview=full';

      fetch(urlOsrm)
      .then(function (r) { return r.json(); })
      .then(function (res) {
        if (!res || !res.trips || !res.trips.length) throw new Error('N\u00C3\u00A3o foi poss\u00C3\u00ADvel calcular.');
        var trip = res.trips[0];
        var ordemWaypoints = res.waypoints.sort(function (a, b) { return a.waypoint_index - b.waypoint_index; });
        var lojasOrdenadas = ordemWaypoints.map(function (wp) { return sel[wp.location_index]; });

        rotaLayer.clearLayers();
        var routeLine = L.geoJSON(trip.geometry, {
          style: { color: '#1e3a8a', weight: 5, opacity: 0.85 }
        }).addTo(rotaLayer);

        map.fitBounds(routeLine.getBounds(), { padding: [40, 40] });

        // Link Google Maps
        var gmapsWaypoints = lojasOrdenadas.map(function (l) { return l.lat + ',' + l.lng; });
        var origin = gmapsWaypoints.shift();
        var destination = gmapsWaypoints.pop();
        var wpParam = gmapsWaypoints.length ? '&waypoints=' + gmapsWaypoints.join('|') : '';
        var gmapsUrl = 'https://www.google.com/maps/dir/?api=1&origin=' + origin + '&destination=' + destination + wpParam + '&travelmode=driving';

        var linkGmaps = document.getElementById('rota-link-gmaps');
        linkGmaps.href = gmapsUrl;
        document.getElementById('rota-links-nav').classList.remove('jbp-hide');

        modalRota.classList.add('jbp-hide');
      })
      .catch(function (e) {
        alert('Erro ao calcular rota: ' + e.message);
      })
      .finally(function () {
        btn.disabled = false;
        btn.textContent = '\u00E2\u0161\u00A1 Calcular Rota';
      });
    });

    document.getElementById('rota-btn-limpar-mapa').addEventListener('click', function () {
      if (rotaLayer) rotaLayer.clearLayers();
      document.getElementById('rota-links-nav').classList.add('jbp-hide');
      rotaClientesSelecionados.clear();
      rotaCoresAtivas.clear();
      document.querySelectorAll('#rota-picker-cores .rota-cor-btn').forEach(function (b) { b.classList.remove('active'); });
      atualizarResumoRota();
    });

    // ==========================================
    // 2. REGISTOS (REGRAS DIN\u00C3\u201AMICAS DUDA + MARCAS)
    // ==========================================
    function inicializarRegistos() {
      var jaClienteSel = document.getElementById('jbr-ja-cliente');
      var wrapBusca = document.getElementById('jbr-wrap-busca');
      var wrapNif = document.getElementById('jbr-wrap-nif');
      var wrapEncomenda = document.getElementById('jbr-wrap-encomenda');
      var inpNif = document.getElementById('jbr-nif');
      var inpLoja = document.getElementById('jbr-loja');
      var inpBusca = document.getElementById('jbr-busca-cliente');
      var selMarcaNova = document.getElementById('jbr-marca-nova');
      var wrapMarcas = document.getElementById('jbr-wrap-marcas');
      var hiddenQuais = document.getElementById('jbr-quais-marcas');

      // Regra Din\u00C3\u00A2mica: Cliente Sim vs N\u00C3\u00A3o
      function aplicarRegrasCamposVisita() {
        var ehCliente = jaClienteSel.value === 'Sim';
        if (ehCliente) {
          wrapBusca.classList.remove('jbp-hide');
          wrapNif.classList.remove('jbp-hide');
          wrapEncomenda.classList.remove('jbp-hide');
          inpNif.required = true;
          inpNif.placeholder = 'Preenchido ao pesquisar';
        } else {
          wrapBusca.classList.add('jbp-hide');
          wrapNif.classList.add('jbp-hide');
          wrapEncomenda.classList.add('jbp-hide');
          inpNif.required = false;
          inpNif.value = '';
          inpBusca.value = '';
        }
      }

      // Regra Din\u00C3\u00A2mica: Comprou Marca Nova Sim vs N\u00C3\u00A3o
      function aplicarRegrasMarcaNova() {
        var comprou = selMarcaNova.value === 'Sim';
        if (comprou) {
          wrapMarcas.classList.remove('jbp-hide');
        } else {
          wrapMarcas.classList.add('jbp-hide');
          document.querySelectorAll('#jbr-wrap-marcas .jb-chip').forEach(function (ch) {
            ch.classList.remove('checked');
            ch.querySelector('input').checked = false;
          });
          hiddenQuais.value = '';
        }
      }

      jaClienteSel.addEventListener('change', aplicarRegrasCamposVisita);
      selMarcaNova.addEventListener('change', aplicarRegrasMarcaNova);
      aplicarRegrasCamposVisita();
      aplicarRegrasMarcaNova();

      // Abas de submiss\u00C3\u00A3o
      document.querySelectorAll('#jbr-tabs button').forEach(function (btn) {
        btn.addEventListener('click', function () {
          document.querySelectorAll('#jbr-tabs button').forEach(function (b) { b.classList.remove('active'); });
          document.querySelectorAll('.jb-form').forEach(function (f) { f.classList.remove('active'); });
          btn.classList.add('active');
          var targetId = 'jb-form-' + btn.dataset.target;
          var form = document.getElementById(targetId);
          if (form) form.classList.add('active');
        });
      });

      // Bot\u00C3\u00B5es \u00E2\u008F\u00B1\u00EF\u00B8\u008F Agora (para preencher com 1 toque)
      document.querySelectorAll('.jb-btn-agora').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var targetId = this.dataset.target;
          var inp = document.getElementById(targetId);
          if (inp) {
            var agora = new Date();
            var hh = ('0' + agora.getHours()).slice(-2);
            var mm = ('0' + agora.getMinutes()).slice(-2);
            inp.value = hh + ':' + mm;
          }
        });
      });

      // Chips das marcas compradas
      document.querySelectorAll('#jbr-wrap-marcas .jb-chip').forEach(function (chip) {
        chip.addEventListener('click', function (e) {
          if (e.target.tagName !== 'INPUT') {
            var inp = chip.querySelector('input');
            inp.checked = !inp.checked;
          }
          chip.classList.toggle('checked', chip.querySelector('input').checked);
          var sel = [];
          document.querySelectorAll('#jbr-wrap-marcas input:checked').forEach(function (i) { sel.push(i.value); });
          hiddenQuais.value = sel.join(', ');
        });
      });

      // Datalist de lojas para pesquisa r\u00C3\u00A1pida
      var dl = document.getElementById('jbr-dl-clientes');
      dl.innerHTML = '';
      clientes.forEach(function (c) {
        var opt = document.createElement('option');
        opt.value = c.num + ' - ' + c.nome;
        dl.appendChild(opt);
      });

      inpBusca.addEventListener('input', function () {
        var val = this.value.trim();
        var m = /^(\\d+)/.exec(val);
        if (m) {
          for (var i = 0; i < clientes.length; i++) {
            if (clientes[i].num === m[1]) {
              preencherFormularioVisita(clientes[i]);
              break;
            }
          }
        }
      });

      var hojeIso = new Date().toISOString().slice(0, 10);
      document.getElementById('jbr-dia').value = hojeIso;
      document.getElementById('jbr-rota-data').value = hojeIso;

      // Submiss\u00C3\u00A3o de Formul\u00C3\u00A1rios
      document.querySelectorAll('.jb-form').forEach(function (form) {
        form.addEventListener('submit', function (e) {
          e.preventDefault();
          var tipo = form.dataset.tipo;
          var btn = form.querySelector('button[type=submit]');
          var msg = document.getElementById('jbr-msg-' + tipo);

          btn.disabled = true;
          btn.textContent = 'A enviar...';
          msg.className = 'jb-msg-submissao';

          var fd = new FormData(form);
          fd.append('tipo', tipo);
          fd.append('comercial', estado.nome);

          fetch('/api/registar', {
            method: 'POST',
            body: fd
          })
          .then(function (r) { return r.json(); })
          .then(function () {
            msg.textContent = 'Registo submetido com sucesso no Google Sheets!';
            msg.className = 'jb-msg-submissao ok';

            // Abate imediato no mapa e recalcula cockpit
            if (tipo === 'visitas') {
              var nif = form.querySelector('[name=nif]').value.trim();
              for (var i = 0; i < clientes.length; i++) {
                if (clientes[i].num === nif) {
                  clientes[i].ultimaVisitaData = new Date();
                  clientes[i].ultimaVisitaFormatada = formatarDataPT(new Date());
                  avaliarEstadoCliente(clientes[i]);
                  atualizarContadores();
                  filtrarClientes();
                  inicializarCockpit();
                  break;
                }
              }
            }

            form.reset();
            document.getElementById('jbr-dia').value = hojeIso;
            document.getElementById('jbr-rota-data').value = hojeIso;
            aplicarRegrasCamposVisita();
            aplicarRegrasMarcaNova();
          })
          .catch(function (err) {
            msg.textContent = 'Erro ao submeter registo: ' + err.message;
            msg.className = 'jb-msg-submissao erro';
          })
          .finally(function () {
            btn.disabled = false;
            btn.textContent = tipo === 'visitas' ? 'Submeter Registo de Visita' : (tipo === 'rotas' ? 'Submeter Rota Di\u00C3\u00A1ria' : 'Submeter Abastecimento');
          });
        });
      });

      // Compress\u00C3\u00A3o fotogr\u00C3\u00A1fica para tal\u00C3\u00B5es de combust\u00C3\u00ADvel
      var fotoInput = document.getElementById('jbr-foto-input');
      var fotoBase64 = document.getElementById('jbr-foto-base64');
      fotoInput.addEventListener('change', function () {
        var file = this.files[0];
        if (!file) return;
        var reader = new FileReader();
        reader.onload = function (e) {
          var img = new Image();
          img.onload = function () {
            var canvas = document.createElement('canvas');
            var maxW = 1200;
            var w = img.width;
            var h = img.height;
            if (w > maxW) { h = Math.round(h * (maxW / w)); w = maxW; }
            canvas.width = w;
            canvas.height = h;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, w, h);
            fotoBase64.value = canvas.toDataURL('image/jpeg', 0.75);
          };
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);
      });
    }

    function preencherFormularioVisita(c) {
      document.getElementById('jbr-ja-cliente').value = 'Sim';
      document.getElementById('jbr-wrap-busca').classList.remove('jbp-hide');
      document.getElementById('jbr-wrap-nif').classList.remove('jbp-hide');
      document.getElementById('jbr-wrap-encomenda').classList.remove('jbp-hide');
      document.getElementById('jbr-nif').value = c.num || '';
      document.getElementById('jbr-loja').value = c.nome || '';
      document.getElementById('jbr-morada').value = c.morada || '';
      document.getElementById('jbr-localidade').value = c.localidade || '';
      document.getElementById('jbr-contacto').value = c.contacto || '';
      document.getElementById('jbr-telefone').value = c.telefone || '';
      document.getElementById('jbr-busca-cliente').value = c.num + ' - ' + c.nome;
    }

    // ==========================================
    // 3. HIST\u00C3\u201CRICO & RELAT\u00C3\u201CRIOS
    // ==========================================
    var COLS_HIST = {
      rotas: [['comercial','Comercial'],['data','Data'],['inicio','In\u00C3\u00ADcio'],['paragens','Paragens interm\u00C3\u00A9dias'],['fim','Fim'],['observacoes','Observa\u00C3\u00A7\u00C3\u00B5es'],['ts','Enviado em']],
      visitas: [
        ['comercial','Comercial'],
        ['ja_cliente','J\u00C3\u00A1 \u00C3\u00A9 cliente?'],
        ['nif','N\u00C2\u00BA Cliente'],
        ['loja','Loja'],
        ['morada','Morada'],
        ['localidade','Localidade'],
        ['contacto','Contacto'],
        ['telefone','Telefone'],
        ['dia','Data da Visita'],
        ['entrada','Entrada'],
        ['saida','Sa\u00C3\u00ADda'],
        ['duracao','Dura\u00C3\u00A7\u00C3\u00A3o'],
        ['nova_encomenda','Encomenda?'],
        ['marca_nova','Marca Nova?'],
        ['quais_marcas','Marcas Compradas'],
        ['observacoes','Observa\u00C3\u00A7\u00C3\u00B5es'],
        ['ts','Enviado em']
      ],
      abastecimentos: [['comercial','Comercial'],['km_antes','Km Painel'],['valor','Valor (\u00E2\u201A\u00AC)'],['foto_link','Comprovativo'],['ts','Enviado em']]
    };

    function prepararItensHistorico() {
      var res = { rotas: [], visitas: [], abastecimentos: [] };
      ['rotas', 'visitas', 'abastecimentos'].forEach(function (tipo) {
        var t = estado.dados[tipo] || { cols: [], rows: [] };
        var cols = t.cols || [];
        var rows = t.rows || [];
        rows.forEach(function (r) {
          var obj = {};
          if (r.length > cols.length) obj['ts'] = r[0];
          cols.forEach(function (col, idx) {
            var valIdx = r.length > cols.length ? idx + 1 : idx;
            obj[col] = r[valIdx] != null ? r[valIdx] : '';
          });
          if (tipo === 'visitas' && obj.entrada && obj.saida) {
            var eM = parseMinutos(obj.entrada);
            var sM = parseMinutos(obj.saida);
            if (eM != null && sM != null) {
              var diff = sM - eM;
              if (diff < 0) diff += 1440;
              obj['duracao'] = diff + ' min';
            }
          }
          res[tipo].push(obj);
        });
      });
      return res;
    }

    function parseMinutos(str) {
      var m = /^(\\d{1,2}):(\\d{2})/.exec(String(str).trim());
      return m ? parseInt(m[1], 10) * 60 + parseInt(m[2], 10) : null;
    }

    function inicializarHistorico() {
      if (estado.perfil === 'admin') {
        var selCom = document.getElementById('jbh-sel-com');
        selCom.classList.remove('jbp-hide');
      }

      document.querySelectorAll('#jbh-tabs button').forEach(function (btn) {
        btn.addEventListener('click', function () {
          document.querySelectorAll('#jbh-tabs button').forEach(function (b) { b.classList.remove('active'); });
          btn.classList.add('active');
          estado.tipoHist = btn.dataset.tipo;
          renderizarHistorico();
        });
      });

      function ativarBtnData(id) {
        document.querySelectorAll('.jbh-atalhos-data button').forEach(function (b) { b.classList.remove('active'); });
        var b = document.getElementById(id);
        if (b) b.classList.add('active');
      }

      document.getElementById('jbh-dt-hoje').addEventListener('click', function () {
        var hoje = new Date().toISOString().slice(0, 10);
        document.getElementById('jbh-de').value = hoje;
        document.getElementById('jbh-ate').value = hoje;
        ativarBtnData('jbh-dt-hoje');
        renderizarHistorico();
      });

      document.getElementById('jbh-dt-semana').addEventListener('click', function () {
        var hoje = new Date();
        var diaSem = hoje.getDay() || 7;
        var seg = new Date(hoje);
        seg.setDate(hoje.getDate() - diaSem + 1);
        document.getElementById('jbh-de').value = seg.toISOString().slice(0, 10);
        document.getElementById('jbh-ate').value = hoje.toISOString().slice(0, 10);
        ativarBtnData('jbh-dt-semana');
        renderizarHistorico();
      });

      document.getElementById('jbh-dt-mes').addEventListener('click', function () {
        var hoje = new Date();
        var pri = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
        document.getElementById('jbh-de').value = pri.toISOString().slice(0, 10);
        document.getElementById('jbh-ate').value = hoje.toISOString().slice(0, 10);
        ativarBtnData('jbh-dt-mes');
        renderizarHistorico();
      });

      document.getElementById('jbh-dt-tudo').addEventListener('click', function () {
        document.getElementById('jbh-de').value = '';
        document.getElementById('jbh-ate').value = '';
        ativarBtnData('jbh-dt-tudo');
        renderizarHistorico();
      });

      document.getElementById('jbh-dt-limpar').addEventListener('click', function () {
        document.getElementById('jbh-q').value = '';
        document.getElementById('jbh-de').value = '';
        document.getElementById('jbh-ate').value = '';
        if (document.getElementById('jbh-sel-com')) document.getElementById('jbh-sel-com').value = '';
        estado.filtrosColHist = {};
        ativarBtnData('jbh-dt-tudo');
        renderizarHistorico();
      });

      ['jbh-q', 'jbh-de', 'jbh-ate', 'jbh-sel-com'].forEach(function (id) {
        var el = document.getElementById(id);
        if (el) {
          el.addEventListener('input', renderizarHistorico);
          el.addEventListener('change', renderizarHistorico);
        }
      });

      // IMPRIMIR EM JANELA ISOLADA
      document.getElementById('jbh-btn-imprimir').addEventListener('click', function () {
        var filtrados = obterRegistosFiltrados();
        var cols = (COLS_HIST[estado.tipoHist] || []).filter(function (c) { return c[0] !== 'foto_link'; });

        var w = window.open('', '_blank');
        if (!w) { alert('Por favor, permita pop-ups para imprimir.'); return; }
        var d = w.document;
        d.write('<!DOCTYPE html><html><head><title>Relat\u00C3\u00B3rio - ' + estado.tipoHist.toUpperCase() + '</title>');
        d.write('<style>body{font-family:sans-serif;padding:20px;color:#1e293b}h2{color:#0f2746}table{width:100%;border-collapse:collapse;font-size:12px;margin-top:14px;}th,td{border:1px solid #cbd5e1;padding:7px 9px;text-align:left}th{background:#f1f5f9;font-weight:700}</style>');
        d.write('</head><body>');
        d.write('<h2>Relat\u00C3\u00B3rio de ' + estado.tipoHist.toUpperCase() + ' \u00C2\u00B7 JB Com\u00C3\u00A9rcio Global</h2>');
        d.write('<p style="font-size:12px;color:#64748b;">Gerado em: ' + new Date().toLocaleString('pt-PT') + ' | Perfil: ' + estado.nome + '</p>');
        
        var t = document.createElement('table');
        var thead = document.createElement('thead');
        var trh = document.createElement('tr');
        cols.forEach(function (c) {
          var th = document.createElement('th');
          th.textContent = c[1];
          trh.appendChild(th);
        });
        thead.appendChild(trh);
        t.appendChild(thead);

        var tbody = document.createElement('tbody');
        filtrados.forEach(function (item) {
          var tr = document.createElement('tr');
          cols.forEach(function (c) {
            var td = document.createElement('td');
            td.textContent = item[c[0]] || '\u00E2\u20AC\u201D';
            tr.appendChild(td);
          });
          tbody.appendChild(tr);
        });
        t.appendChild(tbody);
        d.body.appendChild(t);
        d.close();
        setTimeout(function () { w.focus(); w.print(); }, 400);
      });

      // ATUALIZAR DADOS
      document.getElementById('jbh-btn-atualizar').addEventListener('click', function () {
        var btn = this;
        btn.disabled = true;
        btn.textContent = 'A sincronizar...';

        fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ codigo: estado.codigo })
        })
        .then(function (r) { return r.json(); })
        .then(function (res) {
          if (res && res.ok && res.dados) {
            estado.dados = res.dados;
            sincronizarVisitasNoMapa();
            filtrarClientes();
            inicializarCockpit();
            renderizarHistorico();
          }
        })
        .catch(function (e) { alert('Erro ao atualizar dados: ' + e.message); })
        .finally(function () {
          btn.disabled = false;
          btn.textContent = '\u00F0\u0178\u201D\u201E Atualizar Dados';
        });
      });

      renderizarHistorico();
    }

    function obterRegistosFiltrados() {
      var itensMap = prepararItensHistorico();
      var lista = itensMap[estado.tipoHist] || [];

      var q = (document.getElementById('jbh-q').value || '').toLowerCase().trim();
      var de = document.getElementById('jbh-de').value;
      var ate = document.getElementById('jbh-ate').value;
      var comSel = document.getElementById('jbh-sel-com') ? document.getElementById('jbh-sel-com').value : '';

      return lista.filter(function (o) {
        var com = o.comercial || '';
        if (estado.perfil !== 'admin' && com !== estado.nome) return false;
        if (comSel && com !== comSel) return false;

        var dt = o.dia || o.data || (o.ts ? o.ts.slice(0, 10) : '');
        if (de && dt && dt < de) return false;
        if (ate && dt && dt > ate) return false;

        if (q) {
          var hay = Object.values(o).join(' ').toLowerCase();
          if (hay.indexOf(q) === -1) return false;
        }
        return true;
      });
    }

    function renderizarHistorico() {
      var filtrados = obterRegistosFiltrados();
      renderizarKpisHistorico(filtrados);

      var cont = document.getElementById('jbh-table-cont');
      cont.innerHTML = '';

      if (!filtrados.length) {
        cont.innerHTML = '<p style="text-align:center;padding:24px;color:var(--muted);font-size:13px;">Nenhum registo encontrado para os filtros selecionados.</p>';
        return;
      }

      var cols = COLS_HIST[estado.tipoHist] || [];
      var table = document.createElement('table');
      table.className = 'jbh-table';

      var thead = document.createElement('thead');
      var trh = document.createElement('tr');

      cols.forEach(function (c) {
        var th = document.createElement('th');
        th.textContent = c[1];
        trh.appendChild(th);
      });
      thead.appendChild(trh);
      table.appendChild(thead);

      var tbody = document.createElement('tbody');
      filtrados.forEach(function (item) {
        var tr = document.createElement('tr');
        cols.forEach(function (c) {
          var td = document.createElement('td');
          var k = c[0];
          var v = item[k];

          if (k === 'foto_link' && v) {
            td.innerHTML = '<a href="' + v + '" target="_blank" style="color:var(--primary);font-weight:700;">Ver Foto \u00E2\u2020\u2014</a>';
          } else {
            td.textContent = v || '\u00E2\u20AC\u201D';
          }
          tr.appendChild(td);
        });
        tbody.appendChild(tr);
      });
      table.appendChild(tbody);
      cont.appendChild(table);
    }

    function renderizarKpisHistorico(lista) {
      var cont = document.getElementById('jbh-kpis');
      cont.innerHTML = '';

      function addKpi(titulo, val) {
        var card = document.createElement('div');
        card.className = 'jbh-kpi-card';
        card.innerHTML = '<div class="jbh-kpi-card-title">' + titulo + '</div><div class="jbh-kpi-card-val">' + val + '</div>';
        cont.appendChild(card);
      }

      if (estado.tipoHist === 'visitas') {
        addKpi('Total Visitas', lista.length);
        var encs = lista.filter(function (i) { return i.nova_encomenda === 'Sim'; }).length;
        addKpi('Novas Encomendas', encs);
        var novasM = lista.filter(function (i) { return i.marca_nova === 'Sim'; }).length;
        addKpi('Marcas Novas', novasM);
      } else if (estado.tipoHist === 'rotas') {
        addKpi('Total Rotas', lista.length);
      } else if (estado.tipoHist === 'abastecimentos') {
        addKpi('Total Abastecimentos', lista.length);
        var totVal = 0;
        lista.forEach(function (i) { totVal += parseFloat(i.valor) || 0; });
        addKpi('Total Gasto (\u00E2\u201A\u00AC)', totVal.toFixed(2) + ' \u00E2\u201A\u00AC');
      }
    }

    // Auto-login se existir sess\u00C3\u00A3o guardada
    try {
      var savedCode = localStorage.getItem('jb_portal_codigo');
      if (savedCode) {
        loginCode.value = savedCode;
        tentarLogin(savedCode, true);
      }
    } catch (e) {}

  })();
  </script>
</body>
</html>`;

export default {
  async fetch(req, env, ctx) {
    const url = new URL(req.url);
    const path = url.pathname;

    if (req.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
      }});
    }

    if (path === "/api/health") {
      return ok({ ok: true, service: "jb-comercial-app", build: "20261113-1736" });
    }

    if (path === "/api/login" && req.method === "POST") {
      let codigo = "";
      try { const b = await req.json(); codigo = String(b.codigo || "").trim(); } catch(e) {}
      if (!codigo) return err({ ok: false, erro: "codigo" });

      try {
        const dest = new URL(GAS);
        dest.searchParams.set("action", "obter");
        dest.searchParams.set("codigo", codigo);
        const r = await fetch(dest.toString(), { redirect: "follow", headers: { Accept: "application/json" } });
        const d = await r.json();
        if (!d || d.ok === false) return err({ ok: false, erro: "codigo" }, 401);
        return ok({ ok: true, perfil: d.perfil, nome: d.nome, dados: d.dados });
      } catch(e) {
        return err({ ok: false, erro: e.message }, 500);
      }
    }

    if (path === "/api/registar" && req.method === "POST") {
      try {
        const fd = await req.formData();
        const p = new URLSearchParams();
        p.set("action", "registar");
        for (const [k, v] of fd.entries()) {
          if (k !== "foto_ficheiro") p.set(k, v);
        }

        const r = await fetch(GAS, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: p.toString()
        });
        const d = await r.json();
        return ok(d);
      } catch(e) { return err({ ok: false, erro: e.message }, 500); }
    }

    if (env && env.ASSETS) return env.ASSETS.fetch(req);
    return new Response(APP_HTML, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store, max-age=0"
      }
    });
  }
};