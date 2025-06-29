import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [meals, setMeals] = useState([]);
  const [mealInput, setMealInput] = useState('');
  const [descInput, setDescInput] = useState('');
  const [dateInput, setDateInput] = useState('');

  // Checa se o usuário está autenticado
  useEffect(() => {
    fetch('https://meal-planner-bgsh.onrender.com/auth/user', { credentials: 'include' })
      .then(res => res.json())
      .then(data => setUser(data.user || null));
  }, []);

  // Busca refeições
  useEffect(() => {
    fetch('https://meal-planner-bgsh.onrender.com/meals', { credentials: 'include' })
      .then(res => res.json())
      .then(setMeals);
  }, [user]);

  const handleLogin = () => {
    window.location.href = 'https://meal-planner-bgsh.onrender.com/auth/google';
  };

  const handleLogout = () => {
    window.location.href = 'https://meal-planner-bgsh.onrender.com/auth/logout';
  };

  const handleAddMeal = () => {
    if (!mealInput || !dateInput) return;
    fetch('https://meal-planner-bgsh.onrender.com/meals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        id: Date.now().toString(),
        name: mealInput,
        description: descInput,
        date: dateInput
      })
    })
      .then(res => res.json())
      .then(meal => setMeals([...meals, meal]));
    setMealInput('');
    setDescInput('');
    setDateInput('');
  };

  const handleDeleteMeal = (id) => {
    fetch(`https://meal-planner-bgsh.onrender.com/meals/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    }).then(() => setMeals(meals.filter(m => m.id !== id)));
  };

  // Compartilhamento social
  const handleShare = (meal) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Veja minha refeição planejada: ${meal.name} em ${meal.date}. ${meal.description}`);
    window.open(`https://wa.me/?text=${text}%20${url}`, '_blank');
  };

  return (
    <div className="App" style={{ maxWidth: 500, margin: '40px auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px #0001', padding: 32 }}>
      <h1 style={{ textAlign: 'center', color: '#2d7a46' }}>Planejamento de Refeições</h1>
      {!user ? (
        <button onClick={handleLogin} style={{ display: 'block', margin: '32px auto', padding: '12px 32px', fontSize: 18, background: '#4285F4', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}>Entrar com Google</button>
      ) : (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <span style={{ fontWeight: 500 }}>Bem-vindo, {user.displayName}</span>
            <button onClick={handleLogout} style={{ background: '#eee', border: 'none', borderRadius: 6, padding: '6px 16px', cursor: 'pointer' }}>Sair</button>
          </div>
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
            <button onClick={handleAddMeal} style={{ background: '#2d7a46', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 16px', cursor: 'pointer' }}>Adicionar</button>
          </div>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {meals.map(meal => (
              <li key={meal.id} style={{ background: '#f7f7f7', borderRadius: 8, marginBottom: 12, padding: 16, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ fontWeight: 600, fontSize: 18 }}>{meal.name}</div>
                <div style={{ color: '#555' }}>{meal.description}</div>
                <div style={{ color: '#888', fontSize: 14 }}>Data: {meal.date}</div>
                <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                  <button onClick={() => handleDeleteMeal(meal.id)} style={{ background: '#e74c3c', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 16px', cursor: 'pointer' }}>Excluir</button>
                  <button onClick={() => handleShare(meal)} style={{ background: '#25d366', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 16px', cursor: 'pointer' }}>Compartilhar</button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default App;
