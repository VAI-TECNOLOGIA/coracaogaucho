import { Reveal } from "./Reveal";
import { Logo } from "./Logo";
import { JULIANA } from "@/lib/oficial";

/**
 * "Quem somos" — reescrita integralmente a partir do site oficial.
 * A versão anterior descrevia a candidata como "professora e gestora pública"
 * e anunciava os cargos de "Governadora"/"Vice-Governador": as duas coisas
 * eram falsas. Aqui só entra o que o site oficial afirma.
 */
export function Juliana() {
  return (
    <section
      id="juliana"
      className="relative overflow-hidden bg-blue-900 py-24 text-cream-soft sm:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_0%,rgba(0,76,169,0.55),transparent_70%)]"
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <Reveal>
              <p className="font-label mb-4 text-xs uppercase tracking-[0.25em] text-yellow">
                Quem somos
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="font-display text-4xl leading-none sm:text-5xl lg:text-6xl">
                {JULIANA.nome}
              </h2>
            </Reveal>
            <Reveal delay={130}>
              <div className="rs-bar mt-6 h-1 w-24 rounded-full" />
            </Reveal>

            <div className="mt-8 space-y-5">
              {JULIANA.bio.map((p, i) => (
                <Reveal key={p} delay={180 + i * 70}>
                  <p className="text-base leading-relaxed text-cream-soft/80 sm:text-lg">{p}</p>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Marcos — todos extraídos da própria biografia oficial */}
          <div>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {JULIANA.marcos.map((m, i) => (
                <Reveal key={m.titulo} delay={i * 80}>
                  <li className="flex h-full items-start gap-4 rounded-2xl border border-cream-soft/12 bg-cream-soft/[0.05] p-5">
                    <span aria-hidden className="rs-bar mt-1.5 h-8 w-1 shrink-0 rounded-full" />
                    <div>
                      <p className="font-display text-lg leading-snug text-cream-soft">{m.titulo}</p>
                      <p className="mt-1 text-sm text-cream-soft/60">{m.detalhe}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={480}>
              <div className="mt-8 flex justify-center rounded-2xl border border-cream-soft/12 bg-cream-soft/[0.04] px-6 py-7">
                <Logo variant="confia" tone="escuro" size="md" />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
