import { prisma } from "@/lib/db";
import { getSessao } from "@/lib/auth";
import { leadsWhere } from "@/lib/crm";

export const runtime = "nodejs";

function csvCell(v: unknown): string {
  const s = String(v ?? "");
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export async function GET(req: Request) {
  const sessao = await getSessao();
  if (!sessao) return new Response("Não autorizado.", { status: 401 });

  const url = new URL(req.url);
  const g = (k: string) => url.searchParams.get(k) ?? undefined;
  const where = leadsWhere({ q: g("q"), segmento: g("segmento"), tipo: g("tipo"), status: g("status") });

  const leads = await prisma.lead.findMany({ where, orderBy: { criadoEm: "desc" } });

  const cabecalho = ["Nome", "E-mail", "Telefone", "Cidade", "Tipo", "Segmento", "Origem", "Status", "Entrada"];
  const linhas = leads.map((l) =>
    [l.nome, l.email, l.telefone, l.cidade, l.tipo, l.segmento ?? "", l.origem, l.status, l.criadoEm.toISOString()]
      .map(csvCell)
      .join(","),
  );
  const csv = "﻿" + [cabecalho.join(","), ...linhas].join("\n"); // BOM p/ Excel

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="leads-coracao-gaucho-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
