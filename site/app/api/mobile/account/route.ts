import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sessaoDoBearer, corsHeaders, options } from "@/lib/api-auth";
import { excluirDadosDoTitular } from "@/lib/privacidade";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function OPTIONS() {
  return options();
}

/**
 * Exclusão da própria conta pelo app (Configurações → Privacidade → Excluir conta).
 * Autenticado via Bearer. Apaga a conta do usuário, os cadastros de apoiador com o
 * mesmo e-mail e registra a solicitação já concluída (comprovação de atendimento LGPD).
 * O token JWT expira sozinho (stateless); com o usuário apagado, nenhum login volta a funcionar.
 */
export async function DELETE(req: Request) {
  const sessao = await sessaoDoBearer(req);
  if (!sessao) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401, headers: corsHeaders });
  }

  try {
    const resultado = await excluirDadosDoTitular(sessao.email);

    await prisma.solicitacaoPrivacidade.create({
      data: {
        tipo: "EXCLUSAO_CONTA",
        nome: sessao.nome || null,
        email: sessao.email.toLowerCase(),
        origem: "app",
        status: "CONCLUIDA",
        resolucao: `Autoatendimento pelo app: ${resultado.leadsExcluidos} cadastro(s) excluído(s)${
          resultado.contaEquipeExcluida ? ", conta de equipe excluída" : ""
        }.`,
        processadoEm: new Date(),
        processadoPor: "autoatendimento-app",
      },
    });

    return NextResponse.json(
      { ok: true, mensagem: "Conta e dados excluídos permanentemente." },
      { headers: corsHeaders },
    );
  } catch {
    return NextResponse.json(
      { ok: false, error: "Não foi possível excluir agora. Tente novamente." },
      { status: 500, headers: corsHeaders },
    );
  }
}
