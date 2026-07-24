import { NextResponse, after } from "next/server";
import { prisma } from "@/lib/db";
import { enviarLeadAoSistema } from "@/lib/sistema";

export const runtime = "nodejs";

type Payload = {
  nome?: string;
  email?: string;
  telefone?: string;
  cidade?: string;
  segmento?: string;
  origem?: string;
};

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

/**
 * Todo cadastro vindo do público entra como APOIADOR — e só.
 *
 * O formulário não oferece mais Voluntário/Liderança/Doador, e o endpoint
 * ignora qualquer `tipo` que venha no corpo da requisição: aceitar o campo
 * deixaria a classificação aberta a quem chamasse a API direto. A distinção de
 * perfil passou a ser atribuída pela equipe dentro do /admin.
 */
const TIPO_PUBLICO = "apoiador";

/**
 * Captação de apoiadores — grava direto no CRM (tabela Lead).
 * Alimentado pelo site institucional e pelas landing pages segmentadas
 * (tagueado por segmento/origem).
 */
export async function POST(req: Request) {
  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "JSON inválido." }, { status: 400 });
  }

  const nome = body.nome?.trim() ?? "";
  const email = body.email?.trim().toLowerCase() ?? "";
  const telefone = body.telefone?.trim() ?? "";
  const cidade = body.cidade?.trim() ?? "";

  const erros: Record<string, string> = {};
  if (nome.length < 2) erros.nome = "Informe seu nome completo.";
  if (!isEmail(email)) erros.email = "E-mail inválido.";
  if (telefone.replace(/\D/g, "").length < 10) erros.telefone = "Telefone inválido.";
  if (cidade.length < 2) erros.cidade = "Informe sua cidade.";

  if (Object.keys(erros).length) {
    return NextResponse.json({ ok: false, erros }, { status: 422 });
  }

  try {
    await prisma.lead.create({
      data: {
        nome,
        email,
        telefone,
        cidade,
        tipo: TIPO_PUBLICO,
        segmento: body.segmento?.trim() || null,
        origem: body.origem?.trim() || "site-institucional",
      },
    });
    // Espelha no Sistema da campanha (vai-sistema) após responder — best-effort
    after(() => enviarLeadAoSistema({ nome, telefone, email, cidade, tipo: TIPO_PUBLICO }));
  } catch {
    return NextResponse.json(
      { ok: false, error: "Não foi possível registrar agora. Tente novamente." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, mensagem: "Bem-vindo(a) ao movimento!" });
}
