import React from 'react';
import Footer from '../components/Footer';

export default function Contato() {
  return (
    <>
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #23272f 0%, #18181b 100%)', fontFamily: 'Segoe UI, Arial, sans-serif', paddingTop: 90 }}>
        <div style={{ maxWidth: 600, margin: '40px auto', background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px #0002', padding: 40 }}>
          <h1 style={{ textAlign: 'center', color: '#27548A', fontSize: 36, fontWeight: 800, marginBottom: 24 }}>Contato</h1>
          <form style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <input type="text" placeholder="Seu nome" style={{ padding: 14, borderRadius: 8, border: '1.5px solid #e0e0e0', background: '#fff', color: '#23272f', fontSize: 18 }} />
            <input type="email" placeholder="Seu e-mail" style={{ padding: 14, borderRadius: 8, border: '1.5px solid #e0e0e0', background: '#fff', color: '#23272f', fontSize: 18 }} />
            <textarea placeholder="Sua mensagem" rows={5} style={{ padding: 14, borderRadius: 8, border: '1.5px solid #e0e0e0', background: '#fff', color: '#23272f', fontSize: 18 }} />
            <button type="submit" style={{ background: '#27548A', color: '#fff', border: 'none', borderRadius: 8, padding: '14px 0', fontWeight: 700, fontSize: 20, cursor: 'pointer', marginTop: 8 }}>Enviar</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
