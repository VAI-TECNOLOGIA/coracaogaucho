import type { Metadata } from "next";
import { LegalShell, CONTATO, EMPRESA } from "@/components/legal/LegalShell";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: "Termos de Uso da plataforma e do aplicativo Coração Gaúcho.",
  alternates: { canonical: "/termos-de-uso" },
};

// TODO(jurídico): incluir razão social, CNPJ e endereço da entidade responsável antes do go-live.

export default function TermosDeUso() {
  return (
    <LegalShell eyebrow="Institucional" title="Termos de Uso">
      <h2>1. Aceitação dos Termos</h2>
      <p>
        Ao acessar o site <strong>coracaogaucho.com.br</strong>, criar uma conta ou utilizar o
        aplicativo <strong>{EMPRESA.app}</strong> ({EMPRESA.appIos} na App Store) &mdash;
        &ldquo;plataforma&rdquo; &mdash;, você (&ldquo;Usuário&rdquo;) concorda integralmente com
        estes Termos de Uso e com a{" "}
        <a href="/politica-de-privacidade">Política de Privacidade</a>. Se você não concorda com
        qualquer disposição, não utilize a plataforma.
      </p>
      <p>
        A plataforma é desenvolvida e mantida pela <strong>{EMPRESA.razaoSocial}</strong>, inscrita
        no CNPJ <strong>{EMPRESA.cnpj}</strong>, com sede em {EMPRESA.endereco} (&ldquo;Vai
        Tecnologia&rdquo;), em apoio ao movimento <strong>Coração Gaúcho</strong> de Juliana Brizola
        e Edegar Pretto.
      </p>

      <h2>2. Descrição do serviço</h2>
      <p>
        O <strong>Coração Gaúcho</strong> é a plataforma digital do movimento de{" "}
        <strong>Juliana Brizola e Edegar Pretto</strong> no Rio Grande do Sul. Ela permite:
      </p>
      <ul>
        <li>Conhecer as propostas, a agenda e as notícias da campanha;</li>
        <li>Cadastrar-se como apoiador, voluntário ou liderança (&ldquo;Some-se&rdquo;);</li>
        <li>Receber comunicações e convocações da campanha (e-mail, notificações push);</li>
        <li>
          Para membros autorizados da equipe: acessar o painel interno de organização (gestão de
          cadastros e mobilização).
        </li>
      </ul>
      <p>
        A plataforma <strong>não processa pagamentos nem doações</strong>. Doações à campanha seguem
        exclusivamente os canais oficiais previstos na legislação eleitoral (Lei nº 9.504/1997 e
        resoluções do TSE).
      </p>
      <p>
        A organização da campanha pode modificar, suspender ou descontinuar funcionalidades a
        qualquer momento, mediante aviso prévio quando possível.
      </p>

      <h2>3. Cadastro e elegibilidade</h2>
      <ul>
        <li>
          O cadastro destina-se a <strong>maiores de 16 anos</strong> (idade de participação
          eleitoral no Brasil).
        </li>
        <li>O Usuário deve fornecer dados verdadeiros, atualizados e completos.</li>
        <li>
          Contas de equipe (painel interno) são pessoais e intransferíveis; o Usuário é responsável
          por manter a confidencialidade da senha e por todas as atividades realizadas em sua conta.
        </li>
        <li>
          A organização pode recusar cadastros, suspender ou encerrar contas que violem estes Termos
          ou a legislação eleitoral.
        </li>
      </ul>

      <h2>4. Uso aceitável</h2>
      <p>O Usuário compromete-se a NÃO:</p>
      <ul>
        <li>Cadastrar dados falsos ou cadastrar terceiros sem o consentimento deles;</li>
        <li>
          Usar a plataforma para disseminar desinformação, discurso de ódio, ameaças ou conteúdo
          ilegal;
        </li>
        <li>
          Usar bots, scripts ou ferramentas automatizadas não autorizadas (inclusive cadastros em
          massa);
        </li>
        <li>Tentar acessar contas de outros Usuários ou áreas restritas do sistema;</li>
        <li>Realizar engenharia reversa, descompilar ou modificar o aplicativo;</li>
        <li>Distribuir malware, spam ou conteúdo abusivo;</li>
        <li>
          Extrair, copiar ou divulgar dados pessoais de outros Usuários ou de cadastros da campanha;
        </li>
        <li>
          Utilizar a plataforma para fins alheios à campanha ou em violação à legislação eleitoral.
        </li>
      </ul>
      <p>
        Violações podem resultar em suspensão imediata, exclusão da conta e comunicação às
        autoridades competentes.
      </p>

      <h2>5. Equipe e tratamento de dados de apoiadores</h2>
      <p>
        Membros da equipe com acesso ao painel interno (administradores, coordenadores e
        voluntários) comprometem-se adicionalmente a:
      </p>
      <ul>
        <li>
          Utilizar os dados de apoiadores <strong>exclusivamente</strong> para as finalidades da
          campanha descritas na Política de Privacidade;
        </li>
        <li>Não exportar, copiar ou compartilhar dados pessoais fora dos canais autorizados;</li>
        <li>Respeitar a LGPD e as orientações do encarregado de dados (DPO) da campanha.</li>
      </ul>
      <p>
        O descumprimento sujeita o membro à revogação imediata do acesso, sem prejuízo das
        responsabilidades legais.
      </p>

      <h2>6. Propriedade intelectual</h2>
      <ul>
        <li>
          A plataforma, a marca <strong>Coração Gaúcho</strong>, os logotipos, textos, artes e
          códigos pertencem à organização da campanha ou são por ela licenciados.
        </li>
        <li>
          É permitido compartilhar os conteúdos públicos da campanha (artes, textos, links) para
          fins de divulgação do movimento, sem alteração que deturpe seu sentido.
        </li>
        <li>
          É vedado o uso da marca e dos materiais para fins comerciais ou para associação a outras
          candidaturas sem autorização.
        </li>
      </ul>

      <h2>7. Responsabilidades</h2>
      <h3>7.1 Da organização</h3>
      <ul>
        <li>
          Manter o serviço disponível em condições razoáveis, sem garantia formal de disponibilidade
          ininterrupta;
        </li>
        <li>
          Adotar medidas técnicas e organizacionais de proteção de dados (vide Política de
          Privacidade);
        </li>
        <li>
          Notificar Usuários sobre incidentes de segurança ou mudanças relevantes nestes Termos.
        </li>
      </ul>
      <h3>7.2 Do Usuário</h3>
      <ul>
        <li>Veracidade dos dados cadastrais;</li>
        <li>
          Uso da plataforma em conformidade com a lei (LGPD, Marco Civil da Internet, legislação
          eleitoral);
        </li>
        <li>Boa-fé nas interações com a campanha e com outros Usuários.</li>
      </ul>
      <h3>7.3 Limitação de responsabilidade</h3>
      <p>A organização não se responsabiliza por:</p>
      <ul>
        <li>Falhas de internet, indisponibilidade de serviços de terceiros ou força maior;</li>
        <li>Conteúdos de sites externos eventualmente vinculados;</li>
        <li>Danos indiretos decorrentes do uso ou da impossibilidade de uso da plataforma.</li>
      </ul>

      <h2>8. Encerramento</h2>
      <ul>
        <li>
          <strong>Pelo Usuário</strong>, a qualquer momento, pelo aplicativo (Configurações →
          Privacidade → Excluir conta), pela página{" "}
          <a href="/excluir-conta">coracaogaucho.com.br/excluir-conta</a> ou por e-mail;
        </li>
        <li>
          <strong>Pela organização</strong>, mediante violação destes Termos, com notificação prévia
          quando aplicável;
        </li>
        <li>
          <strong>Ao término da campanha</strong>, quando a plataforma poderá ser desativada — os
          dados pessoais seguirão o disposto na Política de Privacidade.
        </li>
      </ul>

      <h2>9. Alterações nos Termos</h2>
      <p>
        Estes Termos podem ser revisados periodicamente. Alterações relevantes serão notificadas por
        e-mail cadastrado, notificação na plataforma ou atualização da data no topo desta página. O
        uso continuado após 30 dias da notificação constitui aceitação das mudanças. Se você não
        concordar, deve encerrar sua conta antes desse prazo.
      </p>

      <h2>10. Foro e legislação aplicável</h2>
      <p>
        Estes Termos são regidos pela legislação brasileira. Fica eleito o foro da Comarca de{" "}
        <strong>Porto Alegre/RS</strong> para dirimir quaisquer controvérsias, salvo competência
        diversa estabelecida em lei.
      </p>

      <h2>11. Contato</h2>
      <ul>
        <li>
          <strong>Suporte:</strong> <a href={`mailto:${CONTATO.suporte}`}>{CONTATO.suporte}</a>
        </li>
        <li>
          <strong>Privacidade/DPO:</strong>{" "}
          <a href={`mailto:${CONTATO.privacidade}`}>{CONTATO.privacidade}</a>
        </li>
      </ul>
    </LegalShell>
  );
}
