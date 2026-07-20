import { Wordmark } from "./Wordmark";

// url vazia = ícone não aparece. Preencher quando a campanha passar os perfis oficiais —
// links mortos (href="#") reprovam o app na revisão da Play Store.
const SOCIAIS: { nome: string; url: string; path: string }[] = [
  { nome: "Instagram", url: "", path: "M12 2.2c3.2 0 3.6 0 4.9.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.86s0 3.6-.07 4.86c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.86.07s-3.6 0-4.86-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.6 2.2 15.2 2.2 12s0-3.6.07-4.86c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.4 2.21 8.8 2.2 12 2.2Zm0 3.05A6.75 6.75 0 1 0 18.75 12 6.75 6.75 0 0 0 12 5.25Zm0 11.13A4.38 4.38 0 1 1 16.38 12 4.38 4.38 0 0 1 12 16.38Zm6.99-11.4a1.58 1.58 0 1 1-1.58-1.57 1.58 1.58 0 0 1 1.58 1.57Z" },
  { nome: "Facebook", url: "", path: "M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" },
  { nome: "YouTube", url: "", path: "M23.5 6.5a3.02 3.02 0 0 0-2.12-2.14C19.5 3.85 12 3.85 12 3.85s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.5 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.5 3.02 3.02 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.5ZM9.6 15.6V8.4l6.2 3.6Z" },
].filter((s) => s.url);

export function Footer() {
  return (
    <footer className="bg-blue-900 text-cream-soft/80">
      <div className="rs-bar h-1.5 w-full" />
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Wordmark size="md" tone="cream" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream-soft/60">
            Um movimento pelo Rio Grande do Sul. Juliana Brizola e Edegar Pretto — porque o povo fala
            mais alto.
          </p>
          {SOCIAIS.length > 0 && (
            <div className="mt-6 flex gap-3">
              {SOCIAIS.map((s) => (
                <a
                  key={s.nome}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.nome}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-cream-soft/15 transition-colors hover:bg-cream-soft/10"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          )}
        </div>

        {[
          {
            t: "Movimento",
            l: [
              { nome: "O que nos move", href: "/#movimento" },
              { nome: "Propostas", href: "/#propostas" },
              { nome: "Quem somos", href: "/#candidatos" },
              { nome: "Pelo RS", href: "/#regioes" },
            ],
          },
          {
            t: "Participe",
            l: [
              { nome: "Some-se", href: "/#some-se" },
              { nome: "Seja voluntário", href: "/lp/voluntarios" },
              { nome: "Campanhas por público", href: "/lp" },
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
              { nome: "Sistema da campanha", href: "https://coracaogaucho.vai-sistema.com" },
            ],
          },
        ].map((col) => (
          <div key={col.t}>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wide text-yellow">
              {col.t}
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {col.l.map((item) => (
                <li key={item.nome} className={item.href.includes("vai-sistema") ? "cg-sistema-link" : undefined}>
                  <a
                    href={item.href}
                    className="text-cream-soft/60 transition-colors hover:text-cream-soft"
                  >
                    {item.nome}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-cream-soft/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-xs text-cream-soft/50 sm:flex-row sm:px-8">
          <p>© {new Date().getFullYear()} Coração Gaúcho. Todos os direitos reservados.</p>
          <p>Feito com o povo, para o povo. 🟢🔴🟡</p>
        </div>
      </div>
    </footer>
  );
}
