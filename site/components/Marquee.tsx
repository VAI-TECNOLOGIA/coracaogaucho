const PHRASE = "O POVO FALA MAIS ALTO";

export function Marquee() {
  const items = Array.from({ length: 8 });
  return (
    <div className="relative overflow-hidden border-y border-blue/10 bg-blue py-4 text-cream-soft">
      <div
        className="flex w-max whitespace-nowrap"
        style={{ animation: "cg-marquee 28s linear infinite" }}
      >
        {[0, 1].map((group) => (
          <div key={group} className="flex" aria-hidden={group === 1}>
            {items.map((_, i) => (
              <span key={i} className="flex items-center">
                <span className="font-display text-2xl font-semibold tracking-wide sm:text-3xl">
                  {PHRASE}
                </span>
                <span className="mx-6 text-yellow">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
