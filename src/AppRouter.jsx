import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
import AdminMenu from './pages/AdminMenu';
import AdminComments from './pages/AdminComments';
import AdminUsers from './pages/AdminUsers';
import AdminComandas from './pages/AdminComandas';
import AdminExecutivo from './pages/AdminExecutivo';
import MenuExecutivo from './pages/MenuExecutivo';
import NotFound from './pages/NotFound';
import BackgroundWrapper from './components/BackgroundWrapper';

function AppContent(props) {
  const location = useLocation();
  // Detecta se é rota admin
  const isAdmin = location.pathname.startsWith('/dashboard/admin');
  return (
    <>
      <BackgroundWrapper isAdmin={isAdmin} />
      <div style={{ minHeight: '100vh', background: isAdmin ? '#f7f7f7' : 'none' }}>
        <Navbar user={props.user} onLogin={props.handleLogin} onLogout={props.handleLogout} meals={props.meals} />
        <div style={{ width: '100%', margin: 0, padding: '0 16px', boxSizing: 'border-box' }}>
          <Routes>
            <Route path="/" element={<Home meals={props.meals} propagandaIds={props.propagandaIds} />} />
            <Route path="/meals" element={<PublicMeals meals={props.meals} />} />
            <Route path="/meals/:id" element={<MealDetail meals={props.meals} />} />
            <Route path="/meals/:id/editar" element={<EditMeal meals={props.meals} onEdit={props.handleEditMeal} />} />
            <Route path="/dashboard/admin" element={<AdminDashboard meals={props.meals} onAdd={props.handleAddMeal} onDelete={props.handleDeleteMeal} mealInput={props.mealInput} setMealInput={props.setMealInput} descInput={props.descInput} setDescInput={props.setDescInput} dateInput={props.dateInput} setDateInput={props.setDateInput} user={props.user} propagandaIds={props.propagandaIds} setPropagandaIds={props.setPropagandaIds} />} />
            <Route path="/dashboard/admin/cardapio" element={
              <AdminMenu
                meals={props.meals}
                onAdd={props.handleAddMeal}
                onDelete={props.handleDeleteMeal}
                mealInput={props.mealInput}
                setMealInput={props.setMealInput}
                descInput={props.descInput}
                setDescInput={props.setDescInput}
                dateInput={props.dateInput}
                setDateInput={props.setDateInput}
                user={props.user}
                ingredients={props.ingredients}
                setIngredients={props.setIngredients}
                price={props.price}
                setPrice={props.setPrice}
                image={props.image}
                setImage={props.setImage}
                categoria={props.categoria}
                setCategoria={props.setCategoria}
                tipoPrato={props.tipoPrato}
                setTipoPrato={props.setTipoPrato}
                loading={props.loading}
                setLoading={props.setLoading}
                success={props.success}
                setSuccess={props.setSuccess}
                showForm={props.showForm}
                setShowForm={props.setShowForm}
                toggleMenuOfDay={props.toggleMenuOfDay}
                handleSave={props.handleAddMeal}
              />
            } />
            <Route path="/dashboard/admin/comentarios" element={<AdminComments user={props.user} />} />
            <Route path="/dashboard/admin/usuarios" element={<AdminUsers />} />
            <Route path="/dashboard/admin/comandas" element={<AdminComandas user={props.user} />} />
            <Route path="/dashboard/admin/executivo" element={<AdminExecutivo />} />
            <Route path="/menu-executivo" element={<MenuExecutivo />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/eventos" element={<Eventos />} />
            <Route path="/reserva" element={<Reserva />} />
            <Route path="/search/:query" element={<SearchResult meals={props.meals} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default function AppRouter() {
  const [user, setUser] = useState(null);
  const [meals, setMeals] = useState([]);
  const [mealInput, setMealInput] = useState('');
  const [descInput, setDescInput] = useState('');
  const [dateInput, setDateInput] = useState('');
  const [propagandaIds, setPropagandaIds] = useState([]);
  const [ingredients, setIngredients] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [categoria, setCategoria] = useState('');
  const [tipoPrato, setTipoPrato] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch('https://meal-planner-bgsh.onrender.com/auth/user', { credentials: 'include' })
      .then(res => res.json())
      .then(data => setUser(data.user || null));
  }, []);

  useEffect(() => {
    fetch('https://meal-planner-bgsh.onrender.com/meals', { credentials: 'include' })
      .then(res => res.json())
      .then(setMeals);
  }, [user]);

  // Buscar propagandaIds do backend ao carregar
  useEffect(() => {
    fetch('https://meal-planner-bgsh.onrender.com/meals/propaganda')
      .then(res => res.json())
      .then(data => setPropagandaIds(data.propagandaIds || []));
  }, []);

  const handleLogin = () => {
    window.location.href = 'https://meal-planner-bgsh.onrender.com/auth/google';
  };
  const handleLogout = () => {
    window.location.href = 'https://meal-planner-bgsh.onrender.com/auth/logout';
  };
  // Novo: permite passar objeto completo para refeição
  const handleAddMeal = (mealObj) => {
    const meal = mealObj || {
      id: Date.now().toString(),
      name: mealInput,
      description: descInput,
      date: dateInput,
      ingredients: ingredients.split(',').map(i => i.trim()).filter(i => i),
      price,
      image,
      categoria,
      tipoPrato
    };
    fetch('https://meal-planner-bgsh.onrender.com/meals', {
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
    setIngredients('');
    setPrice('');
    setImage('');
    setCategoria('');
    setTipoPrato('');
  };
  const handleDeleteMeal = (id) => {
    fetch(`https://meal-planner-bgsh.onrender.com/meals/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    }).then(() => setMeals(meals.filter(m => m.id !== id)));
  };
  // Novo: editar refeição
  const handleEditMeal = (updatedMeal) => {
    setMeals(meals => meals.map(m => m.id === updatedMeal.id ? { ...m, ...updatedMeal } : m));
    fetch(`https://meal-planner-bgsh.onrender.com/meals/${updatedMeal.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(updatedMeal)
    });
  };

  // Função para marcar/desmarcar prato do dia
  const toggleMenuOfDay = (id) => {
    const meal = meals.find(m => m.id === id);
    if (!meal) return;
    const updatedMeal = { ...meal, isMenuOfDay: !meal.isMenuOfDay };
    fetch(`https://meal-planner-bgsh.onrender.com/meals/${id}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedMeal)
      }
    ).then(() => window.location.reload());
  };

  return (
    <Router>
      <AppContent
        user={user}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
        meals={meals}
        handleAddMeal={handleAddMeal}
        handleDeleteMeal={handleDeleteMeal}
        handleEditMeal={handleEditMeal}
        mealInput={mealInput}
        setMealInput={setMealInput}
        descInput={descInput}
        setDescInput={setDescInput}
        dateInput={dateInput}
        setDateInput={setDateInput}
        ingredients={ingredients}
        setIngredients={setIngredients}
        price={price}
        setPrice={setPrice}
        image={image}
        setImage={setImage}
        categoria={categoria}
        setCategoria={setCategoria}
        tipoPrato={tipoPrato}
        setTipoPrato={setTipoPrato}
        loading={loading}
        setLoading={setLoading}
        success={success}
        setSuccess={setSuccess}
        showForm={showForm}
        setShowForm={setShowForm}
        propagandaIds={propagandaIds}
        setPropagandaIds={setPropagandaIds}
        toggleMenuOfDay={toggleMenuOfDay}
      />
    </Router>
  );
}
