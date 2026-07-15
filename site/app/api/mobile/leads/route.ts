import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { leadsWhere } from "@/lib/crm";
import { sessaoDoBearer, corsHeaders, options } from "@/lib/api-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const POR_PAGINA = 20;

export function OPTIONS() {
  return options();
}

export async function GET(req: Request) {
  const sessao = await sessaoDoBearer(req);
  if (!sessao) return NextResponse.json({ error: "Não autorizado." }, { status: 401, headers: corsHeaders });

  const url = new URL(req.url);
  const g = (k: string) => url.searchParams.get(k) ?? undefined;
  const page = Math.max(1, Number(g("page")) || 1);
  const where = leadsWhere({ q: g("q"), segmento: g("segmento"), tipo: g("tipo"), status: g("status") });

  const [total, leads] = await Promise.all([
    prisma.lead.count({ where }),
    prisma.lead.findMany({
      where,
      orderBy: { criadoEm: "desc" },
      take: POR_PAGINA,
      skip: (page - 1) * POR_PAGINA,
      select: { id: true, nome: true, email: true, telefone: true, cidade: true, tipo: true, segmento: true, origem: true, status: true, criadoEm: true },
    }),
  ]);

  return NextResponse.json(
    { total, page, totalPaginas: Math.max(1, Math.ceil(total / POR_PAGINA)), leads },
    { headers: corsHeaders },
  );
}
