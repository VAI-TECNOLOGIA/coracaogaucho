# Checklist de revisão — Google Play / App Store

Erros que já reprovaram outros apps nossos e **não podem se repetir** aqui, com as
mitigações aplicadas e o que conferir antes de CADA envio para revisão.

## Erro 1 — "Elementos da interface que não respondem, como botões ou ícones"

O revisor toca em tudo. Qualquer `href="#"`, botão sem ação ou ícone decorativo clicável
reprova o app inteiro.

**Mitigações aplicadas (2026-07-16):**
- Ícones de redes sociais do rodapé: ficam **ocultos** até terem URL real (`components/Footer.tsx` — preencher `url` quando a campanha passar os perfis).
- Colunas do rodapé apontam para âncoras/páginas reais (`/#movimento`, `/#propostas`, `/#candidatos`, `/#regioes`, `/#some-se`, `/lp/voluntarios`, `/lp`, `mailto:`).
- Link "Política de Privacidade (LGPD)" do formulário Some-se → `/politica-de-privacidade`.

**Antes de cada envio:**
1. `grep -rn 'href="#"' site/components site/app --include="*.tsx"` → deve retornar vazio (exceto `#main`/âncoras existentes).
2. Navegar o app inteiro num device tocando em TODO elemento clicável (menu, cards de LP, formulários, rodapé, páginas legais).
3. Testar sem internet: o fallback offline aparece (não uma tela branca).
4. Testar o formulário Some-se de ponta a ponta dentro do app (o revisor testa envio).

## Erro 2 — "App rejeitado porque não se encaixa em distribuição privada"

É a política de **funcionalidade mínima / webview spam**: app que só embrulha um site é
empurrado para distribuição privada ou rejeitado. A defesa é (a) valor nativo real e
(b) ficha na loja posicionada para o público geral.

**Valor nativo que este app tem (citar na ficha e em resposta a reviewer):**
- **Notificações push** (FCM): convocações, agenda e avisos da campanha — impossível no site.
- Tela offline própria, splash e ícones nativos, safe-areas.
- Registro/gestão de dispositivo (Configurações → Notificações).
- (Roadmap: exclusão de conta in-app — obrigatória — e atalhos nativos.)

**Ficha da loja (obrigatório):**
- Público-alvo: **público geral** — "qualquer cidadão do RS pode conhecer as propostas e participar do movimento". NUNCA descrever como app "para a equipe", "para voluntários cadastrados" ou "de uso interno" (isso caracteriza distribuição privada).
- Não exigir login/convite para usar o app (o conteúdo é aberto; cadastro é opcional).
- Categoria: Notícias/Eventos ou Social (não "Empresarial").
- Descrição menciona explicitamente as notificações push como funcionalidade central.
- Track: **Production** (não internal/closed) quando for o envio final.

**Antes de cada envio:**
1. Abrir o app deslogado: todo o conteúdo público navegável sem barreira.
2. Push funcionando de verdade (enviar teste de /admin/notificacoes para um device).
3. Conferir que a descrição da loja não sugere público restrito.

## Outros requisitos já cobertos
- URL de exclusão de conta (obrigatória): https://coracaogaucho.vercel.app/excluir-conta ✅ (funcional)
- Política de privacidade pública: https://coracaogaucho.vercel.app/politica-de-privacidade ✅
- Data Safety (Play Console): declarar coleta de nome/e-mail/telefone/cidade, dado sensível (opinião política), analytics Google/Meta, push tokens — consistente com a política.
- Pendências antes do envio: CNPJ/razão social nos documentos legais; e-mails privacidade@/contato@ criados.
