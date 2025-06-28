import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

export default function SearchResult({ meals = [] }) {
  const { query } = useParams();
  const navigate = useNavigate();
  const search = decodeURIComponent(query || '').toLowerCase();
  const filtered = meals.filter(m =>
    m.name?.toLowerCase().includes(search) ||
    m.categoria?.toLowerCase().includes(search) ||
    m.tipoPrato?.toLowerCase().includes(search)
  );

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #23272f 0%, #18181b 100%)', fontFamily: 'Segoe UI, Arial, sans-serif', paddingTop: 90 }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 16px' }}>
        <h1 style={{ color: '#fff', fontSize: 38, fontWeight: 800, marginBottom: 32, textAlign: 'center' }}>Resultado da Pesquisa</h1>
        {filtered.length === 0 ? (
          <div style={{ color: '#e74c3c', fontSize: 26, fontWeight: 700, textAlign: 'center', marginTop: 80 }}>
            Não foi possível encontrar a solicitação
          </div>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, justifyContent: 'center' }}>
            {filtered.map(meal => (
              <div key={meal.id} style={{ background: '#fff', borderRadius: 18, boxShadow: '0 4px 18px #0002', padding: 0, overflow: 'hidden', width: 320, minWidth: 260, display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1.5px solid #f1f6fa', cursor: 'pointer', transition: 'transform 0.2s' }} onClick={() => navigate(`/meals/${meal.id}`)}>
                <img src={meal.image || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80'} alt={meal.name} style={{ width: '100%', height: 180, objectFit: 'cover', borderTopLeftRadius: 18, borderTopRightRadius: 18 }} />
                <div style={{ padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, width: '100%' }}>
                  <div style={{ fontWeight: 700, fontSize: 22, color: '#27548A', textAlign: 'center', marginBottom: 2 }}>{meal.name}</div>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
                    <span style={{ background: '#e9f5ee', color: '#27548A', borderRadius: 8, padding: '2px 10px', fontWeight: 600, fontSize: 14 }}>{meal.categoria || 'Outros'}</span>
                    <span style={{ background: '#f1f6fa', color: '#27548A', borderRadius: 8, padding: '2px 10px', fontWeight: 600, fontSize: 14 }}>{meal.tipoPrato || 'Prato Principal'}</span>
                  </div>
                  <button style={{ marginTop: 8, background: '#27548A', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 20px', fontWeight: 600, cursor: 'pointer', fontSize: 16 }}>Ver Prato</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
