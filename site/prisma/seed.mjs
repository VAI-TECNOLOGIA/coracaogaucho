import { PrismaClient } from "@prisma/client";
import { randomBytes, scryptSync } from "node:crypto";
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";

const prisma = new PrismaClient();

function hashPassword(senha) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(senha, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

const NOMES = ["Ana", "Bruno", "Carla", "Diego", "Eduarda", "Felipe", "Gabriela", "Henrique", "Isabela", "João", "Karina", "Lucas", "Marina", "Nelson", "Otávio", "Patrícia", "Rafael", "Sônia", "Tiago", "Vera", "William", "Yara", "Alceu", "Bianca", "Cléber", "Dânae", "Émerson", "Fabiana"];
const SOBRENOMES = ["Silva", "Brizola", "Pretto", "da Rosa", "Machado", "Oliveira", "Fontoura", "Bertoldo", "Klein", "Scherer", "Farias", "Lemos", "Menezes", "Trindade", "Vargas", "Goulart", "Dornelles", "Pippi", "Radaelli", "Camargo"];
const CIDADES = ["Porto Alegre", "Caxias do Sul", "Pelotas", "Canoas", "Santa Maria", "Gravataí", "Novo Hamburgo", "São Leopoldo", "Rio Grande", "Passo Fundo", "Uruguaiana", "Santa Cruz do Sul", "Bagé", "Bento Gonçalves", "Erechim", "Alvorada", "Viamão", "Ijuí", "Lajeado", "Cachoeirinha"];
const SEGMENTOS = ["jovens", "mulheres", "saude", "educacao", "agricultores", "empresarios", "seguranca", "turismo", "familia", "servidores", "empreendedores", "liderancas", "voluntarios", "filiados", "doadores", null];
const TIPO_POR_SEG = { jovens: "voluntario", voluntarios: "voluntario", agricultores: "lideranca", liderancas: "lideranca", filiados: "lideranca", doadores: "doador" };
const STATUS = ["NOVO", "NOVO", "NOVO", "CONTATADO", "CONTATADO", "ENGAJADO", "CONVERTIDO", "DESCARTADO"];

const pick = (a) => a[Math.floor(Math.random() * a.length)];
const slug = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z]/gi, "").toLowerCase();

async function main() {
  // --- Usuários ---
  await prisma.user.upsert({
    where: { email: "admin@coracaogaucho.com.br" },
    update: {},
    create: { nome: "Administrador", email: "admin@coracaogaucho.com.br", senhaHash: hashPassword("Admin@123"), papel: "ADMIN" },
  });
  await prisma.user.upsert({
    where: { email: "coordenacao@coracaogaucho.com.br" },
    update: {},
    create: { nome: "Coordenação Regional", email: "coordenacao@coracaogaucho.com.br", senhaHash: hashPassword("Admin@123"), papel: "COORDENADOR" },
  });

  // --- Leads: reset e repopular ---
  await prisma.lead.deleteMany({});

  const registros = [];

  // Importa leads reais capturados anteriormente (se houver)
  const jsonl = path.join(process.cwd(), "data", "apoiadores.jsonl");
  if (existsSync(jsonl)) {
    for (const linha of readFileSync(jsonl, "utf8").split("\n").filter(Boolean)) {
      try {
        const r = JSON.parse(linha);
        registros.push({
          nome: r.nome, email: r.email, telefone: r.telefone, cidade: r.cidade,
          tipo: r.tipo || "apoiador", segmento: r.segmento ?? null,
          origem: r.origem || "site-institucional", status: "NOVO",
          criadoEm: r.criadoEm ? new Date(r.criadoEm) : new Date(),
        });
      } catch {}
    }
  }

  // Gera leads de demonstração espalhados nos últimos 45 dias
  const N = 130;
  const agora = Date.now();
  for (let i = 0; i < N; i++) {
    const nome = `${pick(NOMES)} ${pick(SOBRENOMES)}`;
    const seg = pick(SEGMENTOS);
    const diasAtras = Math.floor(Math.random() * 45);
    const criadoEm = new Date(agora - diasAtras * 86400000 - Math.floor(Math.random() * 86400000));
    registros.push({
      nome,
      email: `${slug(nome)}${i}@email.com`,
      telefone: `519${Math.floor(10000000 + Math.random() * 89999999)}`,
      cidade: pick(CIDADES),
      tipo: TIPO_POR_SEG[seg] || pick(["apoiador", "apoiador", "voluntario"]),
      segmento: seg,
      origem: seg ? `lp-${seg}` : "site-institucional",
      status: pick(STATUS),
      criadoEm,
    });
  }

  await prisma.lead.createMany({ data: registros });
  const total = await prisma.lead.count();
  console.log(`✅ Seed concluído: 2 usuários, ${total} leads.`);
  console.log(`   Admin: admin@coracaogaucho.com.br / Admin@123`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
