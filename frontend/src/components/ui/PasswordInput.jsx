import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

// Campo de senha com botão de olho — revela o que está sendo digitado.
export default function PasswordInput({ value, onChange, ...rest }) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="password-input">
      <input
        className="input"
        type={visible ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        {...rest}
      />
      <button
        type="button"
        className="password-toggle"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? 'Ocultar senha' : 'Mostrar senha'}
        aria-pressed={visible}
        tabIndex={-1}
      >
        {visible ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  );
}
