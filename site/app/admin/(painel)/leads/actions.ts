"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { getSessao } from "@/lib/auth";
import { STATUS_KEYS } from "@/lib/crm";

export async function atualizarStatus(id: string, status: string) {
  const sessao = await getSessao();
  if (!sessao) return { ok: false, error: "Não autorizado." };
  if (!STATUS_KEYS.includes(status as never)) return { ok: false, error: "Status inválido." };

  await prisma.lead.update({ where: { id }, data: { status } });
  revalidatePath("/admin/leads");
  revalidatePath("/admin/funil");
  revalidatePath("/admin");
  return { ok: true };
}
