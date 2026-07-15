import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { Wordmark } from "@/components/Wordmark";
import { Footer } from "@/components/Footer";
import { SEGMENTOS } from "@/lib/segmentos";

export const metadata: Metadata = {
  title: "Campanhas",
  description: "Landing pages do Coração Gaúcho por público: jovens, mulheres, saúde, educação, campo e mais.",
};

export default function LPIndex() {
  return (
    <>
      <header className="border-b border-ink/10 bg-cream/85 backdrop-blur-xl">
        <div className="rs-bar h-1 w-full" />
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
          <Link href="/" aria-label="Coração Gaúcho — início">
            <Wordmark size="sm" tone="green" />
          </Link>
          <Link href="/#some-se" className="text-sm font-medium text-ink-soft hover:text-red">
            Voltar ao site
          </Link>
        </div>
      </header>

      <main className="bg-cream">
        <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <p className="font-label mb-3 text-xs uppercase tracking-[0.25em] text-red">Campanhas por público</p>
          <h1 className="font-display text-4xl font-bold text-ink sm:text-5xl">
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
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-surface p-6 transition-all hover:-translate-y-1 hover:shadow-2xl"
              >
                <span className="h-1.5 w-14 rounded-full" style={{ background: "var(--accent)" }} />
                <h2 className="mt-5 font-display text-2xl font-bold text-ink">{s.publico}</h2>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-soft line-clamp-3">
                  {s.subheadline}
                </p>
                <span
                  className="font-label mt-5 inline-flex items-center gap-1 text-sm uppercase tracking-wide"
                  style={{ color: "color-mix(in srgb, var(--accent), black 30%)" }}
                >
                  Ver campanha
                  <span className="transition-transform group-hover:translate-x-1">→</span>
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
