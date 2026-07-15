"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Wordmark } from "@/components/Wordmark";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/admin";
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErro("");
    setCarregando(true);
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: fd.get("email"), senha: fd.get("senha") }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErro(data.error ?? "Falha no login.");
        setCarregando(false);
        return;
      }
      router.replace(next);
      router.refresh();
    } catch {
      setErro("Erro de conexão. Tente novamente.");
      setCarregando(false);
    }
  }

  const field =
    "w-full rounded-xl border border-ink/15 bg-surface px-4 py-3 text-ink placeholder:text-ink-soft/50 outline-none transition focus:border-blue focus:ring-4 focus:ring-blue/10";

  return (
    <form onSubmit={onSubmit} className="w-full max-w-sm space-y-4">
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">E-mail</label>
        <input id="email" name="email" type="email" autoComplete="username" placeholder="voce@coracaogaucho.com.br" className={field} required />
      </div>
      <div>
        <label htmlFor="senha" className="mb-1.5 block text-sm font-medium text-ink">Senha</label>
        <input id="senha" name="senha" type="password" autoComplete="current-password" placeholder="••••••••" className={field} required />
      </div>
      {erro && <p className="rounded-lg bg-red/10 px-3 py-2 text-sm text-red">{erro}</p>}
      <button
        type="submit"
        disabled={carregando}
        className="font-label w-full rounded-full bg-blue px-6 py-3.5 text-base uppercase tracking-wide text-cream-soft shadow-lg shadow-blue/25 transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-70"
      >
        {carregando ? "Entrando…" : "Entrar no painel"}
      </button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Painel de marca */}
      <div className="relative hidden overflow-hidden bg-blue-900 lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="rs-bar absolute inset-x-0 top-0 h-1.5" />
        <div className="rs-stripe pointer-events-none absolute -right-24 -bottom-24 h-96 w-96 rotate-45 rounded-[40%] opacity-10" />
        <Wordmark size="md" tone="cream" />
        <div className="relative">
          <h1 className="font-display text-4xl font-bold leading-tight text-cream-soft">
            Painel do <span className="rs-text-gradient">Movimento</span>
          </h1>
          <p className="mt-3 max-w-sm text-cream-soft/70">
            Central de gestão da campanha. Leads, funil, equipe e inteligência — tudo em um só lugar.
          </p>
        </div>
        <p className="relative font-script text-2xl text-yellow">O povo fala mais alto.</p>
      </div>

      {/* Formulário */}
      <div className="flex flex-col items-center justify-center bg-cream px-6 py-12">
        <div className="mb-8 lg:hidden">
          <Wordmark size="sm" tone="green" />
        </div>
        <div className="w-full max-w-sm">
          <h2 className="font-display text-3xl font-bold text-ink">Bem-vindo(a) de volta</h2>
          <p className="mt-2 text-ink-soft">Acesse o painel da campanha Coração Gaúcho.</p>
        </div>
        <div className="mt-8 flex w-full max-w-sm justify-center">
          <Suspense fallback={<div className="h-64" />}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
