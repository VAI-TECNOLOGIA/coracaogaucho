"use client";

import { useEffect, useRef, useState } from "react";

function Counter({ to, suffix = "", label }: { to: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        if (reduce) return setVal(to);
        const dur = 1600;
        let raf = 0;
        const t0 = performance.now();
        const tick = (t: number) => {
          const p = Math.min((t - t0) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(to * eased));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-5xl font-bold text-cream-soft sm:text-6xl">
        {val.toLocaleString("pt-BR")}
        <span className="text-yellow">{suffix}</span>
      </div>
      <p className="mt-2 text-sm font-medium uppercase tracking-wide text-cream-soft/60">{label}</p>
    </div>
  );
}

export function Numeros() {
  return (
    <section id="regioes" className="relative overflow-hidden bg-green-900 py-20 sm:py-24">
      <div className="rs-bar absolute inset-x-0 top-0 h-1" />
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 px-5 sm:px-8 lg:grid-cols-4">
        <Counter to={497} label="Municípios" />
        <Counter to={7} label="Regiões do RS" />
        <Counter to={11} suffix=" mi" label="Gaúchos" />
        <Counter to={100} suffix="%" label="Com o povo" />
      </div>
    </section>
  );
}
