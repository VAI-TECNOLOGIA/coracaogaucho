/**
 * Conteúdo das landing pages segmentadas — fonte única da verdade.
 *
 * REGRAS (pré-campanha), aplicadas a todo segmento novo:
 *  1. Nenhuma proposta, promessa ou plano de governo. O campo `compromissos`
 *     (3 promessas por LP, 45 no total) foi REMOVIDO por isso.
 *  2. Nenhum depoimento: os que existiam eram pessoas inventadas
 *     ("Bruna, 21", "Seu João, 63"). Depoimento só volta com pessoa real e
 *     autorização por escrito.
 *  3. Nenhum cargo pretendido, número de urna ou pedido de voto.
 *  4. A linguagem é a do site oficial: colocar o povo no centro das decisões,
 *     retomar o protagonismo do RS, o povo fala mais alto.
 *
 * A LP segmentada é um convite para o público se somar ao movimento — não uma
 * vitrine de propostas. Todo cadastro entra como APOIADOR (ver /api/apoiar).
 */

export type Segmento = {
  slug: string;
  publico: string; // nome curto do público (ex.: "Jovens")
  eyebrow: string; // rótulo acima do título
  headline: string; // título; use ** ** para destacar em degradê
  subheadline: string;
  accent: string; // hex — obrigatoriamente da paleta da marca
  ctaLabel: string;
  formTitle: string;
  seo: { title: string; description: string };
};

// Cores da marca (mesmos hex do design system)
const AZUL = "#004CA9";
const VERDE = "#0E6C38";
const VERMELHO = "#BC2224";
const AMARELO = "#FAB224";
const AZUL_ESCURO = "#172D57";
const AMBAR = "#D88A00";

export const SEGMENTOS: Segmento[] = [
  {
    slug: "jovens",
    publico: "Jovens",
    eyebrow: "Confia+ RS com a juventude",
    headline: "A juventude **faz o Rio Grande** falar mais alto",
    subheadline:
      "O Confia+ RS é um chamado para colocar o povo no centro das decisões. A juventude gaúcha tem o que dizer sobre o futuro do Estado — e esse é o lugar de dizer.",
    accent: AMARELO,
    ctaLabel: "Quero participar",
    formTitle: "Some-se à juventude do movimento",
    seo: {
      title: "Jovens",
      description:
        "A juventude gaúcha no centro das decisões. Some-se ao movimento Confia+ RS.",
    },
  },
  {
    slug: "mulheres",
    publico: "Mulheres",
    eyebrow: "Confia+ RS com as mulheres",
    headline: "As mulheres **no centro das decisões**",
    subheadline:
      "Um chamado às gaúchas para retomar o protagonismo do Rio Grande do Sul. Quando o povo fala mais alto, o Estado encontra seu caminho — e a voz das mulheres é parte disso.",
    accent: VERMELHO,
    ctaLabel: "Quero participar",
    formTitle: "Some sua voz à das mulheres do RS",
    seo: {
      title: "Mulheres",
      description:
        "As mulheres gaúchas no centro das decisões. Some-se ao movimento Confia+ RS.",
    },
  },
  {
    slug: "saude",
    publico: "Saúde",
    eyebrow: "Confia+ RS com quem cuida",
    headline: "Quem cuida da vida **também precisa ser ouvido**",
    subheadline:
      "Profissionais, pacientes e famílias conhecem de perto a realidade da saúde no Rio Grande. O movimento existe para escutar quem vive essa realidade todos os dias.",
    accent: VERMELHO,
    ctaLabel: "Quero participar",
    formTitle: "Some-se a quem cuida do Rio Grande",
    seo: {
      title: "Saúde",
      description:
        "Quem vive a saúde no Rio Grande tem voz no movimento Confia+ RS.",
    },
  },
  {
    slug: "educacao",
    publico: "Educação",
    eyebrow: "Confia+ RS com quem educa",
    headline: "Quem educa o Rio Grande **tem voz aqui**",
    subheadline:
      "Professores, estudantes e famílias sabem o que a escola gaúcha vive. Some-se a um movimento que coloca quem conhece a realidade no centro das decisões.",
    accent: AZUL,
    ctaLabel: "Quero participar",
    formTitle: "Some-se a quem educa o RS",
    seo: {
      title: "Educação",
      description:
        "Quem vive a educação gaúcha tem voz no movimento Confia+ RS.",
    },
  },
  {
    slug: "agricultores",
    publico: "Agricultores",
    eyebrow: "Confia+ RS no campo",
    headline: "O campo **também fala mais alto**",
    subheadline:
      "O coração do Rio Grande pulsa no campo e na cidade. Quem planta, cria e enfrenta a seca conhece o Estado por dentro — e essa voz precisa estar no centro das decisões.",
    accent: VERDE,
    ctaLabel: "Quero participar",
    formTitle: "Some-se a quem faz o RS produzir",
    seo: {
      title: "Agricultores",
      description:
        "O campo gaúcho no centro das decisões. Some-se ao movimento Confia+ RS.",
    },
  },
  {
    slug: "empresarios",
    publico: "Empresários",
    eyebrow: "Confia+ RS com quem gera trabalho",
    headline: "Quem gera trabalho **conhece o Rio Grande**",
    subheadline:
      "Um chamado a quem investe, produz e emprega no Estado. O movimento nasce para escutar quem constrói o Rio Grande no dia a dia.",
    accent: AZUL_ESCURO,
    ctaLabel: "Quero participar",
    formTitle: "Some-se ao movimento",
    seo: {
      title: "Empresários",
      description:
        "Quem investe e emprega no Rio Grande tem voz no movimento Confia+ RS.",
    },
  },
  {
    slug: "seguranca",
    publico: "Segurança",
    eyebrow: "Confia+ RS com quem protege",
    headline: "Quem protege o Rio Grande **precisa ser escutado**",
    subheadline:
      "A segurança das famílias gaúchas é assunto de quem vive a realidade das ruas e dos bairros. Some sua voz a um movimento que escuta antes de decidir.",
    accent: AZUL_ESCURO,
    ctaLabel: "Quero participar",
    formTitle: "Some-se ao movimento",
    seo: {
      title: "Segurança",
      description:
        "Quem vive a realidade da segurança no RS tem voz no movimento Confia+ RS.",
    },
  },
  {
    slug: "turismo",
    publico: "Turismo",
    eyebrow: "Confia+ RS pelo turismo",
    headline: "O Rio Grande que **recebe o mundo**",
    subheadline:
      "Serra, pampa, litoral e missões: quem vive do turismo conhece o potencial e os desafios de cada região. Esse conhecimento precisa estar no centro das decisões.",
    accent: VERDE,
    ctaLabel: "Quero participar",
    formTitle: "Some-se ao turismo gaúcho",
    seo: {
      title: "Turismo",
      description:
        "Quem vive do turismo no Rio Grande tem voz no movimento Confia+ RS.",
    },
  },
  {
    slug: "familia",
    publico: "Família",
    eyebrow: "Confia+ RS com a família",
    headline: "A família gaúcha **no centro das decisões**",
    subheadline:
      "Na mãe que luta pelos filhos, no trabalhador que acorda cedo, em quem reconstruiu a própria vida sem desistir. É esse coração que o movimento quer escutar.",
    accent: VERMELHO,
    ctaLabel: "Quero participar",
    formTitle: "Some-se pelas famílias do RS",
    seo: {
      title: "Família",
      description:
        "A família gaúcha no centro das decisões. Some-se ao movimento Confia+ RS.",
    },
  },
  {
    slug: "servidores",
    publico: "Servidores Públicos",
    eyebrow: "Confia+ RS com o servidor",
    headline: "Quem faz o Estado funcionar **tem o que dizer**",
    subheadline:
      "Servidoras e servidores conhecem a máquina pública por dentro. Um movimento que quer colocar o povo no centro das decisões precisa começar escutando quem atende esse povo.",
    accent: AZUL,
    ctaLabel: "Quero participar",
    formTitle: "Some-se ao movimento",
    seo: {
      title: "Servidores Públicos",
      description:
        "O servidor público gaúcho tem voz no movimento Confia+ RS.",
    },
  },
  {
    slug: "empreendedores",
    publico: "Empreendedores",
    eyebrow: "Confia+ RS com quem empreende",
    headline: "Quem empreende **faz o Rio Grande girar**",
    subheadline:
      "Do MEI ao pequeno comércio, empreender no Rio Grande exige coragem — a mesma coragem que sempre manteve o Estado de pé. Some sua voz ao movimento.",
    accent: AMBAR,
    ctaLabel: "Quero participar",
    formTitle: "Some-se aos empreendedores do RS",
    seo: {
      title: "Empreendedores",
      description:
        "Quem empreende no Rio Grande tem voz no movimento Confia+ RS.",
    },
  },
  {
    slug: "liderancas",
    publico: "Lideranças",
    eyebrow: "Confia+ RS com as lideranças",
    headline: "Quem lidera **conhece a realidade**",
    subheadline:
      "Lideranças comunitárias, sindicais, religiosas e de bairro sabem o que a sua região vive. Colocar o povo no centro das decisões começa por escutar quem já escuta.",
    accent: AZUL_ESCURO,
    ctaLabel: "Quero participar",
    formTitle: "Some-se à articulação do movimento",
    seo: {
      title: "Lideranças",
      description:
        "As lideranças gaúchas no centro das decisões. Some-se ao Confia+ RS.",
    },
  },
  {
    slug: "voluntarios",
    publico: "Voluntários",
    eyebrow: "Confia+ RS precisa de você",
    headline: "Faça parte do **movimento na rua**",
    subheadline:
      "Chegou a hora de participar. Chegou a hora de construir. Cada gaúcho e gaúcha que se soma faz o Rio Grande falar mais alto.",
    accent: VERDE,
    ctaLabel: "Quero participar",
    formTitle: "Some-se ao Confia+ RS",
    seo: {
      title: "Voluntários",
      description:
        "Chegou a hora de participar. Some-se ao movimento Confia+ RS.",
    },
  },
  {
    slug: "filiados",
    publico: "Filiados",
    eyebrow: "Confia+ RS com a base",
    headline: "A base que **organiza o movimento**",
    subheadline:
      "Um chamado aos gaúchos e gaúchas para retomar o protagonismo do Rio Grande do Sul. A base organizada é o que leva esse chamado a cada canto do Estado.",
    accent: AZUL,
    ctaLabel: "Quero participar",
    formTitle: "Some-se à base do movimento",
    seo: {
      title: "Filiados",
      description:
        "A base do movimento Confia+ RS, organizada em todo o Rio Grande do Sul.",
    },
  },
];

export function getSegmento(slug: string): Segmento | undefined {
  return SEGMENTOS.find((s) => s.slug === slug);
}

/** Divide o headline em partes; trechos entre ** ** recebem destaque em degradê. */
export function parseHeadline(headline: string): { text: string; highlight: boolean }[] {
  return headline
    .split(/(\*\*[^*]+\*\*)/g)
    .filter(Boolean)
    .map((chunk) => {
      const highlight = chunk.startsWith("**") && chunk.endsWith("**");
      return { text: highlight ? chunk.slice(2, -2) : chunk, highlight };
    });
}
