import { SignJWT, jwtVerify } from "jose";

/**
 * Núcleo de sessão JWT — SOMENTE jose, sem APIs de Node.
 * Seguro para importar no middleware (Edge runtime).
 */

export const SESSION_COOKIE = "cg_session";
export const SESSION_MAX_AGE = 60 * 60 * 8; // 8h

export type Sessao = { sub: string; nome: string; email: string; papel: string };

function secret(): Uint8Array {
  const s = process.env.AUTH_SECRET ?? "dev-secret-troque-em-producao-coracao-gaucho";
  return new TextEncoder().encode(s);
}

export async function assinarSessao(s: Sessao): Promise<string> {
  return new SignJWT({ nome: s.nome, email: s.email, papel: s.papel })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(s.sub)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(secret());
}

export async function verificarSessao(token: string): Promise<Sessao | null> {
  try {
    const { payload } = await jwtVerify(token, secret());
    return {
      sub: String(payload.sub),
      nome: String(payload.nome ?? ""),
      email: String(payload.email ?? ""),
      papel: String(payload.papel ?? "ADMIN"),
    };
  } catch {
    return null;
  }
}
