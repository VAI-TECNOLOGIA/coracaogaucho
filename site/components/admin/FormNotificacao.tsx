"use client";

import { useState, useTransition, type FormEvent } from "react";
import { enviarNotificacao } from "@/app/admin/(painel)/notificacoes/actions";

export function FormNotificacao({ dispositivos, souAdmin }: { dispositivos: number; souAdmin: boolean }) {
  const [pending, startTransition] = useTransition();
  const [resultado, setResultado] = useState<string | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const titulo = String(fd.get("titulo") ?? "");
    const mensagem = String(fd.get("mensagem") ?? "");
    const url = String(fd.get("url") ?? "");

    if (!window.confirm(`Enviar esta notificação para ${dispositivos} dispositivo(s)?`)) return;

    setResultado(null);
    setErro(null);
    startTransition(async () => {
      const r = await enviarNotificacao(titulo, mensagem, url);
      if (r.ok) {
        setResultado(
          `Enviado: ${r.enviados} · tokens expirados desativados: ${r.invalidos} · falhas: ${r.falhas}`,
        );
        form.reset();
      } else {
        setErro(r.error ?? "Falha no envio.");
      }
    });
  }

  const inputCls =
    "w-full rounded-lg border border-ink/15 bg-surface px-3 py-2.5 text-sm text-ink outline-none focus:border-blue focus:ring-2 focus:ring-blue/10";
  const labelCls = "mb-1 block text-xs font-medium text-ink-soft";

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-ink/10 bg-surface p-6 shadow-sm">
      <div className="grid gap-4">
        <div>
          <label htmlFor="nt-titulo" className={labelCls}>Título *</label>
          <input id="nt-titulo" name="titulo" required maxLength={80} className={inputCls} placeholder="Ex.: Juliana e Edegar hoje em Caxias!" />
        </div>
        <div>
          <label htmlFor="nt-mensagem" className={labelCls}>Mensagem *</label>
          <textarea id="nt-mensagem" name="mensagem" required rows={3} maxLength={240} className={inputCls} placeholder="Texto curto que aparece na notificação." />
        </div>
        <div>
          <label htmlFor="nt-url" className={labelCls}>Link ao tocar (opcional)</label>
          <input id="nt-url" name="url" type="url" className={inputCls} placeholder="https://coracaogaucho.vercel.app/..." />
        </div>
      </div>

      {resultado && <p className="mt-3 text-sm font-medium text-green-900">✓ {resultado}</p>}
      {erro && <p className="mt-3 text-sm text-red">{erro}</p>}

      <button
        type="submit"
        disabled={pending || !souAdmin || dispositivos === 0}
        className="font-label mt-5 rounded-full bg-blue px-6 py-2.5 text-sm uppercase tracking-wide text-cream-soft shadow-md transition-transform hover:scale-[1.02] disabled:opacity-50"
      >
        {pending ? "Enviando..." : `Enviar para ${dispositivos} dispositivo(s)`}
      </button>
      {!souAdmin && (
        <p className="mt-2 text-xs text-ink-soft/70">Apenas administradores podem enviar.</p>
      )}
    </form>
  );
}
