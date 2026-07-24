import { Reveal } from "./Reveal";
import { CHAMADO } from "@/lib/oficial";

/**
 * O movimento, na palavra oficial da campanha. Os três cartões que existiam
 * aqui ("gestão com coragem", "recursos onde importa"…) eram promessa de
 * governo e foram removidos: em pré-campanha não se apresenta proposta.
 */
export function Movimento() {
  return (
    <section id="movimento" className="relative overflow-hidden bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
        <Reveal>
          <h2 className="font-display text-3xl leading-tight text-blue-900 text-balance sm:text-4xl lg:text-5xl">
            {CHAMADO.titulo}
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <div className="rs-bar mx-auto mt-8 h-1.5 w-28 rounded-full" />
        </Reveal>
        <Reveal delay={160}>
          <p className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-ink-soft text-balance sm:text-xl">
            {CHAMADO.texto}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
