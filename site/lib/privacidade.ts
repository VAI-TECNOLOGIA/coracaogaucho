import { prisma } from "@/lib/db";

/**
 * Núcleo LGPD — solicitações de exclusão de conta/dados e a execução real da exclusão.
 *
 * Fluxo: o titular abre uma solicitação (formulário público em /excluir-conta e
 * /excluir-dados, ou pelo app). A equipe processa em /admin/privacidade — a exclusão
 * apaga os cadastros (Lead) que batem com e-mail/telefone e desativa a conta de equipe
 * (User) com o mesmo e-mail. A solicitação fica como registro de atendimento (art. 18).
 */

export const TIPOS_SOLICITACAO = ["EXCLUSAO_CONTA", "EXCLUSAO_DADOS"] as const;
export type TipoSolicitacao = (typeof TIPOS_SOLICITACAO)[number];

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export type NovaSolicitacao = {
  tipo: TipoSolicitacao;
  nome?: string;
  email: string;
  telefone?: string;
  detalhes?: string;
  origem?: "web" | "app" | "email";
};

export function validarSolicitacao(s: NovaSolicitacao): Record<string, string> {
  const erros: Record<string, string> = {};
  if (!TIPOS_SOLICITACAO.includes(s.tipo)) erros.tipo = "Tipo de solicitação inválido.";
  if (!isEmail(s.email)) erros.email = "Informe o e-mail usado no cadastro.";
  if (s.tipo === "EXCLUSAO_DADOS" && !s.detalhes?.trim())
    erros.detalhes = "Descreva quais dados você quer excluir.";
  return erros;
}

export async function criarSolicitacao(s: NovaSolicitacao) {
  return prisma.solicitacaoPrivacidade.create({
    data: {
      tipo: s.tipo,
      nome: s.nome?.trim() || null,
      email: s.email.trim().toLowerCase(),
      telefone: s.telefone?.trim() || null,
      detalhes: s.detalhes?.trim() || null,
      origem: s.origem ?? "web",
    },
    select: { id: true, criadoEm: true },
  });
}

/** Normaliza telefone para comparação: só dígitos. */
const soDigitos = (v: string) => v.replace(/\D/g, "");

/**
 * Exclusão de conta: apaga todos os Leads com o e-mail (ou telefone, quando informado)
 * e desativa/apaga a conta de equipe com o mesmo e-mail. Retorna o resumo da operação.
 */
export async function excluirDadosDoTitular(email: string, telefone?: string | null) {
  const emailNorm = email.trim().toLowerCase();
  const telNorm = telefone ? soDigitos(telefone) : "";

  return prisma.$transaction(async (tx) => {
    // Leads por e-mail exato
    const porEmail = await tx.lead.deleteMany({ where: { email: emailNorm } });

    // Leads por telefone (SQLite não normaliza — busca candidatos e compara por dígitos)
    let porTelefone = 0;
    if (telNorm.length >= 10) {
      const candidatos = await tx.lead.findMany({
        select: { id: true, telefone: true },
      });
      const ids = candidatos.filter((l) => soDigitos(l.telefone) === telNorm).map((l) => l.id);
      if (ids.length) {
        const r = await tx.lead.deleteMany({ where: { id: { in: ids } } });
        porTelefone = r.count;
      }
    }

    // Conta de equipe com o mesmo e-mail
    const user = await tx.user.findUnique({ where: { email: emailNorm } });
    if (user) await tx.user.delete({ where: { id: user.id } });

    return {
      leadsExcluidos: porEmail.count + porTelefone,
      contaEquipeExcluida: Boolean(user),
    };
  });
}

/** Campos que podem ser limpos individualmente mantendo o cadastro (exclusão de dados específicos). */
export const CAMPOS_ESPECIFICOS = ["telefone", "cidade", "segmento", "observacao"] as const;
export type CampoEspecifico = (typeof CAMPOS_ESPECIFICOS)[number];

/**
 * Exclusão de dados específicos: limpa os campos escolhidos em todos os cadastros do titular.
 * Telefone/cidade são obrigatórios no model — ficam com marcador vazio "—".
 */
export async function limparCamposDoTitular(email: string, campos: CampoEspecifico[]) {
  const emailNorm = email.trim().toLowerCase();
  const data: Record<string, string | null> = {};
  for (const c of campos) {
    if (c === "telefone" || c === "cidade") data[c] = "—";
    else data[c] = null;
  }
  if (!Object.keys(data).length) return { cadastrosAtualizados: 0 };
  const r = await prisma.lead.updateMany({ where: { email: emailNorm }, data });
  return { cadastrosAtualizados: r.count };
}
