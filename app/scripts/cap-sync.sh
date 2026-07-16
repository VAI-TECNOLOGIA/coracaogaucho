#!/usr/bin/env bash
# Wrapper de `cap sync` que re-injeta o firebase-ios-sdk no Package.swift do iOS.
# Capacitor regenera CapApp-SPM/Package.swift a cada sync e apaga o Firebase.
# SEMPRE rode `npm run cap:sync` — nunca `npx cap sync` direto.
set -euo pipefail
cd "$(dirname "$0")/.."
npx cap sync "$@"

PACKAGE_SWIFT="ios/App/CapApp-SPM/Package.swift"
if [ -f "$PACKAGE_SWIFT" ] && ! grep -q "firebase-ios-sdk" "$PACKAGE_SWIFT"; then
  echo "[cap-sync] re-injetando firebase-ios-sdk em $PACKAGE_SWIFT"
  /usr/bin/sed -i '' \
    -e 's|\(.package(name: "CapacitorStatusBar", path: "../../../node_modules/@capacitor/status-bar")\)|\1,\
        .package(url: "https://github.com/firebase/firebase-ios-sdk.git", from: "11.0.0")|' \
    "$PACKAGE_SWIFT"
  /usr/bin/sed -i '' \
    -e 's|\(.product(name: "CapacitorStatusBar", package: "CapacitorStatusBar")\)|\1,\
                .product(name: "FirebaseMessaging", package: "firebase-ios-sdk")|' \
    "$PACKAGE_SWIFT"
  echo "[cap-sync] firebase-ios-sdk injetado."
fi
