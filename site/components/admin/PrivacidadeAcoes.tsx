"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  processarExclusaoConta,
  processarExclusaoDados,
  recusarSolicitacao,
} from "@/app/admin/(painel)/privacidade/actions";

const CAMPOS = [
  { key: "telefone", label: "Telefone" },
  { key: "cidade", label: "Cidade" },
  { key: "segmento", label: "Segmento/interesse" },
  { key: "observacao", label: "Observações" },
];

export function PrivacidadeAcoes({
  id,
  tipo,
  souAdmin,
}: {
  id: string;
  tipo: string;
  souAdmin: boolean;
}) {
  const [pending, startTransition] = useTransition();
  const [erro, setErro] = useState<string | null>(null);
  const [campos, setCampos] = useState<string[]>(["telefone"]);
  const router = useRouter();

  if (!souAdmin) {
    return (
      <p className="text-xs text-ink-soft/70">
        Apenas administradores podem processar esta solicitação.
      </p>
    );
  }

  function rodar(fn: () => Promise<{ ok: boolean; error?: string }>) {
    setErro(null);
    startTransition(async () => {
      const r = await fn();
      if (!r.ok) setErro(r.error ?? "Falha ao processar.");
      router.refresh();
    });
  }

  const btn =
    "font-label rounded-full px-4 py-2 text-xs uppercase tracking-wide text-cream-soft shadow-sm transition-transform hover:scale-[1.02] disabled:opacity-50";

  return (
    <div className="mt-4 border-t border-ink/10 pt-4">
      {tipo === "EXCLUSAO_DADOS" && (
        <div className="mb-3 flex flex-wrap gap-3">
          {CAMPOS.map((c) => (
            <label key={c.key} className="flex items-center gap-1.5 text-xs text-ink-soft">
              <input
                type="checkbox"
                checked={campos.includes(c.key)}
                onChange={(e) =>
                  setCampos((prev) =>
                    e.target.checked ? [...prev, c.key] : prev.filter((x) => x !== c.key),
                  )
                }
                className="h-3.5 w-3.5 accent-[#004ca9]"
              />
              {c.label}
            </label>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {tipo === "EXCLUSAO_CONTA" ? (
          <button
            disabled={pending}
            onClick={() => {
              if (
                window.confirm(
                  "Excluir PERMANENTEMENTE todos os cadastros deste titular (e conta de equipe, se houver)? Esta ação é irreversível.",
                )
              )
                rodar(() => processarExclusaoConta(id));
            }}
            className={`${btn} bg-red`}
          >
            {pending ? "Excluindo..." : "Excluir dados do titular"}
          </button>
        ) : (
          <button
            disabled={pending}
            onClick={() => {
              if (window.confirm(`Limpar os campos selecionados (${campos.join(", ")}) deste titular?`))
                rodar(() => processarExclusaoDados(id, campos));
            }}
            className={`${btn} bg-red`}
          >
            {pending ? "Limpando..." : "Limpar campos selecionados"}
          </button>
        )}
        <button
          disabled={pending}
          onClick={() => {
            const motivo = window.prompt(
              "Motivo da recusa (será registrado na solicitação):",
              "Não foi possível verificar a identidade do solicitante.",
            );
            if (motivo !== null) rodar(() => recusarSolicitacao(id, motivo));
          }}
          className={`${btn} bg-ink/50`}
        >
          Recusar
        </button>
      </div>

      {erro && <p className="mt-2 text-xs text-red">{erro}</p>}
    </div>
  );
}
