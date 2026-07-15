"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { getSessao } from "@/lib/auth";
import {
  excluirDadosDoTitular,
  limparCamposDoTitular,
  CAMPOS_ESPECIFICOS,
  type CampoEspecifico,
} from "@/lib/privacidade";

/**
 * Ações da fila LGPD. Executar exclusões é restrito a ADMIN — coordenadores e
 * voluntários enxergam a fila, mas não apagam dados.
 */

async function exigirAdmin() {
  const sessao = await getSessao();
  if (!sessao) return { erro: "Não autorizado." };
  if (sessao.papel !== "ADMIN") return { erro: "Apenas administradores podem processar exclusões." };
  return { sessao };
}

function revalidar() {
  revalidatePath("/admin/privacidade");
  revalidatePath("/admin/leads");
  revalidatePath("/admin/funil");
  revalidatePath("/admin");
}

export async function processarExclusaoConta(id: string) {
  const auth = await exigirAdmin();
  if ("erro" in auth) return { ok: false, error: auth.erro };

  const sol = await prisma.solicitacaoPrivacidade.findUnique({ where: { id } });
  if (!sol || sol.status !== "PENDENTE" || sol.tipo !== "EXCLUSAO_CONTA") {
    return { ok: false, error: "Solicitação não encontrada ou já processada." };
  }

  const resultado = await excluirDadosDoTitular(sol.email, sol.telefone);
  await prisma.solicitacaoPrivacidade.update({
    where: { id },
    data: {
      status: "CONCLUIDA",
      resolucao: `${resultado.leadsExcluidos} cadastro(s) excluído(s)${
        resultado.contaEquipeExcluida ? ", conta de equipe excluída" : ""
      }.`,
      processadoEm: new Date(),
      processadoPor: auth.sessao.email,
    },
  });

  revalidar();
  return { ok: true, ...resultado };
}

export async function processarExclusaoDados(id: string, campos: string[]) {
  const auth = await exigirAdmin();
  if ("erro" in auth) return { ok: false, error: auth.erro };

  const sol = await prisma.solicitacaoPrivacidade.findUnique({ where: { id } });
  if (!sol || sol.status !== "PENDENTE" || sol.tipo !== "EXCLUSAO_DADOS") {
    return { ok: false, error: "Solicitação não encontrada ou já processada." };
  }

  const validos = campos.filter((c): c is CampoEspecifico =>
    (CAMPOS_ESPECIFICOS as readonly string[]).includes(c),
  );
  if (!validos.length) return { ok: false, error: "Selecione ao menos um campo para limpar." };

  const resultado = await limparCamposDoTitular(sol.email, validos);
  await prisma.solicitacaoPrivacidade.update({
    where: { id },
    data: {
      status: "CONCLUIDA",
      resolucao: `Campos limpos (${validos.join(", ")}) em ${resultado.cadastrosAtualizados} cadastro(s).`,
      processadoEm: new Date(),
      processadoPor: auth.sessao.email,
    },
  });

  revalidar();
  return { ok: true, ...resultado };
}

export async function recusarSolicitacao(id: string, motivo: string) {
  const auth = await exigirAdmin();
  if ("erro" in auth) return { ok: false, error: auth.erro };

  const sol = await prisma.solicitacaoPrivacidade.findUnique({ where: { id } });
  if (!sol || sol.status !== "PENDENTE") {
    return { ok: false, error: "Solicitação não encontrada ou já processada." };
  }

  await prisma.solicitacaoPrivacidade.update({
    where: { id },
    data: {
      status: "RECUSADA",
      resolucao: motivo.trim() || "Recusada sem motivo informado.",
      processadoEm: new Date(),
      processadoPor: auth.sessao.email,
    },
  });

  revalidar();
  return { ok: true };
}
