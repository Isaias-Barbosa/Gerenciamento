import React from 'react';
import Footer from '../components/Footer';

export default function Reserva() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #23272f 0%, #18181b 100%)', fontFamily: 'Segoe UI, Arial, sans-serif', paddingTop: 0 }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '13vh 20px', textAlign: 'center' }}>
        <img src="https://cms-bomgourmet.s3.amazonaws.com/bomgourmet%2F2021%2F06%2F11152136%2Fmesa-reservada-foto-bigstock.jpg" alt="Reserva" style={{ width: '100%', maxWidth: 1000, height: 470, objectFit: 'cover', borderRadius: 24, boxShadow: '0 4px 32px #0006', margin: '0 auto 38px auto', display: 'block' }} />
        <h1 style={{ color: '#27548A', fontSize: 38, fontWeight: 800, marginBottom: 24 }}>Faça sua Reserva</h1>
        <p style={{ color: '#fff', fontSize: 22, fontWeight: 500, marginBottom: 36, lineHeight: 1.5 }}>
          Garanta sua experiência no <span style={{ color: '#27548A', fontWeight: 700 }}>Sabor & Alma</span>!<br />
          Clique no botão abaixo para reservar sua mesa pelo WhatsApp e viva momentos inesquecíveis com nosso cardápio especial.
        </p>
        <a
          href="https://wa.me/5561996242678?text=Olá! Gostaria de fazer uma reserva no restaurante Sabor & Alma."
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: '#309898',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '16px 40px',
            fontWeight: 700,
            fontSize: 22,
            textDecoration: 'none',
            boxShadow: '0 2px 8px #0002',
            transition: 'background 0.2s',
            display: 'inline-block',
          }}
          onMouseOver={e => (e.currentTarget.style.background = '#206b6b')}
          onMouseOut={e => (e.currentTarget.style.background = '#309898')}
        >
          Fazer Reserva
        </a>
      </div>
      <Footer />
    </div>
  );
}
