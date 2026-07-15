import type { Metadata } from "next";
import { LegalShell, CONTATO } from "@/components/legal/LegalShell";
import { FormExclusao } from "@/components/legal/FormExclusao";

export const metadata: Metadata = {
  title: "Excluir dados específicos",
  description:
    "Como remover categorias específicas de dados pessoais sem excluir seu cadastro no Coração Gaúcho.",
  alternates: { canonical: "/excluir-dados" },
};

export default function ExcluirDados() {
  return (
    <LegalShell eyebrow="Privacidade" title="Excluir dados específicos">
      <p>
        Se você não quer excluir seu cadastro inteiro, mas deseja remover{" "}
        <strong>categorias específicas</strong> de dados pessoais, esta página explica como fazer.
      </p>

      <h2>O que você pode excluir mantendo o cadastro ativo</h2>
      <table>
        <thead>
          <tr>
            <th>Categoria de dado</th>
            <th>Posso excluir?</th>
            <th>Como</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Telefone</td>
            <td>✅ Sim</td>
            <td>App → Perfil → Editar → apagar o campo, ou por e-mail</td>
          </tr>
          <tr>
            <td>Cidade</td>
            <td>✅ Sim</td>
            <td>App → Perfil → Editar → apagar o campo, ou por e-mail</td>
          </tr>
          <tr>
            <td>Público/tema de interesse</td>
            <td>✅ Sim</td>
            <td>Por e-mail — seu cadastro deixa de ser segmentado</td>
          </tr>
          <tr>
            <td>Token de notificações push</td>
            <td>✅ Sim</td>
            <td>App → Configurações → Notificações → Desabilitar</td>
          </tr>
          <tr>
            <td>Cookies e cache do navegador (site)</td>
            <td>✅ Sim</td>
            <td>Navegador → Configurações de privacidade</td>
          </tr>
          <tr>
            <td>Histórico de contato/observações do seu cadastro</td>
            <td>✅ Por e-mail</td>
            <td>{CONTATO.privacidade}</td>
          </tr>
          <tr>
            <td>Logs de acesso (IP, datas)</td>
            <td>❌ Não (obrigação legal de 6 meses)</td>
            <td>Marco Civil da Internet, art. 15</td>
          </tr>
          <tr>
            <td>Registros exigidos para prestação de contas eleitoral</td>
            <td>❌ Não (prazo legal)</td>
            <td>Lei nº 9.504/1997 e resoluções do TSE</td>
          </tr>
        </tbody>
      </table>
      <p>
        Nome e e-mail são os identificadores mínimos do cadastro — para removê-los, o caminho é a{" "}
        <a href="/excluir-conta">exclusão completa da conta</a>.
      </p>

      <h2>Como solicitar a exclusão de dados específicos</h2>
      <h3>Pelo aplicativo (autoatendimento)</h3>
      <p>
        Para os campos marcados com ✅ na tabela acima, você consegue excluir diretamente pelas
        configurações do seu perfil, sem precisar solicitar nada.
      </p>
      <h3>Pelo formulário abaixo</h3>
      <p>
        Descreva o que deseja excluir e informe o e-mail do cadastro. Você recebe um{" "}
        <strong>número de protocolo</strong> na hora e respondemos em até <strong>15 dias</strong>,
        conforme o art. 19 da LGPD.
      </p>
      <FormExclusao tipo="EXCLUSAO_DADOS" />

      <h3>Por e-mail</h3>
      <p>
        Se preferir, envie um e-mail para{" "}
        <a
          href={`mailto:${CONTATO.privacidade}?subject=${encodeURIComponent(
            "Exclusão de dados específicos — Coração Gaúcho"
          )}`}
        >
          {CONTATO.privacidade}
        </a>{" "}
        com:
      </p>
      <ul>
        <li>
          Assunto: <strong>&ldquo;Exclusão de dados específicos — Coração Gaúcho&rdquo;</strong>
        </li>
        <li>E-mail e/ou telefone usados no cadastro</li>
        <li>Lista do que deseja excluir</li>
      </ul>
      <p>
        Responderemos em até <strong>15 dias</strong>, conforme o art. 19 da LGPD.
      </p>

      <h2>E se eu quiser excluir tudo?</h2>
      <p>
        Aí o caminho é a exclusão completa da conta. Veja:{" "}
        <a href="/excluir-conta">coracaogaucho.com.br/excluir-conta</a>
      </p>

      <h2>Dúvidas frequentes</h2>
      <p>
        <strong>&ldquo;Excluir meu telefone impede a campanha de falar comigo?&rdquo;</strong>
        <br />
        Por telefone/WhatsApp, sim. Você continua recebendo comunicações pelos canais que mantiver
        (e-mail, notificações do app), até revogar cada um.
      </p>
      <p>
        <strong>&ldquo;Quero parar de receber mensagens, mas sem apagar nada.&rdquo;</strong>
        <br />
        Desative as notificações push nas configurações do app ou do celular e use o link de
        descadastro dos e-mails. Seu cadastro permanece, mas sem comunicações.
      </p>
      <p>
        <strong>&ldquo;Como sei o que vocês têm sobre mim?&rdquo;</strong>
        <br />
        Você pode solicitar um relatório completo (<strong>portabilidade de dados</strong>)
        enviando e-mail para <a href={`mailto:${CONTATO.privacidade}`}>{CONTATO.privacidade}</a>.
        Enviamos um arquivo estruturado com todos os seus dados em até 15 dias.
      </p>

      <h2>Contato</h2>
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
