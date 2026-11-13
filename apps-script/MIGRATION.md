# Migração do Google Apps Script

Esta migração preserva as folhas existentes Rotas, Visitas e Abastecimentos,
bem como todas as colunas usadas pelo sistema atual.

## Nova folha: Clientes

| Campo | Uso |
| --- | --- |
| num | Número de cliente existente |
| nome | Nome da loja existente |
| morada | Morada existente |
| localidade | Localidade existente |
| lat | Latitude existente |
| lng | Longitude existente |
| cor | Cor e prazo existente |
| comercial | Comercial responsável |

Todos os 77 clientes atuais entram inicialmente com Vera Afonso como
comercial. Os próximos comerciais e carteiras serão geridos pela Administração
sem alterar as folhas de histórico já existentes.

## Compatibilidade

- action=obter&codigo continua para o Histórico Duda.
- tipo=rotas, visitas ou abastecimentos continua para os Registos Duda.
- A nova app usa endpoints autenticados adicionais, sem remover os anteriores.

