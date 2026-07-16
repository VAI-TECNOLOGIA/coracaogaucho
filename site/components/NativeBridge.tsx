"use client";

import { useEffect } from "react";

/**
 * Ponte com o app nativo (Capacitor em server mode).
 * O shell nativo injeta window.Capacitor nesta página; quando presente:
 *  1. marca <html class="native-app"> (CSS de safe-area);
 *  2. pede permissão de push, registra no FCM/APNs e envia o token à API;
 *  3. ao tocar numa notificação com URL, navega dentro do app.
 * No navegador comum é um no-op silencioso.
 */

type CapacitorGlobal = {
  isNativePlatform?: () => boolean;
  getPlatform?: () => string;
  Plugins?: {
    PushNotifications?: {
      requestPermissions: () => Promise<{ receive: string }>;
      register: () => Promise<void>;
      addListener: (evento: string, cb: (dados: never) => void) => void;
    };
    Preferences?: {
      get: (opcoes: { key: string }) => Promise<{ value: string | null }>;
    };
  };
};

declare global {
  interface Window {
    Capacitor?: CapacitorGlobal;
  }
}

export function NativeBridge() {
  useEffect(() => {
    const cap = window.Capacitor;
    if (!cap?.isNativePlatform?.()) return;

    document.documentElement.classList.add("native-app");

    const push = cap.Plugins?.PushNotifications;
    if (!push) return;

    const plataforma = cap.getPlatform?.() === "ios" ? "ios" : "android";
    const prefs = cap.Plugins?.Preferences;

    // No iOS o plugin nativo entrega o token cru do APNs (64 hex), que o backend
    // FCM HTTP v1 rejeita. O AppDelegate salva o token FCM em Preferences
    // (chave "fcmToken"); lemos esse valor aqui. No Android o token já é FCM.
    const resolverToken = async (bruto: string): Promise<string> => {
      if (plataforma !== "ios" || !prefs) return bruto;
      for (let tentativa = 0; tentativa < 10; tentativa++) {
        try {
          const { value } = await prefs.get({ key: "fcmToken" });
          if (value && value.length > 80) return value;
        } catch {}
        await new Promise((r) => setTimeout(r, 500));
      }
      return bruto; // fallback: registra o que veio (melhor que nada)
    };

    push.addListener("registration", (dados: { value: string }) => {
      const chave = "cg-push-token";
      resolverToken(dados.value)
        .then((token) => {
          // Evita re-registro repetido do mesmo token a cada navegação
          if (localStorage.getItem(chave) === token) return;
          return fetch("/api/mobile/push/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token, plataforma }),
          }).then((r) => {
            if (r.ok) localStorage.setItem(chave, token);
          });
        })
        .catch(() => {});
    });

    push.addListener(
      "pushNotificationActionPerformed",
      (evento: { notification?: { data?: { url?: string } } }) => {
        const url = evento.notification?.data?.url;
        if (!url) return;
        try {
          const destino = new URL(url, window.location.origin);
          window.location.href = destino.href;
        } catch {}
      },
    );

    push
      .requestPermissions()
      .then((p) => {
        if (p.receive === "granted") return push.register();
      })
      .catch(() => {});
  }, []);

  return null;
}
