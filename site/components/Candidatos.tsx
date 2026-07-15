import { Reveal } from "./Reveal";

const PESSOAS = [
  {
    nome: "Juliana Brizola",
    papel: "Governadora",
    iniciais: "JB",
    cor: "from-blue to-blue-900",
    bio: "Professora e gestora pública, herdeira de uma tradição trabalhista que sempre colocou o povo no centro. Firmeza para governar, sensibilidade para escutar.",
  },
  {
    nome: "Edegar Pretto",
    papel: "Vice-Governador",
    iniciais: "EP",
    cor: "from-green to-green-900",
    bio: "Filho de agricultores, com raiz no interior e história de luta pela terra e pela gente. Conhece o Rio Grande de ponta a ponta, do campo à cidade.",
  },
];

export function Candidatos() {
  return (
    <section id="candidatos" className="relative overflow-hidden bg-blue-900 py-24 text-cream-soft sm:py-32">
      <div className="rs-stripe pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rotate-45 rounded-[40%] opacity-10" />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="font-label mb-4 text-xs uppercase tracking-[0.25em] text-yellow">
              Quem somos
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="font-display text-4xl font-bold leading-tight sm:text-5xl">
              Duas trajetórias, <br className="hidden sm:block" /> um só coração gaúcho
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {PESSOAS.map((p, i) => (
            <Reveal key={p.nome} delay={i * 140}>
              <article className="group flex h-full flex-col rounded-3xl border border-cream-soft/10 bg-cream-soft/[0.04] p-8 backdrop-blur transition-all hover:bg-cream-soft/[0.07] sm:flex-row sm:items-start sm:gap-6">
                <div
                  className={`mb-5 flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${p.cor} font-display text-3xl font-bold shadow-xl sm:mb-0`}
                >
                  {p.iniciais}
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold">{p.nome}</h3>
                  <p className="mt-1 inline-block rounded-full bg-yellow/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-yellow">
                    {p.papel}
                  </p>
                  <p className="mt-4 leading-relaxed text-cream-soft/75">{p.bio}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
