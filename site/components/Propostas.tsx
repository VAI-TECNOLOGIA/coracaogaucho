import { Reveal } from "./Reveal";
import { HeartPulse, GraduationCap, Sprout, ShieldCheck, Briefcase, Bus } from "lucide-react";

const EIXOS = [
  { icon: HeartPulse, cor: "text-red", bg: "bg-red/10", t: "Saúde perto de casa", d: "Mais leitos, consultas sem fila e atenção básica em cada município. Cuidar da vida é prioridade número um." },
  { icon: GraduationCap, cor: "text-blue", bg: "bg-blue/10", t: "Educação que liberta", d: "Escola em tempo integral, valorização dos professores e ensino técnico conectado ao futuro do trabalho." },
  { icon: Sprout, cor: "text-green", bg: "bg-green/10", t: "Campo que sustenta o RS", d: "Apoio ao pequeno produtor, crédito rural justo e política séria contra a estiagem. O agro é o coração da nossa economia." },
  { icon: Briefcase, cor: "text-amber-700", bg: "bg-yellow/15", t: "Emprego e renda", d: "Atrair investimento, fortalecer o comércio local e capacitar a juventude para as vagas de amanhã." },
  { icon: ShieldCheck, cor: "text-blue-900", bg: "bg-blue-900/10", t: "Segurança com inteligência", d: "Prevenção, integração das forças e tecnologia para proteger cada família gaúcha." },
  { icon: Bus, cor: "text-green-900", bg: "bg-green/10", t: "Infraestrutura e mobilidade", d: "Estradas recuperadas, transporte digno e reconstrução das cidades atingidas pelas enchentes." },
];

export function Propostas() {
  return (
    <section id="propostas" className="bg-cream-soft py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <Reveal>
            <p className="font-label mb-4 text-xs uppercase tracking-[0.25em] text-red">
              Propostas
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="font-display text-4xl font-bold leading-tight text-ink sm:text-5xl">
              Seis compromissos com o <span className="rs-text-gradient">Rio Grande</span>
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-5 text-lg text-ink-soft">
              Um plano de governo construído ouvindo o povo. Concreto, mensurável e feito para chegar
              na ponta.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {EIXOS.map((e, i) => (
            <Reveal key={e.t} delay={(i % 3) * 100}>
              <article className="group flex h-full flex-col rounded-2xl border border-ink/10 bg-surface p-7 transition-all hover:-translate-y-1 hover:border-transparent hover:shadow-2xl hover:shadow-blue/10">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${e.bg}`}>
                  <e.icon className={`h-6 w-6 ${e.cor}`} strokeWidth={2} />
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold text-ink">{e.t}</h3>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink-soft">{e.d}</p>
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-blue opacity-0 transition-opacity group-hover:opacity-100">
                  Saiba mais →
                </span>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
