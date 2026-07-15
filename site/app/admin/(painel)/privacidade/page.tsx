import { prisma } from "@/lib/db";
import { getSessao } from "@/lib/auth";
import { Card } from "@/components/admin/ui";
import { PrivacidadeAcoes } from "@/components/admin/PrivacidadeAcoes";

export const dynamic = "force-dynamic";

const TIPO_LABEL: Record<string, string> = {
  EXCLUSAO_CONTA: "Exclusão de conta",
  EXCLUSAO_DADOS: "Exclusão de dados específicos",
};

const ORIGEM_LABEL: Record<string, string> = {
  web: "Formulário web",
  app: "Aplicativo",
  email: "E-mail",
};

const fmt = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "short",
  timeStyle: "short",
  timeZone: "America/Sao_Paulo",
});

export default async function PrivacidadePage() {
  const [sessao, pendentes, historico] = await Promise.all([
    getSessao(),
    prisma.solicitacaoPrivacidade.findMany({
      where: { status: "PENDENTE" },
      orderBy: { criadoEm: "asc" },
    }),
    prisma.solicitacaoPrivacidade.findMany({
      where: { status: { not: "PENDENTE" } },
      orderBy: { processadoEm: "desc" },
      take: 30,
    }),
  ]);

  const souAdmin = sessao?.papel === "ADMIN";

  return (
    <div className="mx-auto max-w-4xl">
      <header className="mb-8">
        <p className="font-label text-xs uppercase tracking-[0.2em] text-red">LGPD</p>
        <h1 className="mt-1 font-display text-3xl font-bold text-ink sm:text-4xl">Privacidade</h1>
        <p className="mt-1 text-ink-soft">
          Solicitações de exclusão de conta e dados (páginas públicas /excluir-conta e
          /excluir-dados). Prazo de atendimento: <strong>5 dias úteis</strong> para exclusão de
          conta, <strong>15 dias</strong> para dados específicos.
        </p>
      </header>

      <section>
        <h2 className="font-display text-lg font-bold text-ink">
          Pendentes{" "}
          <span className="ml-1 rounded-full bg-red px-2 py-0.5 text-xs font-semibold text-cream-soft">
            {pendentes.length}
          </span>
        </h2>

        {pendentes.length === 0 ? (
          <p className="mt-3 rounded-xl border border-dashed border-ink/15 p-4 text-sm text-ink-soft">
            Nenhuma solicitação pendente. 🎉
          </p>
        ) : (
          <div className="mt-4 grid gap-4">
            {pendentes.map((s) => (
              <Card key={s.id}>
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold text-ink">
                      {TIPO_LABEL[s.tipo] ?? s.tipo}
                      <span className="ml-2 rounded-full bg-ink/5 px-2 py-0.5 text-[11px] font-medium text-ink-soft">
                        {ORIGEM_LABEL[s.origem] ?? s.origem}
                      </span>
                    </p>
                    <p className="mt-1 text-sm text-ink-soft">
                      {s.nome ? `${s.nome} · ` : ""}
                      <strong className="text-ink">{s.email}</strong>
                      {s.telefone ? ` · ${s.telefone}` : ""}
                    </p>
                    {s.detalhes && (
                      <p className="mt-1 text-sm text-ink-soft">
                        <span className="font-medium text-ink">Pedido:</span> {s.detalhes}
                      </p>
                    )}
                  </div>
                  <p className="text-xs text-ink-soft/70">
                    Protocolo {s.id.slice(-8).toUpperCase()} · {fmt.format(s.criadoEm)}
                  </p>
                </div>
                <PrivacidadeAcoes id={s.id} tipo={s.tipo} souAdmin={souAdmin} />
              </Card>
            ))}
          </div>
        )}
      </section>

      <section className="mt-10">
        <h2 className="font-display text-lg font-bold text-ink">Histórico recente</h2>
        {historico.length === 0 ? (
          <p className="mt-3 text-sm text-ink-soft">Nenhuma solicitação processada ainda.</p>
        ) : (
          <div className="mt-4 overflow-x-auto rounded-2xl border border-ink/10 bg-surface">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-ink/10 text-left text-xs uppercase tracking-wide text-ink-soft">
                  <th className="px-4 py-3">Protocolo</th>
                  <th className="px-4 py-3">Tipo</th>
                  <th className="px-4 py-3">Titular</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Resolução</th>
                  <th className="px-4 py-3">Processado</th>
                </tr>
              </thead>
              <tbody>
                {historico.map((s) => (
                  <tr key={s.id} className="border-b border-ink/5 last:border-0">
                    <td className="px-4 py-3 font-mono text-xs">{s.id.slice(-8).toUpperCase()}</td>
                    <td className="px-4 py-3">{TIPO_LABEL[s.tipo] ?? s.tipo}</td>
                    <td className="px-4 py-3">{s.email}</td>
                    <td className="px-4 py-3">
                      <span
                        className="rounded-full px-2 py-0.5 text-[11px] font-semibold text-cream-soft"
                        style={{ background: s.status === "CONCLUIDA" ? "#0E6C38" : "#642224" }}
                      >
                        {s.status === "CONCLUIDA" ? "Concluída" : "Recusada"}
                      </span>
                    </td>
                    <td className="max-w-[240px] px-4 py-3 text-xs text-ink-soft">{s.resolucao}</td>
                    <td className="px-4 py-3 text-xs text-ink-soft">
                      {s.processadoEm ? fmt.format(s.processadoEm) : "—"}
                      {s.processadoPor ? ` · ${s.processadoPor}` : ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
