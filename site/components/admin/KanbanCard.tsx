"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { STATUS_KEYS } from "@/lib/crm";
import { atualizarStatus } from "@/app/admin/(painel)/leads/actions";

export function KanbanCard({
  id,
  nome,
  cidade,
  segmento,
  status,
}: {
  id: string;
  nome: string;
  cidade: string;
  segmento: string;
  status: string;
}) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const idx = STATUS_KEYS.indexOf(status as never);

  const mover = (delta: number) => {
    const novo = STATUS_KEYS[idx + delta];
    if (!novo) return;
    startTransition(async () => {
      await atualizarStatus(id, novo);
      router.refresh();
    });
  };

  return (
    <div className={`rounded-xl border border-ink/10 bg-surface p-3 shadow-sm transition ${pending ? "opacity-50" : ""}`}>
      <p className="text-sm font-semibold text-ink">{nome}</p>
      <p className="text-xs text-ink-soft">{cidade}</p>
      <div className="mt-2 flex items-center justify-between">
        <span className="rounded bg-ink/5 px-1.5 py-0.5 text-[10px] text-ink-soft">{segmento}</span>
        <div className="flex gap-1">
          <button
            onClick={() => mover(-1)}
            disabled={pending || idx <= 0}
            className="flex h-6 w-6 items-center justify-center rounded-md border border-ink/10 text-ink-soft hover:bg-ink/5 disabled:opacity-30"
            aria-label="Estágio anterior"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => mover(1)}
            disabled={pending || idx >= STATUS_KEYS.length - 1}
            className="flex h-6 w-6 items-center justify-center rounded-md border border-ink/10 text-ink-soft hover:bg-ink/5 disabled:opacity-30"
            aria-label="Próximo estágio"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
