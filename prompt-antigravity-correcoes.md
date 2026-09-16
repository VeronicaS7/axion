# Prompt para o Antigravity — Correção completa do projeto Axion

Cole o texto abaixo no Antigravity, no contexto do projeto Axion. Ele cobre tanto os bugs técnicos quanto a implementação da área "Espaço do Aluno" (Diário, Tarefas, Calendário, Timer e IA).

---

Preciso que você aplique as seguintes correções e implementações no projeto, sem alterar o design das telas já existentes — são correções técnicas, de robustez e a finalização de uma funcionalidade que ficou incompleta:

## 1. Build de produção não inclui o JavaScript
O `index.html` carrega `config.js`, `auth.js`, `adaptive.js`, `tracker.js`, `simulation.js`, `workspace.js` e `app.js` via `<script src="/js/...">` e `<script src="/app.js">` soltos (sem `type="module"`). Como esses arquivos não ficam dentro da pasta `public/`, o Vite não os copia para `dist/` no `npm run build` — o site publicado fica sem nenhuma funcionalidade.
**Correção:** mova a pasta `js/` inteira e o arquivo `app.js` para dentro de uma pasta `public/` na raiz do projeto (ou seja, `public/js/*.js` e `public/app.js`), mantendo os mesmos caminhos `/js/...` e `/app.js` no `index.html`. Depois rode `npm run build` e confirme que `dist/` passa a conter os arquivos JS.

## 2. Chamadas ao GSAP sem proteção contra falha do CDN
A maior parte do código já verifica `typeof gsap !== "undefined"` antes de usar, mas o roteador principal de troca de tela e algumas animações de conteúdo chamam `gsap.fromTo(...)` / `gsap.to(...)` diretamente. Se o CDN do GSAP (`cdnjs.cloudflare.com`) falhar ou for bloqueado, a navegação inteira do app quebra.
**Correção:** logo após a tag `<script>` que carrega o GSAP no `<head>` do `index.html`, adicione um listener de `DOMContentLoaded` que checa `typeof window.gsap === 'undefined'` e, se for o caso, define um `window.gsap` "no-op" (métodos `to`, `from`, `fromTo`, `set`, `timeline` que não fazem nada além de disparar `onComplete` se existir). Isso garante que o app funcione sem animações em vez de travar.

## 3. Arquivos sensíveis/desnecessários no versionamento
O `.env` (com `DATABASE_URL` real) e a pasta `node_modules/` não deveriam ser versionados nem enviados ao servidor.
**Correção:** crie um `.gitignore` na raiz com `node_modules/`, `dist/`, `.env`, `*.log`, `__pycache__/`, `*.pyc`, `.DS_Store`; crie um `.env.example` com uma URL fictícia como referência; remova o `.env` real do controle de versão (mantendo-o só localmente).

## 4. Responsividade incompleta para telas muito pequenas (<420px)
Já existem breakpoints para tablet/mobile (900px no app principal, 992px/768px na landing), mas faltava ajuste fino para celulares bem pequenos.
**Correção:** adicione um `@media (max-width: 420px)` em `style.css` (reduzindo fonte/padding da navegação e do `#main-content`) e outro em `landing.css` (reduzindo o tamanho dos títulos do hero e do container de arte).

## 5. Área "Espaço do Aluno" (Diário, Tarefas, Calendário, Timer) sem funcionalidade
A tela de Progresso/Perfil (`#screen-profile`) já tem no HTML e no CSS toda a estrutura de um workspace do aluno — abas de Diário, Tarefas e Calendário, cronômetro de estudo, botão de personalizar fundo — mas **não existe nenhum JavaScript por trás**: `app.js` apenas chama `if (window.AxionWorkspace) window.AxionWorkspace.init();`, e `window.AxionWorkspace` nunca é definido. Resultado: nada na tela funciona (abas não trocam, botões não respondem, calendário fica vazio).

**Correção:** crie o arquivo `public/js/workspace.js` implementando um módulo `window.AxionWorkspace` com:

- **Diário** — CRUD de entradas (`{id, title, text, date, source}`) usando os elementos `#ws-journal-title`, `#ws-journal-text`, `#ws-journal-add`, `#ws-journal-list` (com botão de excluir por item).
- **Tarefas (estilo Todoist)** — CRUD com prioridade (baixa/média/alta) e prazo opcional, usando `#ws-task-text`, `#ws-task-date`, `#ws-task-priority`, `#ws-task-add`, `#ws-task-filters` (todas/pendentes/concluídas) e `#ws-task-list` (checkbox pra concluir + excluir).
- **Calendário** — grade mensal em `#ws-cal-grid` (navegação com `#ws-cal-prev`/`#ws-cal-next` e label em `#ws-cal-month-label`), clique num dia abre `#ws-cal-day-editor` para adicionar/remover lembretes daquele dia (`#ws-cal-event-title`, `#ws-cal-event-add`, `#ws-cal-day-events`), e um botão **`#ws-cal-export`** que gera e baixa um arquivo `.ics` real (formato `VCALENDAR`/`VEVENT`) com todos os eventos, pronto para importar no Google Calendar ou Outlook.
- **Cronômetro de estudo** — `#ws-timer-toggle` (play/pause), `#ws-timer-reset`, `#ws-timer-display` (formato `HH:MM:SS`) e `#ws-timer-today-total` (total de minutos do dia, persistente).
- **Personalização de fundo** (estilo capa do Notion) — `#btn-ws-customize-bg` abre um seletor com ~6 opções de gradiente/cor (`.ws-bg-picker` / `.ws-bg-swatch`, CSS já existe) aplicadas em `#profile-bg-target`, mais uma opção de cor customizada.
- **Persistência**: tudo salvo em `localStorage`, com chave isolada por usuário (`window.Auth.getCurrentUser().id`, ou `"guest"` se não houver sessão), para funcionar tanto no modo demo quanto depois de conectado ao Supabase.
- **API pública para a IA controlar o workspace** (exposta em `window.AxionWorkspace`):
  - `aiAddEvent(dateStr, title, note)` — cria evento no calendário marcado como origem `"ia"`.
  - `aiListEvents(dateStr)` — lista eventos de uma data (ou todos).
  - `aiRemoveEvent(id)`.
  - `aiAddTask(text, dueDateStr)`.
  - `aiAddJournal(title, text)`.
  - `tryHandleCommand(rawText)` — interpretador leve de linguagem natural que reconhece frases como:
    - `"lembrete 20/08: prova de cálculo numérico"` → cria evento no calendário na data indicada (aceita `hoje`/`amanhã` também).
    - `"tarefa: revisar vetores até 25/08"` → cria tarefa com prazo opcional.
    - `"anota no diário: dúvida sobre erro de truncamento"` → cria nota no diário.
    Deve retornar uma frase de confirmação em pt-BR quando reconhecer o comando, ou `null` caso contrário (para a IA seguir com a resposta socrática normal). Itens criados pela IA devem aparecer marcados com uma tag "via Tutor IA" (classe CSS `.ws-tag-ia`, que já existe).

**Integração com o Tutor IA:** em `app.js`, nas funções `submitTutorFullMessage()` (chat principal, tela "Tutor IA") e `submitTutorLessonMessage()` (chat dentro da aula), antes de gerar a resposta socrática padrão, chame `window.AxionWorkspace.tryHandleCommand(text)`. Se retornar uma string, use-a como resposta da IA no lugar da resposta socrática; se retornar `null`, siga o fluxo normal.

Depois de implementar tudo, teste manualmente (ou com um script de UI):
- Adicionar e remover itens em Diário, Tarefas e Calendário.
- Exportar o `.ics` e confirmar que o arquivo baixado abre corretamente num app de calendário.
- Rodar o cronômetro e confirmar que o total do dia persiste ao recarregar a página.
- Trocar o fundo da página de perfil e confirmar que persiste ao recarregar.
- No chat do Tutor IA, enviar `"lembrete 20/08: prova de cálculo numérico"` e confirmar que o evento aparece no calendário de agosto.
- Rodar `npm run build` e confirmar que `dist/` contém todos os arquivos JS, incluindo `workspace.js`.

---
