import { Logo } from "./Logo";
import { REDES, SITE_OFICIAL, CHAMADO } from "@/lib/oficial";

const SISTEMA_URL = process.env.NEXT_PUBLIC_SISTEMA_URL ?? "https://coracaogaucho.vai-sistema.com";

/** Ícones de traço/sólidos próprios — nunca emoji de sistema. */
const ICONES: Record<string, string> = {
  Instagram:
    "M12 2.2c3.2 0 3.6 0 4.9.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.86s0 3.6-.07 4.86c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.86.07s-3.6 0-4.86-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.6 2.2 15.2 2.2 12s0-3.6.07-4.86c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.4 2.21 8.8 2.2 12 2.2Zm0 3.05A6.75 6.75 0 1 0 18.75 12 6.75 6.75 0 0 0 12 5.25Zm0 11.13A4.38 4.38 0 1 1 16.38 12 4.38 4.38 0 0 1 12 16.38Zm6.99-11.4a1.58 1.58 0 1 1-1.58-1.57 1.58 1.58 0 0 1 1.58 1.57Z",
  Facebook:
    "M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z",
  TikTok:
    "M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 1 1-1.79-2.46V9.79a5.77 5.77 0 1 0 4.88 5.7V9.4a7.35 7.35 0 0 0 4.3 1.38V7.7a4.29 4.29 0 0 1-3.24-1.88Z",
  YouTube:
    "M23.5 6.5a3.02 3.02 0 0 0-2.12-2.14C19.5 3.85 12 3.85 12 3.85s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.5 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.5 3.02 3.02 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.5ZM9.6 15.6V8.4l6.2 3.6Z",
};

const COLUNAS = [
  {
    t: "Movimento",
    l: [
      { nome: "Coração Gaúcho", href: "/#movimento" },
      { nome: "Juliana Brizola", href: "/#juliana" },
      { nome: "Trajetória", href: `${SITE_OFICIAL}/trajetoria/`, externo: true },
      { nome: "Notícias", href: `${SITE_OFICIAL}/noticias/`, externo: true },
    ],
  },
  {
    t: "Participe",
    l: [
      { nome: "Faça parte", href: "/#participe" },
      { nome: "Site oficial", href: SITE_OFICIAL, externo: true },
      { nome: "Fale conosco", href: "mailto:contato@coracaogaucho.com.br" },
    ],
  },
  {
    t: "Institucional",
    l: [
      { nome: "Política de Privacidade", href: "/politica-de-privacidade" },
      { nome: "Termos de Uso", href: "/termos-de-uso" },
      { nome: "Excluir conta", href: "/excluir-conta" },
      { nome: "Excluir dados", href: "/excluir-dados" },
      { nome: "Sistema do movimento", href: SISTEMA_URL, externo: true },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="bg-blue-900 text-cream-soft/80">
      <div className="rs-bar h-1.5 w-full" />
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo variant="chapa" tone="escuro" size="md" />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-cream-soft/60">{CHAMADO.texto}</p>

          <div className="mt-7 flex gap-3">
            {REDES.map((s) => (
              <a
                key={s.nome}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${s.nome} — Juliana Brizola`}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-cream-soft/15 text-cream-soft/70 transition-colors hover:border-yellow/50 hover:bg-cream-soft/10 hover:text-yellow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                  <path d={ICONES[s.nome]} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {COLUNAS.map((col) => (
          <nav key={col.t} aria-label={col.t}>
            <h2 className="font-label text-xs uppercase tracking-[0.18em] text-yellow">{col.t}</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {col.l.map((item) => (
                <li key={item.nome}>
                  <a
                    href={item.href}
                    {...("externo" in item && item.externo
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="rounded-sm text-cream-soft/65 transition-colors hover:text-cream-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow"
                  >
                    {item.nome}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-cream-soft/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-6 text-xs text-cream-soft/50 sm:flex-row sm:px-8">
          <p>© {new Date().getFullYear()} Coração Gaúcho. Todos os direitos reservados.</p>
          <p>Juliana Brizola e Edegar Pretto</p>
        </div>
      </div>
    </footer>
  );
}
