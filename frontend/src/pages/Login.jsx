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
      toast.success('Bem-vindo à central da campanha!');
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
    <div className="auth">
      {/* Painel visual — logo Confia+ no lugar do mosaico de rostos */}
      <div className="auth-visual">
        <div className="auth-duo" />
        <div className="auth-grain" />
        <div className="auth-content">
          <div className="auth-lockup">
            <h1 className="auth-headline">
              A central de <em>comando</em>
              <br />
              do movimento
            </h1>
            <p className="auth-tagline">
              Mobilização, dados, atendimento e território numa só plataforma.
            </p>
          </div>
        </div>
      </div>

      {/* Formulário */}
      <div className="auth-form-side">
        <form className="auth-card" onSubmit={submit}>
          <img className="auth-form-logo" src="/brand/confia-mais.png" alt="Confia+ RS" />
          <h3>Acessar plataforma</h3>
          <p className="muted">Entre com suas credenciais da campanha.</p>

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
            <Link to="/lp" className="auth-back">
              <ArrowLeft size={14} /> Conhecer a campanha
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
