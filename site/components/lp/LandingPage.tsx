import Link from "next/link";
import type { CSSProperties } from "react";
import { Reveal } from "@/components/Reveal";
import { Logo } from "@/components/Logo";
import { Footer } from "@/components/Footer";
import { LPForm } from "./LPForm";
import { parseHeadline, type Segmento } from "@/lib/segmentos";
import { CHAMADO, PARTICIPACAO } from "@/lib/oficial";

const ACENTOS_CLAROS = new Set(["#FAB224", "#D88A00"]);

/**
 * LP segmentada — hero + convite + cadastro. Nada mais.
 *
 * Foram removidos os blocos "Dores", "Compromissos" (3 promessas por página) e
 * "Depoimento" (pessoas fictícias): proposta de governo não pode existir em
 * pré-campanha e depoimento inventado não pode existir nunca.
 */
export function LandingPage({ seg }: { seg: Segmento }) {
  const claro = ACENTOS_CLAROS.has(seg.accent.toUpperCase());
  const vars = {
    "--accent": seg.accent,
    "--accent-light": `color-mix(in srgb, ${seg.accent}, white 45%)`,
    "--accent-ink": `color-mix(in srgb, ${seg.accent}, black 30%)`,
    "--on-accent": claro ? "#14110c" : "#faf7f0",
  } as CSSProperties;

  const partes = parseHeadline(seg.headline);

  return (
    <div style={vars}>
      <header className="sticky top-0 z-50 bg-blue shadow-md shadow-blue-900/10">
        <div className="rs-bar h-1 w-full" />
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
          <Link
            href="/"
            aria-label="Confia+ RS — início"
            className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow"
          >
            <Logo variant="confia" tone="escuro" size="sm" priority />
          </Link>
          <a
            href="#form"
            className="font-label rounded-full px-5 py-2.5 text-sm uppercase tracking-wide shadow-md transition-transform hover:scale-[1.04] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream-soft active:scale-95"
            style={{ background: "var(--accent)", color: "var(--on-accent)" }}
          >
            {seg.ctaLabel}
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-blue text-cream-soft">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_115%_at_18%_38%,#0a56b5_0%,#004ca9_38%,#123a7d_72%,#0d2550_100%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 h-[36rem] w-[36rem] rounded-full blur-3xl"
          style={{ background: "color-mix(in srgb, var(--accent), transparent 84%)" }}
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
          <div>
            <p className="font-label mb-5 inline-flex items-center gap-2 rounded-full border border-cream-soft/25 px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-[var(--accent-light)]">
              <span aria-hidden className="h-2 w-2 rounded-full" style={{ background: "var(--accent-light)" }} />
              {seg.eyebrow}
            </p>
            <h1 className="font-display text-4xl leading-[1.02] tracking-tight text-balance sm:text-5xl lg:text-6xl">
              {partes.map((p, i) =>
                p.highlight ? (
                  <span key={i} className="rs-text-gradient">
                    {p.text}
                  </span>
                ) : (
                  <span key={i}>{p.text}</span>
                ),
              )}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream-soft/80">{seg.subheadline}</p>
            <div className="mt-9">
              <a
                href="#form"
                className="font-label inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base uppercase tracking-wide shadow-xl transition-transform hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream-soft active:scale-95"
                style={{ background: "var(--accent)", color: "var(--on-accent)" }}
              >
                {seg.ctaLabel}
                <span aria-hidden>→</span>
              </a>
            </div>
          </div>

          <div className="hidden lg:flex lg:justify-center">
            <Logo variant="confia" priority sizes="240px" className="h-56 w-56" />
          </div>
        </div>
      </section>

      {/* O chamado — texto oficial do movimento */}
      <section className="bg-cream py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <Reveal>
            <h2 className="font-display text-3xl leading-tight text-blue-900 text-balance sm:text-4xl">
              {CHAMADO.titulo}
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <div className="rs-bar mx-auto mt-7 h-1.5 w-24 rounded-full" />
          </Reveal>
          <Reveal delay={150}>
            <p className="mt-7 text-lg leading-relaxed text-ink-soft text-balance">{CHAMADO.texto}</p>
          </Reveal>
        </div>
      </section>

      {/* Cadastro */}
      <section id="form" className="scroll-mt-20 bg-cream-soft py-20 sm:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.05fr]">
          <div>
            <h2 className="font-display text-3xl leading-tight text-blue-900 text-balance sm:text-4xl">
              {PARTICIPACAO.titulo}
            </h2>
            <div className="rs-bar mt-7 h-1.5 w-24 rounded-full" />
            <div className="mt-7 space-y-1">
              {PARTICIPACAO.linhas.map((l) => (
                <p key={l} className="font-display text-xl text-ink sm:text-2xl">
                  {l}
                </p>
              ))}
            </div>
          </div>
          <LPForm segmento={seg.slug} publico={seg.publico} formTitle={seg.formTitle} ctaLabel={seg.ctaLabel} />
        </div>
      </section>

      <Footer />
    </div>
  );
}
