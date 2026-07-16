/**
 * Ponte com o Sistema da campanha (back-office em coracaogaucho.vai-sistema.com).
 * Todo cadastro captado pelo site/app é espelhado lá via POST /api/public/join,
 * para a equipe operar numa base única. O envio é best-effort: falha no sistema
 * NUNCA derruba o cadastro local (o lead já foi salvo no nosso banco).
 */

const SISTEMA_URL = process.env.SISTEMA_URL ?? "";

// Nossos tipos → SUPPORT_TYPES do sistema (sem correspondente = omite o campo)
const TIPO_MAP: Record<string, string> = {
  voluntario: "VOLUNTARIO",
  apoiador: "NOTICIAS",
  lideranca: "INDICAR",
};

export function sistemaConfigurado(): boolean {
  return SISTEMA_URL.startsWith("http");
}

export async function enviarLeadAoSistema(lead: {
  nome: string;
  telefone: string;
  email?: string | null;
  cidade?: string | null;
  tipo?: string | null;
}): Promise<boolean> {
  if (!sistemaConfigurado()) return false;

  const payload: Record<string, string> = {
    name: lead.nome,
    phone: lead.telefone,
  };
  if (lead.email) payload.email = lead.email;
  if (lead.cidade) payload.cityName = lead.cidade;
  const supportType = lead.tipo ? TIPO_MAP[lead.tipo] : undefined;
  if (supportType) payload.supportType = supportType;

  try {
    const res = await fetch(`${SISTEMA_URL}/api/public/join`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) {
      console.warn(`[sistema] join falhou: HTTP ${res.status}`);
      return false;
    }
    return true;
  } catch (e) {
    console.warn("[sistema] join indisponível:", e instanceof Error ? e.message : e);
    return false;
  }
}
