import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { Logo } from "@/components/Logo";
import { Footer } from "@/components/Footer";
import { SEGMENTOS } from "@/lib/segmentos";

export const metadata: Metadata = {
  title: "Participe",
  description:
    "O Coração Gaúcho fala com cada gaúcho e gaúcha. Escolha a página do seu público e some-se ao movimento.",
  robots: { index: false, follow: true },
};

export default function LPIndex() {
  return (
    <>
      <header className="bg-blue shadow-md shadow-blue-900/10">
        <div className="rs-bar h-1 w-full" />
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
          <Link
            href="/"
            aria-label="Coração Gaúcho — início"
            className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow"
          >
            <Logo variant="confia" tone="escuro" size="sm" priority />
          </Link>
          <Link
            href="/#participe"
            className="rounded-sm text-sm font-medium text-cream-soft/90 transition-colors hover:text-yellow focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow"
          >
            Voltar ao site
          </Link>
        </div>
      </header>

      <main id="conteudo" className="bg-cream">
        <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <p className="font-label mb-3 text-xs uppercase tracking-[0.25em] text-red">Participe por público</p>
          <h1 className="font-display text-4xl text-blue-900 sm:text-5xl">
            Uma mensagem para <span className="rs-text-gradient">cada gaúcho</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-ink-soft">
            O Coração Gaúcho fala com todo mundo — do jovem ao servidor, do campo à cidade. Escolha a
            página do seu público.
          </p>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SEGMENTOS.map((s) => (
              <Link
                key={s.slug}
                href={`/lp/${s.slug}`}
                style={{ "--accent": s.accent } as CSSProperties}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-surface p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue"
              >
                <span aria-hidden className="h-1.5 w-14 rounded-full" style={{ background: "var(--accent)" }} />
                <h2 className="font-display mt-5 text-2xl text-ink">{s.publico}</h2>
                <p className="mt-2 line-clamp-3 flex-1 text-[15px] leading-relaxed text-ink-soft">
                  {s.subheadline}
                </p>
                <span
                  className="font-label mt-5 inline-flex items-center gap-1 text-sm uppercase tracking-wide"
                  style={{ color: "color-mix(in srgb, var(--accent), black 30%)" }}
                >
                  Ver página
                  <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
