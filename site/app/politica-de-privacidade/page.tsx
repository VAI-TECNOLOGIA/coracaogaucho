import type { Metadata } from "next";
import { LegalShell, CONTATO, EMPRESA } from "@/components/legal/LegalShell";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Política de Privacidade do aplicativo Confia+, desenvolvido pela Vai Tecnologia LTDA para o movimento Coração Gaúcho, em conformidade com a LGPD.",
  alternates: { canonical: "/politica-de-privacidade" },
};

// TODO(jurídico): incluir CNPJ e endereço da Vai Tecnologia LTDA quando disponíveis.

export default function PoliticaDePrivacidade() {
  return (
    <LegalShell eyebrow="Institucional" title="Política de Privacidade">
      <h2>1. Quem somos</h2>
      <p>
        Esta Política de Privacidade se aplica ao aplicativo <strong>Confia+</strong> (também
        distribuído como &ldquo;Confia+ RS&rdquo; na App Store), publicado na Google Play e na Apple
        App Store pela <strong>Vai Tecnologia LTDA</strong>, e ao site{" "}
        <strong>coracaogaucho.com.br</strong>. O app <strong>Confia+</strong> e o site (referidos em
        conjunto como &ldquo;plataforma&rdquo; ou &ldquo;aplicativo&rdquo;) são a plataforma digital
        do movimento <strong>Coração Gaúcho</strong>, da campanha de{" "}
        <strong>Juliana Brizola e Edegar Pretto</strong> no Rio Grande do Sul.
      </p>
      <p>
        O aplicativo <strong>{EMPRESA.app}</strong> é desenvolvido e mantido pela{" "}
        <strong>{EMPRESA.razaoSocial}</strong>, inscrita no CNPJ{" "}
        <strong>{EMPRESA.cnpj}</strong>, com sede em {EMPRESA.endereco} — desenvolvedora responsável
        pela plataforma na Google Play e na Apple App Store, que atua como operadora dos dados em
        nome do movimento Coração Gaúcho. Contato do desenvolvedor:{" "}
        <a href={`mailto:${CONTATO.suporte}`}>{CONTATO.suporte}</a>.
      </p>
      <p>
        Esta Política de Privacidade descreve como coletamos, usamos, compartilhamos e protegemos
        seus dados pessoais, em conformidade com a{" "}
        <strong>Lei Geral de Proteção de Dados (Lei nº 13.709/2018 – LGPD)</strong>, com o Marco
        Civil da Internet (Lei nº 12.965/2014) e com a legislação eleitoral aplicável (Lei nº
        9.504/1997 e resoluções do TSE).
      </p>

      <h2>2. Encarregado de Proteção de Dados (DPO)</h2>
      <p>
        Contato: <a href={`mailto:${CONTATO.privacidade}`}>{CONTATO.privacidade}</a>
      </p>
      <p>
        Para qualquer questão relativa ao tratamento de seus dados pessoais, exercício de direitos
        previstos na LGPD ou denúncias, entre em contato com nosso DPO no endereço acima.
      </p>

      <h2>3. Quais dados coletamos</h2>
      <h3>3.1 Dados de cadastro de apoiador</h3>
      <p>
        Informados por você ao preencher o formulário &ldquo;Some-se&rdquo; no site, nas páginas de
        campanha ou no aplicativo:
      </p>
      <ul>
        <li>Nome</li>
        <li>E-mail</li>
        <li>Telefone (opcional)</li>
        <li>Cidade</li>
        <li>Forma de participação escolhida (apoiador, voluntário, liderança ou doador)</li>
        <li>Público/tema de interesse (ex.: juventude, saúde, educação, campo)</li>
        <li>Origem do cadastro (qual página ou campanha levou você até nós)</li>
      </ul>

      <h3>3.2 Dado pessoal sensível — afinidade política</h3>
      <p>
        Ao se cadastrar como apoiador do movimento, você nos informa um dado que a LGPD classifica
        como <strong>sensível</strong>: sua afinidade ou opinião política (art. 5º, II). Esse dado é
        tratado <strong>exclusivamente com base no seu consentimento explícito</strong> (art. 11, I
        da LGPD), manifestado no ato do cadastro, para as finalidades descritas na seção 4. Você
        pode <strong>revogar esse consentimento a qualquer momento</strong> (seção 7) e, nesse caso,
        seu cadastro é excluído.
      </p>

      <h3>3.3 Dados de contas de equipe</h3>
      <ul>
        <li>Nome, e-mail e papel na equipe (administrador, coordenador ou voluntário)</li>
        <li>Senha (armazenada apenas de forma criptografada — nunca em texto puro)</li>
      </ul>

      <h3>3.4 Dados de uso</h3>
      <ul>
        <li>Logs de acesso (endereço IP, data e hora)</li>
        <li>Páginas/telas visitadas e ações executadas na plataforma</li>
        <li>Falhas e erros técnicos (para diagnóstico)</li>
        <li>Dados de navegação coletados por ferramentas de análise (seção 9)</li>
      </ul>

      <h3>3.5 Dados do dispositivo (aplicativo)</h3>
      <ul>
        <li>Modelo do dispositivo e versão do sistema operacional</li>
        <li>
          Token de notificações push (FCM/APNs) — para enviar avisos no celular, apenas se você
          autorizar
        </li>
        <li>Permissões concedidas (apenas quando você autoriza expressamente)</li>
      </ul>
      <p>
        <strong>Não coletamos:</strong> dados financeiros, documentos de identidade, biometria ou
        localização em segundo plano. A plataforma <strong>não processa doações</strong> — qualquer
        doação segue os canais oficiais da campanha, conforme a legislação eleitoral.
      </p>

      <h2>4. Finalidades do tratamento</h2>
      <table>
        <thead>
          <tr>
            <th>Finalidade</th>
            <th>Base legal LGPD</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Registrar seu cadastro como apoiador/voluntário e sua área de interesse</td>
            <td>Consentimento explícito (art. 11, I)</td>
          </tr>
          <tr>
            <td>Entrar em contato com você sobre a campanha (convites, agenda, mobilização)</td>
            <td>Consentimento (art. 7º, I) — você pode se descadastrar a qualquer momento</td>
          </tr>
          <tr>
            <td>Enviar notificações push no aplicativo</td>
            <td>Consentimento — controlável nas configurações do dispositivo</td>
          </tr>
          <tr>
            <td>Permitir login e autenticação da equipe no painel</td>
            <td>Execução de contrato (art. 7º, V)</td>
          </tr>
          <tr>
            <td>Organizar a atuação da campanha por região e público</td>
            <td>Consentimento explícito (art. 11, I)</td>
          </tr>
          <tr>
            <td>Produzir estatísticas e análises agregadas de engajamento</td>
            <td>Legítimo interesse (art. 7º, IX), com dados agregados/anonimizados</td>
          </tr>
          <tr>
            <td>Manter registros de acesso à aplicação</td>
            <td>Cumprimento de obrigação legal (Marco Civil, art. 15)</td>
          </tr>
          <tr>
            <td>Atender pedidos de acesso, correção, exclusão e portabilidade</td>
            <td>Cumprimento de obrigação legal (art. 7º, II)</td>
          </tr>
        </tbody>
      </table>
      <p>
        <strong>Nunca usamos seus dados para:</strong> venda a terceiros, marketing de terceiros ou
        qualquer finalidade estranha à campanha.
      </p>

      <h2>5. Com quem compartilhamos seus dados</h2>
      <p>
        Compartilhamos dados pessoais apenas com fornecedores estritamente necessários à operação da
        plataforma:
      </p>
      <ul>
        <li>
          <strong>Hospedagem e infraestrutura:</strong> provedores de hospedagem do site e do banco
          de dados — armazenamento e processamento.
        </li>
        <li>
          <strong>Ferramentas de análise:</strong> Google (Analytics/Tag Manager) e Meta (Pixel) —
          métricas de audiência e conversão das páginas (seção 9).
        </li>
        <li>
          <strong>Notificações:</strong> serviços de push (Firebase/APNs) e e-mail transacional —
          envio de avisos.
        </li>
        <li>
          <strong>Inteligência artificial:</strong> utilizamos a API da Anthropic (Claude) para
          gerar análises a partir de métricas <strong>agregadas</strong> (totais, percentuais,
          rankings) — dados individuais identificáveis não são enviados para esse fim.
        </li>
        <li>
          <strong>Autoridades públicas e Justiça Eleitoral:</strong> mediante ordem judicial ou
          requisição legal devidamente fundamentada.
        </li>
      </ul>
      <p>
        <strong>Nunca vendemos seus dados.</strong>
      </p>

      <h2>6. Por quanto tempo guardamos seus dados</h2>
      <table>
        <thead>
          <tr>
            <th>Categoria de dado</th>
            <th>Período de retenção</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Cadastro de apoiador</td>
            <td>
              Enquanto o seu consentimento estiver vigente. Revogado o consentimento, o cadastro é
              excluído ou anonimizado.
            </td>
          </tr>
          <tr>
            <td>Contas de equipe</td>
            <td>Enquanto a conta estiver ativa</td>
          </tr>
          <tr>
            <td>Logs de acesso</td>
            <td>6 meses (Marco Civil da Internet, art. 15)</td>
          </tr>
          <tr>
            <td>Registros exigidos pela legislação eleitoral</td>
            <td>Pelo prazo legal aplicável</td>
          </tr>
          <tr>
            <td>Dados anonimizados (estatísticas)</td>
            <td>Indefinidamente — sem possibilidade de reidentificação</td>
          </tr>
        </tbody>
      </table>
      <p>Após o período aplicável, os dados são excluídos ou anonimizados de forma irreversível.</p>

      <h2>7. Seus direitos</h2>
      <p>Como titular dos dados, você tem direito a (arts. 18 e seguintes da LGPD):</p>
      <ul>
        <li>
          <strong>Acesso:</strong> saber quais dados temos sobre você
        </li>
        <li>
          <strong>Correção:</strong> atualizar dados incompletos ou desatualizados
        </li>
        <li>
          <strong>Exclusão:</strong> solicitar a exclusão dos seus dados
        </li>
        <li>
          <strong>Anonimização/bloqueio:</strong> quando aplicável
        </li>
        <li>
          <strong>Portabilidade:</strong> receber seus dados em formato estruturado
        </li>
        <li>
          <strong>Informação sobre compartilhamento:</strong> saber com quem seus dados foram
          compartilhados
        </li>
        <li>
          <strong>Revogação do consentimento:</strong> a qualquer momento, sem custo
        </li>
      </ul>
      <p>Para exercer qualquer desses direitos:</p>
      <ul>
        <li>
          No aplicativo: <strong>Configurações → Privacidade → Excluir conta / Excluir dados</strong>
        </li>
        <li>
          Pela web: <a href="/excluir-conta">coracaogaucho.com.br/excluir-conta</a>
        </li>
        <li>
          Por e-mail: <a href={`mailto:${CONTATO.privacidade}`}>{CONTATO.privacidade}</a> (resposta
          em até 15 dias)
        </li>
      </ul>

      <h2>8. Segurança</h2>
      <ul>
        <li>Criptografia em trânsito (HTTPS/TLS)</li>
        <li>Senhas armazenadas com algoritmo de derivação seguro</li>
        <li>
          Controle de acesso por papel (RBAC) no painel interno — cada membro da equipe vê apenas o
          necessário
        </li>
        <li>Sessões autenticadas com tokens assinados e cookies protegidos</li>
        <li>Backups regulares</li>
      </ul>
      <p>
        Em caso de incidente de segurança que possa acarretar risco ou dano relevante, comunicaremos
        você e a Autoridade Nacional de Proteção de Dados (ANPD), conforme exigido pela LGPD.
      </p>

      <h2>9. Cookies e tecnologias similares</h2>
      <p>
        Utilizamos <strong>cookies essenciais</strong> (autenticação e sessão do painel) e{" "}
        <strong>tags analíticas</strong> (Google Analytics 4, Google Tag Manager e Meta Pixel), que
        medem visitas e conversões dos formulários. Você pode gerenciar cookies nas configurações do
        navegador e limitar o rastreamento nas configurações do dispositivo. Recusar cookies
        analíticos não impacta funcionalidades essenciais.
      </p>

      <h2>10. Transferência internacional</h2>
      <p>
        Alguns fornecedores (ex.: Google, Meta, Anthropic e provedores de hospedagem) podem
        armazenar ou processar dados em servidores fora do Brasil. Nesses casos, a transferência
        segue as salvaguardas do art. 33 da LGPD (cláusulas contratuais padrão, certificações
        reconhecidas).
      </p>

      <h2>11. Idade mínima</h2>
      <p>
        A plataforma destina-se a <strong>maiores de 16 anos</strong> (idade de participação
        eleitoral no Brasil). Não coletamos intencionalmente dados de menores de 16 anos; se
        identificarmos tal cadastro, ele será excluído imediatamente.
      </p>

      <h2>12. Alterações nesta política</h2>
      <p>
        Podemos atualizar esta política periodicamente. Mudanças relevantes serão comunicadas por
        aviso na plataforma ou por e-mail; mudanças menores, pela atualização da data no topo desta
        página. O uso continuado do serviço após a comunicação constitui aceitação das mudanças.
      </p>

      <h2>13. Contato</h2>
      <ul>
        <li>
          <strong>Aplicativo:</strong> {EMPRESA.app} ({EMPRESA.appIos} na App Store)
        </li>
        <li>
          <strong>Desenvolvedor:</strong> {EMPRESA.razaoSocial} — CNPJ {EMPRESA.cnpj}
        </li>
        <li>
          <strong>Endereço:</strong> {EMPRESA.endereco}
        </li>
        <li>
          <strong>DPO/Privacidade:</strong>{" "}
          <a href={`mailto:${CONTATO.privacidade}`}>{CONTATO.privacidade}</a>
        </li>
        <li>
          <strong>Suporte:</strong> <a href={`mailto:${CONTATO.suporte}`}>{CONTATO.suporte}</a>
        </li>
      </ul>

      <h2>14. Foro</h2>
      <p>
        Esta política é regida pela legislação brasileira. Fica eleito o foro da Comarca de{" "}
        <strong>Porto Alegre/RS</strong> para dirimir quaisquer controvérsias, salvo competência
        diversa estabelecida em lei.
      </p>
    </LegalShell>
  );
}
