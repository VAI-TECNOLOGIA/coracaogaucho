import { useState } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { apiError } from '../api/client.js';
import PasswordInput from '../components/ui/PasswordInput.jsx';

export default function Login() {
  const { login, user, loading } = useAuth();
  const nav = useNavigate();
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!loading && user) return <Navigate to="/" replace />;

  async function doLogin(em, pw) {
    setSubmitting(true);
    try {
      await login(em, pw);
      toast.success('Bem-vindo à central de comando!');
      nav('/');
    } catch (err) {
      toast.error(apiError(err, 'Não foi possível entrar. Verifique suas credenciais.'));
    } finally {
      setSubmitting(false);
    }
  }

  function submit(e) {
    e.preventDefault();
    doLogin(email, password);
  }

  return (
    <div className="auth2">
      <div className="auth2-bg" aria-hidden="true" />
      <span className="auth2-topbar" aria-hidden="true" />

      <div className="auth2-stage">
        <img
          className="auth2-hero"
          src="/brand/coracao-gaucho-branco.png"
          alt="Coração Gaúcho — o povo fala mais alto"
        />
        <form className="auth2-card" onSubmit={submit}>
          <span className="auth2-cardbar" aria-hidden="true" />
          <h1 className="auth2-title">Acessar plataforma</h1>
          <p className="auth2-sub">Entre com suas credenciais de acesso.</p>

          <div className="field">
            <label>E-mail</label>
            <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="field">
            <label>Senha</label>
            <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          <button className="btn btn-primary btn-block btn-xl" disabled={submitting} type="submit">
            {submitting ? 'Entrando...' : 'Entrar'}
          </button>

          <div className="auth-signup">
            <span>Não tem conta?</span>
            <Link to="/lp" className="auth-signup-btn">Fazer meu cadastro</Link>
          </div>

          <div className="auth-links">
            <Link to="/esqueci-senha" className="auth-back">Esqueci minha senha</Link>
            <a
              href="https://julianabrizola.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="auth-back"
            >
              <ArrowLeft size={14} /> Conhecer a pré-campanha
            </a>
          </div>
        </form>

        <p className="auth2-foot">
          <strong>A central de comando do movimento.</strong> Mobilização, dados, atendimento e
          território numa só plataforma.
        </p>
      </div>
    </div>
  );
}
