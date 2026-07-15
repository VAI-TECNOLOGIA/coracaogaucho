import { redirect } from "next/navigation";
import Link from "next/link";
import { getSessao } from "@/lib/auth";
import { Wordmark } from "@/components/Wordmark";
import { AdminNav } from "@/components/admin/AdminNav";
import { LogoutButton } from "@/components/admin/LogoutButton";

export default async function PainelLayout({ children }: { children: React.ReactNode }) {
  const sessao = await getSessao();
  if (!sessao) redirect("/admin/login");

  const iniciais = sessao.nome
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="flex min-h-screen bg-cream">
      {/* Sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col justify-between bg-blue-900 p-5 lg:flex">
        <div>
          <Link href="/admin" className="mb-8 block">
            <Wordmark size="sm" tone="cream" />
          </Link>
          <AdminNav />
        </div>
        <div className="border-t border-cream-soft/10 pt-4">
          <div className="mb-2 flex items-center gap-3 px-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cream-soft/10 text-sm font-semibold text-cream-soft">
              {iniciais}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-cream-soft">{sessao.nome}</p>
              <p className="truncate text-xs text-cream-soft/50">{sessao.papel}</p>
            </div>
          </div>
          <LogoutButton />
          <Link href="/" className="mt-1 block px-3 py-2 text-xs text-cream-soft/40 hover:text-cream-soft/70">
            ← Ver site público
          </Link>
        </div>
      </aside>

      {/* Conteúdo */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar mobile */}
        <header className="flex items-center justify-between border-b border-ink/10 bg-cream/90 px-5 py-3 backdrop-blur lg:hidden">
          <Wordmark size="sm" tone="green" />
          <LogoutButtonMobile />
        </header>
        <main className="flex-1 p-5 sm:p-8">{children}</main>
      </div>
    </div>
  );
}

function LogoutButtonMobile() {
  return (
    <div className="text-ink">
      <LogoutButton />
    </div>
  );
}
