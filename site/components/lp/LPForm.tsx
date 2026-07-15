"use client";

import { useState } from "react";
import { track } from "@/lib/track";

type Estado = "idle" | "enviando" | "ok" | "erro";

export function LPForm({
  segmento,
  publico,
  tipoPadrao,
  formTitle,
  ctaLabel,
}: {
  segmento: string;
  publico: string;
  tipoPadrao: string;
  formTitle: string;
  ctaLabel: string;
}) {
  const [estado, setEstado] = useState<Estado>("idle");
  const [erros, setErros] = useState<Record<string, string>>({});

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
      tipo: tipoPadrao,
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

  const field =
    "w-full rounded-xl border border-ink/15 bg-surface px-4 py-3 text-ink placeholder:text-ink-soft/50 outline-none transition focus:border-[var(--accent)] focus:ring-4 focus:ring-[color-mix(in_srgb,var(--accent),transparent_88%)]";

  if (estado === "ok") {
    return (
      <div className="flex flex-col items-center rounded-3xl border border-ink/10 bg-surface p-8 text-center shadow-2xl">
        <div
          className="flex h-16 w-16 items-center justify-center rounded-full"
          style={{ background: "color-mix(in srgb, var(--accent), transparent 85%)" }}
        >
          <svg viewBox="0 0 24 24" className="h-8 w-8 text-[var(--accent-ink)]" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="mt-5 font-display text-2xl font-bold text-ink">Recebemos o seu cadastro!</h3>
        <p className="mt-2 text-ink-soft">
          Bem-vindo(a) ao movimento. Em breve entraremos em contato. <br />
          <span className="font-script text-xl text-red">O povo fala mais alto.</span>
        </p>
      </div>
    );
  }

  return (
    <div className="relative rounded-3xl border border-ink/10 bg-surface p-6 shadow-2xl sm:p-8">
      <div className="rs-bar absolute inset-x-8 top-0 h-1 rounded-full" />
      <h3 className="font-display text-xl font-bold text-ink">{formTitle}</h3>
      <form onSubmit={onSubmit} className="mt-5 space-y-4" noValidate>
        <div>
          <input name="nome" autoComplete="name" placeholder="Nome completo" className={field} aria-label="Nome completo" />
          {erros.nome && <p className="mt-1 text-sm text-red">{erros.nome}</p>}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <input name="email" type="email" autoComplete="email" placeholder="E-mail" className={field} aria-label="E-mail" />
            {erros.email && <p className="mt-1 text-sm text-red">{erros.email}</p>}
          </div>
          <div>
            <input name="telefone" inputMode="tel" autoComplete="tel" placeholder="WhatsApp" className={field} aria-label="WhatsApp" />
            {erros.telefone && <p className="mt-1 text-sm text-red">{erros.telefone}</p>}
          </div>
        </div>
        <div>
          <input name="cidade" autoComplete="address-level2" placeholder="Sua cidade no RS" className={field} aria-label="Cidade" />
          {erros.cidade && <p className="mt-1 text-sm text-red">{erros.cidade}</p>}
        </div>
        {erros.geral && <p className="text-sm text-red">{erros.geral}</p>}
        <button
          type="submit"
          disabled={estado === "enviando"}
          className="font-label w-full rounded-full px-6 py-4 text-base uppercase tracking-wide shadow-lg transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-70"
          style={{ background: "var(--accent)", color: "var(--on-accent)" }}
        >
          {estado === "enviando" ? "Enviando…" : `${ctaLabel} →`}
        </button>
        <p className="text-center text-xs text-ink-soft/70">
          Ao enviar, você concorda com o tratamento dos seus dados conforme a{" "}
          <a href="/privacidade" className="underline hover:text-blue">Política de Privacidade (LGPD)</a>.
        </p>
      </form>
    </div>
  );
}
