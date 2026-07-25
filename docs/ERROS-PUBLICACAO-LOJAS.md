# Erros e rejeições na publicação — Confia+ (Google Play + App Store)

Histórico de tudo que barrou a publicação do app **Confia+** (App Store: **Confia+ RS**), com causa e correção. Serve de referência para os próximos apps da Vai Tecnologia e como checklist preventivo.

- **App:** Confia+ (Confia+ RS na App Store) — wrapper Capacitor em *server mode* que carrega `https://coracaogaucho.vercel.app`.
- **Pacote/Bundle:** `com.vaitecnologia.coracaogaucho`
- **Desenvolvedora:** Vai Tecnologia LTDA — CNPJ 52.165.389/0001-29
- **Vantagem do server mode:** correções de conteúdo/UI e de política (páginas legais) entram **sem novo build/binário** — só deploy do site. Só mudanças nativas (nome, ícone, plugins) exigem novo AAB/IPA.

---

## Google Play

### 1. Categoria "Notícias e revistas" exigiu CNPJ que não tínhamos
- **O que aconteceu:** ao montar a ficha, a categoria "Notícias e revistas" disparou a declaração obrigatória **"Apps de notícias"**, que exige razão social + CNPJ da pessoa jurídica responsável pelo conteúdo.
- **Causa:** categoria classificada como sensível + dado (CNPJ) ainda não disponível na hora.
- **Correção:** trocamos a categoria para evitar o gatilho.

### 2. Categoria "Social" disparou "Padrões de segurança infantil"
- **O que aconteceu:** ao mudar para **Social**, o Console passou a exigir a declaração **"Padrões de segurança infantil" (Child Safety Standards)** — obrigatória para apps Social/Namoro. Ela pede um URL público de padrões contra CSAE **e** a atestação de que o app tem canal de denúncia in-app (que o Confia+ não tem).
- **Causa:** categoria Social tem exigências extras de política.
- **Correção:** trocamos a categoria para **"Eventos"** — sem declarações extras e sem exigir CNPJ nem Child Safety. Confirmado que a pendência saiu da lista.
- **Lição:** a categoria muda quais declarações são obrigatórias. Escolher a categoria certa cedo evita retrabalho.

### 3. "Enviar para revisão" travado — faltava e-mail de contato
- **O que aconteceu:** o botão "Enviar app para revisão" ficava desabilitado com o aviso "conclua as etapas necessárias no painel". A etapa pendente era **"Selecionar uma categoria do app e fornecer detalhes de contato"**.
- **Causa:** faltava preencher o e-mail (e site) de contato em Configurações da loja.
- **Correção:** preenchemos e-mail `vaitecnologialp@gmail.com` + site → botão destravou.

### 4. Rejeição — Política de Privacidade inválida (não identificava app/desenvolvedor)
- **Mensagem:** *"Os detalhes do app ou do desenvolvedor não correspondem. A Política de Privacidade não identifica claramente o app, o nome do desenvolvedor ou a pessoa jurídica..."*
- **Causa:** a página de política falava só em "Coração Gaúcho" e tinha placeholders; não citava o **nome do app (Confia+)** nem a **desenvolvedora (Vai Tecnologia LTDA)** que aparecem na ficha da Play.
- **Correção:** editamos `/politica-de-privacidade` (e demais páginas legais) para identificar claramente: app **Confia+**, desenvolvedora **Vai Tecnologia LTDA**, **CNPJ 52.165.389/0001-29** e endereço. Deploy + reenvio. A URL cadastrada já era a correta (`coracaogaucho.vercel.app/politica-de-privacidade`); bastou corrigir o conteúdo.
- **Lição:** a política precisa citar, com as mesmas palavras da ficha, o nome do app **e** o nome do desenvolvedor/pessoa jurídica.

### 5. Rejeição — Violação de política de metadados (descrição imprecisa / screenshots)
- **Mensagem:** *"Descrição imprecisa: os metadados do app não descrevem com precisão a funcionalidade principal..."* (com os 4 screenshots anexados como evidência).
- **Causa:** os screenshots da ficha eram **mockups promocionais** (texto centralizado sobre fundo azul), não capturas reais do app. A descrição também começava com "O Coração Gaúcho é o aplicativo" (nome divergente do app Confia+).
- **Correção:** substituímos por **4 capturas reais** do app (home/hero, propostas, campanhas por público, cadastro), em proporção válida (≤ 2:1); e alinhamos a descrição para "O Confia+ é o aplicativo oficial do movimento Coração Gaúcho...". Reenvio.
- **Lição:** screenshots devem ser telas reais do app funcionando; nome do app deve ser consistente entre ficha, descrição e política.

---

## Apple App Store

### 1. Nome "Confia+" indisponível
- **O que aconteceu:** o nome exato **Confia+** (e "Confia +") já pertencia a outro desenvolvedor; a Apple exige nome único global.
- **Correção:** nome da listagem na App Store passou a ser **"Confia+ RS"**. (No ícone do celular o launcher continua "Confia+".)

### 2. Rejeição — Guideline 2.1(a) Information Needed (sem acesso para revisar)
- **Mensagem:** *"We are unable to successfully access all or part of the app... provide a user name and password in the App Review Information section."*
- **Causa:** o app tem um botão **"Entrar"** que abre o back-office da equipe (sistema em `vai-sistema.com`); o revisor não tinha credencial para logar e verificar.
- **Correção:** no App Store Connect, marcamos **"Sign-In required"** e informamos a conta demo **`app@review.com` / `teste123`** (login válido no sistema, papel LIDER); adicionamos notas explicando que o login é da equipe e o app é público; respondemos no Resolution Center e reenviamos. Sem novo build (server mode).
- **Lição:** se há qualquer login no app, fornecer conta demo funcional no App Review Information é obrigatório.

### 3. Rejeição — Guideline 5.1.1(v) Data Collection (faltava exclusão de conta)
- **Mensagem:** *"The app supports account creation but does not include an option to initiate account deletion."*
- **Causa:** o app permite criar conta/cadastro mas não expunha claramente o fluxo de **exclusão de conta** (exigência da Apple e do Google).
- **Correção:** o sistema (Elison) já tinha o fluxo — **login → menu "Minha conta" → "Excluir minha conta" → confirmar senha + digitar EXCLUIR** (endpoint `DELETE /api/auth/me` confirmado). Fornecemos o caminho nas App Review Notes + **screen recording (Loom)** demonstrando o fluxo completo, respondemos no Resolution Center e reenviamos. Cadastro público sem login também tem exclusão via `coracaogaucho.vercel.app/excluir-conta`.
- **Lição:** todo app com criação de conta precisa de exclusão de conta acessível **de dentro do app**; a Apple pede um vídeo do fluxo (de preferência gravado em device físico) nas notas.

---

## Obstáculos técnicos de build/infra (não foram rejeições da loja, mas barraram o envio)

- **Android — versionCode duplicado:** ao trocar o AAB no rascunho, o Console recusou por versionCode igual (1). Correção: bump de versionCode a cada novo binário (1 → 2 → 3 no rename para Confia+).
- **iOS — limite de 2 chaves APNs:** a conta Apple já tinha 2 chaves APNs ativas (limite máximo). Como são *team-scoped*, reutilizamos uma existente (`ZVYQGLBY5L`, Team `B7VL5G2998`) e a subimos no Firebase Cloud Messaging, em vez de criar uma 3ª (que revogaria push de outros apps).
- **iOS — token APNs cru vs FCM:** o plugin nativo entrega o token cru do APNs, que o backend (FCM HTTP v1) rejeita. Correção: bridge no AppDelegate que salva o token FCM em Preferences; o site lê esse valor antes de registrar (`NativeBridge.tsx`).
- **Vercel — AUTH_SECRET gravando vazio:** o `vercel env add` via CLI salvou valor vazio; contornado setando a env pela API REST da Vercel.
- **Railway — trial expirado:** provisionamento do Postgres travou até assinar um plano.
- **Domínio do sistema mudou:** `coracaogaucho.vai-sistema.com` → `app.vai-sistema.com`. Ambos respondem hoje e têm login + exclusão; o link "Entrar" do app ainda aponta para o antigo (pendência não bloqueante).

---

## Checklist preventivo para o próximo app (Vai Tecnologia)

**Antes de montar a ficha:**
- [ ] Ter em mãos: razão social, **CNPJ**, endereço, e-mail e site de contato.
- [ ] Escolher categoria que **não** exija declarações extras problemáticas (evitar Notícias = exige CNPJ na declaração; Social/Namoro = exige Child Safety). "Eventos"/"Estilo de vida" costumam ser neutras.

**Páginas legais (site):**
- [ ] Política de Privacidade cita, com as mesmas palavras da ficha: **nome do app** + **nome do desenvolvedor/pessoa jurídica** + CNPJ.
- [ ] URL de **exclusão de conta** pública e funcional; link direto na política.
- [ ] Nome do app consistente entre ficha, descrição, política e termos.

**Metadados:**
- [ ] Screenshots são **capturas reais do app** (não mockups), proporção ≤ 2:1, lado entre 320–3840px.
- [ ] Descrição descreve a **funcionalidade real**, começando pelo nome correto do app.

**Login / contas:**
- [ ] Se há login, criar **conta demo** e informar em App Review Information (Apple) / notas (Google).
- [ ] Fluxo de **exclusão de conta acessível de dentro do app**; ter um **vídeo** do fluxo pronto (Apple pede).

**Build:**
- [ ] Bump de versionCode/build a cada novo binário.
- [ ] iOS: conferir limite de chaves APNs; subir a key correta no Firebase (prod + dev).
- [ ] Confirmar envio na faixa **Produção** e país-alvo.
