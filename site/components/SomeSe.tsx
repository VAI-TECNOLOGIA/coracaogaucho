"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type Estado = "idle" | "enviando" | "ok" | "erro";

const TIPOS = [
  { v: "voluntario", label: "Voluntário" },
  { v: "apoiador", label: "Apoiador" },
  { v: "lideranca", label: "Liderança" },
  { v: "doador", label: "Doador" },
];

export function SomeSe() {
  const [estado, setEstado] = useState<Estado>("idle");
  const [erros, setErros] = useState<Record<string, string>>({});
  const [tipo, setTipo] = useState("voluntario");

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
      tipo,
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
      setEstado("ok");
    } catch {
      setErros({ geral: "Erro de conexão. Tente novamente." });
      setEstado("erro");
    }
  }

  const field =
    "w-full rounded-xl border border-ink/15 bg-surface px-4 py-3 text-ink placeholder:text-ink-soft/50 outline-none transition focus:border-blue focus:ring-4 focus:ring-blue/10";

  return (
    <section id="some-se" className="relative overflow-hidden bg-cream py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_1.05fr]">
        {/* Texto */}
        <div>
          <p className="font-label mb-4 text-xs uppercase tracking-[0.25em] text-red">
            Some-se ao movimento
          </p>
          <h2 className="font-display text-4xl font-bold leading-tight text-ink text-balance sm:text-5xl">
            Sua voz faz parte <br />
            <span className="rs-text-gradient">dessa história.</span>
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
            Cada gaúcho que se soma nos deixa mais fortes. Cadastre-se, receba novidades e ajude a
            levar o Coração Gaúcho para a sua rua.
          </p>
          <ul className="mt-8 space-y-3">
            {["Participe das ações na sua região", "Receba conteúdos oficiais em primeira mão", "Ajude a construir as propostas"].map(
              (t) => (
                <li key={t} className="flex items-center gap-3 text-ink-soft">
                  <span className="rs-bar h-2.5 w-2.5 shrink-0 rounded-full" />
                  {t}
                </li>
              ),
            )}
          </ul>
        </div>

        {/* Formulário */}
        <div className="relative rounded-3xl border border-ink/10 bg-surface p-6 shadow-2xl shadow-blue/10 sm:p-8">
          <div className="rs-bar absolute inset-x-8 top-0 h-1 rounded-full" />
          {estado === "ok" ? (
            <div className="flex flex-col items-center py-12 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green/10">
                <svg viewBox="0 0 24 24" className="h-8 w-8 text-green" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="mt-5 font-display text-2xl font-bold text-ink">Bem-vindo(a) ao movimento!</h3>
              <p className="mt-2 text-ink-soft">
                Seu cadastro foi recebido. Em breve entraremos em contato. <br />
                <span className="font-script text-xl text-red">O povo fala mais alto.</span>
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4" noValidate>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink" htmlFor="nome">Nome completo</label>
                <input id="nome" name="nome" autoComplete="name" placeholder="Como você quer ser chamado(a)" className={field} />
                {erros.nome && <p className="mt-1 text-sm text-red">{erros.nome}</p>}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-ink" htmlFor="email">E-mail</label>
                  <input id="email" name="email" type="email" autoComplete="email" placeholder="voce@email.com" className={field} />
                  {erros.email && <p className="mt-1 text-sm text-red">{erros.email}</p>}
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-ink" htmlFor="telefone">WhatsApp</label>
                  <input id="telefone" name="telefone" inputMode="tel" autoComplete="tel" placeholder="(51) 90000-0000" className={field} />
                  {erros.telefone && <p className="mt-1 text-sm text-red">{erros.telefone}</p>}
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink" htmlFor="cidade">Cidade</label>
                <input id="cidade" name="cidade" autoComplete="address-level2" placeholder="Sua cidade no RS" className={field} />
                {erros.cidade && <p className="mt-1 text-sm text-red">{erros.cidade}</p>}
              </div>

              <div>
                <span className="mb-1.5 block text-sm font-medium text-ink">Quero participar como</span>
                <div className="flex flex-wrap gap-2">
                  {TIPOS.map((t) => (
                    <button
                      type="button"
                      key={t.v}
                      onClick={() => setTipo(t.v)}
                      className={cn(
                        "rounded-full border px-4 py-2 text-sm font-medium transition",
                        tipo === t.v
                          ? "border-blue bg-blue text-cream-soft"
                          : "border-ink/15 bg-surface text-ink-soft hover:border-blue/40",
                      )}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {erros.geral && <p className="text-sm text-red">{erros.geral}</p>}

              <button
                type="submit"
                disabled={estado === "enviando"}
                className="font-label mt-2 w-full rounded-full bg-red px-6 py-4 text-base uppercase tracking-wide text-cream-soft shadow-lg shadow-red/25 transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-70"
              >
                {estado === "enviando" ? "Enviando…" : "Quero fazer parte →"}
              </button>
              <p className="text-center text-xs text-ink-soft/70">
                Ao enviar, você concorda com o tratamento dos seus dados conforme a{" "}
                <a href="/politica-de-privacidade" className="underline hover:text-blue">Política de Privacidade (LGPD)</a>.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
