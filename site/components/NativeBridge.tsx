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

    push.addListener("registration", (dados: { value: string }) => {
      // Evita re-registro repetido do mesmo token a cada navegação
      const chave = "cg-push-token";
      if (localStorage.getItem(chave) === dados.value) return;
      fetch("/api/mobile/push/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: dados.value, plataforma }),
      })
        .then((r) => {
          if (r.ok) localStorage.setItem(chave, dados.value);
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
