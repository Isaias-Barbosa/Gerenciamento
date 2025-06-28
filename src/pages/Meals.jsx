import React from 'react';

export default function Meals({ meals, onAdd, onDelete, mealInput, setMealInput, descInput, setDescInput, dateInput, setDateInput }) {
  return (
    <div style={{ maxWidth: 700, margin: '40px auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px #0001', padding: 32 }}>
      <h1 style={{ textAlign: 'center', color: '#2d7a46' }}>Gerenciar Refeições</h1>
      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        <input
          value={mealInput}
          onChange={e => setMealInput(e.target.value)}
          placeholder="Nome da refeição"
          style={{ flex: 1, padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
        />
        <input
          value={descInput}
          onChange={e => setDescInput(e.target.value)}
          placeholder="Descrição"
          style={{ flex: 2, padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
        />
        <input
          type="date"
          value={dateInput}
          onChange={e => setDateInput(e.target.value)}
          style={{ flex: 1, padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
        />
        <button onClick={onAdd} style={{ background: '#2d7a46', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 16px', cursor: 'pointer' }}>Adicionar</button>
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {meals.map(meal => (
          <li key={meal.id} style={{ background: '#f7f7f7', borderRadius: 8, marginBottom: 12, padding: 16, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ fontWeight: 600, fontSize: 18 }}>{meal.name}</div>
            <div style={{ color: '#555' }}>{meal.description}</div>
            <div style={{ color: '#888', fontSize: 14 }}>Data: {meal.date}</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              <button onClick={() => onDelete(meal.id)} style={{ background: '#e74c3c', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 16px', cursor: 'pointer' }}>Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
