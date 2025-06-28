import React, { useState, useEffect } from 'react';

export default function PropagandaSelector({ meals, selectedIds, onChange, onClose }) {
  const [selected, setSelected] = useState(selectedIds || []);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Carrega seleção do localStorage se existir
    const saved = localStorage.getItem('propagandaIds');
    if (saved) setSelected(JSON.parse(saved));
  }, []);

  const toggle = id => {
    setSelected(sel => sel.includes(id) ? sel.filter(i => i !== id) : [...sel, id]);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      localStorage.setItem('propagandaIds', JSON.stringify(selected));
      await fetch('http://localhost:5000/meals/propaganda/set', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: selected })
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onChange(selected);
        onClose();
      }, 1200);
    } catch (e) {
      alert('Erro ao salvar propaganda!');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: '#0008', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', borderRadius: 12, padding: 32, minWidth: 320, maxWidth: 500 }}>
        <h2 style={{ color: '#2d7a46', marginBottom: 24 }}>Selecionar Pratos para Propaganda</h2>
        <div style={{ maxHeight: 300, overflowY: 'auto', marginBottom: 24 }}>
          {meals.map(meal => (
            <label key={meal.id} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <input type="checkbox" checked={selected.includes(meal.id)} onChange={() => toggle(meal.id)} />
              <img src={meal.image} alt={meal.name} style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 6 }} />
              <span>{meal.name}</span>
            </label>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', alignItems: 'center', minHeight: 40 }}>
          {success && <span style={{ color: '#2d7a46', fontWeight: 600, marginRight: 16 }}>Salvo com sucesso!</span>}
          <button onClick={onClose} disabled={saving} style={{ background: '#eee', color: '#2d7a46', border: 'none', borderRadius: 6, padding: '8px 20px', fontWeight: 600, cursor: 'pointer' }}>Cancelar</button>
          <button onClick={handleSave} disabled={saving} style={{ background: '#2d7a46', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 20px', fontWeight: 600, cursor: 'pointer' }}>{saving ? 'Salvando...' : 'Salvar'}</button>
        </div>
      </div>
    </div>
  );
}
