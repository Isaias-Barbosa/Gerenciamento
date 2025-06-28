import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PublicMeals from './pages/PublicMeals';
import AdminDashboard from './pages/AdminDashboard';
import Contato from './pages/Contato';
import MealDetail from './pages/MealDetail';
import EditMeal from './pages/EditMeal';
import Eventos from './pages/Eventos';
import Reserva from './pages/Reserva';
import SearchResult from './pages/SearchResult';

export default function AppRouter() {
  const [user, setUser] = useState(null);
  const [meals, setMeals] = useState([]);
  const [mealInput, setMealInput] = useState('');
  const [descInput, setDescInput] = useState('');
  const [dateInput, setDateInput] = useState('');
  const [propagandaIds, setPropagandaIds] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/auth/user', { credentials: 'include' })
      .then(res => res.json())
      .then(data => setUser(data.user || null));
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/meals', { credentials: 'include' })
      .then(res => res.json())
      .then(setMeals);
  }, [user]);

  // Buscar propagandaIds do backend ao carregar
  useEffect(() => {
    fetch('http://localhost:5000/meals/propaganda')
      .then(res => res.json())
      .then(data => setPropagandaIds(data.propagandaIds || []));
  }, []);

  const handleLogin = () => {
    window.location.href = 'http://localhost:5000/auth/google';
  };
  const handleLogout = () => {
    window.location.href = 'http://localhost:5000/auth/logout';
  };
  // Novo: permite passar objeto completo para refeição
  const handleAddMeal = (mealObj) => {
    const meal = mealObj || {
      id: Date.now().toString(),
      name: mealInput,
      description: descInput,
      date: dateInput
    };
    fetch('http://localhost:5000/meals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(meal)
    })
      .then(res => res.json())
      .then(meal => setMeals([...meals, meal]));
    setMealInput('');
    setDescInput('');
    setDateInput('');
  };
  const handleDeleteMeal = (id) => {
    fetch(`http://localhost:5000/meals/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    }).then(() => setMeals(meals.filter(m => m.id !== id)));
  };
  // Novo: editar refeição
  const handleEditMeal = (updatedMeal) => {
    setMeals(meals => meals.map(m => m.id === updatedMeal.id ? { ...m, ...updatedMeal } : m));
    fetch(`http://localhost:5000/meals/${updatedMeal.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(updatedMeal)
    });
  };

  return (
    <Router>
      <div style={{ minHeight: '100vh', background: '#f7f7f7' }}>
        <Navbar user={user} onLogin={handleLogin} onLogout={handleLogout} meals={meals} />
        <div style={{ width: '100%', margin: 0, padding: '0 16px', boxSizing: 'border-box' }}>
          <Routes>
            <Route path="/" element={<Home meals={meals} propagandaIds={propagandaIds} />} />
            <Route path="/meals" element={<PublicMeals meals={meals} />} />
            <Route path="/meals/:id" element={<MealDetail meals={meals} />} />
            <Route path="/meals/:id/editar" element={<EditMeal meals={meals} onEdit={handleEditMeal} />} />
            <Route path="/dashboard/admin" element={<AdminDashboard meals={meals} onAdd={handleAddMeal} onDelete={handleDeleteMeal} mealInput={mealInput} setMealInput={setMealInput} descInput={descInput} setDescInput={setDescInput} dateInput={dateInput} setDateInput={setDateInput} user={user} propagandaIds={propagandaIds} setPropagandaIds={setPropagandaIds} />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/eventos" element={<Eventos />} />
            <Route path="/reserva" element={<Reserva />} />
            <Route path="/search/:query" element={<SearchResult meals={meals} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
