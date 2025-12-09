import React from 'react';
import { Lock } from 'lucide-react';

const AdminLogin = ({ adminPassword, setAdminPassword, onLogin, onBack }) => (
  <div className="app admin-login-page">
    <div className="admin-login-card">
      <div className="admin-login-icon">
        <Lock size={48} />
      </div>
      <h2 className="admin-login-title">Painel Administrativo</h2>
      <div className="admin-login-form">
        <input
          type="password"
          placeholder="Digite a senha"
          value={adminPassword}
          onChange={(e) => setAdminPassword(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onLogin()}
          className="input"
        />
        <button onClick={onLogin} className="btn btn-primary">
          Entrar
        </button>
        <button onClick={onBack} className="btn btn-link">
          Voltar ao convite
        </button>
      </div>
    </div>
  </div>
);

export default AdminLogin;
