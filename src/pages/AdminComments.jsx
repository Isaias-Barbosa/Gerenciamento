import React, { useEffect, useState } from 'react';
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

  const [comments, setComments] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    fetch('/comments')
      .then(res => res.json())
      .then(data => setComments(data));
  }, []);

  const handleDelete = id => {
    if (!window.confirm('Tem certeza que deseja deletar este comentário?')) return;
    fetch(`/comments/${id}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(() => setComments(comments.filter(c => c.id !== id)));
  };

  const handleEdit = id => {
    setEditId(id);
    setEditText(comments.find(c => c.id === id)?.comentario || '');
  };

  const handleEditSave = id => {
    fetch(`/comments/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ comentario: editText })
    })
      .then(res => res.json())
      .then(updated => {
        setComments(comments.map(c => c.id === id ? { ...c, comentario: updated.comentario } : c));
        setEditId(null);
      });
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: 'linear-gradient(135deg, #23272f 0%, #18181b 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 0, padding: 0 }}>
      <h1 style={{ textAlign: 'center', color: '#2d7a46', marginTop: 24 }}>Comentários - Admin</h1>
      <AdminMenuBar />
      <div style={{ width: '100%', maxWidth: 900, background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px #0001', padding: 32, marginTop: 36, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 style={{ color: '#2d7a46', fontWeight: 700, fontSize: 22, marginBottom: 18 }}>Gestão de Comentários</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 18 }}>
          <thead>
            <tr style={{ background: '#eaf2fa', color: '#23272f' }}>
              <th style={{ padding: 8, border: '1px solid ' }}>ID</th>
              <th style={{ padding: 8, border: '1px solid ' }}>Foto</th>
              <th style={{ padding: 8, border: '1px solid ' }}>Nome</th>
              <th style={{ padding: 8, border: '1px solid ' }}>Comentário</th>
              <th style={{ padding: 8, border: '1px solid ' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {comments.map(c => (
              <tr key={c.id} style={{ background: '#eaf2fa', color: '#23272f' }}>
                <td style={{ padding: 8, border: '1px solid', textAlign: 'center' }}>{c.id}</td>
                <td style={{ padding: 8, border: '1px solid ', textAlign: 'center' }}><img src={c.foto} alt={c.nome} style={{ width: 38, height: 38, borderRadius: 8, objectFit: 'cover' }} /></td>
                <td style={{ padding: 8, border: '1px solid ' }}>{c.nome}</td>
                <td style={{ padding: 8, border: '1px solid' }}>
                  {editId === c.id ? (
                    <input value={editText} onChange={e => setEditText(e.target.value)} style={{ width: '90%' }} />
                  ) : (
                    c.comentario
                  )}
                </td>
                <td style={{ padding: 8, border: '1px solid #e0e0e0', textAlign: 'center'}}>
                  {editId === c.id ? (
                    <>
                      <button onClick={() => handleEditSave(c.id)} style={{ marginRight: 8 }}>Salvar</button>
                      <button onClick={() => setEditId(null)}>Cancelar</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(c.id)} style={{ marginRight: 8 }}>Editar</button>
                      <button onClick={() => handleDelete(c.id)}>Deletar</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
