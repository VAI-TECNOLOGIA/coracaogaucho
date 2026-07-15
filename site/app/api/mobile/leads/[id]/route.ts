import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { STATUS_KEYS } from "@/lib/crm";
import { sessaoDoBearer, corsHeaders, options } from "@/lib/api-auth";

export const runtime = "nodejs";

export function OPTIONS() {
  return options();
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const sessao = await sessaoDoBearer(req);
  if (!sessao) return NextResponse.json({ error: "Não autorizado." }, { status: 401, headers: corsHeaders });

  const { id } = await params;
  let status = "";
  try {
    status = String((await req.json()).status ?? "");
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400, headers: corsHeaders });
  }
  if (!STATUS_KEYS.includes(status as never)) {
    return NextResponse.json({ error: "Status inválido." }, { status: 422, headers: corsHeaders });
  }

  try {
    const lead = await prisma.lead.update({ where: { id }, data: { status }, select: { id: true, status: true } });
    return NextResponse.json({ ok: true, lead }, { headers: corsHeaders });
  } catch {
    return NextResponse.json({ error: "Lead não encontrado." }, { status: 404, headers: corsHeaders });
  }
}
