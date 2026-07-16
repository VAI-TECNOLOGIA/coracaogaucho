# iOS — App Store (Confia+)

Registro do processo de publicação do app **Confia+** na Apple App Store.
Segue o playbook `~/Documents/Claudinho/MOBILE_README.md` seção 15. **Sem segredos aqui**
(repo público). Chaves/senhas ficam em `~/.config/coracaogaucho/` (chmod 600).

## App

| Item | Valor |
|---|---|
| Nome na loja | **Confia+** |
| Subtítulo | O movimento Coração Gaúcho |
| Bundle ID | `com.vaitecnologia.coracaogaucho` (mesmo do Android/Firebase) |
| Modo | Capacitor **server mode** → carrega `https://coracaogaucho.vercel.app` (www/ é fallback offline) |
| MARKETING_VERSION | `1.0` |
| CURRENT_PROJECT_VERSION (build) | `1` (próximo upload: 2) |
| TARGETED_DEVICE_FAMILY | `1` (iPhone only — evita rejeição Guideline 4) |
| Deployment target | iOS 15.0 |
| Plugins Capacitor | app, push-notifications, status-bar, preferences |

## Config nativa aplicada (2026-07-16)

- **AppDelegate.swift** (`app/ios/App/App/AppDelegate.swift`): ponte APNs↔FCM↔Capacitor
  (FirebaseApp.configure + MessagingDelegate + post `.capacitorDidRegisterForRemoteNotifications`
  + salva FCM token em `UserDefaults` chave `CapacitorStorage.fcmToken`).
- **App.entitlements** (`app/ios/App/App/App.entitlements`): `aps-environment=production`
  (referenciado via `CODE_SIGN_ENTITLEMENTS` nas duas build configs).
- **Info.plist**: `UIBackgroundModes=[remote-notification]`, `FirebaseAppDelegateProxyEnabled=false`,
  `ITSAppUsesNonExemptEncryption=false`.
- **Package.swift** (`app/ios/App/CapApp-SPM/Package.swift`): firebase-ios-sdk (FirebaseMessaging)
  re-injetado. Regenerado pelo wrapper `app/scripts/cap-sync.sh` (`npm run cap:sync` — NUNCA `npx cap sync`).
- **Site** (`site/components/NativeBridge.tsx`): no iOS lê o token FCM via `Preferences.get({key:'fcmToken'})`
  (poll até 5s) antes de registrar em `/api/mobile/push/register` com plataforma `ios`.
  Corrige o bug do token APNs cru que o backend FCM HTTP v1 rejeita.
- Build de verificação (simulador, sem assinatura): **BUILD SUCCEEDED** com Firebase resolvido.

## Firebase (push)

- Projeto: `coracaogaucho-2f005` (conta vaitecnologialp@gmail.com).
- App iOS no Firebase: **PENDENTE** — registrar bundle `com.vaitecnologia.coracaogaucho`,
  baixar `GoogleService-Info.plist` → `app/ios/App/App/` (**NÃO commitar**; já no `.gitignore`).
- APNs Auth Key (.p8): **PENDENTE** — criar no Apple Developer Portal, guardar em
  `~/Documents/keystores/com.vaitecnologia.coracaogaucho_APNs_<KeyID>.p8`, subir no
  Firebase Console → Cloud Messaging → Apple app configuration (com Key ID + Team ID).

## Apple Developer

| Item | Valor |
|---|---|
| Conta ($99/ano) | **A CONFIRMAR** (verificar em developer.apple.com) |
| Team ID | (preencher após login) |
| Key ID APNs | (preencher após criar a key) |
| App-specific password (altool) | gerar em appleid.apple.com → guardar em `~/.config/coracaogaucho/` |

## App Store Connect — ficha

- Categoria: Eventos (paridade com a Play) | Preço: grátis, sem compras.
- Disponibilidade: só Brasil.
- Privacidade: https://coracaogaucho.vercel.app/politica-de-privacidade
- Exclusão de conta: https://coracaogaucho.vercel.app/excluir-conta (server-mode alcança a página).
- Suporte: https://coracaogaucho.vercel.app | vaitecnologialp@gmail.com
- Classificação etária: responder questionário (temática política → provável 12+/17+).
- Notes for Review: app público oficial do movimento Coração Gaúcho (Juliana Brizola / Edegar Pretto),
  sem login obrigatório, push de avisos/agenda como recurso nativo central (Guideline 4.2).

## Próximo build number a usar

**2** (o build 1 ainda não foi enviado; use 1 no primeiro upload e incremente a partir daí).
