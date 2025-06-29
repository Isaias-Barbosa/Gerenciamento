import React from 'react';
import { Navigate } from 'react-router-dom';
import AdminMenuBar from '../components/AdminMenuBar';

const ADMINS = ['isaiasbarbosa111@gmail.com'];

export default function AdminComments(props) {
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

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: 'linear-gradient(135deg, #23272f 0%, #18181b 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 0, padding: 0 }}>
      <h1 style={{ textAlign: 'center', color: '#2d7a46', marginTop: 24 }}>Comentários - Admin</h1>
      <AdminMenuBar />
      <div style={{ width: '100%', maxWidth: 900, background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px #0001', padding: 32, marginTop: 36, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 style={{ color: '#2d7a46', fontWeight: 700, fontSize: 22, marginBottom: 18 }}>Gestão de Comentários</h2>
        <div style={{ color: '#888', fontSize: 18, textAlign: 'center', marginTop: 24 }}>
          Em breve você poderá visualizar, aprovar e excluir comentários dos clientes por aqui!
        </div>
      </div>
    </div>
  );
}
