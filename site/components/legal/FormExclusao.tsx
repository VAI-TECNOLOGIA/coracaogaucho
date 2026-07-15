"use client";

import { useState, type FormEvent } from "react";

/**
 * Formulário público de solicitação LGPD — usado em /excluir-conta (EXCLUSAO_CONTA)
 * e /excluir-dados (EXCLUSAO_DADOS). Registra a solicitação via /api/privacidade/solicitar
 * e devolve um protocolo ao titular.
 */
export function FormExclusao({ tipo }: { tipo: "EXCLUSAO_CONTA" | "EXCLUSAO_DADOS" }) {
  const [enviando, setEnviando] = useState(false);
  const [protocolo, setProtocolo] = useState<string | null>(null);
  const [erros, setErros] = useState<Record<string, string>>({});
  const [erroGeral, setErroGeral] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEnviando(true);
    setErros({});
    setErroGeral(null);

    const fd = new FormData(e.currentTarget);
    const payload = {
      tipo,
      nome: String(fd.get("nome") ?? ""),
      email: String(fd.get("email") ?? ""),
      telefone: String(fd.get("telefone") ?? ""),
      detalhes: String(fd.get("detalhes") ?? ""),
      website: String(fd.get("website") ?? ""), // honeypot
    };

    try {
      const res = await fetch("/api/privacidade/solicitar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.ok) {
        setProtocolo(data.protocolo);
      } else if (data.erros) {
        setErros(data.erros);
      } else {
        setErroGeral(data.error ?? "Não foi possível enviar agora. Tente novamente.");
      }
    } catch {
      setErroGeral("Falha de conexão. Verifique sua internet e tente novamente.");
    } finally {
      setEnviando(false);
    }
  }

  if (protocolo) {
    return (
      <div className="rounded-2xl border border-green/30 bg-green/5 p-6">
        <p className="font-display text-lg font-bold text-green-900">Solicitação registrada ✓</p>
        <p className="mt-2 text-sm text-ink-soft">
          Seu protocolo é <strong className="text-ink">{protocolo}</strong>. Nossa equipe de
          privacidade vai processar o pedido em até <strong>5 dias úteis</strong>
          {tipo === "EXCLUSAO_DADOS" && " (até 15 dias para análises específicas, conforme a LGPD)"}
          . Guarde este número para acompanhar pelo e-mail{" "}
          <strong>privacidade@coracaogaucho.com.br</strong>.
        </p>
      </div>
    );
  }

  const inputCls =
    "w-full rounded-lg border border-ink/15 bg-surface px-3 py-2.5 text-sm text-ink outline-none focus:border-blue focus:ring-2 focus:ring-blue/10";
  const labelCls = "mb-1 block text-xs font-medium text-ink-soft";
  const erroCls = "mt-1 text-xs text-red";

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-ink/10 bg-surface p-6 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="exc-nome" className={labelCls}>
            Nome completo
          </label>
          <input id="exc-nome" name="nome" autoComplete="name" className={inputCls} />
        </div>
        <div>
          <label htmlFor="exc-email" className={labelCls}>
            E-mail usado no cadastro *
          </label>
          <input
            id="exc-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputCls}
          />
          {erros.email && <p className={erroCls}>{erros.email}</p>}
        </div>
        <div>
          <label htmlFor="exc-telefone" className={labelCls}>
            Telefone usado no cadastro (opcional)
          </label>
          <input
            id="exc-telefone"
            name="telefone"
            type="tel"
            autoComplete="tel"
            className={inputCls}
          />
        </div>
        {tipo === "EXCLUSAO_DADOS" && (
          <div className="sm:col-span-2">
            <label htmlFor="exc-detalhes" className={labelCls}>
              Quais dados você quer excluir? *
            </label>
            <textarea
              id="exc-detalhes"
              name="detalhes"
              rows={3}
              placeholder="Ex.: meu telefone e meu tema de interesse"
              className={inputCls}
            />
            {erros.detalhes && <p className={erroCls}>{erros.detalhes}</p>}
          </div>
        )}
        {/* Honeypot anti-bot — invisível para humanos */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />
      </div>

      {erroGeral && <p className={`${erroCls} mt-3`}>{erroGeral}</p>}

      <button
        type="submit"
        disabled={enviando}
        className="font-label mt-5 inline-flex items-center justify-center rounded-full bg-red px-6 py-2.5 text-sm uppercase tracking-wide text-cream-soft shadow-md transition-transform hover:scale-[1.02] disabled:opacity-60"
      >
        {enviando
          ? "Enviando..."
          : tipo === "EXCLUSAO_CONTA"
            ? "Solicitar exclusão da conta"
            : "Solicitar exclusão dos dados"}
      </button>
      <p className="mt-3 text-xs text-ink-soft/70">
        {tipo === "EXCLUSAO_CONTA"
          ? "A exclusão é permanente e irreversível. Registraremos seu pedido e confirmaremos a conclusão."
          : "Seu cadastro é mantido; apenas os dados indicados são removidos."}
      </p>
    </form>
  );
}
