const FRASE = "O POVO FALA MAIS ALTO";

/**
 * Faixa da assinatura da marca ("O povo fala mais alto", que integra o próprio
 * logo). O separador é o elemento gráfico tricolor da identidade — nunca emoji.
 */
export function Marquee() {
  const itens = Array.from({ length: 8 });
  return (
    <div
      className="relative overflow-hidden bg-yellow py-3.5 text-blue-900"
      role="presentation"
      aria-hidden
    >
      <div className="flex w-max whitespace-nowrap" style={{ animation: "cg-marquee 34s linear infinite" }}>
        {[0, 1].map((grupo) => (
          <div key={grupo} className="flex">
            {itens.map((_, i) => (
              <span key={i} className="flex items-center">
                <span className="font-display text-xl tracking-wide sm:text-2xl">{FRASE}</span>
                <span className="rs-bar mx-6 h-2.5 w-2.5 rounded-full" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
