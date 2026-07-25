import type { Metadata } from "next";
import { LegalShell, CONTATO } from "@/components/legal/LegalShell";
import { FormExclusao } from "@/components/legal/FormExclusao";

export const metadata: Metadata = {
  title: "Excluir conta",
  description:
    "Como excluir permanentemente sua conta e seus dados na plataforma Coração Gaúcho.",
  alternates: { canonical: "/excluir-conta" },
};

// Página exigida pela política da Google Play Store (account deletion URL).

export default function ExcluirConta() {
  return (
    <LegalShell eyebrow="Privacidade" title="Como excluir sua conta">
      <p>
        Esta página descreve como excluir permanentemente sua conta e os dados associados na
        plataforma <strong>Coração Gaúcho</strong> — tanto o <strong>cadastro de apoiador</strong>{" "}
        (feito pelo site ou pelo app) quanto a <strong>conta de acesso ao painel</strong> (equipe e
        voluntários).
      </p>

      <h2>Como solicitar a exclusão</h2>

      <h3>Opção 1 — Dentro do aplicativo (recomendado)</h3>
      <ol>
        <li>Abra o aplicativo Coração Gaúcho</li>
        <li>
          Acesse <strong>Configurações → Privacidade → Excluir conta</strong>
        </li>
        <li>Confirme a operação</li>
        <li>Confirme novamente lendo o aviso de irreversibilidade</li>
      </ol>
      <p>
        A exclusão é processada <strong>imediatamente</strong> após a confirmação.
      </p>

      <h3>Opção 2 — Pelo formulário abaixo</h3>
      <p>
        Preencha o formulário nesta página com o e-mail (e, se quiser, o telefone) usados no
        cadastro. Você recebe um <strong>número de protocolo</strong> na hora e nossa equipe de
        privacidade processa a exclusão em até <strong>5 dias úteis</strong>.
      </p>
      <FormExclusao tipo="EXCLUSAO_CONTA" />

      <h3>Opção 3 — Por e-mail</h3>
      <p>
        Envie um e-mail para{" "}
        <a
          href={`mailto:${CONTATO.privacidade}?subject=${encodeURIComponent(
            "Exclusão de conta — Coração Gaúcho"
          )}`}
        >
          {CONTATO.privacidade}
        </a>{" "}
        com o assunto <strong>&ldquo;Exclusão de conta — Coração Gaúcho&rdquo;</strong>, contendo:
      </p>
      <ul>
        <li>Nome completo</li>
        <li>E-mail e/ou telefone usados no cadastro</li>
      </ul>
      <p>
        Responderemos em até <strong>5 dias úteis</strong> confirmando a exclusão ou solicitando
        informações adicionais para verificar sua identidade.
      </p>

      <h2>O que é excluído</h2>
      <p>Após a confirmação, os seguintes dados são excluídos permanentemente:</p>
      <ul>
        <li>Nome, e-mail, telefone e cidade</li>
        <li>Forma de participação e público/tema de interesse (dados de afinidade política)</li>
        <li>Observações e histórico de contato do seu cadastro</li>
        <li>
          Token de notificações push (você para de receber notificações imediatamente)
        </li>
        <li>Sessões ativas em todos os dispositivos</li>
        <li>Acesso à conta (não será mais possível fazer login)</li>
      </ul>
      <p>
        A exclusão também vale como <strong>revogação do seu consentimento</strong> para o
        tratamento dos seus dados pela campanha (LGPD, art. 8º, §5º).
      </p>

      <h2>O que é mantido (por obrigação legal)</h2>
      <table>
        <thead>
          <tr>
            <th>Dado</th>
            <th>Período de retenção</th>
            <th>Fundamento</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Logs de acesso (IP, data e hora)</td>
            <td>6 meses</td>
            <td>Marco Civil da Internet, art. 15</td>
          </tr>
          <tr>
            <td>Registros exigidos para prestação de contas eleitoral</td>
            <td>Prazo legal aplicável</td>
            <td>Lei nº 9.504/1997 e resoluções do TSE</td>
          </tr>
          <tr>
            <td>Estatísticas agregadas (contagens, gráficos)</td>
            <td>Indefinidamente</td>
            <td>Dados anonimizados — sem qualquer vínculo com você</td>
          </tr>
        </tbody>
      </table>
      <p>
        <strong>Anonimização</strong> significa que esses registros perdem qualquer informação capaz
        de identificar você pessoalmente. Não há como vincular esses registros a você novamente, nem
        internamente.
      </p>

      <h2>A exclusão é reversível?</h2>
      <p>
        <strong>Não.</strong> A exclusão é permanente. Se quiser voltar a participar do movimento no
        futuro, será necessário fazer um novo cadastro.
      </p>

      <h2>Só quero parar de receber mensagens</h2>
      <p>Se você quer apenas parar de receber comunicações sem excluir seu cadastro:</p>
      <ul>
        <li>
          <strong>Notificações push:</strong> desative em Configurações → Notificações (no app) ou
          nas configurações do seu celular;
        </li>
        <li>
          <strong>E-mails:</strong> use o link de descadastro presente nas mensagens, ou escreva
          para <a href={`mailto:${CONTATO.suporte}`}>{CONTATO.suporte}</a>.
        </li>
      </ul>
      <p>
        Para excluir apenas categorias específicas de dados, veja{" "}
        <a href="/excluir-dados">coracaogaucho.com.br/excluir-dados</a>.
      </p>

      <h2>Dúvidas</h2>
      <ul>
        <li>
          <strong>DPO/Privacidade:</strong>{" "}
          <a href={`mailto:${CONTATO.privacidade}`}>{CONTATO.privacidade}</a>
        </li>
        <li>
          <strong>Suporte:</strong> <a href={`mailto:${CONTATO.suporte}`}>{CONTATO.suporte}</a>
        </li>
        <li>
          <strong>Política de Privacidade completa:</strong>{" "}
          <a href="/politica-de-privacidade">coracaogaucho.com.br/politica-de-privacidade</a>
        </li>
      </ul>
    </LegalShell>
  );
}
