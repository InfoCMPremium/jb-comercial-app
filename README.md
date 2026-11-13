# JB Comercial App

Aplicação privada da área comercial da JB Comércio Global.

## Objetivo da migração

Unificar o Mapa de Clientes, os Registos Comerciais e o Histórico Comercial, preservando todos os nomes, campos, folhas e integrações atuais.

## Estado inicial

Esta primeira publicação é apenas um ambiente de teste estático. Não comunica com Google Sheets, Google Drive, Apps Script ou dados de clientes.

## Publicação

O repositório está preparado para Cloudflare Pages sem processo de build:

- Framework preset: `None`
- Build command: deixar vazio
- Build output directory: `public`

## Próximas fases

1. Migrar os três ecrãs para esta aplicação sem alterar campos ou fluxos.
2. Criar a folha `Clientes` e associar cada cliente ao respetivo comercial.
3. Proteger o acesso com uma API intermédia, sem expor códigos no browser.
4. Ligar o subdomínio `comercial.jbcomercioglobal.pt` depois da validação interna.

