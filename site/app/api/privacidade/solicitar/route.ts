import { NextResponse } from "next/server";
import { corsHeaders, options } from "@/lib/api-auth";
import {
  criarSolicitacao,
  validarSolicitacao,
  type NovaSolicitacao,
  type TipoSolicitacao,
} from "@/lib/privacidade";

export const runtime = "nodejs";

export function OPTIONS() {
  return options();
}

/**
 * Abre uma solicitação LGPD (exclusão de conta ou de dados específicos).
 * Público — usado pelos formulários de /excluir-conta e /excluir-dados e pelo app.
 * Não revela se o e-mail existe na base: sempre registra e responde com protocolo.
 */
export async function POST(req: Request) {
  let body: Partial<NovaSolicitacao> & { website?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "JSON inválido." },
      { status: 400, headers: corsHeaders },
    );
  }

  // Honeypot anti-bot: campo invisível no formulário — humano não preenche.
  if (body.website) {
    return NextResponse.json({ ok: true, protocolo: "OK" }, { headers: corsHeaders });
  }

  const solicitacao: NovaSolicitacao = {
    tipo: (body.tipo ?? "EXCLUSAO_CONTA") as TipoSolicitacao,
    nome: typeof body.nome === "string" ? body.nome.slice(0, 200) : undefined,
    email: typeof body.email === "string" ? body.email.slice(0, 200) : "",
    telefone: typeof body.telefone === "string" ? body.telefone.slice(0, 40) : undefined,
    detalhes: typeof body.detalhes === "string" ? body.detalhes.slice(0, 2000) : undefined,
    origem: body.origem === "app" ? "app" : "web",
  };

  const erros = validarSolicitacao(solicitacao);
  if (Object.keys(erros).length) {
    return NextResponse.json({ ok: false, erros }, { status: 422, headers: corsHeaders });
  }

  try {
    const { id } = await criarSolicitacao(solicitacao);
    return NextResponse.json(
      { ok: true, protocolo: id.slice(-8).toUpperCase() },
      { headers: corsHeaders },
    );
  } catch {
    return NextResponse.json(
      { ok: false, error: "Não foi possível registrar agora. Tente novamente." },
      { status: 500, headers: corsHeaders },
    );
  }
}
