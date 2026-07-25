# 🟢🔴🟡 Plataforma Coração Gaúcho

Ecossistema digital da campanha **Coração Gaúcho** — **Juliana Brizola** e **Edegar Pretto** (Rio Grande do Sul).
Slogan: **"O povo fala mais alto."**

> Projeto **novo, do zero**. Reaproveita apenas a *lógica funcional* do sistema anterior
> (`../Projeto sistema/`). Toda a identidade antiga (Márcio Bins Ely) foi **integralmente descartada**.
> A identidade oficial é a da pasta `../Identidade visual/`.

---

## 📦 Estrutura do ecossistema (visão)

```
Plataforma Coracao Gaucho/
├── site/          ✅ Site + Landing Pages + CRM/Backend (Next.js 16 · React 19 · Tailwind v4)
│                     ↳ /            site institucional
│                     ↳ /lp          índice das campanhas por público
│                     ↳ /lp/[slug]   15 landing pages segmentadas (data-driven)
│                     ↳ /admin       painel/CRM (login, dashboard, leads, funil, insights, equipe)
│                     ↳ /api/*       backend (captação, auth JWT, export CSV)
├── (app/)         ◻ Aplicativo React Native iOS/Android (fase 4)
└── (packages/ui)  ◻ Design System compartilhado (extração futura)
```

---

## 🎨 Design System (fonte da verdade)

Extraído do manual oficial. Vive em `site/app/globals.css` e `site/app/fonts.ts`.

### Cores
| Papel | Token | Hex |
|---|---|---|
| Azul | `--cg-blue` | `#004CA9` |
| Verde | `--cg-green` | `#0E6C38` |
| Vermelho | `--cg-red` | `#BC2224` |
| Amarelo | `--cg-yellow` | `#FAB224` |
| Azul escuro | `--cg-blue-900` | `#172D57` |
| Verde escuro | `--cg-green-900` | `#0A4924` |
| Vinho | `--cg-red-900` | `#642224` |
| Âmbar | `--cg-amber-700` | `#D88A00` |
| Creme (fundo) | `--cg-cream` | `#F4EFE3` |

### Tipografia
| Uso | Fonte | Observação |
|---|---|---|
| Títulos / display | **Tusker Grotesk** (`.font-display`) | condensada pesada |
| Manuscrito / destaques | **Feeling Passionate** (`.font-script`) | script da marca |
| Rótulos / eyebrows / botões | **GT Proelium** (`.font-label`) | **caixa-alta** (a fonte não tem minúsculas) |
| Corpo de texto | **Inter** (self-hosted) | fonte de apoio p/ leitura — as 3 da marca são só display |

> ⚠️ **Decisão de design registrada:** as três fontes da marca são todas de *display* e a
> GT Proelium é *caps-only*. Para parágrafos longos com boa legibilidade (padrão premium),
> adotou-se **Inter** como fonte neutra de corpo, mantendo 100% da personalidade nas fontes da marca.
> Se o cliente preferir outra neutra, trocar apenas em `site/app/fonts.ts`.

### Elemento gráfico
Faixa diagonal tricolor do RS (verde→vermelho→amarelo): utilitários `.rs-stripe`, `.rs-bar`, `.rs-text-gradient`.
O "O" da marca é um escudo tricolor, reconstruído em CSS no componente `Wordmark`.

---

## 🚀 Rodar o site

```bash
cd site
pnpm install     # já instalado
pnpm dev         # http://localhost:3000
pnpm build       # build de produção (valida tipos)
```

### O que já funciona (não são telas ilustrativas)
- **Hero** animado (motion) com a marca reconstruída em CSS.
- Seções: O Movimento · Propostas · Quem Somos · Números (contadores animados) · Some-se · Footer.
- **Formulário de adesão real** → `POST /api/apoiar` com validação server-side (422) e persistência
  em `site/data/apoiadores.jsonl`. Na fase 3, o *sink* troca para Postgres/Prisma + fila.
- Reveal on-scroll, header reativo ao scroll, menu mobile, `prefers-reduced-motion`, SEO/OpenGraph,
  scrollbar de marca.

---

## 🎯 Landing Pages segmentadas (fase 2)

Sistema **data-driven**: todo o conteúdo vive em `site/lib/segmentos.ts`. Cada público vira uma LP
estática em `/lp/[slug]`, com copy, compromissos, depoimento e **cor de destaque** próprios (sempre
da paleta). Adicionar uma LP = adicionar um objeto no array.

- 15 públicos: jovens, mulheres, saúde, educação, agricultores, empresários, segurança, turismo,
  família, servidores, empreendedores, lideranças, voluntários, filiados, doadores.
- Cada LP: hero temático · dores · compromissos · depoimento · formulário.
- **Formulário integrado ao CRM**: cada lead é gravado com `segmento` e `origem` (`lp-<slug>`),
  pronto para segmentação.
- **Tracking**: `components/Analytics.tsx` injeta GA4 / GTM / Meta Pixel via env vars; o form dispara
  `Lead` + `CompleteRegistration` (`lib/track.ts`). Basta preencher:
  `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_GTM_ID`, `NEXT_PUBLIC_META_PIXEL_ID`.
- SEO por segmento (`generateMetadata` + canonical).

## 🖥️ CRM político + backend (fase 3)

Painel completo em `/admin`, alimentado pelos leads reais do site e das 15 LPs.

- **Banco:** Prisma + **SQLite** no dev (`prisma/dev.db`). Produção: trocar `provider` para
  `postgresql` no `schema.prisma` + `DATABASE_URL` — models compatíveis. Redis/fila entram quando
  houver volume (cron de disparos).
- **Auth:** login JWT (jose, HS256) em cookie httpOnly; senha via scrypt; `proxy.ts` protege `/admin`.
  Seed cria `admin@coracaogaucho.com.br` / `Admin@123`.
- **Módulos:** Dashboard (métricas + gráficos SVG próprios), Leads (tabela, filtros, status editável,
  export CSV), Funil (kanban por estágio), Insights (regras + resumo executivo com Claude opcional),
  Equipe.
- **IA:** `lib/insights.ts` — motor de regras sempre ativo + `resumoIA()` que chama **Claude Opus 4.8**
  se `ANTHROPIC_API_KEY` estiver definida (`@anthropic-ai/sdk`, thinking adaptativo).

### Rodar o CRM
```bash
cd site
node --env-file=.env prisma/seed.mjs   # cria admin + 130 leads de demonstração
pnpm dev                               # http://localhost:3000/admin
```

## 🗺️ Roadmap
- **Fase 1:** Site institucional + Design System ✅
- **Fase 2:** Landing pages segmentadas (15 públicos) + tracking ✅
- **Fase 3:** CRM político + backend (Prisma/SQLite→Postgres) + auth JWT + IA ✅
- **Fase 4:** App React Native (iOS/Android), offline, push, biometria, dark mode.
- **Próximos no CRM:** convite/edição de usuários, disparo WhatsApp/e-mail, agenda, migração Postgres+Redis.

---

_Feito com o povo, para o povo._
