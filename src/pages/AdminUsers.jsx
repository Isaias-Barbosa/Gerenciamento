import React from 'react';
import AdminMenuBar from '../components/AdminMenuBar';

// Este arquivo foi substituído por AdminComandas.jsx. Pode ser removido do projeto.

export default function AdminUsers() {
  return (
    <div style={{ width: '100%', minHeight: '100vh', background: 'linear-gradient(135deg, #23272f 0%, #18181b 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 0, padding: 0 }}>
      <h1 style={{ textAlign: 'center', color: '#2d7a46', marginTop: 24 }}>Usuários - Admin</h1>
      <AdminMenuBar />
      <div style={{ width: '100%', maxWidth: 900, background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px #0001', padding: 32, marginTop: 36, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 style={{ color: '#2d7a46', fontWeight: 700, fontSize: 22, marginBottom: 18 }}>Gestão de Usuários</h2>
        <div style={{ color: '#888', fontSize: 18, textAlign: 'center', marginTop: 24 }}>
          Em breve você poderá visualizar, editar e excluir usuários cadastrados por aqui!
        </div>
      </div>
    </div>
  );
}
