import React, { useState, useEffect } from 'react';
import PropagandaSelector from './PropagandaSelector';

export default function AdminDashboard({ meals, onAdd, onDelete, mealInput, setMealInput, descInput, setDescInput, dateInput, setDateInput, user }) {
  useEffect(() => {
    document.title = 'Dashboard';
  }, []);

  // Mostra o objeto user para debug
  if (user) {
    console.log('user', user);
  }
  // Tenta pegar o e-mail do Google
  const email = user?.email || user?.emails?.[0]?.value;
  const [showForm, setShowForm] = useState(false);
  const [ingredients, setIngredients] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [showPropaganda, setShowPropaganda] = useState(false);
  const [propagandaIds, setPropagandaIds] = useState([]);
  const [categoria, setCategoria] = useState('');
  const [tipoPrato, setTipoPrato] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Exemplo: ids dos pratos propaganda
  const propagandaMeals = meals.filter(m => propagandaIds?.includes(m.id));

  // Buscar propagandaIds e marcar os pratos já propaganda
  useEffect(() => {
    fetch('http://localhost:5000/meals/propaganda')
      .then(res => res.json())
      .then(data => setPropagandaIds(data.propagandaIds || []));
    // Atualiza meals para refletir isPropaganda
    fetch('http://localhost:5000/meals')
      .then(res => res.json())
      .then(() => {}); // meals já é atualizado pelo AppRouter
  }, []);

  // Salvar propagandaIds no backend sempre que mudar
  useEffect(() => {
    if (propagandaIds && propagandaIds.length > 0) {
      fetch('http://localhost:5000/meals/propaganda', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: propagandaIds })
      });
    }
  }, [propagandaIds]);

  if (!user || email !== 'isaiasbarbosa111@gmail.com') {
    return <div style={{ textAlign: 'center', margin: 40, color: '#e74c3c', fontWeight: 600 }}>Acesso restrito! Faça login como admin.<br/><pre style={{color:'#888',fontSize:12}}>{JSON.stringify(user,null,2)}</pre></div>;
  }

  const handleSave = () => {
    if (!mealInput || !dateInput) return;
    setLoading(true);
    setSuccess(false);
    setTimeout(() => {
      onAdd({
        id: Date.now().toString(),
        name: mealInput,
        description: descInput,
        date: dateInput,
        ingredients: ingredients.split(',').map(i => i.trim()).filter(i => i),
        price,
        image,
        categoria,
        tipoPrato
      });
      setLoading(false);
      setSuccess(true);
      // Limpa os campos e fecha o formulário após sucesso
      setTimeout(() => {
        setSuccess(false);
        setShowForm(false);
        setMealInput('');
        setDescInput('');
        setDateInput('');
        setIngredients('');
        setPrice('');
        setImage('');
        setCategoria('');
        setTipoPrato('');
      }, 1200);
    }, 1200);
  };

  // Permitir marcar/desmarcar Prato do Dia
  const toggleMenuOfDay = (id) => {
    const meal = meals.find(m => m.id === id);
    if (!meal) return;
    fetch(`http://localhost:5000/meals/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isMenuOfDay: !meal.isMenuOfDay })
    })
      .then(() => window.location.reload()); // Simples: recarrega para refletir
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: 'linear-gradient(135deg, #23272f 0%, #18181b 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 0, padding: 0 }}>
      <h1 style={{ textAlign: 'center', color: '#2d7a46' }}>Dashboard Admin</h1>
      <div style={{ maxWidth: 800, width: '100%', background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px #0001', padding: 32, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', gap: 12, marginBottom: 24 }}>
          <button onClick={() => setShowForm(!showForm)} style={{ background: '#2d7a46', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 20px', fontWeight: 600, cursor: 'pointer' }}>
            {showForm ? 'Cancelar' : 'Adicionar Nova Refeição'}
          </button>
          <button onClick={() => setShowPropaganda(true)} style={{ background: '#f1c40f', color: '#2d7a46', border: 'none', borderRadius: 6, padding: '8px 20px', fontWeight: 600, cursor: 'pointer' }}>Propaganda</button>
        </div>
        {showPropaganda && (
          <PropagandaSelector
            meals={meals}
            selectedIds={propagandaIds}
            onChange={setPropagandaIds}
            onClose={() => setShowPropaganda(false)}
          />
        )}
        {showForm && (
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24, position: 'relative' }}>
            <h2 style={{ color: '#2d7a46', fontWeight: 700, margin: '0 0 8px 0', fontSize: 22, textAlign: 'left' }}>Criando um novo Prato</h2>
            {loading && (
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(255,255,255,0.85)', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: 12 }}>
                <div className="loader" style={{ border: '4px solid #e0e0e0', borderTop: '4px solid #2d7a46', borderRadius: '50%', width: 48, height: 48, animation: 'spin 1s linear infinite', marginBottom: 18 }} />
                <div style={{ color: '#2d7a46', fontWeight: 700, fontSize: 20 }}>Adicionando prato...</div>
              </div>
            )}
            {success && (
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(255,255,255,0.92)', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: 12 }}>
                <div style={{ color: '#2d7a46', fontWeight: 800, fontSize: 22, marginBottom: 8 }}>Adicionado com sucesso!</div>
              </div>
            )}
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                value={mealInput}
                onChange={e => setMealInput(e.target.value)}
                placeholder="Nome do prato"
                style={{ flex: 2, padding: 8, borderRadius: 6, border: '1px solid #ccc', background: '#fff', color: '#222' }}
              />
              <input
                value={price}
                onChange={e => setPrice(e.target.value)}
                placeholder="Preço (R$)"
                type="number"
                min="0"
                step="0.01"
                style={{ flex: 1, padding: 8, borderRadius: 6, border: '1px solid #ccc', background: '#fff', color: '#222' }}
              />
            </div>
            <select value={categoria} onChange={e => setCategoria(e.target.value)} style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc', background: '#fff', color: '#222' }}>
              <option value="">Selecione a categoria</option>
              <option value="Aperitivos">Aperitivos</option>
              <option value="Carnes">Carnes</option>
              <option value="Massas">Massas</option>
              <option value="Frangos e Peixes">Frangos e Peixes</option>
              <option value="Saladas">Saladas</option>
              <option value="Acompanhamentos">Acompanhamentos</option>
              <option value="Bebidas">Bebidas</option>
            </select>
            <select value={tipoPrato} onChange={e => setTipoPrato(e.target.value)} style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc', background: '#fff', color: '#222' }}>
              <option value="">Tipo de prato</option>
              <option value="Entrada">Entrada</option>
              <option value="Prato Principal">Prato Principal</option>
              <option value="Sobremesa">Sobremesa</option>
            </select>
            <input
              value={descInput}
              onChange={e => setDescInput(e.target.value)}
              placeholder="Descrição"
              style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc', background: '#fff', color: '#222' }}
            />
            <input
              type="date"
              value={dateInput}
              onChange={e => setDateInput(e.target.value)}
              style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc', maxWidth: 200, background: '#fff', color: '#222' }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <label style={{ fontWeight: 600, color: '#2d7a46' }}>Ingredientes (separe por vírgula):</label>
              <input
                value={ingredients}
                onChange={e => setIngredients(e.target.value)}
                placeholder="Ex: arroz, feijão, carne"
                style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc', background: '#fff', color: '#222' }}
              />
            </div>
            <input
              value={image}
              onChange={e => setImage(e.target.value)}
              placeholder="URL da imagem do prato"
              style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc', background: '#fff', color: '#222' }}
            />
            <button onClick={handleSave} style={{ background: '#2d7a46', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 16px', cursor: 'pointer', alignSelf: 'flex-end' }}>Salvar</button>
          </div>
        )}
        <div style={{ width: '100%', overflowX: 'auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 3fr 2fr 2fr',
            background: '#e9f5ee',
            color: '#2d7a46',
            fontWeight: 700,
            borderRadius: 8,
            marginBottom: 8,
            minWidth: 800
          }}>
            <div style={{ padding: 12, textAlign: 'left', borderBottom: '1px solid #d0e6db' }}>ID</div>
            <div style={{ padding: 12, textAlign: 'left', borderBottom: '1px solid #d0e6db' }}>Nome</div>
            <div style={{ padding: 12, textAlign: 'left', borderBottom: '1px solid #d0e6db' }}>Data</div>
            <div style={{ padding: 12, textAlign: 'left', borderBottom: '1px solid #d0e6db' }}>Ações</div>
          </div>
          {meals.map(meal => (
            <div key={meal.id} style={{
              display: 'grid',
              gridTemplateColumns: '2fr 3fr 2fr 2fr',
              alignItems: 'center',
              background: '#f7f7f7',
              marginBottom: 0,
              boxShadow: 'none',
              minWidth: 800
            }}>
              <div style={{ padding: 12, color: '#000000', fontSize: 15, wordBreak: 'break-all', textAlign: 'left', borderBottom: '1px solid #d0e6db' }}>{meal.id}</div>
              <div style={{ padding: 12, color: '#000000', fontSize: 15, wordBreak: 'break-word', textAlign: 'left', borderBottom: '1px solid #d0e6db' }}>{meal.name}</div>
              <div style={{ padding: 12, color: '#000000', fontSize: 15, textAlign: 'left', borderBottom: '1px solid #d0e6db' }}>{meal.date}</div>
              <div style={{ padding: 12, display: 'flex', gap: 18, textAlign: 'left', borderBottom: '1px solid #d0e6db', alignItems: 'center' }}>
                {/* Editar */}
                <button onClick={() => window.location.href = `/meals/${meal.id}/editar`} title="Editar" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}>
                  <svg width="22" height="22" fill="#f1c40f" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75l11.06-11.06-3.75-3.75L3 17.25zm2.92.92l9.13-9.13 1.83 1.83-9.13 9.13H5.92v-1.83zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
                </button>
                {/* Excluir */}
                <button onClick={() => onDelete(meal.id)} title="Excluir" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}>
                  <svg width="22" height="22" fill="#e74c3c" viewBox="0 0 24 24"><path d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zm3.46-7.12a1 1 0 0 1 1.41 0L12 12.59l1.12-1.12a1 1 0 1 1 1.41 1.41L13.41 14l1.12 1.12a1 1 0 0 1-1.41 1.41L12 15.41l-1.12 1.12a1 1 0 0 1-1.41-1.41L10.59 14l-1.12-1.12a1 1 0 0 1 0-1.41zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"/></svg>
                </button>
                {/* Prato do Dia */}
                <button onClick={() => toggleMenuOfDay(meal.id)} title={meal.isMenuOfDay ? 'Desmarcar Prato do Dia' : 'Marcar Prato do Dia'} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}>
                  {meal.isMenuOfDay ? (
                    <svg width="24" height="24" fill="#2d7a46" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm1 8c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm5.07-7.75l-1.41 1.41C16.37 7.37 17 9.09 17 11c0 2.21-1.79 4-4 4s-4-1.79-4-4c0-1.91.63-3.63 1.34-5.34l-1.41-1.41C6.16 6.84 5 9.28 5 12c0 3.87 3.13 7 7 7s7-3.13 7-7c0-2.72-1.16-5.16-2.93-6.75z"/></svg>
                  ) : (
                    <svg width="24" height="24" fill="#bbb" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm1 8c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z"/></svg>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
