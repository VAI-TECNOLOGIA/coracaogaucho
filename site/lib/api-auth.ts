import { verificarSessao, type Sessao } from "@/lib/session";

/**
 * Autenticação para clientes que não usam cookie (app mobile).
 * Lê `Authorization: Bearer <jwt>` e valida a sessão.
 */
export async function sessaoDoBearer(req: Request): Promise<Sessao | null> {
  const auth = req.headers.get("authorization") ?? "";
  const [scheme, token] = auth.split(" ");
  if (scheme?.toLowerCase() !== "bearer" || !token) return null;
  return verificarSessao(token);
}

/** Cabeçalhos CORS — o app nativo não sofre CORS, mas o preview web (Expo Web) sim. */
export const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,PATCH,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export function options() {
  return new Response(null, { status: 204, headers: corsHeaders });
}
