"use client";

import { useEffect, useState } from "react";
import { Wordmark } from "./Wordmark";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "#movimento", label: "O Movimento" },
  { href: "#propostas", label: "Propostas" },
  { href: "#candidatos", label: "Quem Somos" },
  { href: "#regioes", label: "Pelo RS" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-cream/85 backdrop-blur-xl shadow-[0_1px_0_rgba(20,17,12,0.08)]"
          : "bg-transparent",
      )}
    >
      <div className="rs-bar h-1 w-full" />
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-8">
        <a href="#top" aria-label="Coração Gaúcho — início" className="shrink-0">
          <Wordmark size="sm" tone={scrolled ? "green" : "cream"} />
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-red",
                scrolled ? "text-ink-soft" : "text-cream-soft/90",
              )}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#some-se"
            className="font-label rounded-full bg-red px-5 py-2.5 text-sm uppercase tracking-wide text-cream-soft shadow-lg shadow-red/25 transition-transform hover:scale-[1.04] active:scale-95"
          >
            Some-se
          </a>
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={open}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-lg md:hidden",
            scrolled ? "text-ink" : "text-cream-soft",
          )}
        >
          <div className="space-y-1.5">
            <span className={cn("block h-0.5 w-6 bg-current transition", open && "translate-y-2 rotate-45")} />
            <span className={cn("block h-0.5 w-6 bg-current transition", open && "opacity-0")} />
            <span className={cn("block h-0.5 w-6 bg-current transition", open && "-translate-y-2 -rotate-45")} />
          </div>
        </button>
      </div>

      {/* Menu mobile */}
      <div
        className={cn(
          "grid overflow-hidden bg-cream/95 backdrop-blur-xl transition-all duration-400 md:hidden",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <nav className="min-h-0 overflow-hidden">
          <div className="flex flex-col gap-1 px-6 py-4">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-3 text-base font-medium text-ink-soft hover:bg-blue/5 hover:text-blue"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#some-se"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-red px-5 py-3 text-center text-base font-semibold text-cream-soft"
            >
              Some-se ao movimento
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
