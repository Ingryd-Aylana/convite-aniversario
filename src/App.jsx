import React, { useState, useEffect } from 'react';
import InvitePage from './components/InvitePage';
import AdminLogin from './components/AdminLogin';
import AdminPanel from './components/AdminPanel';
import { supabase } from './lib/supabaseClient';

const App = () => {
  const [page, setPage] = useState('home');

  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    acompanhantes: 0,
  });

  const [submitted, setSubmitted] = useState(false);

  const [adminPassword, setAdminPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [confirmados, setConfirmados] = useState([]);

  const ADMIN_PASSWORD = 'euamoaingryd';

  useEffect(() => {
    if (isAuthenticated) {
      fetchConfirmados();
    }
  }, [isAuthenticated]);

  // ===========================
  // BUSCAR CONFIRMAÇÕES NO SUPABASE
  // ===========================
  const fetchConfirmados = async () => {
    try {
      console.log('[Supabase] Buscando confirmados...');
      const { data, error } = await supabase
        .from('rsvps')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('[Supabase] Erro no SELECT:', error);
        alert('Erro ao buscar confirmações: ' + error.message);
        return;
      }

      console.log('[Supabase] Confirmados recebidos:', data);
      setConfirmados(data || []);
    } catch (err) {
      console.error('[App] Erro inesperado no fetchConfirmados:', err);
      alert('Erro inesperado ao buscar confirmações.');
    }
  };

  // ===========================
  // ENVIAR CONFIRMAÇÃO PARA O SUPABASE
  // ===========================
  const handleSubmit = async () => {
    if (!formData.nome.trim()) {
      alert('Por favor, preencha seu nome!');
      return;
    }

    const payload = {
      nome: formData.nome,
      telefone: formData.telefone || null,
      acompanhantes: Number(formData.acompanhantes || 0),
      vai: true, // por enquanto sempre true
    };

    try {
      console.log('[Supabase] Enviando RSVP:', payload);

      const { data, error } = await supabase
        .from('rsvps')
        .insert([payload])
        .select();

      if (error) {
        console.error('[Supabase] Erro no INSERT:', error);
        alert('Erro ao enviar confirmação: ' + error.message);
        return;
      }

      console.log('[Supabase] Insert OK, retornado:', data);

      setSubmitted(true);

      setTimeout(() => {
        setFormData({ nome: '', telefone: '', acompanhantes: 0 });
        setSubmitted(false);
      }, 3000);

      // se já estiver no admin, atualiza a lista
      if (isAuthenticated) {
        fetchConfirmados();
      }
    } catch (err) {
      console.error('[App] Erro inesperado no handleSubmit:', err);
      alert('Erro inesperado ao enviar confirmação.');
    }
  };

  // ===========================
  // LOGIN ADMIN
  // ===========================
  const handleAdminLogin = () => {
    if (adminPassword === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('Senha incorreta!');
    }
  };

  // ===========================
  // EXPORTAR CSV
  // ===========================
  const handleExportCSV = () => {
    const headers = ['Nome', 'Telefone', 'Acompanhantes', 'Data'];
    const rows = confirmados.map((c) => [
      c.nome,
      c.telefone || '-',
      c.acompanhantes || 0,
      c.created_at
        ? new Date(c.created_at).toLocaleString('pt-BR')
        : '-',
    ]);

    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'confirmados-aniversario.csv';
    a.click();
  };

  const totalConfirmacoes = confirmados.reduce(
    (acc, c) => acc + 1 + (parseInt(c.acompanhantes) || 0),
    0
  );

  // ===========================
  // ROTAS SIMPLES
  // ===========================
  if (page === 'admin') {
    if (!isAuthenticated) {
      return (
        <AdminLogin
          adminPassword={adminPassword}
          setAdminPassword={setAdminPassword}
          onLogin={handleAdminLogin}
          onBack={() => setPage('home')}
        />
      );
    }

    return (
      <AdminPanel
        confirmados={confirmados}
        totalConfirmacoes={totalConfirmacoes}
        onExportCSV={handleExportCSV}
        onLogout={() => {
          setIsAuthenticated(false);
          setPage('home');
        }}
      />
    );
  }

  // home
  return (
    <InvitePage
      formData={formData}
      setFormData={setFormData}
      submitted={submitted}
      onSubmit={handleSubmit}
      goToAdmin={() => setPage('admin')}
    />
  );
};

export default App;
