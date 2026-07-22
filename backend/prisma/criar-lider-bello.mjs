// Cria o usuário LIDER (admin total) bello@coracao.com.br. Idempotente.
// Uso: APP_DATABASE_URL=<url-de-producao> ADMIN_PASS=<senha> node prisma/criar-lider-bello.mjs
import { PrismaClient } from '../src/generated/prisma/index.js';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();
const EMAIL = 'bello@coracao.com.br';
const NOME = 'Bello';
const SENHA = process.env.ADMIN_PASS;

if (!SENHA || SENHA.length < 6) {
  console.error('[erro] defina ADMIN_PASS com no mínimo 6 caracteres.');
  process.exit(1);
}

try {
  const existing = await prisma.user.findUnique({ where: { email: EMAIL } });
  if (existing) {
    console.log(`[ok] usuário já existe: ${existing.email} (id=${existing.id}, role=${existing.role})`);
    if (existing.role !== 'LIDER') {
      console.log(`[aviso] o papel atual é ${existing.role}, não LIDER. Nada foi alterado.`);
    }
  } else {
    const user = await prisma.user.create({
      data: {
        name: NOME,
        email: EMAIL,
        password: bcrypt.hashSync(SENHA, 10),
        role: 'LIDER',
        active: true,
      },
    });
    console.log(`[ok] LIDER criado: ${user.email} (id=${user.id})`);
  }
  const total = await prisma.user.count({ where: { role: 'LIDER' } });
  console.log(`[ok] total de LIDER no banco: ${total}`);
} catch (e) {
  console.error('[erro]', e.message);
  process.exit(1);
} finally {
  await prisma.$disconnect();
}
