import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import api, { apiError } from '../api/client.js';
import { useToast } from '../context/ToastContext.jsx';
import '../styles/landing.css';

/**
 * Tela pública de /lp — apenas CADASTRO e acesso ao sistema.
 *
 * A versão anterior era uma landing de campanha de ~515 linhas e foi removida
 * por inteiro. O que saiu, e por quê:
 *
 *  - "Baixe o Plano de Governo completo", "Bandeiras que mudam o Rio Grande" e
 *    "Nossas frentes de trabalho": proposta de governo, vedada em pré-campanha.
 *  - Prova social automática: um pool de 1.000 nomes e cidades INVENTADOS
 *    anunciava "Fulano de tal virou apoiador! agora mesmo" a cada 12s. Era
 *    pessoa fictícia apresentada como apoiador real.
 *  - O ímã do Plano de Governo cadastrava a pessoa como MATERIAL_DIGITAL com
 *    cidade fixa "Porto Alegre", sem ela saber.
 *
 * O cadastro não envia `supportType`: o backend já usa NOTICIAS por padrão e a
 * classificação do apoiador é feita pela equipe dentro do sistema.
 */
export default function Landing() {
  const toast = useToast();
  const [form, setForm] = useState({ name: '', phone: '', email: '', cityName: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [erro, setErro] = useState('');

  const set = (campo) => (e) => setForm((f) => ({ ...f, [campo]: e.target.value }));

  async function onSubmit(e) {
    e.preventDefault();
    setErro('');
    setSending(true);
    try {
      await api.post('/public/join', {
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim() || undefined,
        cityName: form.cityName.trim() || undefined,
      });
      // Conversão: dispara Lead (Meta) e generate_lead (GA4) no cadastro concluído
      if (typeof window !== 'undefined') {
        if (window.fbq) window.fbq('track', 'Lead');
        if (window.gtag) window.gtag('event', 'generate_lead', { method: 'lp' });
      }
      setSent(true);
    } catch (err) {
      const msg = apiError(err);
      setErro(msg);
      toast.error(msg);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="cg-lp">
      <div className="cg-bar" aria-hidden="true" />

      <main className="cg-main">
        <section className="cg-card">
          <img
            className="cg-logo"
            src="/brand/coracao-gaucho-marca.png"
            alt="Coração Gaúcho"
            width="300"
            height="177"
          />

          {sent ? (
            <div className="cg-ok" role="status">
              <span className="cg-ok-icone" aria-hidden="true">
                <Check size={30} strokeWidth={3} />
              </span>
              <h1 className="cg-ok-titulo">Cadastro recebido!</h1>
              <p className="cg-ok-texto">
                Obrigado por participar. Em breve entraremos em contato.
              </p>
              <button type="button" className="cg-link" onClick={() => { setSent(false); setForm({ name: '', phone: '', email: '', cityName: '' }); }}>
                Fazer outro cadastro
              </button>
            </div>
          ) : (
            <>
              <h1 className="cg-titulo">Faça parte</h1>
              <p className="cg-sub">
                Preencha seus dados para se cadastrar. Leva menos de um minuto.
              </p>

              <form className="cg-form" onSubmit={onSubmit} noValidate>
                <div className="cg-campo">
                  <label htmlFor="cg-nome">Seu nome <span aria-hidden="true">*</span></label>
                  <input
                    id="cg-nome" name="name" autoComplete="name" required minLength={2}
                    placeholder="Nome completo" value={form.name} onChange={set('name')}
                  />
                </div>

                <div className="cg-campo">
                  <label htmlFor="cg-fone">Seu telefone (WhatsApp) <span aria-hidden="true">*</span></label>
                  <input
                    id="cg-fone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required
                    placeholder="(51) 90000-0000" value={form.phone} onChange={set('phone')}
                  />
                </div>

                <div className="cg-linha">
                  <div className="cg-campo">
                    <label htmlFor="cg-cidade">Cidade</label>
                    <input
                      id="cg-cidade" name="cityName" autoComplete="address-level2"
                      placeholder="Sua cidade no RS" value={form.cityName} onChange={set('cityName')}
                    />
                  </div>
                  <div className="cg-campo">
                    <label htmlFor="cg-email">E-mail</label>
                    <input
                      id="cg-email" name="email" type="email" autoComplete="email"
                      placeholder="voce@email.com" value={form.email} onChange={set('email')}
                    />
                  </div>
                </div>

                {erro && <p className="cg-erro" role="alert">{erro}</p>}

                <button type="submit" className="cg-btn" disabled={sending}>
                  {sending ? 'Enviando…' : 'Quero participar'}
                  {!sending && <ArrowRight size={18} strokeWidth={2.5} aria-hidden="true" />}
                </button>
              </form>
            </>
          )}
        </section>

        <p className="cg-acesso">
          É da equipe da pré-campanha? <Link to="/login">Entrar no sistema</Link>
        </p>
      </main>
    </div>
  );
}
