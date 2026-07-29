"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { track } from "@/lib/track";
import { cn } from "@/lib/utils";
import lockup from "@/public/brand/coracao-gaucho-marca.png";

type Estado = "idle" | "enviando" | "ok" | "erro";

/**
 * Tela de entrada do APP (é o que o aplicativo carrega em coracaogaucho.vercel.app).
 * Enxuta e igual à /lp do sistema: lockup Coração Gaúcho + cadastro + acesso ao
 * sistema. Sem o site de marketing. O cadastro grava via /api/apoiar.
 */
export function AppEntry() {
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
      origem: "app",
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
      track("Lead", { content_name: "app" });
      track("CompleteRegistration", {});
      setEstado("ok");
    } catch {
      setErros({ geral: "Erro de conexão. Tente novamente." });
      setEstado("erro");
    }
  }

  const campo =
    "w-full rounded-2xl border border-cream-soft/20 bg-cream-soft/10 px-4 py-3.5 text-cream-soft placeholder:text-cream-soft/40 outline-none transition focus:border-yellow focus:ring-4 focus:ring-yellow/20 aria-[invalid=true]:border-red aria-[invalid=true]:ring-red/25";

  const campos = [
    { name: "nome", label: "Seu nome", type: "text", ac: "name", ph: "Nome completo", full: true },
    { name: "telefone", label: "Seu telefone (WhatsApp)", type: "tel", ac: "tel", ph: "(51) 90000-0000", full: true },
    { name: "cidade", label: "Cidade", type: "text", ac: "address-level2", ph: "Sua cidade no RS", full: false },
    { name: "email", label: "E-mail", type: "email", ac: "email", ph: "voce@email.com", full: false },
  ] as const;

  return (
    <main className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 py-12 text-cream-soft">
      {/* Fundo azul da marca */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(130%_110%_at_22%_20%,#0a58bd_0%,#004ca9_38%,#172d57_74%,#0b2247_100%)]"
      />
      <div aria-hidden className="rs-bar absolute inset-x-0 top-0 h-1.5" />

      <div className="w-full max-w-md">
        <Image
          src={lockup}
          alt="Coração Gaúcho"
          priority
          sizes="(max-width: 640px) 70vw, 300px"
          className="mx-auto mb-8 h-auto w-[min(70vw,280px)] drop-shadow-[0_12px_30px_rgba(0,0,0,0.35)]"
        />

        {estado === "ok" ? (
          <div className="rounded-3xl border border-cream-soft/15 bg-cream-soft/5 p-8 text-center" role="status">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-yellow/15">
              <svg viewBox="0 0 24 24" className="h-8 w-8 text-yellow" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden>
                <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <h1 className="font-display mt-5 text-2xl">Cadastro recebido!</h1>
            <p className="mt-2 text-cream-soft/75">Obrigado por participar. Em breve entraremos em contato.</p>
            <button
              type="button"
              onClick={() => setEstado("idle")}
              className="font-label mt-6 text-sm uppercase tracking-wide text-yellow underline underline-offset-4"
            >
              Fazer outro cadastro
            </button>
          </div>
        ) : (
          <>
            <h1 className="font-display text-center text-3xl">Faça parte</h1>
            <p className="mt-2 text-center text-cream-soft/75">
              Preencha seus dados para se cadastrar. Leva menos de um minuto.
            </p>

            <form onSubmit={onSubmit} className="mt-7 space-y-4" noValidate>
              <div className="grid gap-4 sm:grid-cols-2">
                {campos.map((c) => {
                  const id = `${uid}-${c.name}`;
                  const invalido = Boolean(erros[c.name]);
                  return (
                    <div key={c.name} className={cn(c.full && "sm:col-span-2")}>
                      <label className="mb-1.5 block text-sm font-medium text-cream-soft/90" htmlFor={id}>
                        {c.label} {(c.name === "nome" || c.name === "telefone") && <span className="text-yellow">*</span>}
                      </label>
                      <input
                        id={id}
                        name={c.name}
                        type={c.type}
                        inputMode={c.name === "telefone" ? "tel" : undefined}
                        autoComplete={c.ac}
                        placeholder={c.ph}
                        required={c.name === "nome" || c.name === "telefone"}
                        aria-invalid={invalido}
                        aria-describedby={invalido ? `${id}-erro` : undefined}
                        className={campo}
                      />
                      {invalido && (
                        <p id={`${id}-erro`} className="mt-1.5 text-sm text-yellow">
                          {erros[c.name]}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              {erros.geral && (
                <p role="alert" className="rounded-lg bg-red/20 px-3 py-2 text-sm text-cream-soft">
                  {erros.geral}
                </p>
              )}

              <button
                type="submit"
                disabled={estado === "enviando"}
                className="font-label w-full rounded-full bg-yellow px-6 py-4 text-base uppercase tracking-wide text-blue-900 shadow-xl shadow-blue-900/30 transition-transform hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream-soft active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {estado === "enviando" ? "Enviando…" : "Quero participar →"}
              </button>
            </form>
          </>
        )}

        <p className="mt-8 text-center text-sm text-cream-soft/70">
          É da equipe da pré-campanha?{" "}
          <a href="/admin/login" className="font-semibold text-yellow underline underline-offset-4">
            Entrar no sistema
          </a>
        </p>

        {/* Transparência e fontes oficiais — exigência das lojas para conteúdo eleitoral/governamental */}
        <p className="mt-10 text-center text-xs leading-relaxed text-cream-soft/50">
          Iniciativa da campanha Coração Gaúcho (Juliana Brizola e Edegar Pretto), mantida pela Vai
          Tecnologia LTDA. Não é um serviço oficial do governo nem afiliado a órgãos públicos.
          Informações eleitorais oficiais no{" "}
          <a
            href="https://www.tse.jus.br"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-cream-soft"
          >
            TSE (tse.jus.br)
          </a>{" "}
          e{" "}
          <a
            href="https://divulgacandcontas.tse.jus.br"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-cream-soft"
          >
            DivulgaCandContas
          </a>
          .
        </p>
      </div>
    </main>
  );
}
