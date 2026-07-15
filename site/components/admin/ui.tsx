import { cn } from "@/lib/utils";

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-ink/10 bg-surface p-5 shadow-sm sm:p-6", className)}>
      {children}
    </div>
  );
}

export function StatCard({
  label,
  value,
  hint,
  accent = "#004CA9",
}: {
  label: string;
  value: string | number;
  hint?: string;
  accent?: string;
}) {
  return (
    <Card className="relative overflow-hidden">
      <div className="absolute left-0 top-0 h-full w-1" style={{ background: accent }} />
      <p className="text-xs font-medium uppercase tracking-wide text-ink-soft">{label}</p>
      <p className="mt-2 font-display text-4xl font-bold text-ink">{value}</p>
      {hint && <p className="mt-1 text-sm text-ink-soft">{hint}</p>}
    </Card>
  );
}

/** Lista de barras horizontais proporcionais. */
export function BarList({
  itens,
  formatKey,
}: {
  itens: { key: string; total: number; cor?: string }[];
  formatKey?: (k: string) => string;
}) {
  const max = Math.max(1, ...itens.map((i) => i.total));
  return (
    <div className="space-y-3">
      {itens.map((it) => (
        <div key={it.key}>
          <div className="mb-1 flex items-center justify-between text-sm">
            <span className="text-ink-soft">{formatKey ? formatKey(it.key) : it.key}</span>
            <span className="font-semibold text-ink">{it.total}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-ink/5">
            <div
              className="h-full rounded-full"
              style={{ width: `${(it.total / max) * 100}%`, background: it.cor ?? "#004CA9" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/** Gráfico de área simples (timeline) em SVG. */
export function AreaChart({ data, cor = "#004CA9" }: { data: { dia: string; total: number }[]; cor?: string }) {
  const w = 640;
  const h = 160;
  const pad = 8;
  const max = Math.max(1, ...data.map((d) => d.total));
  const stepX = (w - pad * 2) / Math.max(1, data.length - 1);
  const pt = (d: { total: number }, i: number) => {
    const x = pad + i * stepX;
    const y = h - pad - (d.total / max) * (h - pad * 2);
    return [x, y] as const;
  };
  const linha = data.map((d, i) => pt(d, i).join(",")).join(" ");
  const area = `${pad},${h - pad} ${linha} ${pad + (data.length - 1) * stepX},${h - pad}`;
  const gid = `grad-${cor.replace("#", "")}`;

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${w} ${h}`} className="h-40 w-full min-w-[520px]" preserveAspectRatio="none">
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={cor} stopOpacity="0.28" />
            <stop offset="100%" stopColor={cor} stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points={area} fill={`url(#${gid})`} />
        <polyline points={linha} fill="none" stroke={cor} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      </svg>
      <div className="mt-1 flex justify-between px-1 text-[10px] text-ink-soft/60">
        <span>{data[0]?.dia}</span>
        <span>{data[Math.floor(data.length / 2)]?.dia}</span>
        <span>{data[data.length - 1]?.dia}</span>
      </div>
    </div>
  );
}

/** Barra empilhada do funil (proporção por estágio). */
export function FunnelBar({ funil }: { funil: { key: string; label: string; cor: string; total: number }[] }) {
  const total = Math.max(1, funil.reduce((s, f) => s + f.total, 0));
  return (
    <div>
      <div className="flex h-4 w-full overflow-hidden rounded-full">
        {funil.map((f) => (
          <div key={f.key} style={{ width: `${(f.total / total) * 100}%`, background: f.cor }} title={`${f.label}: ${f.total}`} />
        ))}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3">
        {funil.map((f) => (
          <div key={f.key} className="flex items-center gap-2 text-sm">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: f.cor }} />
            <span className="text-ink-soft">{f.label}</span>
            <span className="ml-auto font-semibold text-ink">{f.total}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
