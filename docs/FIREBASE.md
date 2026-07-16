# Firebase — Coração Gaúcho

Registro das informações do projeto Firebase (push notifications do app).

## Projeto

| Item | Valor |
|---|---|
| Nome | coracaogaucho |
| Project ID | `coracaogaucho-2f005` |
| Conta Google | vaitecnologialp@gmail.com (VAI Tecnologia) |
| Console | https://console.firebase.google.com/project/coracaogaucho-2f005 |
| Gemini / Analytics | desativados na criação |

## App Android registrado

| Item | Valor |
|---|---|
| Package | `com.vaitecnologia.coracaogaucho` (nome do app nas lojas: **Confia+**) |
| Config | `app/android/app/google-services.json` — **NÃO commitado** (repo é público); baixe de novo no console em Configurações do projeto → Geral → Seus apps se precisar |

## iOS (em andamento — 2026-07-16)

Native já preparado (AppDelegate com FirebaseMessaging, entitlements, Package.swift; ver `docs/IOS-RELEASE.md`).
Pendências no Firebase Console:
1. Registrar app Apple no projeto com Bundle ID `com.vaitecnologia.coracaogaucho`.
2. Baixar `GoogleService-Info.plist` → `app/ios/App/App/` (**NÃO commitado**; já no `.gitignore`).
3. Cloud Messaging → Apple app configuration → subir a APNs Auth Key (.p8) + Key ID + Team ID
   (a .p8 é criada no Apple Developer Portal). Sem isso, push retorna `success:1` mas não chega.

## Chaves e onde estão

| Chave | Localização | Uso |
|---|---|---|
| Service account (admin SDK) | `~/.config/coracaogaucho/firebase-adminsdk.json` (chmod 600, máquina do Bello) | Envio de push pelo backend |
| `FIREBASE_SERVICE_ACCOUNT` | Env na Vercel (production + preview), valor = JSON em **base64** | `site/lib/push.ts` autentica no FCM HTTP v1 |
| `google-services.json` | Local no projeto Android (gitignored) | FCM no APK |

Para regenerar a service account: Console → ⚙️ Configurações do projeto → Contas de serviço → Gerar nova chave privada. Depois atualizar a env na Vercel (base64 do arquivo).

## Fluxo de push (como funciona)

1. App (Capacitor) abre o site → `NativeBridge` pede permissão e registra o token FCM via `POST /api/mobile/push/register`.
2. Tokens ficam na tabela `DeviceToken` (Postgres/Railway).
3. Admin envia por `/admin/notificacoes` (só papel ADMIN) → `lib/push.ts` → FCM HTTP v1 → dispositivos.
4. Tokens expirados (UNREGISTERED) são desativados automaticamente no envio.
