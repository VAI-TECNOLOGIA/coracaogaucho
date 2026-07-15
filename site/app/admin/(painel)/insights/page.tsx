import { analisar, insightsRegras, resumoIA } from "@/lib/insights";
import { Card } from "@/components/admin/ui";
import { Sparkles, TrendingUp, AlertTriangle, Lightbulb } from "lucide-react";

export const dynamic = "force-dynamic";

const ESTILO = {
  positivo: { cor: "#0E6C38", bg: "bg-green/8", icon: TrendingUp },
  atencao: { cor: "#BC2224", bg: "bg-red/8", icon: AlertTriangle },
  oportunidade: { cor: "#004CA9", bg: "bg-blue/8", icon: Lightbulb },
} as const;

export default async function InsightsPage() {
  const analise = await analisar();
  const [insights, resumo] = await Promise.all([
    Promise.resolve(insightsRegras(analise)),
    resumoIA(analise),
  ]);

  return (
    <div className="mx-auto max-w-5xl">
      <header className="mb-8">
        <p className="font-label text-xs uppercase tracking-[0.2em] text-red">Inteligência</p>
        <h1 className="mt-1 font-display text-3xl font-bold text-ink sm:text-4xl">Insights IA</h1>
        <p className="mt-1 text-ink-soft">Análise automática da captação, com recomendações práticas.</p>
      </header>

      {/* Resumo executivo (Claude) */}
      <Card className="mb-6 border-blue/20 bg-gradient-to-br from-blue/5 to-transparent">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-blue" />
          <h2 className="font-display text-lg font-semibold text-ink">Resumo executivo</h2>
          <span className="ml-2 rounded-full bg-blue/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-blue">
            {resumo ? "Claude Opus 4.8" : "IA opcional"}
          </span>
        </div>
        {resumo ? (
          <p className="mt-4 whitespace-pre-line leading-relaxed text-ink">{resumo}</p>
        ) : (
          <p className="mt-4 leading-relaxed text-ink-soft">
            O resumo com IA generativa fica disponível ao definir a variável de ambiente{" "}
            <code className="rounded bg-ink/5 px-1.5 py-0.5 text-sm">ANTHROPIC_API_KEY</code>. Enquanto isso,
            os insights abaixo são gerados automaticamente a partir dos seus dados — sem depender de IA externa.
          </p>
        )}
      </Card>

      {/* Insights por regras */}
      <div className="grid gap-4 sm:grid-cols-2">
        {insights.map((it, i) => {
          const e = ESTILO[it.tom];
          return (
            <Card key={i} className="flex gap-4">
              <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${e.bg}`}>
                <e.icon className="h-5 w-5" style={{ color: e.cor }} />
              </div>
              <div>
                <h3 className="font-display text-base font-semibold text-ink">{it.titulo}</h3>
                <p className="mt-1 text-[15px] leading-relaxed text-ink-soft">{it.texto}</p>
              </div>
            </Card>
          );
        })}
      </div>

      {insights.length === 0 && (
        <Card><p className="text-center text-ink-soft">Ainda não há dados suficientes para gerar insights.</p></Card>
      )}
    </div>
  );
}
