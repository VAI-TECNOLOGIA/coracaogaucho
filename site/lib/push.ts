import { importPKCS8, SignJWT } from "jose";
import { prisma } from "@/lib/db";

/**
 * Envio de push via FCM HTTP v1 (Firebase Cloud Messaging).
 * Autentica com a service account do Firebase (env FIREBASE_SERVICE_ACCOUNT,
 * JSON puro ou base64) assinando um JWT RS256 — sem SDK do Google.
 * Sem a env definida, o envio fica desabilitado (registro de tokens continua ok).
 */

type ServiceAccount = { project_id: string; client_email: string; private_key: string };

function serviceAccount(): ServiceAccount | null {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!raw) return null;
  try {
    const json = raw.trim().startsWith("{") ? raw : Buffer.from(raw, "base64").toString("utf8");
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export function pushConfigurado(): boolean {
  return serviceAccount() !== null;
}

let cache: { token: string; expira: number } | null = null;

async function accessToken(sa: ServiceAccount): Promise<string> {
  if (cache && Date.now() < cache.expira - 60_000) return cache.token;

  const key = await importPKCS8(sa.private_key, "RS256");
  const assertion = await new SignJWT({ scope: "https://www.googleapis.com/auth/firebase.messaging" })
    .setProtectedHeader({ alg: "RS256", typ: "JWT" })
    .setIssuer(sa.client_email)
    .setAudience("https://oauth2.googleapis.com/token")
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(key);

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });
  if (!res.ok) throw new Error(`OAuth Google falhou: ${res.status}`);
  const data = (await res.json()) as { access_token: string; expires_in: number };
  cache = { token: data.access_token, expira: Date.now() + data.expires_in * 1000 };
  return data.access_token;
}

export type ResultadoEnvio = { enviados: number; invalidos: number; falhas: number };

/**
 * Envia uma notificação a todos os dispositivos ativos.
 * Tokens rejeitados como inválidos/expirados (UNREGISTERED) são desativados.
 */
export async function enviarPushParaTodos(opts: {
  titulo: string;
  mensagem: string;
  url?: string;
}): Promise<ResultadoEnvio> {
  const sa = serviceAccount();
  if (!sa) throw new Error("FIREBASE_SERVICE_ACCOUNT não configurada.");

  const tokens = await prisma.deviceToken.findMany({ where: { ativo: true } });
  const auth = await accessToken(sa);
  const endpoint = `https://fcm.googleapis.com/v1/projects/${sa.project_id}/messages:send`;

  let enviados = 0;
  let invalidos = 0;
  let falhas = 0;

  // FCM v1 não tem batch — envia sequencial em grupos pequenos (base atual é modesta)
  for (const t of tokens) {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { Authorization: `Bearer ${auth}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        message: {
          token: t.token,
          notification: { title: opts.titulo, body: opts.mensagem },
          data: opts.url ? { url: opts.url } : {},
        },
      }),
    });

    if (res.ok) {
      enviados++;
      continue;
    }
    const corpo = await res.text();
    if (res.status === 404 || corpo.includes("UNREGISTERED") || corpo.includes("INVALID_ARGUMENT")) {
      invalidos++;
      await prisma.deviceToken.update({ where: { id: t.id }, data: { ativo: false } });
    } else {
      falhas++;
    }
  }

  return { enviados, invalidos, falhas };
}
