import Link from "next/link";
import type { ReactNode } from "react";
import { Wordmark } from "@/components/Wordmark";
import { Footer } from "@/components/Footer";

export const CONTATO = {
  privacidade: "privacidade@coracaogaucho.com.br",
  suporte: "contato@coracaogaucho.com.br",
};

// Desenvolvedora responsável pelo app Confia+ nas lojas (Google Play / App Store).
export const EMPRESA = {
  razaoSocial: "Vai Tecnologia LTDA",
  cnpj: "52.165.389/0001-29",
  endereco: "R. 246, 426 - Lj 02 - Andorinha, Itapema - SC, 88220-000",
  app: "Confia+",
  appIos: "Confia+ RS",
};

export function LegalShell({
  eyebrow,
  title,
  updatedAt = "15 de julho de 2026",
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
            <Wordmark size="sm" tone="green" />
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
            Aplicativo <strong>{EMPRESA.app}</strong> ({EMPRESA.appIos} na App Store), desenvolvido e
            mantido por <strong>{EMPRESA.razaoSocial}</strong> — CNPJ {EMPRESA.cnpj}, {EMPRESA.endereco}.
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}
