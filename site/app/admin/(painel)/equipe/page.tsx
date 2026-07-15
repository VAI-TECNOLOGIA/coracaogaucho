import { prisma } from "@/lib/db";
import { Card } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

const PAPEL = {
  ADMIN: { label: "Administrador", cor: "#BC2224" },
  COORDENADOR: { label: "Coordenador", cor: "#004CA9" },
  VOLUNTARIO: { label: "Voluntário", cor: "#0E6C38" },
} as const;

export default async function EquipePage() {
  const users = await prisma.user.findMany({ orderBy: { criadoEm: "asc" } });

  return (
    <div className="mx-auto max-w-4xl">
      <header className="mb-8">
        <p className="font-label text-xs uppercase tracking-[0.2em] text-red">Gestão</p>
        <h1 className="mt-1 font-display text-3xl font-bold text-ink sm:text-4xl">Equipe</h1>
        <p className="mt-1 text-ink-soft">{users.length} pessoa(s) com acesso ao painel.</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {users.map((u) => {
          const p = PAPEL[u.papel as keyof typeof PAPEL] ?? { label: u.papel, cor: "#4a4438" };
          const iniciais = u.nome.split(" ").map((x) => x[0]).slice(0, 2).join("").toUpperCase();
          return (
            <Card key={u.id} className="flex items-center gap-4">
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-display text-lg font-bold text-cream-soft"
                style={{ background: p.cor }}
              >
                {iniciais}
              </span>
              <div className="min-w-0">
                <p className="truncate font-semibold text-ink">{u.nome}</p>
                <p className="truncate text-sm text-ink-soft">{u.email}</p>
                <span className="mt-1 inline-block rounded-full px-2 py-0.5 text-[11px] font-semibold text-cream-soft" style={{ background: p.cor }}>
                  {p.label}
                </span>
              </div>
            </Card>
          );
        })}
      </div>

      <p className="mt-8 rounded-xl border border-dashed border-ink/15 p-4 text-sm text-ink-soft">
        💡 Convite de novos membros e edição de permissões chegam na próxima iteração. Por ora, novos
        usuários são criados via seed (<code className="rounded bg-ink/5 px-1 py-0.5">prisma/seed.mjs</code>).
      </p>
    </div>
  );
}
