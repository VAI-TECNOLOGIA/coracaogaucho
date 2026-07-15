import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import { verifyPassword } from "@/lib/auth";
import { assinarSessao, SESSION_COOKIE, SESSION_MAX_AGE } from "@/lib/session";
import { corsHeaders, options } from "@/lib/api-auth";

export const runtime = "nodejs";

export function OPTIONS() {
  return options();
}

export async function POST(req: Request) {
  let email = "";
  let senha = "";
  try {
    const body = await req.json();
    email = String(body.email ?? "").trim().toLowerCase();
    senha = String(body.senha ?? "");
  } catch {
    return NextResponse.json({ ok: false, error: "Requisição inválida." }, { status: 400, headers: corsHeaders });
  }

  const generico = { ok: false, error: "E-mail ou senha incorretos." };
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.ativo || !verifyPassword(senha, user.senhaHash)) {
    return NextResponse.json(generico, { status: 401, headers: corsHeaders });
  }

  const sessao = { sub: user.id, nome: user.nome, email: user.email, papel: user.papel };
  const token = await assinarSessao(sessao);

  // Cookie httpOnly para a web
  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });

  // Token no corpo para o app mobile (Bearer)
  return NextResponse.json(
    { ok: true, token, usuario: { nome: user.nome, email: user.email, papel: user.papel } },
    { headers: corsHeaders },
  );
}
