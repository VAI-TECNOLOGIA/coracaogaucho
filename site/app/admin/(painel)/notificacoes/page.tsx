import { prisma } from "@/lib/db";
import { getSessao } from "@/lib/auth";
import { pushConfigurado } from "@/lib/push";
import { Card } from "@/components/admin/ui";
import { FormNotificacao } from "@/components/admin/FormNotificacao";

export const dynamic = "force-dynamic";

export default async function NotificacoesPage() {
  const [sessao, ativos, total] = await Promise.all([
    getSessao(),
    prisma.deviceToken.count({ where: { ativo: true } }),
    prisma.deviceToken.count(),
  ]);

  const configurado = pushConfigurado();

  return (
    <div className="mx-auto max-w-3xl">
      <header className="mb-8">
        <p className="font-label text-xs uppercase tracking-[0.2em] text-red">Mobilização</p>
        <h1 className="mt-1 font-display text-3xl font-bold text-ink sm:text-4xl">Notificações push</h1>
        <p className="mt-1 text-ink-soft">
          Envie um aviso direto para o celular de quem tem o app Coração Gaúcho instalado.
        </p>
      </header>

      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <Card>
          <p className="text-xs uppercase tracking-wide text-ink-soft">Dispositivos ativos</p>
          <p className="mt-1 font-display text-3xl font-bold text-ink">{ativos}</p>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-wide text-ink-soft">Total já registrado</p>
          <p className="mt-1 font-display text-3xl font-bold text-ink">{total}</p>
        </Card>
      </div>

      {!configurado && (
        <p className="mb-6 rounded-xl border border-dashed border-amber-700/40 bg-yellow/10 p-4 text-sm text-ink-soft">
          ⚠️ O envio está desabilitado: configure a variável <code className="rounded bg-ink/5 px-1 py-0.5">FIREBASE_SERVICE_ACCOUNT</code>{" "}
          no servidor (JSON da service account do Firebase, puro ou em base64). O registro de
          dispositivos já está funcionando normalmente.
        </p>
      )}

      <FormNotificacao dispositivos={ativos} souAdmin={sessao?.papel === "ADMIN"} />

      <p className="mt-6 text-xs text-ink-soft/70">
        Dica: mensagens curtas com chamada clara performam melhor. O link abre dentro do app.
      </p>
    </div>
  );
}
