import { Reveal } from "./Reveal";

export function Movimento() {
  return (
    <section id="movimento" className="relative bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
        <Reveal>
          <p className="font-label mb-4 text-xs uppercase tracking-[0.25em] text-red">
            O que nos move
          </p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="font-display text-4xl font-bold leading-tight text-ink text-balance sm:text-5xl">
            Não é sobre um nome.
            <br />É sobre <span className="rs-text-gradient">um jeito de governar.</span>
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-ink-soft">
            O <strong className="text-ink">Coração Gaúcho</strong> nasce da certeza de que o Rio Grande
            se transforma quando o poder ouve quem vive a realidade. Governar de perto, decidir com o
            povo e cuidar de cada canto do estado — do pampa à serra, do interior à capital.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5 sm:grid-cols-3">
          {[
            { n: "01", t: "Escuta de verdade", d: "Plenárias abertas em todas as regiões. Quem conhece o problema ajuda a construir a solução." },
            { n: "02", t: "Gestão com coragem", d: "Recursos onde importa: saúde, educação e emprego. Transparência total, do início ao fim." },
            { n: "03", t: "Orgulho de ser gaúcho", d: "Valorizar nossa cultura, nossa terra e nossa gente. Um RS forte é feito por todos nós." },
          ].map((c, i) => (
            <Reveal key={c.n} delay={i * 120}>
              <article className="group h-full rounded-2xl border border-ink/10 bg-surface p-7 text-left shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-blue/5">
                <span className="font-display text-3xl font-bold text-yellow">{c.n}</span>
                <div className="rs-bar mt-3 h-1 w-12 rounded-full" />
                <h3 className="mt-5 font-display text-xl font-semibold text-ink">{c.t}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{c.d}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
