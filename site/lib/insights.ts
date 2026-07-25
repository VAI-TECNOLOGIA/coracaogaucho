import { prisma } from "@/lib/db";
import { getSegmento } from "@/lib/segmentos";

/**
 * Inteligência do CRM.
 * - `analisar()` computa estatísticas do banco.
 * - `insightsRegras()` gera insights acionáveis por regras (sempre funciona, sem IA).
 * - `resumoIA()` gera um resumo executivo com Claude quando ANTHROPIC_API_KEY existe.
 */

const DIA = 86400000;

function segLabel(slug: string | null) {
  if (!slug) return "Site institucional";
  return getSegmento(slug)?.publico ?? slug;
}

export type Analise = Awaited<ReturnType<typeof analisar>>;

export async function analisar() {
  const leads = await prisma.lead.findMany({
    select: { segmento: true, cidade: true, origem: true, status: true, tipo: true, criadoEm: true },
  });
  const total = leads.length;
  const agora = Date.now();

  const ult7 = leads.filter((l) => l.criadoEm.getTime() >= agora - 7 * DIA).length;
  const prev7 = leads.filter(
    (l) => l.criadoEm.getTime() >= agora - 14 * DIA && l.criadoEm.getTime() < agora - 7 * DIA,
  ).length;
  const momentumPct = prev7 > 0 ? Math.round(((ult7 - prev7) / prev7) * 100) : ult7 > 0 ? 100 : 0;

  const porSeg = new Map<string, { total: number; conv: number }>();
  const porCidade = new Map<string, number>();
  const porOrigem = new Map<string, number>();
  let novosParados = 0;
  for (const l of leads) {
    const seg = l.segmento ?? "site";
    const s = porSeg.get(seg) ?? { total: 0, conv: 0 };
    s.total++;
    if (l.status === "CONVERTIDO") s.conv++;
    porSeg.set(seg, s);
    porCidade.set(l.cidade, (porCidade.get(l.cidade) ?? 0) + 1);
    porOrigem.set(l.origem, (porOrigem.get(l.origem) ?? 0) + 1);
    if (l.status === "NOVO" && l.criadoEm.getTime() < agora - 3 * DIA) novosParados++;
  }

  const segArr = [...porSeg.entries()].map(([slug, v]) => ({
    slug,
    label: segLabel(slug === "site" ? null : slug),
    ...v,
    taxa: v.total >= 5 ? Math.round((v.conv / v.total) * 100) : null,
  }));
  const topVolume = [...segArr].sort((a, b) => b.total - a.total)[0];
  const topConversao = segArr.filter((s) => s.taxa !== null).sort((a, b) => (b.taxa ?? 0) - (a.taxa ?? 0))[0];
  const topCidade = [...porCidade.entries()].map(([cidade, total]) => ({ cidade, total })).sort((a, b) => b.total - a.total)[0];
  const topOrigem = [...porOrigem.entries()].map(([origem, total]) => ({ origem, total })).sort((a, b) => b.total - a.total)[0];

  return { total, ult7, prev7, momentumPct, topVolume, topConversao, topCidade, topOrigem, novosParados, segArr };
}

export type Insight = { tom: "positivo" | "atencao" | "oportunidade"; titulo: string; texto: string };

export function insightsRegras(a: Analise): Insight[] {
  const out: Insight[] = [];

  if (a.momentumPct >= 15) {
    out.push({ tom: "positivo", titulo: "Captação em alta", texto: `Os cadastros cresceram ${a.momentumPct}% nos últimos 7 dias (${a.ult7} vs ${a.prev7}). É hora de escalar o que está funcionando.` });
  } else if (a.momentumPct <= -15) {
    out.push({ tom: "atencao", titulo: "Captação desacelerando", texto: `Queda de ${Math.abs(a.momentumPct)}% nos cadastros na última semana (${a.ult7} vs ${a.prev7}). Reforce a divulgação das landing pages.` });
  }

  if (a.topVolume) {
    out.push({ tom: "positivo", titulo: `${a.topVolume.label} lidera em volume`, texto: `${a.topVolume.label} é a maior fonte de leads (${a.topVolume.total} cadastros). Vale priorizar conteúdo e ações para esse público.` });
  }
  if (a.topConversao && a.topConversao.taxa && a.topConversao.slug !== a.topVolume?.slug) {
    out.push({ tom: "oportunidade", titulo: `${a.topConversao.label} converte melhor`, texto: `O público ${a.topConversao.label} tem a maior taxa de conversão (${a.topConversao.taxa}%). Investir aqui tende a dar mais retorno por lead.` });
  }
  if (a.topCidade) {
    out.push({ tom: "oportunidade", titulo: `Força em ${a.topCidade.cidade}`, texto: `${a.topCidade.cidade} concentra ${a.topCidade.total} apoiadores — a maior base. Um evento presencial nessa região pode ter alto impacto.` });
  }
  if (a.novosParados > 0) {
    out.push({ tom: "atencao", titulo: `${a.novosParados} leads sem contato`, texto: `Há ${a.novosParados} leads com status "Novo" parados há mais de 3 dias. Contato rápido aumenta muito a chance de engajamento.` });
  }
  if (a.topOrigem) {
    const canal = a.topOrigem.origem.startsWith("lp-") ? `a landing page "${segLabel(a.topOrigem.origem.replace("lp-", ""))}"` : "o site institucional";
    out.push({ tom: "positivo", titulo: "Canal campeão", texto: `${canal} é o canal que mais traz gente (${a.topOrigem.total} cadastros). Direcione mais tráfego para ele.` });
  }

  return out;
}

export async function resumoIA(a: Analise): Promise<string | null> {
  if (!process.env.ANTHROPIC_API_KEY) return null;
  try {
    const { default: Anthropic } = await import("@anthropic-ai/sdk");
    const client = new Anthropic();
    const dados = {
      totalLeads: a.total,
      ultimos7dias: a.ult7,
      variacaoSemanalPct: a.momentumPct,
      publicoMaiorVolume: a.topVolume?.label,
      publicoMaiorConversao: a.topConversao?.label,
      cidadeMaisForte: a.topCidade?.cidade,
      leadsSemContato: a.novosParados,
      porSegmento: a.segArr.map((s) => ({ publico: s.label, leads: s.total, conversaoPct: s.taxa })),
    };
    const res = await client.messages.create({
      model: "claude-opus-4-8",
      max_tokens: 1024,
      thinking: { type: "adaptive" },
      output_config: { effort: "medium" },
      system:
        "Você é o estrategista de dados da campanha eleitoral Coração Gaúcho (Juliana Brizola e Edegar Pretto, RS). Escreva um resumo executivo curto (máx. 4 frases) e 2 recomendações práticas a partir dos dados de captação de apoiadores. Tom direto, profissional, em português do Brasil. Não invente números além dos fornecidos.",
      messages: [{ role: "user", content: `Dados de captação (JSON):\n${JSON.stringify(dados, null, 2)}` }],
    });
    const texto = res.content.filter((b) => b.type === "text").map((b) => (b as { text: string }).text).join("\n").trim();
    return texto || null;
  } catch {
    return null;
  }
}
