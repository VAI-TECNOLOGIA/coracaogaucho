/**
 * Helper de eventos — dispara com segurança para GA4, Meta Pixel e GTM (dataLayer).
 * Não faz nada se os provedores não estiverem carregados (env vars ausentes).
 */
type Params = Record<string, unknown>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function track(event: string, params: Params = {}) {
  if (typeof window === "undefined") return;
  try {
    window.dataLayer?.push({ event, ...params });
    window.gtag?.("event", event, params);
    // Meta: eventos padrão usam track; customizados, trackCustom.
    const meta = event === "Lead" || event === "CompleteRegistration" ? "track" : "trackCustom";
    window.fbq?.(meta, event, params);
  } catch {
    // silencioso — tracking nunca deve quebrar a experiência
  }
}
