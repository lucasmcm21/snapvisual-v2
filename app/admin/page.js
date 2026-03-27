'use client';

import { useState } from 'react';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [leads, setLeads]       = useState(null);
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Erro desconhecido.');
      } else {
        setLeads(data.leads);
      }
    } catch {
      setError('Erro de conexão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (iso) => {
    if (!iso) return '—';
    return new Date(iso).toLocaleString('pt-BR', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;900&family=Poppins:wght@500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0A0A0A; color: #F5F5F5; font-family: 'Montserrat', sans-serif; -webkit-font-smoothing: antialiased; }

        .admin-wrap {
          min-height: 100vh; display: flex; align-items: center; justify-content: center;
          padding: 40px 24px;
        }

        /* ─ LOGIN ─ */
        .login-box {
          background: #1C1C1C; border: 1px solid #2A2A2A;
          border-radius: 16px; padding: 48px; width: 100%; max-width: 400px;
        }
        .login-logo { font-family: 'Montserrat', sans-serif; font-weight: 900; font-size: 20px; margin-bottom: 32px; }
        .login-logo span { color: #FF6A1A; }
        .login-title { font-weight: 700; font-size: 22px; margin-bottom: 6px; }
        .login-sub { font-size: 14px; color: #8B8B8B; margin-bottom: 32px; }
        .login-label { display: block; font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #8B8B8B; margin-bottom: 8px; }
        .login-input {
          width: 100%; background: #0A0A0A; border: 1px solid #2A2A2A;
          border-radius: 8px; padding: 14px 16px; font-family: 'Montserrat', sans-serif;
          font-size: 15px; color: #F5F5F5; outline: none; margin-bottom: 20px;
          transition: border-color 0.2s;
        }
        .login-input:focus { border-color: #FF6A1A; }
        .login-btn {
          width: 100%; font-family: 'Poppins', sans-serif; font-weight: 600;
          font-size: 15px; color: #0A0A0A; background: #FF6A1A;
          border: none; padding: 16px; border-radius: 8px; cursor: pointer;
          transition: background 0.2s;
        }
        .login-btn:hover:not(:disabled) { background: #e05a10; }
        .login-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .login-error {
          background: rgba(255,80,80,0.1); border: 1px solid rgba(255,80,80,0.3);
          border-radius: 8px; padding: 12px 16px; margin-top: 12px;
          font-size: 13px; color: #ff8080; text-align: center;
        }

        /* ─ DASHBOARD ─ */
        .dashboard { width: 100%; max-width: 1100px; }

        .dash-header {
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: 40px; padding-bottom: 24px;
          border-bottom: 1px solid #1C1C1C;
        }
        .dash-logo { font-family: 'Montserrat', sans-serif; font-weight: 900; font-size: 22px; }
        .dash-logo span { color: #FF6A1A; }
        .dash-meta { font-size: 13px; color: #8B8B8B; }
        .dash-meta strong { color: #F5F5F5; }

        .dash-logout {
          font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 600;
          color: #8B8B8B; background: #1C1C1C; border: 1px solid #2A2A2A;
          padding: 8px 20px; border-radius: 6px; cursor: pointer;
          transition: color 0.2s, border-color 0.2s;
        }
        .dash-logout:hover { color: #F5F5F5; border-color: #8B8B8B; }

        .leads-table {
          width: 100%; border-collapse: collapse;
        }
        .leads-table th {
          font-size: 11px; font-weight: 700; letter-spacing: 0.12em;
          text-transform: uppercase; color: #8B8B8B;
          text-align: left; padding: 12px 20px;
          border-bottom: 1px solid #1C1C1C;
        }
        .leads-table td {
          padding: 18px 20px; border-bottom: 1px solid #1C1C1C;
          font-size: 14px; color: #F5F5F5; vertical-align: middle;
        }
        .leads-table tr:hover td { background: #141414; }

        .lead-name { font-weight: 700; }
        .lead-contact a {
          color: #FF6A1A; text-decoration: none; font-weight: 600;
          font-family: 'Poppins', sans-serif; font-size: 13px;
        }
        .lead-contact a:hover { text-decoration: underline; }
        .lead-date { color: #8B8B8B; font-size: 13px; }
        .lead-need {
          background: #2A2A2A; padding: 4px 10px;
          border-radius: 100px; font-size: 12px; color: #8B8B8B;
        }

        .empty-state {
          text-align: center; padding: 80px 24px;
          color: #8B8B8B; font-size: 14px;
        }
      `}</style>

      <div className="admin-wrap">
        {!leads ? (
          /* ─ TELA DE LOGIN ─ */
          <div className="login-box">
            <div className="login-logo">Snap<span>Visual</span></div>
            <h1 className="login-title">Área restrita</h1>
            <p className="login-sub">Digite a senha para acessar os leads.</p>

            <form onSubmit={handleLogin}>
              <label className="login-label" htmlFor="admin-pwd">Senha</label>
              <input
                id="admin-pwd"
                className="login-input"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button className="login-btn" type="submit" disabled={loading}>
                {loading ? 'Verificando...' : 'Entrar'}
              </button>
              {error && <div className="login-error">{error}</div>}
            </form>
          </div>
        ) : (
          /* ─ DASHBOARD DE LEADS ─ */
          <div className="dashboard">
            <div className="dash-header">
              <div>
                <div className="dash-logo">Snap<span>Visual</span> — Admin</div>
                <div className="dash-meta">
                  <strong>{leads.length}</strong> {leads.length === 1 ? 'lead captado' : 'leads captados'}
                </div>
              </div>
              <button className="dash-logout" onClick={() => { setLeads(null); setPassword(''); }}>
                Sair
              </button>
            </div>

            {leads.length === 0 ? (
              <div className="empty-state">Nenhum lead captado ainda.</div>
            ) : (
              <table className="leads-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th>WhatsApp</th>
                    <th>Origem</th>
                    <th>Data</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead, i) => (
                    <tr key={lead.id || i}>
                      <td style={{ color: '#8B8B8B', fontSize: 13 }}>{leads.length - i}</td>
                      <td className="lead-name">{lead.nome || '—'}</td>
                      <td className="lead-contact">
                        {lead.contato ? (
                          <a
                            href={`https://wa.me/55${lead.contato.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noopener"
                          >
                            {lead.contato} ↗
                          </a>
                        ) : '—'}
                      </td>
                      <td><span className="lead-need">{lead.necessidade || '—'}</span></td>
                      <td className="lead-date">{formatDate(lead.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </>
  );
}
