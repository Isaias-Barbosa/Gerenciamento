import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import AdminMenuBar from '../components/AdminMenuBar';

const ADMINS = ['isaiasbarbosa111@gmail.com'];

// Gera 50 comandas fictícias
const nomes = [
  'João', 'Maria', 'Carlos', 'Ana', 'Pedro', 'Juliana', 'Lucas', 'Fernanda', 'Rafael', 'Camila',
  'Bruno', 'Larissa', 'Gabriel', 'Patrícia', 'Felipe', 'Aline', 'Eduardo', 'Beatriz', 'Rodrigo', 'Letícia',
  'Vinícius', 'Amanda', 'Thiago', 'Mariana', 'André', 'Natália', 'Diego', 'Paula', 'Gustavo', 'Renata',
  'Fábio', 'Tatiane', 'Leonardo', 'Débora', 'Marcelo', 'Simone', 'Ricardo', 'Vanessa', 'Daniel', 'Priscila',
  'Alex', 'Carolina', 'Murilo', 'Sabrina', 'Vitor', 'Bianca', 'Samuel', 'Isabela', 'Otávio', 'Helena'
];
function gerarComandas() {
  return Array.from({ length: 50 }, (_, i) => {
    const nome = nomes[i % nomes.length];
    const valor = (Math.random() * 200 + 30).toFixed(2);
    const data = new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 30).toLocaleDateString('pt-BR');
    const paga = Math.random() > 0.4;
    return {
      id: (1000 + i).toString(),
      nome: `Mesa de ${nome}`,
      valor: `R$ ${valor}`,
      data,
      paga
    };
  });
}

export default function AdminComandas(props) {
  const user = props.user;
  if (user === null) {
    return null;
  }
  if (user) {
    console.log('user:', user);
  }
  const email = (user?.email || user?.emails?.[0]?.value || '').toLowerCase();
  console.log('Email detectado:', email, '| Lista de admins:', ADMINS);
  const isAdmin = ADMINS.includes(email);
  if (!user || !isAdmin) {
    return <Navigate to="/404" replace />;
  }

  const [comandas, setComandas] = useState(gerarComandas());

  const handleExcluir = (id) => setComandas(comandas.filter(c => c.id !== id));
  const handleEditar = (id) => alert('Funcionalidade de edição não implementada.');
  const handleNovaComanda = () => alert('Funcionalidade de criar nova comanda não implementada.');

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: 'linear-gradient(135deg, #23272f 0%, #18181b 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 0, padding: 0 }}>
      <h1 style={{ textAlign: 'center', color: '#2d7a46', marginTop: 24 }}>Comandas - Admin</h1>
      <AdminMenuBar />
      <div style={{ width: '100%', maxWidth: 1100, display: 'flex', justifyContent: 'flex-end', marginBottom: 18 }}>
        <button onClick={handleNovaComanda} style={{ background: '#2d7a46', color: '#fff', fontWeight: 700, fontSize: 18, border: 'none', borderRadius: 8, padding: '10px 32px', cursor: 'pointer', transition: 'background 0.2s' }}>Nova Comanda</button>
      </div>
      <div style={{ width: '100%', maxWidth: 1400, background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px #0001', padding: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 48 }}>
        <div style={{ width: '100%', overflowX: 'auto', paddingBottom: 32 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 3fr 2fr 2fr 1fr 2fr',
            background: '#e9f5ee',
            color: '#2d7a46',
            fontWeight: 700,
            borderRadius: 8,
            marginBottom: 8,
            minWidth: 900
          }}>
            <div style={{ padding: 12, textAlign: 'left', borderBottom: '1px solid #d0e6db' }}>ID</div>
            <div style={{ padding: 12, textAlign: 'left', borderBottom: '1px solid #d0e6db' }}>Nome</div>
            <div style={{ padding: 12, textAlign: 'left', borderBottom: '1px solid #d0e6db' }}>Valor Total</div>
            <div style={{ padding: 12, textAlign: 'left', borderBottom: '1px solid #d0e6db' }}>Data</div>
            <div style={{ padding: 12, textAlign: 'left', borderBottom: '1px solid #d0e6db' }}>Paga?</div>
            <div style={{ padding: 12, textAlign: 'left', borderBottom: '1px solid #d0e6db' }}>Ações</div>
          </div>
          {comandas.map(comanda => (
            <div key={comanda.id} style={{
              display: 'grid',
              gridTemplateColumns: '1fr 3fr 2fr 2fr 1fr 2fr',
              alignItems: 'center',
              background: '#f7f7f7',
              marginBottom: 0,
              boxShadow: 'none',
              minWidth: 900
            }}>
              <div style={{ padding: 12, color: '#000', fontSize: 15, wordBreak: 'break-all', textAlign: 'left', borderBottom: '1px solid #d0e6db' }}>{comanda.id}</div>
              <div style={{ padding: 12, color: '#000', fontSize: 15, wordBreak: 'break-word', textAlign: 'left', borderBottom: '1px solid #d0e6db' }}>{comanda.nome}</div>
              <div style={{ padding: 12, color: '#000', fontSize: 15, textAlign: 'left', borderBottom: '1px solid #d0e6db' }}>{comanda.valor}</div>
              <div style={{ padding: 12, color: '#000', fontSize: 15, textAlign: 'left', borderBottom: '1px solid #d0e6db' }}>{comanda.data}</div>
              <div style={{ padding: 12, color: comanda.paga ? '#2d7a46' : '#e74c3c', fontWeight: 700, textAlign: 'left', borderBottom: '1px solid #d0e6db' }}>{comanda.paga ? 'Sim' : 'Não'}</div>
              <div style={{ padding: 12, display: 'flex', gap: 18, textAlign: 'left', borderBottom: '1px solid #d0e6db', alignItems: 'center' }}>
                <button onClick={() => handleEditar(comanda.id)} title="Editar" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}>
                  <svg width="22" height="22" fill="#f1c40f" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75l11.06-11.06-3.75-3.75L3 17.25zm2.92.92l9.13-9.13 1.83 1.83-9.13 9.13H5.92v-1.83zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
                </button>
                <button onClick={() => handleExcluir(comanda.id)} title="Excluir" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}>
                  <svg width="22" height="22" fill="#e74c3c" viewBox="0 0 24 24"><path d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zm3.46-7.12a1 1 0 0 1 1.41 0L12 12.59l1.12-1.12a1 1 0 1 1 1.41 1.41L13.41 14l1.12 1.12a1 1 0 0 1-1.41 1.41L12 15.41l-1.12 1.12a1 1 0 0 1-1.41-1.41L10.59 14l-1.12-1.12a1 1 0 0 1 0-1.41zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"/></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
