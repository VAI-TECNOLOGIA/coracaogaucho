import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCog, KeyRound, Trash2, AlertTriangle } from 'lucide-react';
import Layout from '../components/layout/Layout.jsx';
import { Card } from '../components/ui/Card.jsx';
import Modal from '../components/ui/Modal.jsx';
import PasswordInput from '../components/ui/PasswordInput.jsx';
import Avatar from '../components/ui/Avatar.jsx';
import api, { apiError } from '../api/client.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { label } from '../config/enums.js';

const CONFIRM_WORD = 'EXCLUIR';

export default function Account() {
  const { user, logout } = useAuth();
  const toast = useToast();
  const nav = useNavigate();

  const [pwd, setPwd] = useState({ current: '', next: '', repeat: '' });
  const [savingPwd, setSavingPwd] = useState(false);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [delPassword, setDelPassword] = useState('');
  const [delWord, setDelWord] = useState('');
  const [deleting, setDeleting] = useState(false);

  async function changePassword(e) {
    e.preventDefault();
    if (pwd.next.length < 6) return toast.error('A nova senha precisa ter ao menos 6 caracteres.');
    if (pwd.next !== pwd.repeat) return toast.error('A confirmação não confere com a nova senha.');
    setSavingPwd(true);
    try {
      await api.post('/auth/change-password', { currentPassword: pwd.current, newPassword: pwd.next });
      setPwd({ current: '', next: '', repeat: '' });
      toast.success('Senha alterada com sucesso!');
    } catch (err) {
      toast.error(apiError(err));
    } finally {
      setSavingPwd(false);
    }
  }

  async function deleteAccount() {
    setDeleting(true);
    try {
      await api.delete('/auth/me', { data: { password: delPassword } });
      setConfirmOpen(false);
      toast.success('Conta excluída. Sentiremos sua falta.');
      logout();
      nav('/login', { replace: true });
    } catch (err) {
      toast.error(apiError(err));
    } finally {
      setDeleting(false);
    }
  }

  const canDelete = delPassword.length > 0 && delWord.trim().toUpperCase() === CONFIRM_WORD;

  return (
    <Layout title="Minha conta" subtitle="Seus dados, sua senha e a exclusão da conta">
      <div className="grid grid-2">
        <Card title="Meus dados" icon={UserCog}>
          <div className="flex items-center gap-12" style={{ marginBottom: 16 }}>
            <Avatar name={user?.name} src={user?.avatarUrl} />
            <div>
              <strong style={{ display: 'block' }}>{user?.name}</strong>
              <span className="muted text-sm">{label('UserRole', user?.role)}</span>
            </div>
          </div>
          <div className="form-grid">
            <div className="field">
              <label>E-mail</label>
              <input className="input" value={user?.email || ''} readOnly />
            </div>
            <div className="field">
              <label>Telefone</label>
              <input className="input" value={user?.phone || '—'} readOnly />
            </div>
            <div className="field full">
              <label>Região</label>
              <input className="input" value={user?.region?.name || '—'} readOnly />
            </div>
          </div>
          <p className="muted text-sm" style={{ marginTop: 12 }}>
            Para alterar nome, e-mail ou região, fale com o líder da campanha.
          </p>
        </Card>

        <Card title="Alterar senha" icon={KeyRound}>
          <form onSubmit={changePassword}>
            <div className="form-grid">
              <div className="field full">
                <label>Senha atual</label>
                <PasswordInput
                  value={pwd.current}
                  onChange={(e) => setPwd((p) => ({ ...p, current: e.target.value }))}
                  autoComplete="current-password"
                />
              </div>
              <div className="field">
                <label>Nova senha</label>
                <PasswordInput
                  value={pwd.next}
                  onChange={(e) => setPwd((p) => ({ ...p, next: e.target.value }))}
                  autoComplete="new-password"
                  placeholder="Mínimo 6 caracteres"
                />
              </div>
              <div className="field">
                <label>Repetir nova senha</label>
                <PasswordInput
                  value={pwd.repeat}
                  onChange={(e) => setPwd((p) => ({ ...p, repeat: e.target.value }))}
                  autoComplete="new-password"
                />
              </div>
            </div>
            <button className="btn btn-primary btn-sm" type="submit" disabled={savingPwd || !pwd.current || !pwd.next}>
              <KeyRound size={15} /> {savingPwd ? 'Salvando...' : 'Alterar senha'}
            </button>
          </form>
        </Card>
      </div>

      <h3 style={{ margin: '26px 0 14px' }}>
        <AlertTriangle size={18} style={{ verticalAlign: '-3px' }} /> Excluir minha conta
      </h3>
      <Card>
        <p style={{ marginBottom: 10 }}>
          Você pode excluir sua conta a qualquer momento, direto por aqui. A exclusão é <strong>permanente</strong> e
          não pode ser desfeita.
        </p>
        <ul className="muted text-sm" style={{ margin: '0 0 16px 18px', lineHeight: 1.7 }}>
          <li>Seus dados pessoais (nome, e-mail, telefone, foto e senha) são apagados do sistema.</li>
          <li>Seu acesso é encerrado imediatamente e o login deixa de funcionar.</li>
          <li>
            Registros da campanha que você criou (avisos, ações, materiais) permanecem, mas deixam de estar
            vinculados a você.
          </li>
          {user?.role === 'LIDER' && (
            <li>
              Você é um <strong>líder</strong>: se for o único líder ativo, a campanha ficará sem acesso
              administrativo. Promova outro líder antes, se for o caso.
            </li>
          )}
        </ul>
        <button className="btn btn-danger btn-sm" onClick={() => setConfirmOpen(true)}>
          <Trash2 size={15} /> Excluir minha conta
        </button>
      </Card>

      {confirmOpen && (
        <Modal
          title="Excluir minha conta"
          onClose={() => setConfirmOpen(false)}
          footer={
            <>
              <button className="btn btn-outline btn-sm" onClick={() => setConfirmOpen(false)} disabled={deleting}>
                Cancelar
              </button>
              <button className="btn btn-danger btn-sm" onClick={deleteAccount} disabled={!canDelete || deleting}>
                <Trash2 size={15} /> {deleting ? 'Excluindo...' : 'Excluir permanentemente'}
              </button>
            </>
          }
        >
          <p style={{ marginBottom: 14 }}>
            Esta ação é <strong>permanente</strong>. Confirme sua senha e digite <strong>{CONFIRM_WORD}</strong> para
            continuar.
          </p>
          <div className="form-grid">
            <div className="field full">
              <label>Sua senha</label>
              <PasswordInput
                value={delPassword}
                onChange={(e) => setDelPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>
            <div className="field full">
              <label>Digite {CONFIRM_WORD}</label>
              <input
                className="input"
                value={delWord}
                onChange={(e) => setDelWord(e.target.value)}
                placeholder={CONFIRM_WORD}
                autoCapitalize="characters"
              />
            </div>
          </div>
        </Modal>
      )}
    </Layout>
  );
}
