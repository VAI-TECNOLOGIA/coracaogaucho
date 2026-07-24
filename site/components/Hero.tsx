import { Logo } from "./Logo";
import { MANIFESTO } from "@/lib/oficial";

/**
 * Abertura fiel à arte oficial da campanha (BRI_Tela_Confia+ RS): gradiente
 * azul da marca + lockup "Confia+ RS". O texto é o manifesto oficial,
 * transcrito — sem promessa de governo (pré-campanha).
 *
 * Server Component de propósito: nada acima da dobra depende de JS. A entrada é
 * animação CSS (.cg-enter), então o título pinta junto com o HTML — melhor LCP
 * e sem risco de o conteúdo ficar invisível se a hidratação falhar.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-blue text-cream-soft"
    >
      {/* Gradiente da arte oficial: azul da marca abrindo à esquerda, fechando em navy */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_115%_at_18%_38%,#0a56b5_0%,#004ca9_38%,#123a7d_72%,#0d2550_100%)]"
      />
      <div aria-hidden className="rs-bar absolute inset-x-0 top-0 h-1" />

      <div className="relative mx-auto w-full max-w-4xl px-5 pb-20 pt-32 text-center sm:px-8 sm:pt-36">
        <div className="cg-enter flex justify-center">
          <Logo
            variant="confia"
            priority
            sizes="(max-width: 640px) 40vw, 200px"
            className="h-40 w-40 sm:h-48 sm:w-48"
          />
        </div>

        <h1
          className="font-display cg-enter mx-auto mt-12 max-w-3xl text-3xl leading-[1.05] tracking-tight text-balance sm:text-4xl lg:text-5xl"
          style={{ animationDelay: "120ms" }}
        >
          {MANIFESTO.titulo}
        </h1>

        <div className="cg-enter mx-auto mt-7 max-w-2xl space-y-3" style={{ animationDelay: "200ms" }}>
          {MANIFESTO.paragrafos.map((p) => (
            <p key={p} className="text-base leading-relaxed text-cream-soft/85 text-balance sm:text-lg">
              {p}
            </p>
          ))}
        </div>

        <div
          className="cg-enter mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
          style={{ animationDelay: "300ms" }}
        >
          <a
            href="#participe"
            className="font-label group inline-flex w-full items-center justify-center gap-2 rounded-full bg-yellow px-8 py-4 text-base uppercase tracking-wide text-blue-900 shadow-xl shadow-blue-900/30 transition-transform hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream-soft active:scale-95 sm:w-auto"
          >
            Participe
            <span aria-hidden className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
          <a
            href="#movimento"
            className="inline-flex w-full items-center justify-center rounded-full border border-cream-soft/30 px-8 py-4 text-base font-semibold text-cream-soft transition-colors hover:bg-cream-soft/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow sm:w-auto"
          >
            Conheça o movimento
          </a>
        </div>
      </div>
    </section>
  );
}
