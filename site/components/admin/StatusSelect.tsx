"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { STATUS, statusCor } from "@/lib/crm";
import { atualizarStatus } from "@/app/admin/(painel)/leads/actions";

export function StatusSelect({ id, status }: { id: string; status: string }) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <select
      value={status}
      disabled={pending}
      onChange={(e) => {
        const novo = e.target.value;
        startTransition(async () => {
          await atualizarStatus(id, novo);
          router.refresh();
        });
      }}
      className="rounded-full border-0 py-1 pl-2 pr-6 text-xs font-semibold text-cream-soft outline-none focus:ring-2 focus:ring-blue/30 disabled:opacity-50"
      style={{ background: statusCor(status) }}
      aria-label="Status do lead"
    >
      {STATUS.map((s) => (
        <option key={s.key} value={s.key} className="bg-surface text-ink">
          {s.label}
        </option>
      ))}
    </select>
  );
}
