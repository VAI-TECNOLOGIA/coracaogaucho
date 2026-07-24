/**
 * FONTE ÚNICA DA VERDADE — conteúdo institucional.
 *
 * Todo texto aqui é transcrito do site oficial da campanha
 * (https://julianabrizola.com.br). Nada nesta LP pode afirmar sobre a
 * candidata, o movimento ou o Rio Grande algo que não esteja neste arquivo.
 *
 * ⚠️ PRÉ-CAMPANHA: é proibido publicar proposta, plano de governo, pedido de
 * voto, número de urna ou cargo pretendido. Se um texto novo prometer algo que
 * um governo faria, ele não entra.
 *
 * Para atualizar: conferir o site oficial e alterar SOMENTE este arquivo.
 */

export const SITE_OFICIAL = "https://julianabrizola.com.br";

/** Assinatura da campanha, como aparece no título do site oficial. */
export const TAGLINE = "Servindo às pessoas";

/** Marca do movimento. */
export const MOVIMENTO = "Confia+ RS";

/** Manifesto de abertura — texto oficial, transcrito na íntegra. */
export const MANIFESTO = {
  titulo: "O Rio Grande sempre foi feito de coragem.",
  paragrafos: [
    "Da valentia de quem enfrenta a seca, a enchente e as perdas sem baixar a cabeça.",
    "Foi com o coração que mantivemos nosso Estado de pé nos momentos mais difíceis.",
    "Um coração que pulsa no campo e na cidade. No trabalhador que acorda cedo.",
    "Na mãe que luta pelos filhos. E em quem precisou reconstruir a própria vida sem desistir.",
    "Mas esse coração não precisa pulsar sempre sozinho.",
  ],
} as const;

/** Chamada do movimento — texto oficial. */
export const CHAMADO = {
  titulo: "Nasce o movimento Confia+ RS:",
  texto:
    "Um chamado aos gaúchos e gaúchas para colocar o povo no centro das decisões e retomar o protagonismo do Rio Grande do Sul.",
} as const;

/** Chamada de participação — texto oficial. */
export const PARTICIPACAO = {
  titulo: "Quando o povo fala mais alto, o Rio Grande encontra seu caminho.",
  linhas: ["Chegou a hora de participar!", "Chegou a hora de construir!"],
} as const;

/**
 * Biografia oficial da Juliana Brizola, transcrita do site.
 * NÃO é professora — o texto anterior da LP afirmava isso e estava errado.
 */
export const JULIANA = {
  nome: "Juliana Brizola",
  bio: [
    "Juliana Brizola é gaúcha, nascida em Porto Alegre, Mestre em Ciências Criminais, mãe de José Inácio e Angelina e neta de Leonel Brizola. Foi vereadora de Porto Alegre e deputada estadual por três mandatos.",
    "É autora da Lei da Escola de Tempo Integral, que inseriu essa política na Constituição do Rio Grande do Sul, e idealizadora do projeto Pró-Hospitais, iniciativa com potencial para ampliar os investimentos na saúde pública gaúcha.",
    "Atualmente, é secretária de Relações Internacionais do PDT e presidente nacional da Ação da Mulher Trabalhista (AMT). Com uma trajetória marcada pela defesa da educação, da saúde e do desenvolvimento do Estado, percorre o Rio Grande ouvindo as pessoas e construindo soluções para os desafios dos gaúchos.",
  ],
  /** Fatos verificáveis do próprio texto oficial — nada inferido. */
  marcos: [
    { titulo: "Mestre em Ciências Criminais", detalhe: "Formação acadêmica" },
    { titulo: "Vereadora de Porto Alegre", detalhe: "Mandato cumprido" },
    { titulo: "Deputada estadual", detalhe: "Três mandatos" },
    { titulo: "Lei da Escola de Tempo Integral", detalhe: "Autora — política inscrita na Constituição do RS" },
    { titulo: "Projeto Pró-Hospitais", detalhe: "Idealizadora — investimento na saúde pública gaúcha" },
    { titulo: "PDT · AMT", detalhe: "Secretária de Relações Internacionais e presidente nacional da AMT" },
  ],
} as const;

/**
 * Edegar Pretto compõe a marca da campanha (arquivo "Marca Juliana e Edegar"),
 * mas o site oficial não publica biografia dele. Sem fonte oficial, não
 * inventamos texto: ele aparece apenas na assinatura da marca.
 */
export const EDEGAR = { nome: "Edegar Pretto" } as const;

/** Perfis oficiais — extraídos do rodapé do site oficial. */
export const REDES = [
  { nome: "Instagram", url: "https://www.instagram.com/juliana.brizola/" },
  { nome: "Facebook", url: "https://www.facebook.com/BrizolaJuliana12/?locale=pt_BR" },
  { nome: "TikTok", url: "https://www.tiktok.com/@julianabrizolaoficial" },
  { nome: "YouTube", url: "https://www.youtube.com/c/JulianaBrizola12" },
] as const;
