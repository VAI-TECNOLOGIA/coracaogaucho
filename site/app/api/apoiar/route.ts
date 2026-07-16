import { NextResponse, after } from "next/server";
import { prisma } from "@/lib/db";
import { enviarLeadAoSistema } from "@/lib/sistema";

export const runtime = "nodejs";

type Payload = {
  nome?: string;
  email?: string;
  telefone?: string;
  cidade?: string;
  tipo?: string;
  segmento?: string;
  origem?: string;
};

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const TIPOS = new Set(["voluntario", "apoiador", "lideranca", "doador"]);

/**
 * Captação de apoiadores/voluntários — grava direto no CRM (tabela Lead).
 * Alimentado pelo site institucional e pelas 15 landing pages (tagueado por segmento/origem).
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
  const tipo = body.tipo?.trim() ?? "apoiador";

  const erros: Record<string, string> = {};
  if (nome.length < 2) erros.nome = "Informe seu nome completo.";
  if (!isEmail(email)) erros.email = "E-mail inválido.";
  if (telefone.replace(/\D/g, "").length < 10) erros.telefone = "Telefone inválido.";
  if (cidade.length < 2) erros.cidade = "Informe sua cidade.";

  if (Object.keys(erros).length) {
    return NextResponse.json({ ok: false, erros }, { status: 422 });
  }

  try {
    const tipoFinal = TIPOS.has(tipo) ? tipo : "apoiador";
    await prisma.lead.create({
      data: {
        nome,
        email,
        telefone,
        cidade,
        tipo: tipoFinal,
        segmento: body.segmento?.trim() || null,
        origem: body.origem?.trim() || "site-institucional",
      },
    });
    // Espelha no Sistema da campanha (vai-sistema) após responder — best-effort
    after(() => enviarLeadAoSistema({ nome, telefone, email, cidade, tipo: tipoFinal }));
  } catch {
    return NextResponse.json(
      { ok: false, error: "Não foi possível registrar agora. Tente novamente." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, mensagem: "Bem-vindo(a) ao movimento!" });
}
