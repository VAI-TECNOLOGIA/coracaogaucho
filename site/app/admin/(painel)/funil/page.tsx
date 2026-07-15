import { prisma } from "@/lib/db";
import { STATUS } from "@/lib/crm";
import { getSegmento } from "@/lib/segmentos";
import { KanbanCard } from "@/components/admin/KanbanCard";

export const dynamic = "force-dynamic";

const MAX_POR_COLUNA = 40;

function segLabel(slug: string | null) {
  if (!slug) return "Site";
  return getSegmento(slug)?.publico ?? slug;
}

export default async function FunilPage() {
  const leads = await prisma.lead.findMany({
    orderBy: { criadoEm: "desc" },
    select: { id: true, nome: true, cidade: true, segmento: true, status: true },
  });

  const porStatus = new Map<string, typeof leads>();
  for (const s of STATUS) porStatus.set(s.key, []);
  for (const l of leads) porStatus.get(l.status)?.push(l);

  return (
    <div className="mx-auto max-w-full">
      <header className="mb-6">
        <p className="font-label text-xs uppercase tracking-[0.2em] text-red">CRM</p>
        <h1 className="mt-1 font-display text-3xl font-bold text-ink sm:text-4xl">Funil</h1>
        <p className="mt-1 text-ink-soft">Arraste os leads pelos estágios usando as setas de cada card.</p>
      </header>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {STATUS.map((s) => {
          const itens = porStatus.get(s.key) ?? [];
          return (
            <div key={s.key} className="flex w-72 shrink-0 flex-col rounded-2xl bg-ink/[0.03] p-3">
              <div className="mb-3 flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full" style={{ background: s.cor }} />
                  <h2 className="font-display text-sm font-semibold text-ink">{s.label}</h2>
                </div>
                <span className="rounded-full bg-ink/5 px-2 py-0.5 text-xs font-semibold text-ink-soft">{itens.length}</span>
              </div>
              <div className="flex flex-col gap-2">
                {itens.slice(0, MAX_POR_COLUNA).map((l) => (
                  <KanbanCard
                    key={l.id}
                    id={l.id}
                    nome={l.nome}
                    cidade={l.cidade}
                    segmento={segLabel(l.segmento)}
                    status={l.status}
                  />
                ))}
                {itens.length > MAX_POR_COLUNA && (
                  <p className="px-1 py-2 text-center text-xs text-ink-soft/60">+{itens.length - MAX_POR_COLUNA} leads</p>
                )}
                {itens.length === 0 && <p className="px-1 py-6 text-center text-xs text-ink-soft/50">Vazio</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
