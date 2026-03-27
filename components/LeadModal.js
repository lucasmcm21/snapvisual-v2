'use client';

import { useState } from 'react';

export default function LeadModal({ isOpen, onClose }) {
  const [form, setForm]     = useState({ name: '', contact: '' });
  const [status, setStatus] = useState('idle');

  if (!isOpen) return null;

  const handleChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.contact.trim()) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name.trim(), contact: form.contact.trim(), need: 'Contato via Modal Site' }),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      setTimeout(() => {
        const msg = encodeURIComponent(`Olá! Me chamo ${form.name} e gostaria de melhorar o visual da minha marca. Meu WhatsApp é ${form.contact}.`);
        window.open(`https://wa.me/5586981308653?text=${msg}`, '_blank');
        onClose();
        setForm({ name: '', contact: '' });
        setStatus('idle');
      }, 1500);
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      <style>{`
        .modal-overlay {
          position: fixed; inset: 0; z-index: 999;
          background: rgba(0,0,0,0.88);
          backdrop-filter: blur(6px);
          display: flex; align-items: center; justify-content: center;
          padding: 24px;
          animation: mFadeIn 0.25s ease;
        }
        @keyframes mFadeIn { from { opacity: 0 } to { opacity: 1 } }

        .modal-box {
          background: #141414;
          border: 1px solid #2A2A2A;
          border-radius: 16px;
          padding: 48px;
          width: 100%; max-width: 460px;
          position: relative;
          animation: mSlideUp 0.3s ease;
        }
        @keyframes mSlideUp { from { transform: translateY(24px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }

        .modal-close {
          position: absolute; top: 16px; right: 16px;
          background: #2A2A2A; border: none; color: #8B8B8B;
          width: 32px; height: 32px; border-radius: 50%;
          cursor: pointer; font-size: 18px;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s, color 0.2s;
        }
        .modal-close:hover { background: #333; color: #F5F5F5; }

        .modal-tag {
          font-size: 11px; font-weight: 700; letter-spacing: 0.15em;
          text-transform: uppercase; color: #FF6A1A; margin-bottom: 12px;
          display: flex; align-items: center; gap: 8px;
          font-family: 'Montserrat', sans-serif;
        }
        .modal-tag::before { content: ''; display: block; width: 16px; height: 2px; background: #FF6A1A; }

        .modal-title {
          font-family: 'Montserrat', sans-serif;
          font-weight: 900; font-size: 26px; color: #F5F5F5;
          line-height: 1.15; letter-spacing: -0.02em; margin-bottom: 8px;
        }
        .modal-subtitle { font-size: 14px; color: #8B8B8B; margin-bottom: 28px; line-height: 1.6; font-family: 'Montserrat', sans-serif; }

        .modal-field { margin-bottom: 16px; }
        .modal-label {
          display: block; font-size: 11px; font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: #8B8B8B; margin-bottom: 8px;
          font-family: 'Montserrat', sans-serif;
        }
        .modal-input {
          width: 100%; background: #0A0A0A; border: 1px solid #2A2A2A;
          border-radius: 8px; padding: 14px 16px;
          font-family: 'Montserrat', sans-serif; font-size: 15px;
          color: #F5F5F5; outline: none; transition: border-color 0.2s;
        }
        .modal-input::placeholder { color: #444; }
        .modal-input:focus { border-color: #FF6A1A; }

        /* ── BOTÃO ANIMADO ── */
        .anim-btn {
          width: 100%; margin-top: 8px;
          background: linear-gradient(-30deg, #cc5200 50%, #a84300 50%);
          padding: 16px 32px;
          display: block;
          position: relative;
          overflow: hidden;
          color: #F5F5F5;
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: 14px;
          letter-spacing: 0.08em;
          text-align: center;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          box-shadow: 0 12px 40px rgba(255,106,26,0.25);
          transition: box-shadow 0.2s;
        }
        .anim-btn:hover::before { opacity: 0.15; }
        .anim-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .anim-btn::before {
          content: ''; position: absolute; top: 0; left: 0;
          width: 100%; height: 100%;
          background-color: #fff;
          opacity: 0; transition: .2s opacity ease-in-out;
        }
        .anim-btn span { position: absolute; }
        .anim-btn span:nth-child(1) {
          top: 0; left: 0; width: 100%; height: 2px;
          background: linear-gradient(to left, rgba(200,80,0,0), #FF6A1A);
          animation: animTop 2s linear infinite;
        }
        .anim-btn span:nth-child(2) {
          top: 0; right: 0; height: 100%; width: 2px;
          background: linear-gradient(to top, rgba(200,80,0,0), #FF6A1A);
          animation: animRight 2s linear -1s infinite;
        }
        .anim-btn span:nth-child(3) {
          bottom: 0; left: 0; width: 100%; height: 2px;
          background: linear-gradient(to right, rgba(200,80,0,0), #FF6A1A);
          animation: animBottom 2s linear infinite;
        }
        .anim-btn span:nth-child(4) {
          top: 0; left: 0; height: 100%; width: 2px;
          background: linear-gradient(to bottom, rgba(200,80,0,0), #FF6A1A);
          animation: animLeft 2s linear -1s infinite;
        }

        @keyframes animTop    { 0%{transform:translateX(100%)} 100%{transform:translateX(-100%)} }
        @keyframes animRight  { 0%{transform:translateY(100%)} 100%{transform:translateY(-100%)} }
        @keyframes animBottom { 0%{transform:translateX(-100%)} 100%{transform:translateX(100%)} }
        @keyframes animLeft   { 0%{transform:translateY(-100%)} 100%{transform:translateY(100%)} }

        .modal-error {
          background: rgba(255,80,80,0.08); border: 1px solid rgba(255,80,80,0.25);
          border-radius: 8px; padding: 12px 16px; margin-top: 12px;
          font-size: 13px; color: #ff8080; text-align: center;
          font-family: 'Montserrat', sans-serif;
        }
        .modal-success { text-align: center; padding: 32px 0; }
        .modal-success-icon { font-size: 48px; margin-bottom: 16px; display: block; }
        .modal-success-text { font-family: 'Montserrat', sans-serif; font-weight: 700; font-size: 20px; color: #F5F5F5; margin-bottom: 8px; }
        .modal-success-sub { font-size: 14px; color: #8B8B8B; font-family: 'Montserrat', sans-serif; }
      `}</style>

      <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <div className="modal-box">
          <button className="modal-close" onClick={onClose}>×</button>

          {status === 'success' ? (
            <div className="modal-success">
              <span className="modal-success-icon">✅</span>
              <div className="modal-success-text">Tudo certo!</div>
              <p className="modal-success-sub">Redirecionando para o WhatsApp...</p>
            </div>
          ) : (
            <>
              <div className="modal-tag">Vamos conversar</div>
              <h2 className="modal-title">Melhore sua marca hoje</h2>
              <p className="modal-subtitle">Preencha abaixo e a SnapVisual entra em contato em poucas horas.</p>

              <form onSubmit={handleSubmit}>
                <div className="modal-field">
                  <label className="modal-label" htmlFor="m-name">Seu nome</label>
                  <input id="m-name" className="modal-input" type="text" name="name"
                    placeholder="Como posso te chamar?" value={form.name} onChange={handleChange} required />
                </div>
                <div className="modal-field">
                  <label className="modal-label" htmlFor="m-contact">Seu WhatsApp</label>
                  <input id="m-contact" className="modal-input" type="tel" name="contact"
                    placeholder="(00) 00000-0000" value={form.contact} onChange={handleChange} required />
                </div>

                <button className="anim-btn" type="submit" disabled={status === 'loading'}>
                  <span/><span/><span/><span/>
                  {status === 'loading' ? 'Enviando...' : 'Ir para o WhatsApp →'}
                </button>

                {status === 'error' && (
                  <div className="modal-error">
                    Erro ao enviar. Tente direto:&nbsp;
                    <a href="http://wa.me/5586981308653" style={{color:'#FF6A1A'}}>WhatsApp</a>
                  </div>
                )}
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}
