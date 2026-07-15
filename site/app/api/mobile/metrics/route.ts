import { NextResponse } from "next/server";
import { getMetricas, getTopCidades } from "@/lib/crm";
import { sessaoDoBearer, corsHeaders, options } from "@/lib/api-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function OPTIONS() {
  return options();
}

export async function GET(req: Request) {
  const sessao = await sessaoDoBearer(req);
  if (!sessao) return NextResponse.json({ error: "Não autorizado." }, { status: 401, headers: corsHeaders });

  const [metricas, cidades] = await Promise.all([getMetricas(), getTopCidades()]);
  return NextResponse.json({ ...metricas, cidades }, { headers: corsHeaders });
}
