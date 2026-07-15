import Link from "next/link";
import type { CSSProperties } from "react";
import { Reveal } from "@/components/Reveal";
import { Wordmark } from "@/components/Wordmark";
import { Footer } from "@/components/Footer";
import { LPForm } from "./LPForm";
import { parseHeadline, type Segmento } from "@/lib/segmentos";
import { Check } from "lucide-react";

const LIGHT_ACCENTS = new Set(["#FAB224", "#D88A00"]);

export function LandingPage({ seg }: { seg: Segmento }) {
  const isLight = LIGHT_ACCENTS.has(seg.accent.toUpperCase());
  const styleVars = {
    "--accent": seg.accent,
    "--accent-light": `color-mix(in srgb, ${seg.accent}, white 45%)`,
    "--accent-ink": `color-mix(in srgb, ${seg.accent}, black 30%)`,
    "--on-accent": isLight ? "#14110c" : "#faf7f0",
  } as CSSProperties;

  const parts = parseHeadline(seg.headline);

  return (
    <div style={styleVars}>
      {/* Header minimalista */}
      <header className="sticky top-0 z-50 border-b border-ink/10 bg-cream/85 backdrop-blur-xl">
        <div className="rs-bar h-1 w-full" />
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
          <Link href="/" aria-label="Coração Gaúcho — início">
            <Wordmark size="sm" tone="green" />
          </Link>
          <a
            href="#form"
            className="font-label rounded-full px-5 py-2.5 text-sm uppercase tracking-wide shadow-md transition-transform hover:scale-[1.04]"
            style={{ background: "var(--accent)", color: "var(--on-accent)" }}
          >
            {seg.ctaLabel}
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-blue-900 text-cream-soft">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 h-[38rem] w-[38rem] rounded-full blur-2xl"
          style={{ background: "color-mix(in srgb, var(--accent), transparent 78%)" }}
        />
        <div className="rs-stripe pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rotate-45 rounded-[40%] opacity-10" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
          <div>
            <p className="font-label mb-5 inline-flex items-center gap-2 rounded-full border border-cream-soft/20 px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-[var(--accent-light)]">
              <span className="h-2 w-2 rounded-full" style={{ background: "var(--accent-light)" }} />
              {seg.eyebrow}
            </p>
            <h1 className="font-display text-4xl font-bold leading-[0.98] tracking-tight text-balance sm:text-5xl lg:text-6xl">
              {parts.map((p, i) =>
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
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#form"
                className="font-label inline-flex items-center justify-center rounded-full px-7 py-4 text-base uppercase tracking-wide shadow-xl transition-transform hover:scale-[1.03] active:scale-95"
                style={{ background: "var(--accent)", color: "var(--on-accent)" }}
              >
                {seg.ctaLabel} →
              </a>
              <Link
                href="/#propostas"
                className="inline-flex items-center justify-center rounded-full border border-cream-soft/25 px-7 py-4 text-base font-semibold text-cream-soft transition-colors hover:bg-cream-soft/10"
              >
                Ver todas as propostas
              </Link>
            </div>
          </div>

          {/* Card de destaque lateral */}
          <div className="hidden lg:block">
            <div className="rounded-3xl border border-cream-soft/10 bg-cream-soft/[0.05] p-8 backdrop-blur">
              <Wordmark size="lg" tone="cream" />
              <p className="mt-4 font-script text-2xl" style={{ color: "var(--accent-light)" }}>
                {seg.publico}
              </p>
              <p className="mt-2 text-sm text-cream-soft/60">
                Uma agenda feita ouvindo quem vive essa realidade no Rio Grande do Sul.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dores */}
      <section className="bg-cream py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <Reveal>
            <p className="font-label mb-3 text-xs uppercase tracking-[0.25em] text-[var(--accent-ink)]">
              Você vive isso?
            </p>
            <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
              A gente sabe o que aperta no dia a dia
            </h2>
          </Reveal>
          <div className="mt-10 space-y-4">
            {seg.dores.map((d, i) => (
              <Reveal key={i} delay={i * 90}>
                <div className="flex items-start gap-4 rounded-2xl border border-ink/10 bg-surface p-5">
                  <span
                    className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[var(--accent-ink)]"
                    style={{ background: "color-mix(in srgb, var(--accent), transparent 86%)" }}
                  >
                    !
                  </span>
                  <p className="text-lg text-ink-soft">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Compromissos */}
      <section className="bg-cream-soft py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <p className="font-label mb-3 text-xs uppercase tracking-[0.25em] text-[var(--accent-ink)]">
              Nosso compromisso com {seg.publico.toLowerCase()}
            </p>
            <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">O que vamos fazer, de verdade</h2>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {seg.compromissos.map((c, i) => (
              <Reveal key={c.titulo} delay={i * 110}>
                <article className="flex h-full flex-col rounded-2xl border border-ink/10 bg-surface p-7 transition-all hover:-translate-y-1 hover:shadow-2xl">
                  <div className="h-1 w-12 rounded-full" style={{ background: "var(--accent)" }} />
                  <span className="mt-4 font-display text-3xl font-bold text-[var(--accent-ink)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-display text-xl font-semibold text-ink">{c.titulo}</h3>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink-soft">{c.texto}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Depoimento */}
      <section className="relative overflow-hidden bg-blue-900 py-20 text-cream-soft sm:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{ background: "radial-gradient(60% 100% at 50% 0%, color-mix(in srgb, var(--accent), transparent 82%), transparent)" }}
        />
        <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
          <div className="font-script text-6xl leading-none" style={{ color: "var(--accent-light)" }}>
            &ldquo;
          </div>
          <Reveal>
            <blockquote className="font-display text-2xl font-semibold leading-snug text-balance sm:text-3xl">
              {seg.depoimento.texto}
            </blockquote>
          </Reveal>
          <p className="mt-6 text-sm text-cream-soft/70">
            <strong className="text-cream-soft">{seg.depoimento.autor}</strong> · {seg.depoimento.papel}
          </p>
        </div>
      </section>

      {/* Formulário */}
      <section id="form" className="scroll-mt-24 bg-cream py-20 sm:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.05fr]">
          <div>
            <p className="font-label mb-3 text-xs uppercase tracking-[0.25em] text-[var(--accent-ink)]">
              Some-se agora
            </p>
            <h2 className="font-display text-3xl font-bold leading-tight text-ink text-balance sm:text-4xl">
              Sua voz faz o Rio Grande <span className="rs-text-gradient">falar mais alto</span>
            </h2>
            <p className="mt-5 max-w-md text-lg text-ink-soft">
              Cadastre-se e receba em primeira mão como participar do movimento na sua região. Leva menos
              de um minuto.
            </p>
            <ul className="mt-7 space-y-3">
              {["Ações e agenda perto de você", "Conteúdos oficiais direto no WhatsApp", "Faça parte das decisões"].map(
                (t) => (
                  <li key={t} className="flex items-center gap-3 text-ink-soft">
                    <Check className="h-5 w-5 shrink-0 text-[var(--accent-ink)]" strokeWidth={2.5} />
                    {t}
                  </li>
                ),
              )}
            </ul>
          </div>
          <LPForm
            segmento={seg.slug}
            publico={seg.publico}
            tipoPadrao={seg.tipoPadrao}
            formTitle={seg.formTitle}
            ctaLabel={seg.ctaLabel}
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}
