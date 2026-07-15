import Link from "next/link";
import { prisma } from "@/lib/db";
import { leadsWhere, tipoLabel, TIPOS, STATUS, type LeadFiltro } from "@/lib/crm";
import { getSegmento, SEGMENTOS } from "@/lib/segmentos";
import { Card } from "@/components/admin/ui";
import { StatusSelect } from "@/components/admin/StatusSelect";
import { Download } from "lucide-react";

export const dynamic = "force-dynamic";

const POR_PAGINA = 20;

function segLabel(slug: string | null) {
  if (!slug) return "Site";
  return getSegmento(slug)?.publico ?? slug;
}

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const sp = await searchParams;
  const filtro: LeadFiltro = { q: sp.q, segmento: sp.segmento, tipo: sp.tipo, status: sp.status };
  const page = Math.max(1, Number(sp.page) || 1);
  const where = leadsWhere(filtro);

  const [total, leads] = await Promise.all([
    prisma.lead.count({ where }),
    prisma.lead.findMany({
      where,
      orderBy: { criadoEm: "desc" },
      take: POR_PAGINA,
      skip: (page - 1) * POR_PAGINA,
    }),
  ]);

  const totalPaginas = Math.max(1, Math.ceil(total / POR_PAGINA));
  const qs = new URLSearchParams(
    Object.entries(sp).filter(([, v]) => v) as [string, string][],
  ).toString();
  const exportQs = new URLSearchParams(
    Object.entries(filtro).filter(([, v]) => v) as [string, string][],
  ).toString();

  const inputCls =
    "rounded-lg border border-ink/15 bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-blue focus:ring-2 focus:ring-blue/10";

  return (
    <div className="mx-auto max-w-6xl">
      <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-label text-xs uppercase tracking-[0.2em] text-red">CRM</p>
          <h1 className="mt-1 font-display text-3xl font-bold text-ink sm:text-4xl">Leads</h1>
          <p className="mt-1 text-ink-soft">{total} {total === 1 ? "registro" : "registros"} encontrados.</p>
        </div>
        <a
          href={`/api/admin/leads/export${exportQs ? `?${exportQs}` : ""}`}
          className="font-label inline-flex items-center gap-2 rounded-full bg-blue px-5 py-2.5 text-sm uppercase tracking-wide text-cream-soft shadow-md transition-transform hover:scale-[1.03]"
        >
          <Download className="h-4 w-4" /> Exportar CSV
        </a>
      </header>

      {/* Filtros */}
      <Card className="mb-5">
        <form method="get" className="flex flex-wrap items-end gap-3">
          <div className="flex-1 min-w-[200px]">
            <label className="mb-1 block text-xs font-medium text-ink-soft">Buscar</label>
            <input name="q" defaultValue={sp.q ?? ""} placeholder="Nome, e-mail ou cidade" className={`${inputCls} w-full`} />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-ink-soft">Segmento</label>
            <select name="segmento" defaultValue={sp.segmento ?? ""} className={inputCls}>
              <option value="">Todos</option>
              <option value="site">Site institucional</option>
              {SEGMENTOS.map((s) => (
                <option key={s.slug} value={s.slug}>{s.publico}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-ink-soft">Tipo</label>
            <select name="tipo" defaultValue={sp.tipo ?? ""} className={inputCls}>
              <option value="">Todos</option>
              {TIPOS.map((t) => (
                <option key={t.key} value={t.key}>{t.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-ink-soft">Status</label>
            <select name="status" defaultValue={sp.status ?? ""} className={inputCls}>
              <option value="">Todos</option>
              {STATUS.map((s) => (
                <option key={s.key} value={s.key}>{s.label}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-2">
            <button className="font-label rounded-lg bg-blue px-4 py-2 text-sm uppercase tracking-wide text-cream-soft">Filtrar</button>
            <Link href="/admin/leads" className="rounded-lg border border-ink/15 px-4 py-2 text-sm text-ink-soft hover:bg-ink/5">Limpar</Link>
          </div>
        </form>
      </Card>

      {/* Tabela */}
      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-sm">
            <thead>
              <tr className="border-b border-ink/10 text-left text-xs uppercase tracking-wide text-ink-soft">
                <th className="px-4 py-3 font-medium">Nome</th>
                <th className="px-4 py-3 font-medium">Contato</th>
                <th className="px-4 py-3 font-medium">Cidade</th>
                <th className="px-4 py-3 font-medium">Origem</th>
                <th className="px-4 py-3 font-medium">Tipo</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Entrada</th>
              </tr>
            </thead>
            <tbody>
              {leads.length === 0 && (
                <tr><td colSpan={7} className="px-4 py-12 text-center text-ink-soft">Nenhum lead encontrado com esses filtros.</td></tr>
              )}
              {leads.map((l) => (
                <tr key={l.id} className="border-b border-ink/5 last:border-0 hover:bg-cream-soft/50">
                  <td className="px-4 py-3 font-medium text-ink">{l.nome}</td>
                  <td className="px-4 py-3 text-ink-soft">
                    <div>{l.email}</div>
                    <div className="text-xs text-ink-soft/70">{l.telefone}</div>
                  </td>
                  <td className="px-4 py-3 text-ink-soft">{l.cidade}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-md bg-ink/5 px-2 py-0.5 text-xs text-ink-soft">{segLabel(l.segmento)}</span>
                  </td>
                  <td className="px-4 py-3 text-ink-soft">{tipoLabel(l.tipo)}</td>
                  <td className="px-4 py-3"><StatusSelect id={l.id} status={l.status} /></td>
                  <td className="px-4 py-3 text-ink-soft/80">{l.criadoEm.toLocaleDateString("pt-BR")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Paginação */}
      {totalPaginas > 1 && (
        <div className="mt-5 flex items-center justify-between">
          <p className="text-sm text-ink-soft">Página {page} de {totalPaginas}</p>
          <div className="flex gap-2">
            <PagLink page={page - 1} disabled={page <= 1} qs={qs} label="← Anterior" />
            <PagLink page={page + 1} disabled={page >= totalPaginas} qs={qs} label="Próxima →" />
          </div>
        </div>
      )}
    </div>
  );
}

function PagLink({ page, disabled, qs, label }: { page: number; disabled: boolean; qs: string; label: string }) {
  const params = new URLSearchParams(qs);
  params.set("page", String(page));
  if (disabled) {
    return <span className="cursor-not-allowed rounded-lg border border-ink/10 px-4 py-2 text-sm text-ink-soft/40">{label}</span>;
  }
  return (
    <Link href={`/admin/leads?${params.toString()}`} className="rounded-lg border border-ink/15 px-4 py-2 text-sm text-ink hover:bg-ink/5">
      {label}
    </Link>
  );
}
