import React from 'react';

export default function AdminMenuBar() {
  return (
    <div style={{
      display: 'flex',
      gap: 32,
      border: '2px solid #2d7a46',
      borderRadius: 16,
      background: '#fff',
      padding: '18px 32px',
      margin: '24px 0 36px 0',
      boxShadow: '0 2px 16px #0001',
      maxWidth: 900,
      width: '100%',
      justifyContent: 'center',
    }}>
      <button onClick={() => window.location.href = '/dashboard/admin'} style={{ background: 'none', border: 'none', color: '#2d7a46', fontWeight: 700, fontSize: 20, cursor: 'pointer', padding: '8px 24px', borderRadius: 8, transition: 'background 0.2s' }} onMouseOver={e => e.currentTarget.style.background = '#e9f5ee'} onMouseOut={e => e.currentTarget.style.background = 'none'}>Home</button>
      <button onClick={() => window.location.href = '/dashboard/admin/cardapio'} style={{ background: 'none', border: 'none', color: '#2d7a46', fontWeight: 700, fontSize: 20, cursor: 'pointer', padding: '8px 24px', borderRadius: 8, transition: 'background 0.2s' }} onMouseOver={e => e.currentTarget.style.background = '#e9f5ee'} onMouseOut={e => e.currentTarget.style.background = 'none'}>Cardápio</button>
      <button onClick={() => window.location.href = '/dashboard/admin/comentarios'} style={{ background: 'none', border: 'none', color: '#2d7a46', fontWeight: 700, fontSize: 20, cursor: 'pointer', padding: '8px 24px', borderRadius: 8, transition: 'background 0.2s' }} onMouseOver={e => e.currentTarget.style.background = '#e9f5ee'} onMouseOut={e => e.currentTarget.style.background = 'none'}>Comentários</button>
      <button onClick={() => window.location.href = '/dashboard/admin/comandas'} style={{ background: 'none', border: 'none', color: '#2d7a46', fontWeight: 700, fontSize: 20, cursor: 'pointer', padding: '8px 24px', borderRadius: 8, transition: 'background 0.2s' }} onMouseOver={e => e.currentTarget.style.background = '#e9f5ee'} onMouseOut={e => e.currentTarget.style.background = 'none'}>Comandas</button>
      <button onClick={() => window.location.href = '/dashboard/admin/executivo'} style={{ background: 'none', border: 'none', color: '#2d7a46', fontWeight: 700, fontSize: 20, cursor: 'pointer', padding: '8px 24px', borderRadius: 8, transition: 'background 0.2s' }} onMouseOver={e => e.currentTarget.style.background = '#e9f5ee'} onMouseOut={e => e.currentTarget.style.background = 'none'}>Executivo</button>
    </div>
  );
}
