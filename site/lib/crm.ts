import { prisma } from "@/lib/db";
import type { Prisma } from "@prisma/client";

export type LeadFiltro = { q?: string; segmento?: string; tipo?: string; status?: string; origem?: string };

/** Monta o `where` do Prisma a partir dos filtros da UI (compartilhado por lista e export). */
export function leadsWhere(p: LeadFiltro): Prisma.LeadWhereInput {
  const AND: Prisma.LeadWhereInput[] = [];
  if (p.q) {
    AND.push({ OR: [{ nome: { contains: p.q } }, { email: { contains: p.q } }, { cidade: { contains: p.q } }] });
  }
  if (p.segmento) AND.push(p.segmento === "site" ? { segmento: null } : { segmento: p.segmento });
  if (p.tipo) AND.push({ tipo: p.tipo });
  if (p.status) AND.push({ status: p.status });
  if (p.origem) AND.push({ origem: p.origem });
  return AND.length ? { AND } : {};
}

/** Estágios do funil, na ordem. Cores usam tokens da marca. */
export const STATUS = [
  { key: "NOVO", label: "Novo", cor: "#004CA9" },
  { key: "CONTATADO", label: "Contatado", cor: "#FAB224" },
  { key: "ENGAJADO", label: "Engajado", cor: "#0E6C38" },
  { key: "CONVERTIDO", label: "Convertido", cor: "#0A4924" },
  { key: "DESCARTADO", label: "Descartado", cor: "#642224" },
] as const;

export type StatusKey = (typeof STATUS)[number]["key"];
export const STATUS_KEYS = STATUS.map((s) => s.key) as StatusKey[];
export function statusLabel(k: string) {
  return STATUS.find((s) => s.key === k)?.label ?? k;
}
export function statusCor(k: string) {
  return STATUS.find((s) => s.key === k)?.cor ?? "#4a4438";
}

export const TIPOS = [
  { key: "voluntario", label: "Voluntário" },
  { key: "apoiador", label: "Apoiador" },
  { key: "lideranca", label: "Liderança" },
  { key: "doador", label: "Doador" },
];
export function tipoLabel(k: string) {
  return TIPOS.find((t) => t.key === k)?.label ?? k;
}

const DIA = 86400000;

export type Metricas = Awaited<ReturnType<typeof getMetricas>>;

export async function getMetricas() {
  const [total, porStatus, porTipo, porSegmento, porOrigem, datas] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.groupBy({ by: ["status"], _count: true }),
    prisma.lead.groupBy({ by: ["tipo"], _count: true }),
    prisma.lead.groupBy({ by: ["segmento"], _count: true }),
    prisma.lead.groupBy({ by: ["origem"], _count: true }),
    prisma.lead.findMany({ select: { criadoEm: true } }),
  ]);

  const contPorStatus = (k: string) => porStatus.find((s) => s.status === k)?._count ?? 0;

  const agora = Date.now();
  const hoje0 = new Date(new Date().setHours(0, 0, 0, 0)).getTime();
  const novosHoje = datas.filter((d) => d.criadoEm.getTime() >= hoje0).length;
  const novos7d = datas.filter((d) => d.criadoEm.getTime() >= agora - 7 * DIA).length;

  // Timeline dos últimos 30 dias (bucket por dia)
  const timeline: { dia: string; total: number }[] = [];
  for (let i = 29; i >= 0; i--) {
    const ini = new Date(hoje0 - i * DIA);
    const fim = ini.getTime() + DIA;
    const total = datas.filter((d) => d.criadoEm.getTime() >= ini.getTime() && d.criadoEm.getTime() < fim).length;
    timeline.push({ dia: ini.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }), total });
  }

  const convertidos = contPorStatus("CONVERTIDO");
  const descartados = contPorStatus("DESCARTADO");
  const qualificaveis = total - descartados;
  const taxaConversao = qualificaveis > 0 ? Math.round((convertidos / qualificaveis) * 100) : 0;

  const funil = STATUS.map((s) => ({ ...s, total: contPorStatus(s.key) }));

  const segmentos = porSegmento
    .map((s) => ({ segmento: s.segmento ?? "site", total: s._count }))
    .sort((a, b) => b.total - a.total);

  const tipos = porTipo.map((t) => ({ tipo: t.tipo, total: t._count })).sort((a, b) => b.total - a.total);

  const origens = porOrigem
    .map((o) => ({ origem: o.origem, total: o._count }))
    .sort((a, b) => b.total - a.total);

  return {
    total,
    novosHoje,
    novos7d,
    convertidos,
    taxaConversao,
    funil,
    segmentos,
    tipos,
    origens,
    timeline,
  };
}

export async function getTopCidades(limit = 6) {
  const rows = await prisma.lead.groupBy({ by: ["cidade"], _count: true });
  return rows
    .map((r) => ({ cidade: r.cidade, total: r._count }))
    .sort((a, b) => b.total - a.total)
    .slice(0, limit);
}
