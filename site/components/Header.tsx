"use client";

import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";
import { SITE_OFICIAL } from "@/lib/oficial";

/**
 * Menu espelhado no site oficial (julianabrizola.com.br): Coração Gaúcho,
 * Juliana Brizola, Trajetória, Notícias, Participe.
 * Trajetória e Notícias não são hospedadas aqui — apontam para o site oficial,
 * que é a fonte da verdade desse conteúdo.
 */
const LINKS = [
  { href: "#movimento", label: "Coração Gaúcho", externo: false },
  { href: "#juliana", label: "Juliana Brizola", externo: false },
  { href: `${SITE_OFICIAL}/trajetoria/`, label: "Trajetória", externo: true },
  { href: `${SITE_OFICIAL}/noticias/`, label: "Notícias", externo: true },
  { href: "#participe", label: "Participe", externo: false },
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

  // Trava o scroll do corpo com o menu mobile aberto (evita o "scroll fantasma").
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const externo = { target: "_blank", rel: "noopener noreferrer" } as const;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled ? "bg-blue shadow-lg shadow-blue-900/15" : "bg-blue/95 backdrop-blur-md",
      )}
    >
      <div className="rs-bar h-1 w-full" />
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-3 sm:px-8">
        <a
          href="#top"
          aria-label="Coração Gaúcho — início"
          className="shrink-0 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow"
        >
          <Logo variant="chapa" tone="escuro" size="sm" priority />
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-7 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              {...(l.externo ? externo : {})}
              className="rounded-sm text-sm font-medium text-cream-soft/90 transition-colors hover:text-yellow focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#participe"
            className="font-label rounded-full bg-yellow px-5 py-2.5 text-sm uppercase tracking-wide text-blue-900 shadow-md transition-transform hover:scale-[1.04] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream-soft active:scale-95"
          >
            Participe
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="menu-mobile"
          className="flex h-11 w-11 items-center justify-center rounded-lg text-cream-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow lg:hidden"
        >
          <span className="sr-only">{open ? "Fechar menu" : "Abrir menu"}</span>
          <span aria-hidden className="space-y-1.5">
            <span className={cn("block h-0.5 w-6 bg-current transition", open && "translate-y-2 rotate-45")} />
            <span className={cn("block h-0.5 w-6 bg-current transition", open && "opacity-0")} />
            <span className={cn("block h-0.5 w-6 bg-current transition", open && "-translate-y-2 -rotate-45")} />
          </span>
        </button>
      </div>

      {/* Menu mobile */}
      <div
        id="menu-mobile"
        className={cn(
          "grid overflow-hidden bg-blue transition-[grid-template-rows] duration-300 lg:hidden",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <nav aria-label="Principal (mobile)" className="min-h-0 overflow-hidden">
          <div className="flex flex-col gap-1 px-5 pb-5 pt-2">
            {LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                {...(l.externo ? externo : {})}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-3 text-base font-medium text-cream-soft/90 transition-colors hover:bg-cream-soft/10 hover:text-yellow"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#participe"
              onClick={() => setOpen(false)}
              className="font-label mt-2 rounded-full bg-yellow px-5 py-3.5 text-center text-base uppercase tracking-wide text-blue-900"
            >
              Participe
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
