import React from 'react';
import { Users, Download } from 'lucide-react';

const AdminPanel = ({
  confirmados,
  totalConfirmacoes,
  onExportCSV,
  onLogout,
}) => (
  <div className="app admin-page">
    <div className="admin-container">
      <div className="admin-card">
        <div className="admin-header">
          <div>
            <h1 className="admin-title">Painel de Confirmações</h1>
            <p className="admin-subtitle">Aniversário - 26 da Nath</p>
          </div>
          <div className="admin-header-actions">
            <button onClick={onExportCSV} className="btn btn-success">
              <Download size={16} />
              <span>Exportar CSV</span>
            </button>
            <button onClick={onLogout} className="btn btn-primary">
              Sair
            </button>
          </div>
        </div>

        <div className="admin-summary">
          <div className="admin-summary-icon">
            <Users size={32} />
          </div>
          <div>
            <p className="admin-summary-label">Total de Confirmações</p>
            <p className="admin-summary-value">{totalConfirmacoes}</p>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Telefone</th>
                <th>Acompanhantes</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {confirmados.length === 0 ? (
                <tr>
                  <td colSpan="4" className="table-empty">
                    Nenhuma confirmação ainda
                  </td>
                </tr>
              ) : (
                confirmados.map((c) => (
                  <tr key={c.id}>
                    <td>{c.nome}</td>
                    <td>{c.telefone || '-'}</td>
                    <td className="table-center">{c.acompanhantes || 0}</td>
                    <td className="table-date">
                      {new Date(c.created_at).toLocaleString('pt-BR')}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);

export default AdminPanel;
