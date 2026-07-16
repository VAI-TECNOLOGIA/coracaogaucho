"use server";

import { revalidatePath } from "next/cache";
import { getSessao } from "@/lib/auth";
import { enviarPushParaTodos, pushConfigurado } from "@/lib/push";

export async function enviarNotificacao(titulo: string, mensagem: string, url: string) {
  const sessao = await getSessao();
  if (!sessao) return { ok: false as const, error: "Não autorizado." };
  if (sessao.papel !== "ADMIN")
    return { ok: false as const, error: "Apenas administradores podem enviar notificações." };
  if (!pushConfigurado())
    return { ok: false as const, error: "FIREBASE_SERVICE_ACCOUNT não configurada no servidor." };

  const t = titulo.trim();
  const m = mensagem.trim();
  if (t.length < 3) return { ok: false as const, error: "Informe um título." };
  if (m.length < 3) return { ok: false as const, error: "Informe a mensagem." };

  try {
    const r = await enviarPushParaTodos({ titulo: t, mensagem: m, url: url.trim() || undefined });
    revalidatePath("/admin/notificacoes");
    return { ok: true as const, ...r };
  } catch (e) {
    return { ok: false as const, error: e instanceof Error ? e.message : "Falha no envio." };
  }
}
