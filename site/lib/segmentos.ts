/**
 * Conteúdo das Landing Pages segmentadas — fonte única de verdade.
 * Cada segmento gera uma LP em /lp/[slug] com copy, compromissos e cor de destaque
 * próprios, mantendo o padrão visual da campanha. `accent` é sempre uma cor da marca.
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
  tipoPadrao: "voluntario" | "apoiador" | "lideranca" | "doador";
  dores: string[]; // dores/realidades que esse público sente
  compromissos: { titulo: string; texto: string }[];
  depoimento: { texto: string; autor: string; papel: string };
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
    eyebrow: "Coração Gaúcho com a juventude",
    headline: "O futuro do RS **começa com você**",
    subheadline:
      "Primeiro emprego, ensino de qualidade e um estado que investe em quem vai construir os próximos 50 anos. A juventude não é o amanhã — é agora.",
    accent: AMARELO,
    ctaLabel: "Quero fazer parte",
    formTitle: "Junte-se à juventude do movimento",
    tipoPadrao: "voluntario",
    dores: [
      "Sai da escola e não encontra o primeiro emprego.",
      "Ensino técnico e superior longe da realidade do mercado.",
      "Falta de espaço para a juventude decidir o próprio futuro.",
    ],
    compromissos: [
      { titulo: "Primeiro emprego garantido", texto: "Programa de estágio e aprendizagem conectando escola, universidade e empresas do RS." },
      { titulo: "Ensino técnico gratuito", texto: "Cursos alinhados às vagas que realmente existem, com bolsa e transporte." },
      { titulo: "Juventude que decide", texto: "Conselhos de juventude em cada região, com orçamento e voz real." },
    ],
    depoimento: { texto: "Cansei de promessa. Quero um governo que abra a primeira porta pra gente.", autor: "Bruna, 21", papel: "estudante · Santa Maria" },
    seo: { title: "Jovens", description: "Primeiro emprego, ensino de qualidade e protagonismo da juventude no Rio Grande do Sul." },
  },
  {
    slug: "mulheres",
    publico: "Mulheres",
    eyebrow: "Coração Gaúcho com as mulheres",
    headline: "Um Rio Grande **que respeita e protege**",
    subheadline:
      "Mais creches, autonomia econômica e uma rede de proteção que funciona de verdade. Quando a mulher avança, o estado inteiro avança.",
    accent: VERMELHO,
    ctaLabel: "Estou com as mulheres",
    formTitle: "Some sua voz à das mulheres do RS",
    tipoPadrao: "apoiador",
    dores: [
      "Falta de creche impede voltar a trabalhar.",
      "Rede de proteção contra a violência que não chega na ponta.",
      "Desigualdade salarial e menos oportunidades de renda.",
    ],
    compromissos: [
      { titulo: "Creche em tempo integral", texto: "Vaga garantida para que mães possam estudar e trabalhar com tranquilidade." },
      { titulo: "Casa da Mulher em cada região", texto: "Acolhimento, apoio jurídico e psicológico integrados, 24 horas." },
      { titulo: "Autonomia econômica", texto: "Crédito e capacitação para empreendedoras e chefes de família." },
    ],
    depoimento: { texto: "Proteção de verdade e uma creche perto de casa mudam tudo.", autor: "Marta, 38", papel: "mãe e empreendedora · Pelotas" },
    seo: { title: "Mulheres", description: "Creches, proteção e autonomia econômica para as mulheres do Rio Grande do Sul." },
  },
  {
    slug: "saude",
    publico: "Saúde",
    eyebrow: "Coração Gaúcho pela saúde",
    headline: "Saúde **perto de casa**, sem fila",
    subheadline:
      "Mais leitos, consultas e exames sem espera de meses. Cuidar da vida é a prioridade número um — em cada município do estado.",
    accent: VERMELHO,
    ctaLabel: "Quero saúde de qualidade",
    formTitle: "Junte-se por uma saúde que funciona",
    tipoPadrao: "apoiador",
    dores: [
      "Meses de espera por uma consulta com especialista.",
      "Cidades pequenas sem atendimento de urgência.",
      "Falta de leitos e de médicos no interior.",
    ],
    compromissos: [
      { titulo: "Fim da fila de exames", texto: "Mutirões permanentes e agenda digital para zerar a espera de consultas e cirurgias." },
      { titulo: "Urgência em toda região", texto: "Pronto-atendimento e transporte sanitário integrando os municípios." },
      { titulo: "Mais médicos no interior", texto: "Incentivo para fixar profissionais onde a saúde mais precisa." },
    ],
    depoimento: { texto: "Esperei sete meses por um exame. Isso não pode ser normal.", autor: "Seu João, 63", papel: "aposentado · Uruguaiana" },
    seo: { title: "Saúde", description: "Fim das filas, urgência em toda região e mais médicos no interior do RS." },
  },
  {
    slug: "educacao",
    publico: "Educação",
    eyebrow: "Coração Gaúcho pela educação",
    headline: "Educação **que liberta** o Rio Grande",
    subheadline:
      "Escola em tempo integral, professor valorizado e ensino conectado ao futuro. A melhor herança que deixamos é o conhecimento.",
    accent: AZUL,
    ctaLabel: "Quero educação de verdade",
    formTitle: "Some-se pela educação do RS",
    tipoPadrao: "apoiador",
    dores: [
      "Escolas sucateadas e sem infraestrutura básica.",
      "Professores desvalorizados e sobrecarregados.",
      "Ensino distante das oportunidades reais de trabalho.",
    ],
    compromissos: [
      { titulo: "Escola em tempo integral", texto: "Mais tempo de aprendizado, esporte e cultura — com merenda de qualidade." },
      { titulo: "Valorização do professor", texto: "Plano de carreira, formação continuada e respeito a quem ensina." },
      { titulo: "Ensino para o futuro", texto: "Tecnologia, idiomas e ensino técnico dentro da escola pública." },
    ],
    depoimento: { texto: "Professor valorizado é aluno que aprende. Simples assim.", autor: "Cláudia, 45", papel: "professora · Caxias do Sul" },
    seo: { title: "Educação", description: "Escola em tempo integral, professor valorizado e ensino conectado ao futuro no RS." },
  },
  {
    slug: "agricultores",
    publico: "Agricultores",
    eyebrow: "Coração Gaúcho no campo",
    headline: "O campo que **sustenta o Rio Grande**",
    subheadline:
      "Apoio ao pequeno produtor, crédito justo e política séria contra a estiagem. O agro é o coração da nossa economia — e da nossa gente.",
    accent: VERDE,
    ctaLabel: "Estou com o campo",
    formTitle: "Junte-se a quem faz o RS produzir",
    tipoPadrao: "lideranca",
    dores: [
      "Estiagem que quebra a safra e não tem resposta do estado.",
      "Crédito caro e burocrático para o pequeno produtor.",
      "Estradas ruins que encarecem o escoamento da produção.",
    ],
    compromissos: [
      { titulo: "Plano contra a estiagem", texto: "Irrigação, poços e seguro agrícola para proteger quem planta." },
      { titulo: "Crédito rural justo", texto: "Financiamento acessível e assistência técnica para a agricultura familiar." },
      { titulo: "Estradas do campo", texto: "Recuperação das vias rurais para a produção chegar ao mercado." },
    ],
    depoimento: { texto: "A gente produz o alimento do estado. Só queremos apoio pra continuar.", autor: "Valdir, 52", papel: "agricultor familiar · Palmeira das Missões" },
    seo: { title: "Agricultores", description: "Apoio ao pequeno produtor, crédito justo e combate à estiagem no Rio Grande do Sul." },
  },
  {
    slug: "empresarios",
    publico: "Empresários",
    eyebrow: "Coração Gaúcho com quem gera emprego",
    headline: "Ambiente **que faz o RS crescer**",
    subheadline:
      "Menos burocracia, segurança jurídica e incentivo a quem investe e emprega no Rio Grande do Sul. Desenvolvimento é trabalho e renda.",
    accent: AZUL_ESCURO,
    ctaLabel: "Quero um RS que investe",
    formTitle: "Some-se ao desenvolvimento do RS",
    tipoPadrao: "apoiador",
    dores: [
      "Burocracia que trava a abertura e a expansão de negócios.",
      "Insegurança jurídica que afasta investimento.",
      "Falta de mão de obra qualificada nas regiões.",
    ],
    compromissos: [
      { titulo: "Desburocratização", texto: "Abertura de empresa simplificada e digital, com regras claras e estáveis." },
      { titulo: "Atração de investimento", texto: "Incentivos responsáveis para gerar emprego em todas as regiões." },
      { titulo: "Qualificação profissional", texto: "Parceria com o setor produtivo para formar a mão de obra que falta." },
    ],
    depoimento: { texto: "Quero investir aqui. Só preciso de regra clara e menos burocracia.", autor: "Renato, 49", papel: "empresário · Novo Hamburgo" },
    seo: { title: "Empresários", description: "Menos burocracia, segurança jurídica e incentivo a quem investe e emprega no RS." },
  },
  {
    slug: "seguranca",
    publico: "Segurança",
    eyebrow: "Coração Gaúcho pela segurança",
    headline: "Segurança **com inteligência** e presença",
    subheadline:
      "Prevenção, integração das forças e tecnologia para proteger cada família gaúcha. Andar na rua sem medo é um direito.",
    accent: AZUL_ESCURO,
    ctaLabel: "Quero mais segurança",
    formTitle: "Some-se por um RS mais seguro",
    tipoPadrao: "apoiador",
    dores: [
      "Sensação de insegurança no bairro e no comércio.",
      "Forças de segurança sem integração e sem estrutura.",
      "Interior esquecido no policiamento.",
    ],
    compromissos: [
      { titulo: "Polícia integrada", texto: "Central única de inteligência ligando as forças em tempo real." },
      { titulo: "Tecnologia que protege", texto: "Videomonitoramento e dados para prevenir, não só remediar." },
      { titulo: "Presença no interior", texto: "Policiamento de proximidade em toda cidade, não só na capital." },
    ],
    depoimento: { texto: "Quero deixar meu comércio aberto sem medo. É o básico.", autor: "Sandra, 41", papel: "comerciante · Rio Grande" },
    seo: { title: "Segurança", description: "Prevenção, integração das forças e tecnologia pela segurança das famílias gaúchas." },
  },
  {
    slug: "turismo",
    publico: "Turismo",
    eyebrow: "Coração Gaúcho pelo turismo",
    headline: "O RS **que o mundo quer conhecer**",
    subheadline:
      "Serra, pampa, litoral e missões: valorizar nossos destinos gera emprego, renda e orgulho. O turismo é vocação gaúcha.",
    accent: VERDE,
    ctaLabel: "Quero fortalecer o turismo",
    formTitle: "Some-se ao turismo gaúcho",
    tipoPadrao: "apoiador",
    dores: [
      "Destinos incríveis sem infraestrutura e divulgação.",
      "Sazonalidade que deixa o trabalhador sem renda parte do ano.",
      "Falta de apoio ao pequeno empreendedor do turismo.",
    ],
    compromissos: [
      { titulo: "Rotas turísticas do RS", texto: "Investimento em sinalização, acesso e promoção dos nossos destinos." },
      { titulo: "Turismo o ano inteiro", texto: "Calendário de eventos e incentivos para reduzir a sazonalidade." },
      { titulo: "Apoio ao empreendedor", texto: "Crédito e capacitação para pousadas, guias e gastronomia local." },
    ],
    depoimento: { texto: "Nossa região tem tudo pra receber o mundo. Falta apoio.", autor: "Diego, 34", papel: "pousadeiro · Cambará do Sul" },
    seo: { title: "Turismo", description: "Valorização dos destinos gaúchos gerando emprego e renda o ano inteiro." },
  },
  {
    slug: "familia",
    publico: "Família",
    eyebrow: "Coração Gaúcho com a família",
    headline: "Cuidar da **nossa gente** em cada fase",
    subheadline:
      "Do berço à melhor idade: creche, saúde, segurança e dignidade. A família gaúcha é a base de tudo que construímos.",
    accent: VERMELHO,
    ctaLabel: "Estou com a família gaúcha",
    formTitle: "Some-se pelas famílias do RS",
    tipoPadrao: "apoiador",
    dores: [
      "Custo de vida apertando o orçamento da família.",
      "Serviços públicos que não dão conta do dia a dia.",
      "Idosos sem cuidado e sem prioridade.",
    ],
    compromissos: [
      { titulo: "Rede de creches", texto: "Vaga garantida para os pequenos e tranquilidade para os pais." },
      { titulo: "Cuidado com o idoso", texto: "Atenção à saúde e centros de convivência na melhor idade." },
      { titulo: "Custo de vida menor", texto: "Programas de renda, transporte e alimentação para aliviar o orçamento." },
    ],
    depoimento: { texto: "Quero que meus filhos e meus pais sejam bem cuidados aqui.", autor: "Fernanda, 36", papel: "mãe de dois · Canoas" },
    seo: { title: "Família", description: "Creche, saúde, segurança e dignidade para as famílias do Rio Grande do Sul." },
  },
  {
    slug: "servidores",
    publico: "Servidores Públicos",
    eyebrow: "Coração Gaúcho com o servidor",
    headline: "Respeito a **quem serve** o Rio Grande",
    subheadline:
      "Valorização, plano de carreira e condições de trabalho dignas. Servidor respeitado é serviço público de qualidade para o povo.",
    accent: AZUL,
    ctaLabel: "Estou com o servidor",
    formTitle: "Some-se à valorização do servidor",
    tipoPadrao: "apoiador",
    dores: [
      "Salários defasados e carreira parada há anos.",
      "Estrutura precária para atender bem o cidadão.",
      "Falta de diálogo do governo com as categorias.",
    ],
    compromissos: [
      { titulo: "Carreira valorizada", texto: "Recomposição justa e plano de carreira negociado com as categorias." },
      { titulo: "Condições de trabalho", texto: "Estrutura, tecnologia e concurso para não faltar gente na ponta." },
      { titulo: "Diálogo permanente", texto: "Mesa de negociação real, com respeito a quem faz o estado funcionar." },
    ],
    depoimento: { texto: "Servidor motivado atende melhor. Só queremos respeito.", autor: "Paulo, 47", papel: "servidor estadual · Porto Alegre" },
    seo: { title: "Servidores Públicos", description: "Valorização, carreira e condições dignas para o servidor público do RS." },
  },
  {
    slug: "empreendedores",
    publico: "Empreendedores",
    eyebrow: "Coração Gaúcho com quem empreende",
    headline: "Quem **empreende** faz o RS girar",
    subheadline:
      "Do MEI ao pequeno comércio: menos burocracia, crédito acessível e apoio para crescer. Empreender é coragem — e merece respaldo.",
    accent: AMBAR,
    ctaLabel: "Quero apoio para empreender",
    formTitle: "Some-se aos empreendedores do RS",
    tipoPadrao: "apoiador",
    dores: [
      "Burocracia e impostos que sufocam o pequeno negócio.",
      "Crédito caro e difícil para quem está começando.",
      "Falta de apoio para vender mais e crescer.",
    ],
    compromissos: [
      { titulo: "MEI descomplicado", texto: "Formalização simples e desoneração para o pequeno empreendedor." },
      { titulo: "Crédito para começar", texto: "Microcrédito acessível com juros justos e orientação." },
      { titulo: "Capacitação e mercado", texto: "Apoio em gestão, digitalização e acesso a novos clientes." },
    ],
    depoimento: { texto: "Comecei do zero. Com um empurrão do estado, a gente cresce.", autor: "Aline, 29", papel: "microempreendedora · Passo Fundo" },
    seo: { title: "Empreendedores", description: "Menos burocracia, crédito acessível e apoio para quem empreende no RS." },
  },
  {
    slug: "liderancas",
    publico: "Lideranças",
    eyebrow: "Coração Gaúcho com as lideranças",
    headline: "Sua liderança **transforma** a sua região",
    subheadline:
      "Comunitárias, sindicais, religiosas ou de bairro: quem lidera conhece a realidade e ajuda a construir as soluções. Junte-se à articulação.",
    accent: AZUL_ESCURO,
    ctaLabel: "Quero liderar na minha região",
    formTitle: "Torne-se liderança do movimento",
    tipoPadrao: "lideranca",
    dores: [
      "Demandas da comunidade que nunca chegam ao poder.",
      "Falta de canal direto com quem decide.",
      "Trabalho de base sem reconhecimento nem estrutura.",
    ],
    compromissos: [
      { titulo: "Canal direto de gestão", texto: "Lideranças com linha aberta com o governo e resposta às demandas." },
      { titulo: "Orçamento participativo", texto: "A comunidade ajudando a decidir onde o recurso é aplicado." },
      { titulo: "Rede de articulação", texto: "Formação e apoio para quem organiza e mobiliza a base." },
    ],
    depoimento: { texto: "Conheço cada rua do meu bairro. Só faltava ser ouvido.", autor: "Dona Neusa, 58", papel: "liderança comunitária · Alvorada" },
    seo: { title: "Lideranças", description: "Canal direto, orçamento participativo e rede de articulação para as lideranças do RS." },
  },
  {
    slug: "voluntarios",
    publico: "Voluntários",
    eyebrow: "Coração Gaúcho precisa de você",
    headline: "Faça parte do **movimento na rua**",
    subheadline:
      "Cada gaúcho que se soma nos deixa mais fortes. Panfletagem, redes, eventos, mobilização: tem um lugar pra você nessa história.",
    accent: VERDE,
    ctaLabel: "Quero ser voluntário",
    formTitle: "Seja voluntário do Coração Gaúcho",
    tipoPadrao: "voluntario",
    dores: [
      "Vontade de ajudar e não saber por onde começar.",
      "Sentimento de que a política não te representa.",
      "Desejo de fazer parte de algo maior de verdade.",
    ],
    compromissos: [
      { titulo: "Ação na sua região", texto: "Grupos organizados perto de você, com agenda e propósito." },
      { titulo: "Formação de voluntário", texto: "Capacitação para comunicação, mobilização e defesa das propostas." },
      { titulo: "Movimento de verdade", texto: "Você não é número: é protagonista da mudança do Rio Grande." },
    ],
    depoimento: { texto: "Nunca tinha me envolvido. Hoje sei que minha ajuda faz diferença.", autor: "Lucas, 26", papel: "voluntário · Gravataí" },
    seo: { title: "Voluntários", description: "Seja voluntário do Coração Gaúcho e faça parte do movimento na rua." },
  },
  {
    slug: "filiados",
    publico: "Filiados",
    eyebrow: "Coração Gaúcho com a militância",
    headline: "Nossa base **organizada e forte**",
    subheadline:
      "Filiados e militantes são a espinha dorsal do movimento. Some-se à organização que leva o Coração Gaúcho a cada canto do estado.",
    accent: AZUL,
    ctaLabel: "Quero me somar à base",
    formTitle: "Some-se à base do movimento",
    tipoPadrao: "lideranca",
    dores: [
      "Militância sem organização e sem informação.",
      "Falta de integração entre as regiões.",
      "Base que trabalha muito e é pouco valorizada.",
    ],
    compromissos: [
      { titulo: "Base integrada", texto: "Comunicação e coordenação ligando a militância de todo o RS." },
      { titulo: "Informação em primeira mão", texto: "Diretrizes, materiais e agenda direto para quem está na luta." },
      { titulo: "Reconhecimento da base", texto: "Quem constrói o movimento tem voz nas decisões." },
    ],
    depoimento: { texto: "Militância organizada é o que ganha eleição e transforma o estado.", autor: "Sérgio, 55", papel: "militante histórico · Santa Cruz do Sul" },
    seo: { title: "Filiados", description: "Organização, informação e valorização da base do Coração Gaúcho." },
  },
  {
    slug: "doadores",
    publico: "Doadores",
    eyebrow: "Coração Gaúcho é feito com o povo",
    headline: "Uma campanha **do povo, com o povo**",
    subheadline:
      "Aqui não tem dono: tem gente. Sua contribuição, dentro da lei e com total transparência, ajuda a levar nossa mensagem mais longe.",
    accent: VERMELHO,
    ctaLabel: "Quero contribuir",
    formTitle: "Contribua com o movimento",
    tipoPadrao: "doador",
    dores: [
      "Cansaço de campanhas reféns de grandes interesses.",
      "Desejo de apoiar de forma limpa e transparente.",
      "Vontade de que o povo seja o verdadeiro financiador.",
    ],
    compromissos: [
      { titulo: "Transparência total", texto: "Cada contribuição registrada e prestada contas conforme a lei eleitoral." },
      { titulo: "Campanha independente", texto: "Financiada por muitos, comprometida com o povo — não com poucos." },
      { titulo: "Sua doação, seu impacto", texto: "Recursos aplicados para levar o Coração Gaúcho a todo o estado." },
    ],
    depoimento: { texto: "Prefiro dar dez reais numa campanha limpa do que confiar nos de sempre.", autor: "Roberta, 43", papel: "apoiadora · Bagé" },
    seo: { title: "Doe", description: "Contribua com a campanha Coração Gaúcho — do povo, com o povo e com total transparência." },
  },
];

export function getSegmento(slug: string): Segmento | undefined {
  return SEGMENTOS.find((s) => s.slug === slug);
}

/** Divide o headline em partes; trechos entre ** ** recebem destaque em degradê. */
export function parseHeadline(headline: string): { text: string; highlight: boolean }[] {
  return headline.split(/(\*\*[^*]+\*\*)/g).filter(Boolean).map((chunk) => {
    const highlight = chunk.startsWith("**") && chunk.endsWith("**");
    return { text: highlight ? chunk.slice(2, -2) : chunk, highlight };
  });
}
