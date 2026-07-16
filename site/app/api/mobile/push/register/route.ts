import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { corsHeaders, options } from "@/lib/api-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function OPTIONS() {
  return options();
}

/**
 * Registro de token de push do app (Capacitor → FCM/APNs).
 * Público: o app do apoiador não exige login. Idempotente por token (upsert).
 */
export async function POST(req: Request) {
  let token = "";
  let plataforma = "android";
  try {
    const body = await req.json();
    token = String(body.token ?? "").trim();
    plataforma = body.plataforma === "ios" ? "ios" : "android";
  } catch {
    return NextResponse.json({ ok: false, error: "JSON inválido." }, { status: 400, headers: corsHeaders });
  }

  // Tokens FCM/APNs têm dezenas/centenas de chars — barra lixo óbvio
  if (token.length < 20 || token.length > 4096) {
    return NextResponse.json({ ok: false, error: "Token inválido." }, { status: 422, headers: corsHeaders });
  }

  try {
    await prisma.deviceToken.upsert({
      where: { token },
      create: { token, plataforma },
      update: { plataforma, ativo: true },
    });
    return NextResponse.json({ ok: true }, { headers: corsHeaders });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Não foi possível registrar agora." },
      { status: 500, headers: corsHeaders },
    );
  }
}

/** Desregistro (usuário desativou notificações no app). */
export async function DELETE(req: Request) {
  let token = "";
  try {
    const body = await req.json();
    token = String(body.token ?? "").trim();
  } catch {
    return NextResponse.json({ ok: false, error: "JSON inválido." }, { status: 400, headers: corsHeaders });
  }
  if (token) {
    await prisma.deviceToken.updateMany({ where: { token }, data: { ativo: false } });
  }
  return NextResponse.json({ ok: true }, { headers: corsHeaders });
}
