import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const categorias = [
  'Aperitivos',
  'Carnes',
  'Massas',
  'Frangos e Peixes',
  'Saladas',
  'Acompanhamentos',
  'Bebidas'
];
const tipos = [
  'Entrada',
  'Prato Principal',
  'Sobremesa'
];

export default function PublicMeals({ meals }) {
  const navigate = useNavigate();
  // Agrupa por categoria e tipo
  const agrupado = useMemo(() => {
    const obj = {};
    categorias.forEach(cat => {
      obj[cat] = {};
      tipos.forEach(tipo => {
        obj[cat][tipo] = [];
      });
    });
    meals.forEach(meal => {
      const cat = meal.categoria || 'Acompanhamentos';
      const tipo = meal.tipoPrato || 'Prato Principal';
      if (!obj[cat]) obj[cat] = {};
      if (!obj[cat][tipo]) obj[cat][tipo] = [];
      obj[cat][tipo].push(meal);
    });
    return obj;
  }, [meals]);

  return (
    <>
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #23272f 0%, #18181b 100%)', fontFamily: 'Segoe UI, Arial, sans-serif', paddingTop: 10 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '1px 16px' }}>
          <h1 style={{ textAlign: 'center', color: '#fff', fontSize: 40, fontWeight: 800, margin: '40px 0 32px 0', letterSpacing: 1 }}>Cardápio</h1>
          {categorias.map(cat => (
            <div key={cat} style={{ marginBottom: 38 }}>
              <h2 style={{ color: '#fff', fontSize: 30, fontWeight: 700, marginBottom: 18, borderBottom: '2px solid #e0e0e0', paddingBottom: 6 }}>{cat}</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, justifyContent: 'flex-start' }}>
                {tipos.flatMap(tipo =>
                  agrupado[cat][tipo].map(meal => (
                    <div
                      key={meal.id}
                      style={{
                        background: '#fff',
                        borderRadius: 20,
                        boxShadow: '0 2px 12px #0002',
                        padding: 0,
                        overflow: 'hidden',
                        width: 270,
                        minWidth: 200,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        transition: 'transform 0.2s',
                        border: '1px solid #f1f6fa',
                        cursor: 'default',
                      }}
                    >
                      <img src={meal.image || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80'} alt={meal.name} style={{ width: '100%', height: 180, objectFit: 'cover', borderTopLeftRadius: 18, borderTopRightRadius: 18 }} />
                      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, width: '100%' }}>
                        <div style={{ fontWeight: 700, fontSize: 22, color: '#27548A', textAlign: 'center', marginBottom: 2 }}>{meal.name}</div>
                        <div style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
                          <span style={{ background: '#e9f5ee', color: '#27548A', borderRadius: 8, padding: '2px 10px', fontWeight: 600, fontSize: 14 }}>{meal.categoria || 'Outros'}</span>
                          <span style={{ background: '#f1f6fa', color: '#27548A', borderRadius: 8, padding: '2px 10px', fontWeight: 600, fontSize: 14 }}>{meal.tipoPrato || 'Prato Principal'}</span>
                        </div>
                        {/* <div style={{ color: '#23272f', fontWeight: 600, fontSize: 18, marginBottom: 2 }}>R$ {meal.price || '--'}</div> */}
                        <button
                          style={{
                            marginTop: 8,
                            background: '#27548A',
                            color: '#fff',
                            border: 'none',
                            borderRadius: 6,
                            padding: '8px 20px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            fontSize: 16,
                            transition: 'background 0.2s',
                          }}
                          onClick={() => navigate(`/meals/${meal.id}`)}
                          onMouseOver={e => (e.currentTarget.style.background = '#18345a')}
                          onMouseOut={e => (e.currentTarget.style.background = '#27548A')}
                        >
                          Ver Prato
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
