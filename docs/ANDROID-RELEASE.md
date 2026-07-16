# Android — Release / Assinatura — Coração Gaúcho

Registro da assinatura de release e do processo de publicação na Google Play.
**Nenhuma senha fica neste repositório (público).** Senhas ficam em
`~/.config/coracaogaucho/release.keystore.PASSWORD.txt` (chmod 600, fora do repo).

## Keystore de assinatura (upload key)

| Item | Valor |
|---|---|
| Arquivo | `~/.config/coracaogaucho/release.keystore` (chmod 600, **fora do repo**) |
| Alias | `coracaogaucho` |
| Algoritmo | RSA 2048 |
| Validade | 10.000 dias (~ano 2054) |
| Criado em | 2026-07-16 |
| DName | `CN=VAI Tecnologia, OU=Coracao Gaucho, O=VAI Tecnologia, L=Porto Alegre, ST=RS, C=BR` |
| **SHA1** | `D0:59:FD:E8:5D:B5:ED:18:CB:79:48:D6:5F:BE:46:1D:4A:AE:18:D4` |
| SHA256 | `D6:02:54:C9:B0:25:26:C2:67:D4:20:B6:75:A7:AB:E7:88:23:2C:55:91:0D:FC:DC:27:41:2A:B1:89:6C:59:62` |
| Senha | em `~/.config/coracaogaucho/release.keystore.PASSWORD.txt` |

> ⚠️ **NUNCA PERDER.** Esta é a upload key do app na Play Store. Se perder, só é
> possível atualizar o app pedindo reset de upload key ao Google (Play App Signing).
> **Fazer backup** do arquivo + senha em cofre (1Password / Drive criptografado).
> **Nunca commitar** `.keystore`, `.jks` ou `android/key.properties`.

## Configuração de signing

- `android/key.properties` (**gitignored**) aponta para o keystore por caminho
  absoluto fora do repo. Recriar se sumir:
  ```properties
  storeFile=/Users/<user>/.config/coracaogaucho/release.keystore
  storePassword=<ver PASSWORD.txt>
  keyAlias=coracaogaucho
  keyPassword=<ver PASSWORD.txt>
  ```
- `android/app/build.gradle` carrega `key.properties` e aplica `signingConfigs.release`
  ao `buildTypes.release` (só se o alias existir — build debug segue funcionando sem ele).

## Versão

| versionCode | versionName |
|---|---|
| 1 | 1.0.0 |

> A cada release: **incrementar `versionCode`** (Play rejeita igual/menor) e ajustar `versionName`.

## Como gerar o AAB de release

```bash
cd app
export ANDROID_HOME="$HOME/Library/Android/sdk"
export JAVA_HOME="/opt/homebrew/opt/openjdk@21"; export PATH="$JAVA_HOME/bin:$PATH"
npx cap sync android
cd android && ./gradlew bundleRelease
```

Saída: `app/android/app/build/outputs/bundle/release/app-release.aab`

Conferir SHA1 do AAB (deve bater com a tabela acima):
```bash
keytool -printcert -jarfile app/android/app/build/outputs/bundle/release/app-release.aab | grep SHA1
```

## Histórico

| Data | versionCode / name | AAB | Track | Observação |
|---|---|---|---|---|
| 2026-07-16 | 1 / 1.0.0 | 5.9 MB, SHA1 `D0:59:…:18:D4` | (rascunho) | Primeiro build assinado; ficha em preparação |
</content>
</invoke>
