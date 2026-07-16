# Confia+ — Publicação iOS (App Store)

App oficial do movimento **Coração Gaúcho** (Juliana Brizola e Edegar Pretto), empacotado
com Capacitor 8 carregando o site remoto `https://coracaogaucho.vercel.app`.

## Identificadores

| Item | Valor |
|---|---|
| Nome na App Store | Confia+ Coração Gaúcho |
| Subtítulo | O movimento Coração Gaúcho |
| Bundle ID | `com.vaitecnologia.coracaogaucho` |
| SKU | `coracaogaucho` |
| Apple ID (app) | `6791753009` |
| Team ID | `B7VL5G2998` (Vai Tecnologia LTDA) |
| Conta Apple (upload/altool) | `vaitecnologialp@gmail.com` |
| Projeto Firebase | `coracaogaucho-2f005` |
| Categoria | Estilo de vida (primária) / Notícias (secundária) |
| Preço / Países | Grátis / apenas Brasil |
| Versão / Build | `1.0` / `1` |

## Credenciais e arquivos sensíveis (NÃO commitar)

| Arquivo | Local | Observação |
|---|---|---|
| `GoogleService-Info.plist` | `ios/App/App/` | gitignored; baixado do Firebase Console |
| App-specific password (altool) | `~/.config/coracaogaucho/apple-app-specific-password.txt` | chmod 600 |
| APNs Auth Key `.p8` | ver seção APNs abaixo | reaproveita chave Team-Scoped existente |
| Perfil de provisionamento | `~/Documents/keystores/Confia_Coracao_Gaucho_App_Store.mobileprovision` | App Store, expira 2027-06-11 |

## Assinatura

- Certificado de distribuição: `Apple Distribution: Vai Tecnologia LTDA (B7VL5G2998)` (no Keychain).
- Perfil App Store: **Confia Coracao Gaucho App Store** (UUID `c1a9b5a4-3945-4449-b7e3-ea353fbbaf5a`),
  com `aps-environment=production`.
- Assinatura **manual** apenas no target `App` (config Release do `project.pbxproj`), para não
  conflitar com os pacotes SPM do Firebase (que não suportam provisioning profiles).
- Não há Apple ID logada no Xcode local; por isso o archive usa perfil+cert manuais.

## APNs (push) — PENDENTE de decisão

A conta Apple já tem **2 chaves APNs ativas** (limite máximo):

| Key ID | Nome | Escopo |
|---|---|---|
| `63KLB5XX4U` | GrupoPons APNs | Team Scoped (All topics) |
| `ZVYQGLBY5L` | CalebeAPNs | Team Scoped (All topics) |

Ambas são **Team Scoped**, ou seja, já funcionam para `com.vaitecnologia.coracaogaucho`.
Criar uma 3ª chave revogaria uma delas e quebraria push em produção de GrupoPons/Calebe.

**Ação recomendada:** reaproveitar uma chave existente no Firebase deste projeto:
- Firebase Console → `coracaogaucho-2f005` → Cloud Messaging → Apple app configuration →
  APNs Auth Key → upload do `.p8` correspondente + Key ID + Team ID `B7VL5G2998`.
- `.p8` disponíveis em disco:
  - `~/Documents/keystores/tech.calebe.app_APNs_ZVYQGLBY5L.p8` (Key ID `ZVYQGLBY5L`)
  - `~/Documents/VAI/firebase-keys/AuthKey_63KLB5XX4U.p8` (Key ID `63KLB5XX4U`)

Sem esse upload, `POST push` retorna sucesso mas a notificação não chega no iPhone.

## Fluxo de build / upload

```bash
cd app
npm install
npm run cap:sync          # wrapper: reinjeta firebase-ios-sdk no Package.swift (NUNCA npx cap sync)

cd ios/App
rm -rf build
xcodebuild archive \
  -project App.xcodeproj -scheme App -configuration Release \
  -archivePath ./build/App.xcarchive -destination "generic/platform=iOS"

xcodebuild -exportArchive \
  -archivePath ./build/App.xcarchive -exportPath ./build/export \
  -exportOptionsPlist ExportOptions.plist

APP_PW=$(cat ~/.config/coracaogaucho/apple-app-specific-password.txt | tr -d '[:space:]')
xcrun altool --upload-app -f ./build/export/App.ipa -t ios \
  -u "vaitecnologialp@gmail.com" -p "$APP_PW"
```

Observação: na primeira submissão, o `altool` só resolve o Apple ID **depois** que o
registro do app existe no App Store Connect (erro 19 caso contrário).

## Configuração já aplicada (execuções anteriores)

- `AppDelegate.swift`: ponte APNs → FCM → Capacitor (`FirebaseApp.configure`, `MessagingDelegate`,
  post `.capacitorDidRegisterForRemoteNotifications`, token FCM salvo em
  `UserDefaults["CapacitorStorage.fcmToken"]`).
- `App.entitlements`: `aps-environment=production`.
- `Info.plist`: `UIBackgroundModes=[remote-notification]`, `FirebaseAppDelegateProxyEnabled=false`,
  `ITSAppUsesNonExemptEncryption=false`.
- `TARGETED_DEVICE_FAMILY=1` (iPhone apenas).
- `GoogleService-Info.plist` referenciado no target `App` (Resources) do `project.pbxproj`.
- `DEVELOPMENT_TEAM=B7VL5G2998` nas configs Debug/Release.

## App Store Connect

- Screenshots iPhone 6.5" (1284×2778): 5 imagens em `app/screenshots/final65/` geradas via
  Playwright a partir do site + `sips`.
- Privacy Nutrition Labels publicadas — dados coletados (todos App Functionality, vinculados ao
  usuário, sem tracking): Nome, E-mail, Telefone, Localização aproximada (cidade),
  Informações confidenciais (crenças políticas), ID do dispositivo (token de push).
- Classificação etária: 4+.
- Login de revisão: **não obrigatório** (conteúdo público).
- Notes for Review: posiciona contra Guideline 4.2 (app oficial/público, push nativo central,
  exclusão de conta em `/excluir-conta`).
- Release: automático após aprovação.

## Próximo build

Incrementar `CURRENT_PROJECT_VERSION` (build number) a cada upload:
```bash
cd app/ios/App && xcrun agvtool new-version -all 2
```
