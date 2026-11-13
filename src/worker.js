/**
 * JB Comercio Global - Portal Comercial
 * Build: 20261113-1622
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
  <title>JB Com\u00E9rcio Global \u00B7 Portal Comercial</title>
  
  <!-- Fonte Inter -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  
  <!-- Leaflet CSS & JS para Mapa -->
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

  <style>
    :root {
      --primary: #1a3d6d;
      --primary-hover: #132d52;
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
    
    .jbp-hide { display: none !important; }

    /* Ecr\u00E3 de Login */
    .jbp-login-wrap {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
    }
    .jbp-login-box {
      background: #fff;
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 30px 24px;
      width: 100%;
      max-width: 400px;
      box-shadow: 0 4px 12px rgba(0,0,0,.06);
      text-align: center;
    }
    .jbp-login-logo {
      width: 50px;
      height: 50px;
      background: var(--primary);
      color: #fff;
      font-size: 22px;
      font-weight: 800;
      border-radius: 10px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 12px;
      box-shadow: 0 3px 6px rgba(26,61,109,.25);
    }
    .jbp-login-title {
      margin: 0 0 6px;
      font-size: 20px;
      color: var(--primary);
      font-weight: 800;
    }
    .jbp-login-sub {
      margin: 0 0 20px;
      font-size: 13px;
      color: var(--muted);
    }
    .jbp-input {
      width: 100%;
      padding: 11px 13px;
      border: 1px solid var(--border);
      border-radius: 8px;
      font-size: 14px;
      outline: 0;
      transition: border .15s;
      font-family: inherit;
    }
    .jbp-input:focus { border-color: var(--primary); }
    .jbp-btn {
      width: 100%;
      padding: 12px;
      background: var(--primary);
      color: #fff;
      border: 0;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      transition: background .15s;
      margin-top: 12px;
      font-family: inherit;
    }
    .jbp-btn:hover { background: var(--primary-hover); }
    .jbp-btn:disabled { opacity: 0.6; cursor: not-allowed; }
    .jbp-login-erro {
      color: #b91c1c;
      font-size: 12px;
      margin-top: 10px;
      min-height: 18px;
      font-weight: 600;
    }

    /* Aplica\u00E7\u00E3o Principal (Layout SPA) */
    .jbp-app {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      max-width: 1750px;
      margin: 0 auto;
      padding: 8px 12px 20px;
      gap: 10px;
    }

    /* Topo / Navbar */
    .jbp-top {
      background: #fff;
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 10px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 10px;
      box-shadow: 0 1px 3px rgba(0,0,0,.04);
    }
    .jbp-brand {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .jbp-logo-sm {
      width: 38px;
      height: 38px;
      background: var(--primary);
      color: #fff;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 16px;
      box-shadow: 0 2px 4px rgba(26,61,109,.2);
      flex-shrink: 0;
    }
    .jbp-brand strong {
      font-size: 15px;
      color: var(--primary);
      display: block;
      line-height: 1.2;
    }
    .jbp-brand small {
      font-size: 11px;
      color: var(--muted);
      font-weight: 500;
    }

    /* Abas de Navega\u00E7\u00E3o Superiores */
    .jbp-nav {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-wrap: wrap;
    }
    .jbp-nav-btn {
      padding: 8px 14px;
      border: 1px solid var(--border);
      background: #fff;
      color: var(--text);
      font-size: 13px;
      font-weight: 600;
      border-radius: 7px;
      cursor: pointer;
      transition: all .15s;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      font-family: inherit;
    }
    .jbp-nav-btn:hover { background: #f8fafc; border-color: #94a3b8; }
    .jbp-nav-btn.active {
      background: var(--primary);
      color: #fff;
      border-color: var(--primary);
      box-shadow: 0 2px 4px rgba(26,61,109,.2);
    }
    .jbp-user-pill {
      margin-left: auto;
      background: #e0f2fe;
      color: #0369a1;
      padding: 6px 12px;
      border-radius: 7px;
      font-size: 12px;
      font-weight: 700;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .jbp-btn-sair {
      background: #fee2e2;
      color: #991b1b;
      border: 1px solid #fecaca;
      border-radius: 6px;
      padding: 5px 10px;
      font-size: 11.5px;
      font-weight: 700;
      cursor: pointer;
      font-family: inherit;
    }

    /* Pain\u00E9is de Conte\u00FAdo */
    .jbp-panel { display: none; }
    .jbp-panel.active { display: flex; flex-direction: column; gap: 10px; }

    /* ========================================= */
    /* M\u00D3DULO: MAPA & CRM                       */
    /* ========================================= */
    .jbm-bar {
      background: #fff;
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 10px 14px;
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
      box-shadow: 0 1px 3px rgba(0,0,0,.04);
    }
    .jbm-search {
      flex: 1;
      min-width: 220px;
    }
    .jbm-search input {
      width: 100%;
      padding: 8px 12px;
      border: 1px solid var(--border);
      border-radius: 7px;
      font-size: 13px;
      outline: 0;
      background: #f8fafc;
      font-family: inherit;
    }
    .jbm-search input:focus { border-color: var(--primary); background: #fff; }
    .jbm-filters {
      display: flex;
      gap: 6px;
      align-items: center;
      flex-wrap: wrap;
    }
    .jbm-btn-filter {
      padding: 7px 11px;
      font-size: 12px;
      font-weight: 600;
      border: 1px solid var(--border);
      background: #fff;
      border-radius: 7px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      color: #334155;
      font-family: inherit;
    }
    .jbm-btn-filter:hover { background: #f1f5f9; }
    .jbm-btn-filter.active {
      background: var(--primary);
      color: #fff;
      border-color: var(--primary);
    }
    .jbm-dot { width: 9px; height: 9px; border-radius: 50%; display: inline-block; }
    .dot-verde { background: #16a34a; }
    .dot-laranja { background: #ea580c; }
    .dot-amarelo { background: #eab308; }
    .dot-lilas { background: #9333ea; }
    .dot-atraso { background: #dc2626; }

    .jbm-gps-control {
      display: inline-flex;
      align-items: center;
      margin-left: auto;
      flex-shrink: 0;
      border-radius: 8px;
      border: 1px solid #0284c7;
      background: #e0f2fe;
      overflow: hidden;
      white-space: nowrap;
    }
    .jbm-btn-near {
      padding: 7px 11px;
      font-size: 12px;
      font-weight: 700;
      border: 0;
      background: transparent;
      color: #0369a1;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-family: inherit;
    }
    .jbm-btn-near:hover { background: rgba(2,132,199,0.15); }
    .jbm-btn-near.active { background: #0284c7; color: #fff; }
    .jbm-raio-grupo {
      display: inline-flex;
      align-items: center;
      border-left: 1px solid #7dd3fc;
      padding: 0 3px;
      gap: 1px;
    }
    .jbm-raio-pill {
      padding: 5px 7px;
      font-size: 11px;
      font-weight: 700;
      border: 1px solid transparent;
      background: transparent;
      color: #0369a1;
      border-radius: 5px;
      cursor: pointer;
      font-family: inherit;
    }
    .jbm-raio-pill.ativo { background: rgba(2,132,199,0.2); border-color: #7dd3fc; color: #0c4a6e; }

    .jbm-btn-rota-top {
      background: var(--rota-blue);
      color: #fff;
      border: 1px solid var(--rota-blue);
      font-weight: 700;
      padding: 7px 12px;
      border-radius: 7px;
      cursor: pointer;
      font-family: inherit;
      display: inline-flex;
      align-items: center;
      gap: 5px;
    }
    .jbm-btn-rota-top:hover { background: #172554; }

    /* Layout Mapa + Sidebar */
    .jbm-main {
      display: flex;
      gap: 12px;
      height: 720px;
      min-height: 550px;
    }
    #jbm-map {
      flex: 1;
      height: 100%;
      background: #e2e8f0;
      border-radius: 10px;
      border: 1px solid var(--border);
      z-index: 5;
    }
    .jbm-sidebar {
      width: 410px;
      height: 100%;
      background: #fff;
      border: 1px solid var(--border);
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      z-index: 10;
      flex-shrink: 0;
    }
    .jbm-sidebar-header {
      padding: 10px 14px;
      border-bottom: 1px solid #e2e8f0;
      background: #f8fafc;
      border-radius: 10px 10px 0 0;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .jbm-sidebar-header-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .jbm-sort-bar {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 11px;
      color: var(--muted);
    }
    .jbm-sort-btn {
      padding: 3px 8px;
      font-size: 11px;
      border-radius: 4px;
      border: 1px solid var(--border);
      background: #fff;
      color: #334155;
      cursor: pointer;
      font-weight: 600;
      font-family: inherit;
    }
    .jbm-sort-btn.active {
      background: var(--primary);
      color: #fff;
      border-color: var(--primary);
    }
    .jbm-client-list {
      flex: 1;
      overflow-y: auto;
      padding: 10px;
    }

    /* Cards Clientes */
    .jbm-card {
      background: #fff;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 10px 12px;
      margin-bottom: 8px;
      cursor: pointer;
      transition: all .15s;
      border-left: 5px solid #cbd5e1;
    }
    .jbm-card:hover { border-color: #94a3b8; transform: translateY(-1px); }
    .jbm-card.cor-verde { border-left-color: #16a34a; }
    .jbm-card.cor-laranja { border-left-color: #ea580c; }
    .jbm-card.cor-amarelo { border-left-color: #eab308; }
    .jbm-card.cor-lilas { border-left-color: #9333ea; }
    .jbm-card-top {
      display: flex;
      justify-content: space-between;
      margin-bottom: 4px;
    }
    .jbm-card-nome { font-size: 13px; font-weight: 700; color: #1e293b; }
    .jbm-card-num { font-size: 11px; font-weight: 700; color: var(--muted); background: #f1f5f9; padding: 2px 6px; border-radius: 4px; }
    .jbm-card-morada { font-size: 12px; color: var(--muted); margin-bottom: 6px; }
    .jbm-progress-bar { width: 100%; height: 5px; background: #f1f5f9; border-radius: 3px; overflow: hidden; margin: 3px 0 6px; }
    .jbm-progress-fill { height: 100%; }
    .jbm-progress-fill.em-dia { background: #16a34a; }
    .jbm-progress-fill.a-vencer { background: #f59e0b; }
    .jbm-progress-fill.em-atraso { background: #dc2626; }
    .jbm-progress-fill.potencial { background: #9333ea; }
    .jbm-card-footer { display: flex; justify-content: space-between; align-items: center; font-size: 11px; }
    .jbm-tag-status { font-weight: 700; padding: 2px 7px; border-radius: 4px; font-size: 10.5px; }
    .jbm-tag-status.em-dia { background: #dcfce7; color: #15803d; border: 1px solid #bbf7d0; }
    .jbm-tag-status.a-vencer { background: #fef3c7; color: #b45309; border: 1px solid #fde68a; }
    .jbm-tag-status.em-atraso { background: #fee2e2; color: #b91c1c; border: 1px solid #fecaca; }
    .jbm-tag-status.potencial { background: #f3e8ff; color: #7e22ce; border: 1px solid #e9d5ff; }

    /* Pins Leaflet */
    .jbm-marker-pin {
      width: 24px; height: 24px; border-radius: 50% 50% 50% 0; position: absolute;
      transform: rotate(-45deg); left: 50%; top: 50%; margin: -15px 0 0 -15px;
      box-shadow: 0 2px 4px rgba(0,0,0,.3); border: 2px solid #fff;
    }
    .jbm-marker-pin.verde { background: #16a34a; }
    .jbm-marker-pin.laranja { background: #ea580c; }
    .jbm-marker-pin.amarelo { background: #eab308; }
    .jbm-marker-pin.lilas { background: #9333ea; }
    .jbm-marker-pin.atraso::after {
      content: '!'; position: absolute; transform: rotate(45deg);
      font-size: 12px; font-weight: 900; color: #fff; top: 2px; left: 7px;
    }
    .jbm-marker-rota {
      width: 28px; height: 28px; background: var(--rota-blue); color: #fff;
      border-radius: 50%; border: 3px solid #fff; box-shadow: 0 2px 6px rgba(0,0,0,.35);
      display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 12px;
    }

    /* Modal Ficha & Modal Rota */
    .jbm-modal-overlay {
      position: fixed; top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(2px);
      z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 10px;
    }
    .jbm-modal {
      background: #fff; border-radius: 10px; width: 100%; max-width: 580px;
      max-height: 96vh; border: 1px solid var(--border); display: flex; flex-direction: column;
    }
    .jbm-modal-header {
      padding: 10px 16px; border-bottom: 1px solid #e2e8f0; background: #f8fafc;
      display: flex; justify-content: space-between; align-items: center;
    }
    .jbm-modal-body { padding: 12px 16px; display: flex; flex-direction: column; gap: 8px; overflow-y: auto; }
    .jbm-btn-close { background: none; border: 0; font-size: 18px; color: var(--muted); cursor: pointer; }
    .jbm-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
    .jbm-campo { display: flex; flex-direction: column; gap: 3px; }
    .jbm-campo label { font-size: 11px; font-weight: 700; color: #475569; text-transform: uppercase; }
    .jbm-campo input, .jbm-campo select, .jbm-campo textarea {
      padding: 7px 10px; border: 1px solid var(--border); border-radius: 6px; font-size: 13px; font-family: inherit;
    }
    .jbm-gps-group { display: flex; gap: 6px; }
    .jbm-btn-gps {
      flex: 1; padding: 6px 8px; border-radius: 6px; border: 1px solid var(--border);
      font-size: 12px; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 4px; text-decoration: none;
    }
    .jbm-btn-gmaps { background: #e8f5e9; color: #1b5e20; border-color: #a5d6a7; }
    .jbm-btn-waze { background: #e0f2fe; color: #0284c7; border-color: #7dd3fc; }
    .jbm-btn-visita { background: #fef3c7; color: #92400e; border-color: #fde68a; cursor: pointer; }
    .jbm-marcas-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 6px; max-height: 120px; overflow-y: auto; }
    .jbm-chip { padding: 5px 8px; background: #f8fafc; border: 1px solid var(--border); border-radius: 6px; font-size: 12px; cursor: pointer; }
    .jbm-chip.checked { background: var(--primary); color: #fff; font-weight: 600; }
    .jbm-chip input { display: none; }

    /* ========================================= */
    /* M\u00D3DULO: REGISTOS                         */
    /* ========================================= */
    .jbr-wrap {
      background: #fff; border: 1px solid var(--border); border-radius: 10px; padding: 20px; max-width: 800px; margin: 0 auto; width: 100%;
    }
    .jbr-subtabs { display: flex; gap: 8px; margin-bottom: 16px; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px; }
    .jbr-subtab {
      padding: 8px 14px; border: 1px solid var(--border); background: #fff; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 13px; font-family: inherit;
    }
    .jbr-subtab.active { background: var(--primary); color: #fff; border-color: var(--primary); }
    .jbr-form { display: none; flex-direction: column; gap: 10px; }
    .jbr-form.active { display: flex; }
    .jbr-msg { padding: 10px; border-radius: 6px; font-size: 13px; font-weight: 600; margin-top: 10px; display: none; }
    .jbr-msg.ok { background: #dcfce7; color: #15803d; border: 1px solid #bbf7d0; display: block; }
    .jbr-msg.err { background: #fee2e2; color: #b91c1c; border: 1px solid #fecaca; display: block; }

    /* ========================================= */
    /* M\u00D3DULO: HIST\u00D3RICO                        */
    /* ========================================= */
    .jbh-wrap {
      background: #fff; border: 1px solid var(--border); border-radius: 10px; padding: 16px;
    }
    .jbh-table-wrap { overflow-x: auto; margin-top: 12px; }
    table { width: 100%; border-collapse: collapse; font-size: 12.5px; }
    th { background: #f8fafc; padding: 9px; text-align: left; border-bottom: 1px solid var(--border); white-space: nowrap; }
    td { padding: 9px; border-bottom: 1px solid #e2e8f0; vertical-align: top; }

    /* Responsividade */
    @media (max-width: 900px) {
      .jbm-main { flex-direction: column-reverse; height: auto; }
      .jbm-sidebar { width: 100%; height: 420px; }
      #jbm-map { height: 420px; min-height: 420px; }
      .jbm-grid-2 { grid-template-columns: 1fr; }
      .jbp-nav { width: 100%; justify-content: flex-start; }
      .jbp-user-pill { width: 100%; margin-left: 0; justify-content: space-between; }
    }
  </style>
</head>
<body>

  <!-- ECR\u00C3 DE LOGIN SEGURO -->
  <div class="jbp-login-wrap" id="jbp-login-view">
    <div class="jbp-login-box">
      <div class="jbp-login-logo">JB</div>
      <h1 class="jbp-login-title">\u00C1rea Comercial</h1>
      <p class="jbp-login-sub">Introduza o seu c\u00F3digo de acesso pessoal para entrar no portal.</p>
      
      <form id="jbp-login-form">
        <input type="password" id="jbp-login-code" class="jbp-input" placeholder="C\u00F3digo de Acesso..." autocomplete="current-password" required>
        <button type="submit" class="jbp-btn" id="jbp-btn-login">Entrar</button>
        <div class="jbp-login-erro" id="jbp-login-erro"></div>
      </form>
    </div>
  </div>

  <!-- APLICA\u00C7\u00C3O PRINCIPAL AUTENTICADA -->
  <div class="jbp-app jbp-hide" id="jbp-app-view">
    
    <!-- Topo / Barra de Navega\u00E7\u00E3o -->
    <header class="jbp-top">
      <div class="jbp-brand">
        <div class="jbp-logo-sm">JB</div>
        <div>
          <strong>JB COM\u00C9RCIO GLOBAL</strong>
          <small>Portal Comercial Integrado</small>
        </div>
      </div>

      <nav class="jbp-nav">
        <button type="button" class="jbp-nav-btn active" data-tab="mapa">\uD83D\uDDFA\uFE0F Mapa de Clientes</button>
        <button type="button" class="jbp-nav-btn" data-tab="registos">\u270D\uFE0F Registar Atividade</button>
        <button type="button" class="jbp-nav-btn" data-tab="historico">\uD83D\uDCCA Hist\u00F3rico</button>
      </nav>

      <div class="jbp-user-pill">
        <span>\uD83D\uDC64 <strong id="jbp-user-nome">Comercial</strong> (<span id="jbp-user-perfil">...</span>)</span>
        <button type="button" class="jbp-btn-sair" id="jbp-btn-sair">Sair</button>
      </div>
    </header>

    <!-- ABA 1: MAPA & CRM COMERCIAL -->
    <section class="jbp-panel active" id="jbp-panel-mapa">
      <div class="jbm-bar">
        <div class="jbm-search">
          <input type="text" id="jbm-busca" placeholder="Procurar cliente, numero ou localidade...">
        </div>

        <div class="jbm-filters">
          <button type="button" class="jbm-btn-filter active" data-cor="todas">Todos (<span id="count-todos">77</span>)</button>
          <button type="button" class="jbm-btn-filter" data-cor="verde"><span class="jbm-dot dot-verde"></span> Melhores (<span id="count-verde">0</span>)</button>
          <button type="button" class="jbm-btn-filter" data-cor="laranja"><span class="jbm-dot dot-laranja"></span> Medianos (<span id="count-laranja">0</span>)</button>
          <button type="button" class="jbm-btn-filter" data-cor="amarelo"><span class="jbm-dot dot-amarelo"></span> Baixas (<span id="count-amarelo">0</span>)</button>
          <button type="button" class="jbm-btn-filter" data-cor="lilas"><span class="jbm-dot dot-lilas"></span> Potenciais (<span id="count-lilas">0</span>)</button>
          <button type="button" class="jbm-btn-filter" data-cor="atraso" style="border-color:#fca5a5;color:#b91c1c;"><span class="jbm-dot dot-atraso"></span> \u26A0\uFE0F Em Atraso (<span id="count-atraso">0</span>)</button>
        </div>

        <button type="button" class="jbm-btn-rota-top" id="jbm-btn-abrir-rota">\uD83D\uDE97 <strong>Planear Rota</strong></button>

        <div class="jbm-gps-control">
          <button type="button" class="jbm-btn-near" id="jbm-btn-gps">\uD83D\uDCCD Perto de mim</button>
          <div class="jbm-raio-grupo">
            <button type="button" class="jbm-raio-pill" data-raio="5">5km</button>
            <button type="button" class="jbm-raio-pill ativo" data-raio="10">10km</button>
            <button type="button" class="jbm-raio-pill" data-raio="20">20km</button>
            <button type="button" class="jbm-raio-pill" data-raio="35">35km</button>
            <button type="button" class="jbm-raio-pill" data-raio="50">50km</button>
          </div>
        </div>
      </div>

      <main class="jbm-main">
        <div id="jbm-map"></div>
        <aside class="jbm-sidebar">
          <div class="jbm-sidebar-header">
            <div class="jbm-sidebar-header-row">
              <strong>Clientes Filtrados</strong>
              <span id="jbm-sidebar-count">A mostrar 77</span>
            </div>
            <div class="jbm-sort-bar">
              <span>Ordenar:</span>
              <button type="button" class="jbm-sort-btn active" id="jbm-sort-urgencia">\uD83D\uDEA8 Urg\u00EAncia</button>
              <button type="button" class="jbm-sort-btn" id="jbm-sort-dias">\u23F1\uFE0F Dias</button>
              <button type="button" class="jbm-sort-btn" id="jbm-sort-nome">Loja</button>
            </div>
          </div>
          <div class="jbm-client-list" id="jbm-lista"></div>
        </aside>
      </main>
    </section>

    <!-- ABA 2: REGISTAR ATIVIDADE -->
    <section class="jbp-panel" id="jbp-panel-registos">
      <div class="jbr-wrap">
        <div class="jbr-subtabs">
          <button type="button" class="jbr-subtab active" data-sub="visitas">\uD83D\uDCDD Registo de Visita</button>
          <button type="button" class="jbr-subtab" data-sub="rotas">\uD83D\uDE97 Registo de Rota</button>
          <button type="button" class="jbr-subtab" data-sub="abastecimentos">\u26FD Abastecimento</button>
        </div>

        <!-- FORMUL\u00C1RIO 1: VISITAS -->
        <form class="jbr-form active" id="jbr-form-visitas" data-tipo="visitas">
          <input type="hidden" name="comercial" class="jbp-field-comercial">
          <div class="jbm-grid-2">
            <div class="jbm-campo">
              <label>J\u00E1 \u00E9 cliente?</label>
              <select name="ja_cliente" id="jbr-visita-ja-cliente">
                <option value="Sim">Sim (Cliente habitual)</option>
                <option value="N\u00E3o">N\u00E3o (Potencial cliente)</option>
              </select>
            </div>
            <div class="jbm-campo">
              <label>Pesquisar / Selecionar Loja</label>
              <input type="text" id="jbr-visita-busca" list="jbr-dl-clientes" placeholder="N\u00BA ou nome...">
              <datalist id="jbr-dl-clientes"></datalist>
            </div>
          </div>

          <div class="jbm-grid-2">
            <div class="jbm-campo">
              <label>N\u00BA do Cliente</label>
              <input type="text" name="nif" id="jbr-visita-nif" required>
            </div>
            <div class="jbm-campo">
              <label>Nome da Loja</label>
              <input type="text" name="loja" id="jbr-visita-loja" required>
            </div>
          </div>

          <div class="jbm-grid-2">
            <div class="jbm-campo">
              <label>Morada</label>
              <input type="text" name="morada" id="jbr-visita-morada" required>
            </div>
            <div class="jbm-campo">
              <label>Localidade</label>
              <input type="text" name="localidade" id="jbr-visita-localidade" required>
            </div>
          </div>

          <div class="jbm-grid-2">
            <div class="jbm-campo">
              <label>Contacto / Respons\u00E1vel</label>
              <input type="text" name="contacto" id="jbr-visita-contacto" required>
            </div>
            <div class="jbm-campo">
              <label>Telefone</label>
              <input type="tel" name="telefone" id="jbr-visita-telefone">
            </div>
          </div>

          <div class="jbm-grid-2">
            <div class="jbm-campo">
              <label>Dia da Visita</label>
              <input type="date" name="dia" id="jbr-visita-dia" required>
            </div>
            <div class="jbm-campo">
              <label>Hor\u00E1rio (Entrada / Sa\u00EDda)</label>
              <div style="display:flex;gap:4px;">
                <input type="time" name="entrada" id="jbr-visita-entrada" required style="flex:1;">
                <input type="time" name="saida" id="jbr-visita-saida" required style="flex:1;">
              </div>
            </div>
          </div>

          <div class="jbm-grid-2">
            <div class="jbm-campo">
              <label>Efetuou Nova Encomenda?</label>
              <select name="nova_encomenda">
                <option value="N\u00E3o">N\u00E3o</option>
                <option value="Sim">Sim</option>
              </select>
            </div>
            <div class="jbm-campo">
              <label>Comprou Marca Nova?</label>
              <select name="marca_nova">
                <option value="N\u00E3o">N\u00E3o</option>
                <option value="Sim">Sim</option>
              </select>
            </div>
          </div>

          <div class="jbm-campo">
            <label>Marcas Compradas / Observa\u00E7\u00F5es</label>
            <textarea name="quais_marcas" rows="2" placeholder="Marcas compradas ou notas adicionais..."></textarea>
          </div>

          <button type="submit" class="jbp-btn">\uD83D\uDCE4 Submeter Registo de Visita</button>
          <div class="jbr-msg" id="jbr-msg-visitas"></div>
        </form>

        <!-- FORMUL\u00C1RIO 2: ROTAS -->
        <form class="jbr-form" id="jbr-form-rotas" data-tipo="rotas">
          <input type="hidden" name="comercial" class="jbp-field-comercial">
          <div class="jbm-campo">
            <label>Data</label>
            <input type="date" name="data" required>
          </div>
          <div class="jbm-grid-2">
            <div class="jbm-campo">
              <label>In\u00EDcio da Rota</label>
              <input type="text" name="inicio" placeholder="Ex.: Vila do Conde / Casa" required>
            </div>
            <div class="jbm-campo">
              <label>Fim da Rota</label>
              <input type="text" name="fim" placeholder="Ex.: Vila do Conde" required>
            </div>
          </div>
          <div class="jbm-campo">
            <label>Paragens Interm\u00E9dias / Zonas</label>
            <input type="text" name="paragens" placeholder="Ex.: Braga, Guimar\u00E3es, Famalic\u00E3o" required>
          </div>
          <div class="jbm-campo">
            <label>Observa\u00E7\u00F5es</label>
            <textarea name="observacoes" rows="2"></textarea>
          </div>
          <button type="submit" class="jbp-btn">\uD83D\uDCE4 Submeter Registo de Rota</button>
          <div class="jbr-msg" id="jbr-msg-rotas"></div>
        </form>

        <!-- FORMUL\u00C1RIO 3: ABASTECIMENTOS -->
        <form class="jbr-form" id="jbr-form-abastecimentos" data-tipo="abastecimentos">
          <input type="hidden" name="comercial" class="jbp-field-comercial">
          <div class="jbm-grid-2">
            <div class="jbm-campo">
              <label>Km antes do abastecimento</label>
              <input type="number" name="km_antes" required>
            </div>
            <div class="jbm-campo">
              <label>Valor Pago (\u20AC)</label>
              <input type="number" step="0.01" name="valor" required>
            </div>
          </div>
          <div class="jbm-campo">
            <label>Foto do conta-quil\u00F3metros (Opcional)</label>
            <input type="file" name="foto_ficheiro" accept="image/*">
          </div>
          <button type="submit" class="jbp-btn">\uD83D\uDCE4 Submeter Abastecimento</button>
          <div class="jbr-msg" id="jbr-msg-abastecimentos"></div>
        </form>
      </div>
    </section>

    <!-- ABA 3: HIST\u00D3RICO COMERCIAL -->
    <section class="jbp-panel" id="jbp-panel-historico">
      <div class="jbh-wrap">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
          <div style="display:flex;gap:6px;" id="jbh-tipo-btns">
            <button type="button" class="jbp-nav-btn active" data-htipo="visitas">Visitas</button>
            <button type="button" class="jbp-nav-btn" data-htipo="rotas">Rotas</button>
            <button type="button" class="jbp-nav-btn" data-htipo="abastecimentos">Abastecimentos</button>
          </div>
          <div id="jbh-admin-com-wrap" class="jbp-hide">
            <label style="font-size:12px;font-weight:700;">Filtrar Comercial: 
              <select id="jbh-sel-comercial" style="padding:4px 8px;border-radius:5px;border:1px solid var(--border);font-family:inherit;">
                <option value="">Todos</option>
              </select>
            </label>
          </div>
        </div>
        <div id="jbh-summary-txt" style="font-size:12px;color:var(--muted);margin-top:8px;font-weight:600;"></div>
        <div class="jbh-table-wrap" id="jbh-table-cont"></div>
      </div>
    </section>

  </div>

  <!-- MODAL: FICHA DO CLIENTE -->
  <div class="jbm-modal-overlay jbp-hide" id="jbm-modal">
    <div class="jbm-modal">
      <div class="jbm-modal-header">
        <div style="display:flex;align-items:center;gap:10px;min-width:0;">
          <span class="jbm-card-num" id="modal-num" style="font-size:13px;padding:3px 8px;background:var(--primary);color:#fff;">#0000</span>
          <div style="min-width:0;">
            <h3 id="modal-nome" style="margin:0;font-size:15px;color:var(--primary);font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">Nome da Loja</h3>
            <span style="font-size:11px;color:var(--muted);" id="modal-sub">Localidade</span>
          </div>
        </div>
        <button type="button" class="jbm-btn-close" id="modal-btn-close">\u2715</button>
      </div>

      <div class="jbm-modal-body">
        <div class="jbm-campo">
          <label>Navegar para o cliente</label>
          <div class="jbm-gps-group">
            <a href="#" target="_blank" class="jbm-btn-gps jbm-btn-gmaps" id="modal-link-gmaps">\uD83D\uDDFA\uFE0F Google Maps</a>
            <a href="#" target="_blank" class="jbm-btn-gps jbm-btn-waze" id="modal-link-waze">\uD83D\uDE99 Waze</a>
            <button type="button" class="jbm-btn-gps jbm-btn-visita" id="modal-btn-ir-visita">\u270D\uFE0F Registar Visita</button>
          </div>
        </div>

        <div class="jbm-grid-2">
          <div class="jbm-campo">
            <label>Classifica\u00E7\u00E3o (Cor)</label>
            <select id="modal-cor">
              <option value="verde">\uD83D\uDFE2 Verde (Melhor Cliente - 30 dias)</option>
              <option value="laranja">\uD83D\uDFE0 Laranja (Mediano - 45 dias)</option>
              <option value="amarelo">\uD83D\uDFE1 Amarelo (Baixas compras - 60 dias)</option>
              <option value="lilas">\uD83D\uDFE3 Lil\u00E1s (Potencial Cliente)</option>
            </select>
          </div>
          <div class="jbm-campo">
            <label>Estado da Visita & Prazo</label>
            <input type="text" id="modal-dias" disabled style="font-weight:700;">
          </div>
        </div>

        <div class="jbm-campo">
          <label>Morada Completa</label>
          <input type="text" id="modal-morada" disabled>
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
          <label>Marcas que Vende</label>
          <div class="jbm-marcas-grid" id="modal-marcas-grid">
            <label class="jbm-chip"><input type="checkbox" value="Caderno Inteligente"> Caderno Inteligente</label>
            <label class="jbm-chip"><input type="checkbox" value="Cavallini & Co."> Cavallini & Co.</label>
            <label class="jbm-chip"><input type="checkbox" value="Cool Bottles"> Cool Bottles</label>
            <label class="jbm-chip"><input type="checkbox" value="Happily"> Happily</label>
            <label class="jbm-chip"><input type="checkbox" value="Herma"> Herma</label>
            <label class="jbm-chip"><input type="checkbox" value="Litem"> Litem</label>
            <label class="jbm-chip"><input type="checkbox" value="mt masking tape"> mt masking tape</label>
            <label class="jbm-chip"><input type="checkbox" value="Morris"> Morris</label>
            <label class="jbm-chip"><input type="checkbox" value="Newpen"> Newpen</label>
            <label class="jbm-chip"><input type="checkbox" value="Pencil Wrap"> Pencil Wrap</label>
            <label class="jbm-chip"><input type="checkbox" value="Sip by Swell"> Sip by Swell</label>
            <label class="jbm-chip"><input type="checkbox" value="Y-Plus"> Y-Plus</label>
          </div>
          <input type="hidden" id="modal-marcas">
        </div>

        <div class="jbm-campo">
          <label>Observa\u00E7\u00F5es Comerciais</label>
          <textarea id="modal-obs" rows="2"></textarea>
        </div>

        <button type="button" class="jbp-btn" id="modal-btn-salvar" style="margin-top:4px;">\uD83D\uDCBE Guardar Altera\u00E7\u00F5es</button>
      </div>
    </div>
  </div>

  <!-- MODAL: PLANEAR ROTA COMERCIAL -->
  <div class="jbm-modal-overlay jbp-hide" id="jbm-rota-modal-overlay">
    <div class="jbm-modal" style="max-width:650px;">
      <div class="jbm-modal-header">
        <div>
          <h3 style="margin:0;font-size:15px;color:var(--rota-blue);font-weight:700;">Planear Rota Comercial</h3>
          <span style="font-size:11px;color:var(--muted);">Otimizada por estrada para telem\u00F3vel</span>
        </div>
        <button type="button" class="jbm-btn-close" id="jbm-rota-btn-close">\u2715</button>
      </div>
      <div class="jbm-modal-body">
        <div style="background:#f8fafc;padding:10px;border-radius:8px;border:1px solid #e2e8f0;">
          <div style="font-size:11.5px;font-weight:700;color:var(--rota-blue);margin-bottom:4px;">\uD83D\uDCCD PONTO DE PARTIDA</div>
          <div style="display:flex;gap:6px;">
            <input type="text" id="jbm-rota-origem-txt" style="flex:1;font-size:12px;padding:6px 10px;" readonly>
            <button type="button" id="jbm-rota-btn-gps" class="jbm-sort-btn" style="background:#0284c7;color:#fff;">\uD83D\uDCCD GPS</button>
          </div>
        </div>

        <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;font-size:12px;font-weight:600;">
          <label>M\u00E1x. Paragens: 
            <select id="jbm-rota-max-paragens" style="padding:4px 8px;border-radius:5px;border:1px solid var(--border);">
              <option value="4">4</option>
              <option value="6">6</option>
              <option value="8" selected>8 (Recomendado)</option>
              <option value="10">10</option>
              <option value="12">12</option>
            </select>
          </label>
          <label><input type="checkbox" id="jbm-rota-so-urgentes"> S\u00F3 em atraso / a vencer</label>
          <label><input type="checkbox" id="jbm-rota-retorno"> Voltar \u00E0 partida</label>
        </div>

        <div style="font-size:11.5px;font-weight:700;color:var(--rota-blue);margin-top:4px;">\uD83D\uDC65 LOJAS CANDIDATAS (<span id="jbm-rota-cand-count">0</span>)</div>
        <div id="jbm-rota-cand-list" style="max-height:140px;overflow-y:auto;display:flex;flex-direction:column;gap:4px;border:1px solid #e2e8f0;padding:6px;border-radius:6px;"></div>

        <button type="button" class="jbp-btn" id="jbm-rota-btn-calcular" style="background:var(--rota-blue);">\uD83D\uDE80 Calcular Rota por Estrada</button>

        <div id="jbm-rota-resultados" class="jbp-hide" style="margin-top:6px;">
          <div style="background:#ecfdf5;border:1px solid #a7f3d0;padding:8px 12px;border-radius:7px;display:flex;justify-content:space-between;align-items:center;">
            <div>
              <strong id="jbm-rota-total-dist" style="color:#065f46;">0 km</strong> \u00B7 <span id="jbm-rota-total-tempo" style="color:#065f46;">0 min</span>
              <div id="jbm-rota-num-paragens-txt" style="font-size:11px;color:#047857;">0 paragens ordenadas</div>
            </div>
            <div style="display:flex;gap:6px;">
              <a href="#" target="_blank" class="jbm-btn-gps jbm-btn-gmaps" id="jbm-rota-link-gmaps" style="padding:6px 10px;font-size:11.5px;">\uD83D\uDDFA\uFE0F Google Maps</a>
              <a href="#" target="_blank" class="jbm-btn-gps jbm-btn-waze" id="jbm-rota-link-waze" style="padding:6px 10px;font-size:11.5px;">\uD83D\uDE99 Waze</a>
            </div>
          </div>
          <div id="jbm-rota-fora-wrap" class="jbp-hide" style="font-size:11px;color:#991b1b;background:#fee2e2;padding:6px;border-radius:6px;margin-top:4px;">
            <strong>Lojas de fora:</strong> <span id="jbm-rota-fora-nomes"></span>
          </div>
          <div id="jbm-rota-paragens-lista" style="max-height:160px;overflow-y:auto;display:flex;flex-direction:column;gap:4px;margin-top:6px;"></div>
        </div>
      </div>
    </div>
  </div>

  <script>
  (function () {
    // ESTADO GLOBAL DA APLICA\u00C7\u00C3O
    var estado = {
      autenticado: false,
      codigo: '',
      nome: '',
      perfil: '',
      dados: { rotas: { cols:[], rows:[] }, visitas: { cols:[], rows:[] }, abastecimentos: { cols:[], rows:[] } }
    };

    var DATA_INICIO_CONTROLO = '2026-11-09';
    var PRAZOS = { verde: 30, laranja: 45, amarelo: 60, lilas: null };

    // BASE DE CLIENTES
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

    // ==========================================
    // 1. SISTEMA DE AUTENTICA\u00C7\u00C3O
    // ==========================================
    var loginView = document.getElementById('jbp-login-view');
    var appView = document.getElementById('jbp-app-view');
    var loginForm = document.getElementById('jbp-login-form');
    var loginCode = document.getElementById('jbp-login-code');
    var loginErro = document.getElementById('jbp-login-erro');
    var btnLogin = document.getElementById('jbp-btn-login');

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
          throw new Error(res && res.erro === 'codigo' ? 'C\u00F3digo de acesso incorreto.' : 'Erro de valida\u00E7\u00E3o.');
        }

        estado.autenticado = true;
        estado.codigo = codigo;
        estado.nome = res.nome || 'Comercial';
        estado.perfil = res.perfil || 'comercial';
        estado.dados = res.dados || estado.dados;

        try { localStorage.setItem('jb_portal_codigo', codigo); } catch (e) {}

        // Atualizar interface
        document.getElementById('jbp-user-nome').textContent = estado.nome;
        document.getElementById('jbp-user-perfil').textContent = estado.perfil === 'admin' ? 'Administra\u00E7\u00E3o' : 'Comercial';
        document.querySelectorAll('.jbp-field-comercial').forEach(function (inp) { inp.value = estado.nome; });

        loginView.classList.add('jbp-hide');
        appView.classList.remove('jbp-hide');

        // Inicializar M\u00F3dulos
        sincronizarVisitasNoMapa();
        initMap();
        filtrarClientes();
        renderHistorico('visitas');

        if (estado.perfil === 'admin') {
          document.getElementById('jbh-admin-com-wrap').classList.remove('jbp-hide');
          preencherFiltroComerciaisAdmin();
        }
      })
      .catch(function (err) {
        if (!automatico) {
          loginErro.textContent = err.message || 'Falha ao autenticar.';
        }
        try { localStorage.removeItem('jb_portal_codigo'); } catch (e) {}
      })
      .finally(function () {
        btnLogin.disabled = false;
      });
    }

    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      tentarLogin(loginCode.value.trim(), false);
    });

    document.getElementById('jbp-btn-sair').addEventListener('click', function () {
      try { localStorage.removeItem('jb_portal_codigo'); } catch (e) {}
      location.reload();
    });

    // Auto-login se c\u00F3digo guardado
    try {
      var codGuardado = localStorage.getItem('jb_portal_codigo');
      if (codGuardado) {
        loginCode.value = codGuardado;
        tentarLogin(codGuardado, true);
      }
    } catch (e) {}

    // ==========================================
    // 2. NAVEGA\u00C7\u00C3O ENTRE ABAS
    // ==========================================
    document.querySelectorAll('.jbp-nav-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        document.querySelectorAll('.jbp-nav-btn').forEach(function (b) { b.classList.remove('active'); });
        document.querySelectorAll('.jbp-panel').forEach(function (p) { p.classList.remove('active'); });
        btn.classList.add('active');
        var targetPanel = document.getElementById('jbp-panel-' + btn.dataset.tab);
        if (targetPanel) targetPanel.classList.add('active');
        if (btn.dataset.tab === 'mapa' && map) {
          setTimeout(function () { map.invalidateSize(); }, 200);
        }
      });
    });

    // ==========================================
    // 3. M\u00D3DULO MAPA & CRM LOGIC
    // ==========================================
    function parseData(str) {
      if (!str) return null;
      var s = String(str).trim();
      var mIso = /^(\\d{4})-(\\d{2})-(\\d{2})/.exec(s);
      if (mIso) return new Date(Number(mIso[1]), Number(mIso[2]) - 1, Number(mIso[3]));
      var mPt = /^(\\d{1,2})[\\/\\-](\\d{1,2})[\\/\\-](\\d{4})/.exec(s);
      if (mPt) return new Date(Number(mPt[3]), Number(mPt[2]) - 1, Number(mPt[1]));
      var dt = new Date(s);
      return !isNaN(dt.getTime()) ? dt : null;
    }

    function formatarDataPT(dt) {
      if (!dt) return '';
      var d = ('0' + dt.getDate()).slice(-2);
      var m = ('0' + (dt.getMonth() + 1)).slice(-2);
      var y = String(dt.getFullYear()).slice(-2);
      return d + '/' + m + '/' + y;
    }

    function calcularDiasDesde(dataVal) {
      var d = (dataVal instanceof Date) ? dataVal : parseData(dataVal);
      if (!d) return 0;
      var agora = new Date();
      var partes = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Lisbon', year: 'numeric', month: '2-digit', day: '2-digit' }).format(agora).split('-');
      var hoje = new Date(Number(partes[0]), Number(partes[1]) - 1, Number(partes[2]));
      var dtRef = new Date(d.getTime());
      dtRef.setHours(0,0,0,0);
      var dif = hoje.getTime() - dtRef.getTime();
      return Math.max(0, Math.floor(dif / (1000 * 60 * 60 * 24)));
    }

    function avaliarEstadoCliente(c) {
      var prazo = PRAZOS[c.cor] || null;
      var dtInicio = parseData(DATA_INICIO_CONTROLO);
      var dtRef = dtInicio;
      if (c.ultimaVisitaData && c.ultimaVisitaData > dtInicio) {
        dtRef = c.ultimaVisitaData;
      }
      var dias = calcularDiasDesde(dtRef);
      c.diasSemVisita = dias;
      c.prazo = prazo;

      if (!prazo) {
        c.estado = 'potencial';
        c.estadoLabel = 'Potencial';
        c.ratioUrgencia = 0;
        c.barraPercent = 0;
        return;
      }

      var diasRestantes = prazo - dias;
      c.diasRestantes = diasRestantes;
      c.ratioUrgencia = dias / prazo;
      c.barraPercent = Math.min(100, Math.round((dias / prazo) * 100));

      if (dias > prazo) {
        c.estado = 'em-atraso';
        c.estadoLabel = '\u26A0\uFE0F Em atraso (' + (dias - prazo) + 'd)';
      } else if (diasRestantes <= 7) {
        c.estado = 'a-vencer';
        c.estadoLabel = '\u23F3 A vencer (' + diasRestantes + 'd)';
      } else {
        c.estado = 'em-dia';
        c.estadoLabel = '\u2705 Em dia (' + diasRestantes + 'd)';
      }
    }

    var clientes = CLIENTES_BASE.map(function (c) {
      var o = Object.assign({}, c, {
        ultimaVisitaData: null,
        ultimaVisitaFormatada: '',
        totalVisitas: 0,
        ultimaVisitaTexto: ''
      });
      avaliarEstadoCliente(o);
      o.ultimaVisitaTexto = o.diasSemVisita + ' dias sem visitar';
      return o;
    });

    var map = null;
    var markersMap = {};
    var rotaLinhaLayer = null;
    var rotaMarcadoresGroup = null;
    var userLocation = null;
    var userMarker = null;
    var userRadiusCircle = null;
    var filtroCor = 'todas';
    var filtroTexto = '';
    var filtroPertoDeMim = false;
    var raioKm = 10;
    var criterioOrdenacao = 'urgencia';
    var clienteSelecionado = null;

    function calcDistancia(lat1, lon1, lat2, lon2) {
      var R = 6371;
      var dLat = (lat2 - lat1) * Math.PI / 180;
      var dLon = (lon2 - lon1) * Math.PI / 180;
      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
      return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)));
    }

    function initMap() {
      if (map || typeof L === 'undefined') return;
      var el = document.getElementById('jbm-map');
      if (!el) return;

      map = L.map('jbm-map').setView([41.45, -8.45], 9);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '\u00A9 OpenStreetMap'
      }).addTo(map);

      rotaMarcadoresGroup = L.layerGroup().addTo(map);

      setTimeout(function () {
        if (map) { map.invalidateSize(); filtrarClientes(); }
      }, 300);
    }

    function criarIcone(cor, atrasado) {
      return L.divIcon({
        className: 'jbm-div-icon',
        html: '<div class="jbm-marker-pin ' + cor + (atrasado ? ' atraso' : '') + '"></div>',
        iconSize: [30, 42],
        iconAnchor: [15, 30]
      });
    }

    function desenharMarcadores(lista) {
      if (!map) return;
      Object.keys(markersMap).forEach(function (k) { map.removeLayer(markersMap[k]); });
      markersMap = {};

      lista.forEach(function (c) {
        if (!c.lat || !c.lng) return;
        var marker = L.marker([c.lat, c.lng], { icon: criarIcone(c.cor, c.estado === 'em-atraso') });
        marker.bindPopup('<strong>' + c.nome + ' (#' + c.num + ')</strong><br>' + c.morada + '<br><br>' +
          '<span>' + c.estadoLabel + '</span><br><br>' +
          '<button type="button" onclick="window.jbpAbrirFichaPorNum(\\'' + c.num + '\\')" style="width:100%;padding:6px;background:var(--primary);color:#fff;border:0;border-radius:4px;cursor:pointer;">\uD83D\uDCCB Ver Ficha</button>'
        );
        marker.on('click', function () { abrirModal(c); });
        marker.addTo(map);
        markersMap[c.num] = marker;
      });
    }

    window.jbpAbrirFichaPorNum = function (num) {
      for (var i = 0; i < clientes.length; i++) {
        if (clientes[i].num === num) { abrirModal(clientes[i]); break; }
      }
    };

    function atualizarContadores() {
      var counts = { verde: 0, laranja: 0, amarelo: 0, lilas: 0, atraso: 0 };
      clientes.forEach(function (c) {
        avaliarEstadoCliente(c);
        if (counts[c.cor] !== undefined) counts[c.cor]++;
        if (c.estado === 'em-atraso') counts.atraso++;
      });
      document.getElementById('count-todos').textContent = clientes.length;
      document.getElementById('count-verde').textContent = counts.verde;
      document.getElementById('count-laranja').textContent = counts.laranja;
      document.getElementById('count-amarelo').textContent = counts.amarelo;
      document.getElementById('count-lilas').textContent = counts.lilas;
      document.getElementById('count-atraso').textContent = counts.atraso;
    }

    function filtrarClientes() {
      var filtrados = clientes.filter(function (c) {
        if (filtroCor === 'atraso') {
          if (c.estado !== 'em-atraso') return false;
        } else if (filtroCor !== 'todas') {
          if (c.cor !== filtroCor) return false;
        }
        if (filtroTexto) {
          var t = (c.nome + ' ' + c.num + ' ' + c.morada + ' ' + c.localidade).toLowerCase();
          if (t.indexOf(filtroTexto.toLowerCase()) < 0) return false;
        }
        if (userLocation && c.lat && c.lng) {
          c._dist = calcDistancia(userLocation.lat, userLocation.lng, c.lat, c.lng);
        } else {
          c._dist = null;
        }
        if (filtroPertoDeMim && userLocation) {
          if (c._dist === null || c._dist > raioKm) return false;
        }
        return true;
      });

      if (filtroPertoDeMim && userLocation) {
        filtrados.sort(function (a, b) { return (a._dist || 0) - (b._dist || 0); });
      } else if (criterioOrdenacao === 'urgencia') {
        filtrados.sort(function (a, b) {
          var peso = { 'em-atraso': 3, 'a-vencer': 2, 'em-dia': 1, 'potencial': 0 };
          var pA = peso[a.estado] || 0;
          var pB = peso[b.estado] || 0;
          if (pA !== pB) return pB - pA;
          if (a.ratioUrgencia !== b.ratioUrgencia) return b.ratioUrgencia - a.ratioUrgencia;
          return (b.diasSemVisita || 0) - (a.diasSemVisita || 0);
        });
      } else if (criterioOrdenacao === 'dias') {
        filtrados.sort(function (a, b) { return (b.diasSemVisita || 0) - (a.diasSemVisita || 0); });
      } else if (criterioOrdenacao === 'nome') {
        filtrados.sort(function (a, b) { return a.nome.localeCompare(b.nome); });
      }

      renderLista(filtrados);
      desenharMarcadores(filtrados);
      atualizarContadores();
    }

    function renderLista(lista) {
      var cont = document.getElementById('jbm-lista');
      cont.innerHTML = '';
      document.getElementById('jbm-sidebar-count').textContent = 'A mostrar ' + lista.length;

      if (!lista.length) {
        cont.innerHTML = '<p style="padding:20px;text-align:center;color:var(--muted);font-size:13px;">Nenhum cliente com estes filtros.</p>';
        return;
      }

      lista.forEach(function (c) {
        var card = document.createElement('div');
        card.className = 'jbm-card cor-' + c.cor;

        var distBadge = '';
        if (userLocation && c._dist !== null) {
          var distLabel = c._dist < 1 ? Math.round(c._dist * 1000) + ' m' : c._dist.toFixed(1) + ' km';
          distBadge = '<span style="font-weight:700;color:#0284c7;">\uD83D\uDE97 ' + distLabel + '</span>';
        }

        var progHtml = c.prazo ? 
          ('<div class="jbm-progress-bar"><div class="jbm-progress-fill ' + c.estado + '" style="width:' + c.barraPercent + '%;"></div></div>') : '';

        card.innerHTML = '<div class="jbm-card-top">' +
          '<div class="jbm-card-nome">' + c.nome + '</div>' +
          '<div class="jbm-card-num">#' + c.num + '</div>' +
          '</div>' +
          '<div class="jbm-card-morada">\uD83D\uDCCD ' + c.morada + ' (' + c.localidade + ')</div>' +
          progHtml +
          '<div class="jbm-card-footer">' +
          distBadge +
          '<span class="jbm-tag-status ' + c.estado + '">' + c.estadoLabel + '</span>' +
          '</div>';

        card.addEventListener('click', function () {
          if (map && c.lat && c.lng) {
            map.flyTo([c.lat, c.lng], 15, { duration: 1 });
            if (markersMap[c.num]) markersMap[c.num].openPopup();
          }
          abrirModal(c);
        });
        cont.appendChild(card);
      });
    }

    // Filtros de Bot\u00E3o
    document.querySelectorAll('.jbm-btn-filter').forEach(function (b) {
      b.addEventListener('click', function () {
        document.querySelectorAll('.jbm-btn-filter').forEach(function (el) { el.classList.remove('active'); });
        b.classList.add('active');
        filtroCor = b.dataset.cor;
        filtrarClientes();
      });
    });

    document.getElementById('jbm-busca').addEventListener('input', function () {
      filtroTexto = this.value.trim();
      filtrarClientes();
    });

    document.getElementById('jbm-sort-urgencia').addEventListener('click', function () {
      document.querySelectorAll('.jbm-sort-btn').forEach(function (el) { el.classList.remove('active'); });
      this.classList.add('active');
      criterioOrdenacao = 'urgencia';
      filtrarClientes();
    });
    document.getElementById('jbm-sort-dias').addEventListener('click', function () {
      document.querySelectorAll('.jbm-sort-btn').forEach(function (el) { el.classList.remove('active'); });
      this.classList.add('active');
      criterioOrdenacao = 'dias';
      filtrarClientes();
    });
    document.getElementById('jbm-sort-nome').addEventListener('click', function () {
      document.querySelectorAll('.jbm-sort-btn').forEach(function (el) { el.classList.remove('active'); });
      this.classList.add('active');
      criterioOrdenacao = 'nome';
      filtrarClientes();
    });

    // Perto de mim & GPS
    document.getElementById('jbm-btn-gps').addEventListener('click', function () {
      var btn = this;
      if (filtroPertoDeMim) {
        filtroPertoDeMim = false;
        btn.classList.remove('active');
        btn.textContent = '\uD83D\uDCCD Perto de mim';
        if (userMarker && map) map.removeLayer(userMarker);
        if (userRadiusCircle && map) map.removeLayer(userRadiusCircle);
        userLocation = null;
        filtrarClientes();
        return;
      }

      if (!navigator.geolocation) {
        if (map) atualizarGPS(map.getCenter().lat, map.getCenter().lng);
        return;
      }

      btn.textContent = '\u23F1\uFE0F GPS...';
      navigator.geolocation.getCurrentPosition(
        function (pos) { atualizarGPS(pos.coords.latitude, pos.coords.longitude); },
        function () {
          btn.textContent = '\uD83D\uDCCD Perto de mim';
          if (map) atualizarGPS(map.getCenter().lat, map.getCenter().lng);
        },
        { enableHighAccuracy: true, timeout: 8000 }
      );
    });

    function atualizarGPS(lat, lng) {
      userLocation = { lat: lat, lng: lng };
      filtroPertoDeMim = true;
      var btn = document.getElementById('jbm-btn-gps');
      btn.classList.add('active');
      btn.textContent = '\uD83D\uDCCD Perto (' + raioKm + 'km)';

      if (map) {
        if (userMarker) map.removeLayer(userMarker);
        if (userRadiusCircle) map.removeLayer(userRadiusCircle);

        userRadiusCircle = L.circle([lat, lng], { radius: raioKm * 1000, color: '#0284c7', fillColor: '#38bdf8', fillOpacity: 0.12 }).addTo(map);
        userMarker = L.marker([lat, lng], {
          draggable: true,
          icon: L.divIcon({ html: '<div style="width:20px;height:20px;background:#0284c7;border:3px solid #fff;border-radius:50%;box-shadow:0 0 0 3px rgba(2,132,199,0.4);"></div>', iconSize: [24,24], iconAnchor: [12,12] })
        }).addTo(map);

        userMarker.on('dragend', function (e) {
          var ll = e.target.getLatLng();
          userLocation = { lat: ll.lat, lng: ll.lng };
          if (userRadiusCircle) userRadiusCircle.setLatLng(userLocation);
          filtrarClientes();
        });

        map.fitBounds(userRadiusCircle.getBounds().pad(0.08));
      }
      filtrarClientes();
    }

    document.querySelectorAll('.jbm-raio-pill').forEach(function (p) {
      p.addEventListener('click', function () {
        document.querySelectorAll('.jbm-raio-pill').forEach(function (el) { el.classList.remove('ativo'); });
        this.classList.add('ativo');
        raioKm = Number(this.dataset.raio);
        if (userRadiusCircle) userRadiusCircle.setRadius(raioKm * 1000);
        filtrarClientes();
      });
    });

    // Sincronizar visitas reais com a base de dados
    function sincronizarVisitasNoMapa() {
      var visitas = estado.dados.visitas;
      if (!visitas || !visitas.rows) return;
      var cols = visitas.cols || [];
      var iNif = cols.indexOf('nif');
      var iDia = cols.indexOf('dia');
      var iLoja = cols.indexOf('loja');

      clientes.forEach(function (c) {
        var cNum = String(c.num).trim();
        var visitasDoCliente = visitas.rows.filter(function (r) {
          var rNif = String(r[iNif] || '').trim();
          var rLoja = String(r[iLoja] || '').trim();
          return rNif === cNum || rLoja.indexOf(cNum) >= 0;
        });

        if (visitasDoCliente.length > 0) {
          visitasDoCliente.sort(function (a, b) {
            var da = parseData(a[iDia]) || new Date(0);
            var db = parseData(b[iDia]) || new Date(0);
            return db.getTime() - da.getTime();
          });
          var ult = visitasDoCliente[0];
          c.ultimaVisitaData = parseData(ult[iDia]);
          c.ultimaVisitaFormatada = formatarDataPT(c.ultimaVisitaData);
          c.totalVisitas = visitasDoCliente.length;
          avaliarEstadoCliente(c);
          c.ultimaVisitaTexto = '\u00DAlt. Visita (' + c.ultimaVisitaFormatada + ') \u00B7 ' + c.diasSemVisita + ' dias sem visitar';
        }
      });
    }

    // Modal Ficha
    function abrirModal(c) {
      clienteSelecionado = c;
      document.getElementById('modal-num').textContent = '#' + c.num;
      document.getElementById('modal-nome').textContent = c.nome;
      document.getElementById('modal-sub').textContent = c.localidade + ' \u00B7 ' + c.morada;
      document.getElementById('modal-cor').value = c.cor;
      document.getElementById('modal-morada').value = c.morada;
      document.getElementById('modal-contacto').value = c.contacto || '';
      document.getElementById('modal-telefone').value = c.telefone || '';
      document.getElementById('modal-obs').value = c.obs || '';
      document.getElementById('modal-dias').value = c.estadoLabel + ' \u00B7 ' + c.diasSemVisita + ' dias sem visitar';

      var dest = encodeURIComponent(c.nome + ', ' + c.morada + ', ' + c.localidade);
      document.getElementById('modal-link-gmaps').href = 'https://www.google.com/maps/dir/?api=1&destination=' + dest;
      document.getElementById('modal-link-waze').href = 'https://waze.com/ul?q=' + dest + '&navigate=yes';

      document.getElementById('jbm-modal').classList.remove('jbp-hide');
    }

    document.getElementById('modal-btn-close').addEventListener('click', function () {
      document.getElementById('jbm-modal').classList.add('jbp-hide');
    });

    document.getElementById('modal-btn-salvar').addEventListener('click', function () {
      if (!clienteSelecionado) return;
      var btn = this;
      btn.textContent = 'A guardar...';
      clienteSelecionado.cor = document.getElementById('modal-cor').value;
      clienteSelecionado.contacto = document.getElementById('modal-contacto').value.trim();
      clienteSelecionado.telefone = document.getElementById('modal-telefone').value.trim();
      clienteSelecionado.obs = document.getElementById('modal-obs').value.trim();

      fetch('/api/salvar_cliente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          num_cliente: clienteSelecionado.num,
          cor: clienteSelecionado.cor,
          contacto: clienteSelecionado.contacto,
          telefone: clienteSelecionado.telefone,
          obs: clienteSelecionado.obs
        })
      }).then(function () {
        avaliarEstadoCliente(clienteSelecionado);
        filtrarClientes();
        document.getElementById('jbm-modal').classList.add('jbp-hide');
      }).finally(function () {
        btn.textContent = '\uD83D\uDCBE Guardar Altera\u00E7\u00F5es';
      });
    });

    document.getElementById('modal-btn-ir-visita').addEventListener('click', function () {
      if (!clienteSelecionado) return;
      document.getElementById('jbm-modal').classList.add('jbp-hide');
      preencherFormularioVisita(clienteSelecionado);
      document.querySelector('.jbp-nav-btn[data-tab="registos"]').click();
      document.querySelector('.jbr-subtab[data-sub="visitas"]').click();
    });

    // ==========================================
    // 4. M\u00D3DULO PLANEAR ROTA (OSRM TRIP)
    // ==========================================
    var rotaCandsSel = {};
    document.getElementById('jbm-btn-abrir-rota').addEventListener('click', function () {
      var origem = userLocation || { lat: 41.3540, lng: -8.7435 };
      document.getElementById('jbm-rota-origem-txt').value = userLocation ? 'Localiza\u00E7\u00E3o GPS Atual' : 'Vila do Conde (Padr\u00E3o)';
      
      var cands = clientes.filter(function (c) {
        if (!c.lat || !c.lng) return false;
        if (filtroCor === 'atraso') return c.estado === 'em-atraso';
        if (filtroCor !== 'todas') return c.cor === filtroCor;
        return true;
      });

      var cont = document.getElementById('jbm-rota-cand-list');
      cont.innerHTML = '';
      document.getElementById('jbm-rota-cand-count').textContent = cands.length;

      cands.forEach(function (c) {
        rotaCandsSel[c.num] = true;
        var row = document.createElement('label');
        row.style.display = 'flex';
        row.style.alignItems = 'center';
        row.style.gap = '8px';
        row.style.fontSize = '12px';
        row.innerHTML = '<input type="checkbox" checked data-num="' + c.num + '"> <span><strong>#' + c.num + ' ' + c.nome + '</strong> (' + c.localidade + ') - ' + c.estadoLabel + '</span>';
        row.querySelector('input').onchange = function () { rotaCandsSel[c.num] = this.checked; };
        cont.appendChild(row);
      });

      document.getElementById('jbm-rota-modal-overlay').classList.remove('jbp-hide');
    });

    document.getElementById('jbm-rota-btn-close').addEventListener('click', function () {
      document.getElementById('jbm-rota-modal-overlay').classList.add('jbp-hide');
    });

    document.getElementById('jbm-rota-btn-calcular').addEventListener('click', function () {
      var btn = this;
      var maxP = Number(document.getElementById('jbm-rota-max-paragens').value) || 8;
      var cands = clientes.filter(function (c) { return rotaCandsSel[c.num]; });
      if (!cands.length) return alert('Selecione pelo menos um cliente!');

      var origem = userLocation || { lat: 41.3540, lng: -8.7435 };
      
      // Ordena\u00E7\u00E3o por prioridade
      cands.sort(function (a, b) {
        var sA = (a.estado === 'em-atraso' ? 3 : 1) - calcDistancia(origem.lat, origem.lng, a.lat, a.lng) * 0.05;
        var sB = (b.estado === 'em-atraso' ? 3 : 1) - calcDistancia(origem.lat, origem.lng, b.lat, b.lng) * 0.05;
        return sB - sA;
      });

      var escolhidos = cands.slice(0, maxP);
      var fora = cands.slice(maxP);

      btn.textContent = 'A tra\u00E7ar melhor caminho...';
      btn.disabled = true;

      var coords = [origem.lng.toFixed(5) + ',' + origem.lat.toFixed(5)];
      escolhidos.forEach(function (p) { coords.push(p.lng.toFixed(5) + ',' + p.lat.toFixed(5)); });

      var url = 'https://router.project-osrm.org/trip/v1/driving/' + coords.join(';') + '?source=first&destination=last&roundtrip=false&geometries=geojson&overview=full';

      fetch(url)
        .then(function (r) { return r.json(); })
        .then(function (data) {
          if (!data || data.code !== 'Ok') throw new Error('Falha OSRM');
          var trip = data.trips[0];
          
          document.getElementById('jbm-rota-resultados').classList.remove('jbp-hide');
          document.getElementById('jbm-rota-total-dist').textContent = (trip.distance / 1000).toFixed(1) + ' km';
          document.getElementById('jbm-rota-total-tempo').textContent = Math.round(trip.duration / 60) + ' min';
          document.getElementById('jbm-rota-num-paragens-txt').textContent = escolhidos.length + ' paragens ordenadas por estrada';

          if (fora.length) {
            document.getElementById('jbm-rota-fora-wrap').classList.remove('jbp-hide');
            document.getElementById('jbm-rota-fora-nomes').textContent = fora.map(function (f) { return '#' + f.num + ' ' + f.nome; }).join(', ');
          }

          // Tra\u00E7ar no Mapa
          if (rotaLinhaLayer) map.removeLayer(rotaLinhaLayer);
          rotaMarcadoresGroup.clearLayers();

          var latlngs = trip.geometry.coordinates.map(function (c) { return [c[1], c[0]]; });
          rotaLinhaLayer = L.polyline(latlngs, { color: '#1e3a8a', weight: 5, opacity: 0.85 }).addTo(map);
          map.fitBounds(rotaLinhaLayer.getBounds().pad(0.1));

          escolhidos.forEach(function (c, idx) {
            L.marker([c.lat, c.lng], {
              icon: L.divIcon({ html: '<div class="jbm-marker-rota">' + (idx + 1) + '</div>', iconSize: [28,28], iconAnchor: [14,14] })
            }).bindPopup('<strong>Paragem ' + (idx+1) + ': ' + c.nome + '</strong><br>' + c.morada).addTo(rotaMarcadoresGroup);
          });

          // Preencher lista do resultado
          var listaCont = document.getElementById('jbm-rota-paragens-lista');
          listaCont.innerHTML = '';
          escolhidos.forEach(function (c, idx) {
            var item = document.createElement('div');
            item.style.padding = '6px';
            item.style.background = '#f8fafc';
            item.style.border = '1px solid #e2e8f0';
            item.style.borderRadius = '5px';
            item.style.fontSize = '12px';
            item.innerHTML = '<strong>' + (idx+1) + '. ' + c.nome + '</strong> (#' + c.num + ' - ' + c.localidade + ')';
            listaCont.appendChild(item);
          });

          // Link Google Maps
          var wpStr = escolhidos.slice(0, -1).map(function (p) { return p.lat.toFixed(5) + ',' + p.lng.toFixed(5); }).join('|');
          var destUlt = escolhidos[escolhidos.length - 1];
          var gmapsUrl = 'https://www.google.com/maps/dir/?api=1&origin=' + origem.lat.toFixed(5) + ',' + origem.lng.toFixed(5) +
            '&destination=' + destUlt.lat.toFixed(5) + ',' + destUlt.lng.toFixed(5) + (wpStr ? ('&waypoints=' + encodeURIComponent(wpStr)) : '');
          document.getElementById('jbm-rota-link-gmaps').href = gmapsUrl;

          // Link Waze 1\u00AA Paragem
          document.getElementById('jbm-rota-link-waze').href = 'https://waze.com/ul?ll=' + escolhidos[0].lat + ',' + escolhidos[0].lng + '&navigate=yes';
        })
        .finally(function () {
          btn.textContent = '\uD83D\uDE80 Recalcular Rota';
          btn.disabled = false;
        });
    });

    // ==========================================
    // 5. M\u00D3DULO REGISTOS DE ATIVIDADE
    // ==========================================
    document.querySelectorAll('.jbr-subtab').forEach(function (t) {
      t.addEventListener('click', function () {
        document.querySelectorAll('.jbr-subtab').forEach(function (el) { el.classList.remove('active'); });
        document.querySelectorAll('.jbr-form').forEach(function (el) { el.classList.remove('active'); });
        t.classList.add('active');
        document.getElementById('jbr-form-' + t.dataset.sub).classList.add('active');
      });
    });

    // Datalist de Clientes
    var dl = document.getElementById('jbr-dl-clientes');
    clientes.forEach(function (c) {
      var opt = document.createElement('option');
      opt.value = c.num + ' - ' + c.nome;
      dl.appendChild(opt);
    });

    function preencherFormularioVisita(c) {
      document.getElementById('jbr-visita-nif').value = c.num || '';
      document.getElementById('jbr-visita-loja').value = c.nome || '';
      document.getElementById('jbr-visita-morada').value = c.morada || '';
      document.getElementById('jbr-visita-localidade').value = c.localidade || '';
      document.getElementById('jbr-visita-contacto').value = c.contacto || '';
      document.getElementById('jbr-visita-telefone').value = c.telefone || '';
      document.getElementById('jbr-visita-busca').value = c.num + ' - ' + c.nome;
    }

    document.getElementById('jbr-visita-busca').addEventListener('input', function () {
      var val = this.value.trim();
      var m = /^(\\d+)/.exec(val);
      if (m) {
        for (var i = 0; i < clientes.length; i++) {
          if (clientes[i].num === m[1]) { preencherFormularioVisita(clientes[i]); break; }
        }
      }
    });

    // Definir data de hoje
    var hojeIso = new Date().toISOString().slice(0, 10);
    document.querySelectorAll('input[type=date]').forEach(function (inp) { inp.value = hojeIso; });

    // Submiss\u00E3o de Formul\u00E1rios
    document.querySelectorAll('.jbr-form').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var btn = form.querySelector('button[type=submit]');
        var msg = form.querySelector('.jbr-msg');
        btn.disabled = true;
        btn.textContent = 'A enviar...';
        msg.className = 'jbr-msg';

        var fd = new FormData(form);
        fd.append('tipo', form.dataset.tipo);

        fetch('/api/registar', {
          method: 'POST',
          body: fd
        })
        .then(function (r) { return r.json(); })
        .then(function () {
          msg.textContent = 'Registo submetido com sucesso!';
          msg.className = 'jbr-msg ok';

          // Se for visita, abater imediatamente no mapa
          if (form.dataset.tipo === 'visitas') {
            var nif = form.querySelector('[name=nif]').value.trim();
            for (var i = 0; i < clientes.length; i++) {
              if (clientes[i].num === nif) {
                clientes[i].ultimaVisitaData = new Date();
                clientes[i].ultimaVisitaFormatada = formatarDataPT(new Date());
                avaliarEstadoCliente(clientes[i]);
                clientes[i].ultimaVisitaTexto = '\u00DAlt. Visita (' + clientes[i].ultimaVisitaFormatada + ') \u00B7 0 dias sem visitar';
                filtrarClientes();
                break;
              }
            }
          }
          form.reset();
          document.querySelectorAll('.jbp-field-comercial').forEach(function (inp) { inp.value = estado.nome; });
        })
        .catch(function () {
          msg.textContent = 'Erro ao enviar. Verifique a liga\u00E7\u00E3o.';
          msg.className = 'jbr-msg err';
        })
        .finally(function () {
          btn.disabled = false;
          btn.textContent = '\uD83D\uDCE4 Submeter Registo';
        });
      });
    });

    // ==========================================
    // 6. M\u00D3DULO HIST\u00D3RICO
    // ==========================================
    var histTipoAtivo = 'visitas';

    function renderHistorico(tipo) {
      histTipoAtivo = tipo;
      var cont = document.getElementById('jbh-table-cont');
      var source = estado.dados[tipo] || { cols: [], rows: [] };
      var filterCom = document.getElementById('jbh-sel-comercial').value;
      var iCom = source.cols.indexOf('comercial');

      var rows = (source.rows || []).filter(function (r) {
        return !filterCom || (iCom >= 0 && r[iCom] === filterCom);
      });

      document.getElementById('jbh-summary-txt').textContent = rows.length + ' registo(s) de ' + tipo.toUpperCase();

      if (!rows.length) {
        cont.innerHTML = '<p style="padding:15px;color:var(--muted);font-size:13px;">Sem registos dispon\u00EDveis.</p>';
        return;
      }

      var headers = ['Data/Hora'].concat(source.cols);
      var html = '<table><thead><tr>' + headers.map(function (h) { return '<th>' + h + '</th>'; }).join('') + '</tr></thead><tbody>';

      rows.forEach(function (r) {
        html += '<tr>' + r.map(function (v) { return '<td>' + (v || '') + '</td>'; }).join('') + '</tr>';
      });

      html += '</tbody></table>';
      cont.innerHTML = html;
    }

    document.querySelectorAll('#jbh-tipo-btns button').forEach(function (b) {
      b.addEventListener('click', function () {
        document.querySelectorAll('#jbh-tipo-btns button').forEach(function (el) { el.classList.remove('active'); });
        b.classList.add('active');
        renderHistorico(b.dataset.htipo);
      });
    });

    function preencherFiltroComerciaisAdmin() {
      var sel = document.getElementById('jbh-sel-comercial');
      var nomes = new Set();
      Object.values(estado.dados).forEach(function (t) {
        var idx = (t.cols || []).indexOf('comercial');
        (t.rows || []).forEach(function (r) { if (idx >= 0 && r[idx]) nomes.add(r[idx]); });
      });
      nomes.forEach(function (nome) {
        var opt = document.createElement('option');
        opt.value = opt.textContent = nome;
        sel.appendChild(opt);
      });
      sel.onchange = function () { renderHistorico(histTipoAtivo); };
    }

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

    // Health
    if (path === "/api/health") {
      return ok({ ok: true, service: "jb-comercial-app", build: "20261113-1622" });
    }

    // Login
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

    // Registar atividade
    if (path === "/api/registar" && req.method === "POST") {
      try {
        const fd = await req.formData();
        const p = new URLSearchParams();
        p.set("action", "registar");
        for (const [k, v] of fd.entries()) {
          if (k !== "foto_ficheiro") p.set(k, v);
        }
        await fetch(GAS, { method: "POST", body: p.toString(),
          headers: { "Content-Type": "application/x-www-form-urlencoded" }, redirect: "follow" });
        return ok({ ok: true });
      } catch(e) { return err({ ok: false, erro: e.message }, 500); }
    }

    // Salvar cliente
    if (path === "/api/salvar_cliente" && req.method === "POST") {
      try {
        const d = await req.json();
        const p = new URLSearchParams({ action: "salvar_cliente",
          num_cliente: d.num_cliente || "", cor: d.cor || "",
          contacto: d.contacto || "", telefone: d.telefone || "",
          marcas: d.marcas || "", obs: d.obs || "" });
        await fetch(GAS, { method: "POST", body: p.toString(),
          headers: { "Content-Type": "application/x-www-form-urlencoded" }, redirect: "follow" });
        return ok({ ok: true });
      } catch(e) { return err({ ok: false, erro: e.message }, 500); }
    }

    // App HTML
    return new Response(APP_HTML, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store, max-age=0"
      }
    });
  }
};