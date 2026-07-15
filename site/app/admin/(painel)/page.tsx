import { getSessao } from "@/lib/auth";
import { getMetricas, getTopCidades, tipoLabel } from "@/lib/crm";
import { getSegmento } from "@/lib/segmentos";
import { Card, StatCard, BarList, AreaChart, FunnelBar } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

function segLabel(slug: string) {
  if (slug === "site") return "Site institucional";
  return getSegmento(slug)?.publico ?? slug;
}

export default async function Dashboard() {
  const [sessao, m, cidades] = await Promise.all([getSessao(), getMetricas(), getTopCidades()]);
  const primeiroNome = sessao?.nome.split(" ")[0] ?? "";

  return (
    <div className="mx-auto max-w-6xl">
      <header className="mb-8">
        <p className="font-label text-xs uppercase tracking-[0.2em] text-red">Dashboard</p>
        <h1 className="mt-1 font-display text-3xl font-bold text-ink sm:text-4xl">Olá, {primeiroNome} 👋</h1>
        <p className="mt-1 text-ink-soft">Visão geral do movimento em tempo real.</p>
      </header>

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total de leads" value={m.total} hint="Site + landing pages" accent="#004CA9" />
        <StatCard label="Novos hoje" value={m.novosHoje} hint={`${m.novos7d} nos últimos 7 dias`} accent="#FAB224" />
        <StatCard label="Convertidos" value={m.convertidos} hint="Apoio confirmado" accent="#0E6C38" />
        <StatCard label="Taxa de conversão" value={`${m.taxaConversao}%`} hint="Dos leads qualificáveis" accent="#BC2224" />
      </div>

      {/* Timeline + Funil */}
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-ink">Captação — últimos 30 dias</h2>
            <span className="text-sm text-ink-soft">{m.total} no total</span>
          </div>
          <AreaChart data={m.timeline} cor="#004CA9" />
        </Card>
        <Card>
          <h2 className="mb-4 font-display text-lg font-semibold text-ink">Funil de engajamento</h2>
          <FunnelBar funil={m.funil} />
        </Card>
      </div>

      {/* Segmentos + Tipos + Cidades */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card>
          <h2 className="mb-4 font-display text-lg font-semibold text-ink">Por segmento</h2>
          <BarList
            itens={m.segmentos.slice(0, 8).map((s) => ({ key: s.segmento, total: s.total, cor: "#0E6C38" }))}
            formatKey={segLabel}
          />
        </Card>
        <Card>
          <h2 className="mb-4 font-display text-lg font-semibold text-ink">Por tipo de apoio</h2>
          <BarList
            itens={m.tipos.map((t) => ({ key: t.tipo, total: t.total, cor: "#FAB224" }))}
            formatKey={tipoLabel}
          />
        </Card>
        <Card>
          <h2 className="mb-4 font-display text-lg font-semibold text-ink">Top cidades</h2>
          <BarList itens={cidades.map((c) => ({ key: c.cidade, total: c.total, cor: "#BC2224" }))} />
        </Card>
      </div>
    </div>
  );
}
