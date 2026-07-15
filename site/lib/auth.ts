import { cookies } from "next/headers";
import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  assinarSessao,
  verificarSessao,
  type Sessao,
} from "./session";

/**
 * Autenticação do painel admin (lado servidor / Node).
 * - Senha: scrypt com salt aleatório (sem dependência externa).
 * - Cookie httpOnly com o JWT de sessão (assinatura/verificação em lib/session).
 */

export type { Sessao };

// ---------- Senha ----------
export function hashPassword(senha: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(senha, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(senha: string, armazenado: string): boolean {
  const [salt, hash] = armazenado.split(":");
  if (!salt || !hash) return false;
  const alvo = Buffer.from(hash, "hex");
  const calc = scryptSync(senha, salt, 64);
  return alvo.length === calc.length && timingSafeEqual(alvo, calc);
}

// ---------- Cookie de sessão ----------
export async function criarSessaoCookie(s: Sessao) {
  const token = await assinarSessao(s);
  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

export async function destruirSessaoCookie() {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
}

export async function getSessao(): Promise<Sessao | null> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verificarSessao(token);
}
