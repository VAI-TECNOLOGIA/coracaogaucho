"use client";

import { useId, useState } from "react";
import { track } from "@/lib/track";
import { cn } from "@/lib/utils";

type Estado = "idle" | "enviando" | "ok" | "erro";

/**
 * Cadastro das LPs segmentadas. Mesmos campos do formulário oficial.
 * Não envia mais `tipo`: todo cadastro público entra como APOIADOR. O segmento
 * continua sendo gravado para a equipe segmentar depois, dentro do /admin.
 */
export function LPForm({
  segmento,
  publico,
  formTitle,
  ctaLabel,
}: {
  segmento: string;
  publico: string;
  formTitle: string;
  ctaLabel: string;
}) {
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
      segmento,
      origem: `lp-${segmento}`,
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
      track("Lead", { segmento, content_name: publico });
      track("CompleteRegistration", { segmento });
      setEstado("ok");
    } catch {
      setErros({ geral: "Erro de conexão. Tente novamente." });
      setEstado("erro");
    }
  }

  const campo =
    "w-full rounded-xl border border-ink/15 bg-surface px-4 py-3.5 text-ink placeholder:text-ink-soft/50 outline-none transition focus:border-[var(--accent)] focus:ring-4 focus:ring-[color-mix(in_srgb,var(--accent),transparent_86%)] aria-[invalid=true]:border-red aria-[invalid=true]:ring-red/15";

  const campos = [
    { name: "nome", label: "Seu nome", type: "text", ac: "name", ph: "Nome completo", full: true },
    { name: "email", label: "Endereço de e-mail", type: "email", ac: "email", ph: "voce@email.com", full: true },
    { name: "telefone", label: "Seu telefone (WhatsApp)", type: "tel", ac: "tel", ph: "(51) 90000-0000", full: false },
    { name: "cidade", label: "Cidade", type: "text", ac: "address-level2", ph: "Sua cidade no RS", full: false },
  ] as const;

  if (estado === "ok") {
    return (
      <div
        role="status"
        className="flex flex-col items-center rounded-3xl border border-ink/10 bg-surface p-8 text-center shadow-xl shadow-blue-900/10"
      >
        <span
          className="flex h-16 w-16 items-center justify-center rounded-full"
          style={{ background: "color-mix(in srgb, var(--accent), transparent 85%)" }}
        >
          <svg viewBox="0 0 24 24" className="h-8 w-8 text-[var(--accent-ink)]" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden>
            <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h3 className="font-display mt-5 text-2xl text-ink">Cadastro recebido!</h3>
        <p className="mt-2 text-ink-soft">
          Obrigado por se somar ao Coração Gaúcho. Em breve entraremos em contato.
        </p>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-ink/10 bg-surface p-6 shadow-xl shadow-blue-900/10 sm:p-8">
      <div className="rs-bar absolute inset-x-0 top-0 h-1" />
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <h3 className="font-display text-2xl text-ink">{formTitle}</h3>
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
          className="font-label w-full rounded-full px-6 py-4 text-base uppercase tracking-wide shadow-lg transition-transform hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
          style={{ background: "var(--accent)", color: "var(--on-accent)" }}
        >
          {estado === "enviando" ? "Enviando…" : ctaLabel}
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
    </div>
  );
}
