"use client";

import { useId, useState } from "react";
import { track } from "@/lib/track";
import { PARTICIPACAO } from "@/lib/oficial";
import { cn } from "@/lib/utils";

type Estado = "idle" | "enviando" | "ok" | "erro";

/**
 * Cadastro público. Campos e chamada espelhados no formulário do site oficial.
 *
 * Só existe um perfil no público: APOIADOR. O seletor
 * Voluntário/Liderança/Doador foi removido — essa classificação passou a ser
 * atribuída pela equipe dentro do /admin, não escolhida pelo visitante.
 */
export function Participe() {
  const [estado, setEstado] = useState<Estado>("idle");
  const [erros, setErros] = useState<Record<string, string>>({});
  const uid = useId();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEstado("enviando");
    setErros({});
    const fd = new FormData(e.currentTarget);
    const payload = {
      nome: String(fd.get("nome") ?? ""),
      email: String(fd.get("email") ?? ""),
      telefone: String(fd.get("telefone") ?? ""),
      cidade: String(fd.get("cidade") ?? ""),
      origem: "site-institucional",
    };
    try {
      const res = await fetch("/api/apoiar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setErros(data.erros ?? { geral: data.error ?? "Não foi possível enviar." });
        setEstado("erro");
        return;
      }
      track("Lead", { content_name: "site-institucional" });
      track("CompleteRegistration", {});
      setEstado("ok");
    } catch {
      setErros({ geral: "Erro de conexão. Tente novamente." });
      setEstado("erro");
    }
  }

  const campo =
    "w-full rounded-xl border border-ink/15 bg-surface px-4 py-3.5 text-ink placeholder:text-ink-soft/50 outline-none transition focus:border-blue focus:ring-4 focus:ring-blue/15 aria-[invalid=true]:border-red aria-[invalid=true]:ring-red/15";

  const campos = [
    { name: "nome", label: "Seu nome", type: "text", ac: "name", ph: "Nome completo", full: true },
    { name: "email", label: "Endereço de e-mail", type: "email", ac: "email", ph: "voce@email.com", full: true },
    { name: "telefone", label: "Seu telefone (WhatsApp)", type: "tel", ac: "tel", ph: "(51) 90000-0000", full: false },
    { name: "cidade", label: "Cidade", type: "text", ac: "address-level2", ph: "Sua cidade no RS", full: false },
  ] as const;

  return (
    <section id="participe" className="scroll-mt-20 bg-cream-soft py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_1.05fr]">
        <div>
          <h2 className="font-display text-3xl leading-tight text-blue-900 text-balance sm:text-4xl lg:text-5xl">
            {PARTICIPACAO.titulo}
          </h2>
          <div className="rs-bar mt-7 h-1.5 w-28 rounded-full" />
          <div className="mt-7 space-y-1">
            {PARTICIPACAO.linhas.map((l) => (
              <p key={l} className="font-display text-xl text-ink sm:text-2xl">
                {l}
              </p>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-ink/10 bg-surface p-6 shadow-xl shadow-blue-900/10 sm:p-8">
          <div className="rs-bar absolute inset-x-0 top-0 h-1" />

          {estado === "ok" ? (
            <div className="flex flex-col items-center py-12 text-center" role="status">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-green/10">
                <svg viewBox="0 0 24 24" className="h-8 w-8 text-green" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden>
                  <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <h3 className="font-display mt-5 text-2xl text-ink">Cadastro recebido!</h3>
              <p className="mt-2 text-ink-soft">
                Obrigado por se somar ao Confia+ RS. Em breve entraremos em contato.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4" noValidate>
              <h3 className="font-display text-2xl text-ink">Participe!</h3>
              <p className="-mt-2 text-sm text-ink-soft/80">
                <span aria-hidden>*</span> indica preenchimento obrigatório
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                {campos.map((c) => {
                  const id = `${uid}-${c.name}`;
                  const invalido = Boolean(erros[c.name]);
                  return (
                    <div key={c.name} className={cn(c.full && "sm:col-span-2")}>
                      <label className="mb-1.5 block text-sm font-medium text-ink" htmlFor={id}>
                        {c.label} <span className="text-red">*</span>
                      </label>
                      <input
                        id={id}
                        name={c.name}
                        type={c.type}
                        inputMode={c.name === "telefone" ? "tel" : undefined}
                        autoComplete={c.ac}
                        placeholder={c.ph}
                        required
                        aria-invalid={invalido}
                        aria-describedby={invalido ? `${id}-erro` : undefined}
                        className={campo}
                      />
                      {invalido && (
                        <p id={`${id}-erro`} className="mt-1.5 text-sm text-red">
                          {erros[c.name]}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              {erros.geral && (
                <p role="alert" className="rounded-lg bg-red/5 px-3 py-2 text-sm text-red">
                  {erros.geral}
                </p>
              )}

              <button
                type="submit"
                disabled={estado === "enviando"}
                className="font-label mt-2 w-full rounded-full bg-red px-6 py-4 text-base uppercase tracking-wide text-cream-soft shadow-lg shadow-red/25 transition-transform hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {estado === "enviando" ? "Enviando…" : "Quero participar"}
              </button>

              <p className="text-center text-xs leading-relaxed text-ink-soft/70">
                Ao enviar, você concorda com o tratamento dos seus dados conforme a{" "}
                <a
                  href="/politica-de-privacidade"
                  className="underline underline-offset-2 hover:text-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
                >
                  Política de Privacidade
                </a>{" "}
                (LGPD).
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
