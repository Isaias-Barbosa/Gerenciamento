import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function MealDetail({ meals }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const meal = meals.find(m => m.id === id);

  useEffect(() => {
    document.title = meal ? meal.name : 'Detalhe do Prato';
  }, [meal]);

  if (!meal) {
    return <div style={{ textAlign: 'center', margin: 40, color: '#e74c3c' }}>Prato não encontrado.<br/><button onClick={() => navigate('/meals')} style={{ marginTop: 16, background: '#2d7a46', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 20px', fontWeight: 600, cursor: 'pointer' }}>Voltar</button></div>;
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #23272f 0%, #18181b 100%)', fontFamily: 'Segoe UI, Arial, sans-serif', paddingTop: 90 }}>
      <div style={{ maxWidth: 900, margin: '40px auto', background: '#fff', borderRadius: 20, boxShadow: '0 4px 32px #0002', padding: 40, display: 'flex', flexDirection: 'row', gap: 40, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <img src={meal.image || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80'} alt={meal.name} style={{ width: 360, height: 260, objectFit: 'cover', borderRadius: 16, boxShadow: '0 2px 12px #0001' }} />
        <div style={{ flex: 1, minWidth: 260, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <h2 style={{ color: '#27548A', fontSize: 34, fontWeight: 800, marginBottom: 6 }}>{meal.name}</h2>
          <div style={{ display: 'flex', gap: 16, marginBottom: 8 }}>
            <span style={{ background: '#e9f5ee', color: '#27548A', borderRadius: 8, padding: '4px 14px', fontWeight: 600, fontSize: 16 }}>{meal.categoria || 'Outros'}</span>
            <span style={{ background: '#f1f6fa', color: '#27548A', borderRadius: 8, padding: '4px 14px', fontWeight: 600, fontSize: 16 }}>{meal.tipoPrato || 'Prato Principal'}</span>
          </div>
          <div style={{ color: '#23272f', fontWeight: 700, fontSize: 22, marginBottom: 8 }}>R$ {meal.price || '--'}</div>
          <div style={{ color: '#555', fontSize: 18, marginBottom: 12 }}>{meal.description}</div>
          {meal.ingredients && meal.ingredients.length > 0 && (
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontWeight: 600, color: '#27548A', marginBottom: 4 }}>Ingredientes:</div>
              <ul style={{ paddingLeft: 20, color: '#333', fontSize: 16 }}>
                {meal.ingredients.map((ing, idx) => <li key={idx}>{ing}</li>)}
              </ul>
            </div>
          )}
          {meal.isMenuOfDay && (
            <div style={{ color: '#fff', background: '#2d7a46', borderRadius: 8, padding: '6px 16px', fontWeight: 700, fontSize: 16, display: 'inline-block', marginBottom: 8 }}>Prato do Dia</div>
          )}
          <button onClick={() => navigate('/meals')} style={{ background: '#27548A', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 28px', fontWeight: 700, fontSize: 18, cursor: 'pointer', marginTop: 12 }}>Voltar para Cardápio</button>
        </div>
      </div>
    </div>
  );
}
