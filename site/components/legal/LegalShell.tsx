import Link from "next/link";
import type { ReactNode } from "react";
import { Logo } from "@/components/Logo";
import { Footer } from "@/components/Footer";

export const CONTATO = {
  privacidade: "privacidade@coracaogaucho.com.br",
  suporte: "contato@coracaogaucho.com.br",
};

// Entidade responsável (controladora) pelo app Juliana Brizola nas lojas (Google Play / App
// Store): a própria campanha. Precisa bater EXATAMENTE com o desenvolvedor exibido na loja —
// divergência aqui já reprovou o app uma vez (rejeição #4).
export const EMPRESA = {
  razaoSocial: "Eleição 2026 Juliana Brizola Governador",
  cnpj: "68.581.903/0001-47",
  endereco: "Rua Félix da Cunha, 311 - Moinhos de Vento, Porto Alegre - RS, 90570-001",
  app: "Juliana Brizola",
  appIos: "Juliana Brizola",
  // Fornecedor técnico (desenvolvimento/manutenção) — assina só no rodapé.
  desenvolvimento: "Vai Tecnologia",
};

export function LegalShell({
  eyebrow,
  title,
  updatedAt = "17 de agosto de 2026",
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  updatedAt?: string;
  children: ReactNode;
}) {
  return (
    <>
      <header className="border-b border-ink/10 bg-cream/85 backdrop-blur-xl">
        <div className="rs-bar h-1 w-full" />
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
          <Link href="/" aria-label="Coração Gaúcho — início">
            <Logo variant="chapa" tone="claro" size="sm" />
          </Link>
          <Link href="/" className="text-sm font-medium text-ink-soft hover:text-red">
            Voltar ao site
          </Link>
        </div>
      </header>

      <main className="bg-cream">
        <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
          <p className="font-label mb-3 text-xs uppercase tracking-[0.25em] text-red">{eyebrow}</p>
          <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">{title}</h1>
          <p className="mt-3 text-sm text-ink-soft/70">Última atualização: {updatedAt}</p>
          <div className="legal-prose mt-8">{children}</div>

          <p className="mt-12 border-t border-ink/10 pt-6 text-xs text-ink-soft/70">
            Aplicativo <strong>{EMPRESA.app}</strong> ({EMPRESA.appIos} na App Store), publicado por{" "}
            <strong>{EMPRESA.razaoSocial}</strong> — CNPJ {EMPRESA.cnpj}, {EMPRESA.endereco}.
            Desenvolvimento técnico: {EMPRESA.desenvolvimento}.
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}
