import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import PropagandaSelector from './PropagandaSelector';
import AdminMenuBar from '../components/AdminMenuBar';

const ADMINS = ['isaiasbarbosa111@gmail.com'];

export default function AdminDashboard({ meals, onAdd, onDelete, mealInput, setMealInput, descInput, setDescInput, dateInput, setDateInput, user }) {
  // Todos os hooks devem vir antes de qualquer return condicional
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
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = 'Dashboard';
  }, []);

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

  // --- VERIFICAÇÕES DE USUÁRIO/ADMIN APÓS OS HOOKS ---
  if (user === null) {
    // Ainda carregando user, não renderiza nada
    return null;
  }
  if (user) {
    console.log('user:', user);
  }
  const email = (user?.email || user?.emails?.[0]?.value || '').toLowerCase();
  console.log('Email detectado:', email, '| Lista de admins:', ADMINS);
  const isAdmin = ADMINS.includes(email);
  if (!user || !isAdmin) {
    return <Navigate to="/404" replace />;
  }

  const handleSave = () => {
    // Validação dos campos obrigatórios
    if (!mealInput || !ingredients || !price || !image) {
      setError('Preencha todos os campos obrigatórios: Nome, Ingredientes, Preço e Imagem.');
      return;
    }
    setLoading(true);
    setSuccess(false);
    setError('');
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
        handleCancel();
      }, 1200);
    }, 1200);
  };

  // Função para cancelar e limpar o formulário
  const handleCancel = () => {
    setShowForm(false);
    setMealInput('');
    setDescInput('');
    setDateInput('');
    setIngredients('');
    setPrice('');
    setImage('');
    setCategoria('');
    setTipoPrato('');
    setError('');
  };

  // Permitir marcar/desmarcar Prato do Dia
  const toggleMenuOfDay = (id) => {
    const meal = meals.find(m => m.id === id);
    if (!meal) return;
    const updatedMeal = { ...meal, isMenuOfDay: !meal.isMenuOfDay };
    fetch(`http://localhost:5000/meals/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedMeal)
    })
      .then(() => window.location.reload()); // Simples: recarrega para refletir
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: 'linear-gradient(135deg, #23272f 0%, #18181b 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 0, padding: 0 }}>
      <h1 style={{ textAlign: 'center', color: '#2d7a46', marginTop: 24 }}>Dashboard Admin</h1>
      <AdminMenuBar />
      {/* Cards de indicadores principais */}
      <div style={{ width: '100%', maxWidth: 1100, display: 'flex', gap: 32, justifyContent: 'center', margin: '36px 0 36px 0' }}>
        <div style={{ flex: 1, minWidth: 220, background: 'linear-gradient(135deg, #2d7a46 60%, #1e3a2d 100%)', borderRadius: 18, boxShadow: '0 2px 16px #0002', padding: '32px 24px', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 12, letterSpacing: 1 }}>Vendas Totais</div>
          <div style={{ fontSize: 38, fontWeight: 900, letterSpacing: 2 }}>1.250</div>
        </div>
        <div style={{ flex: 1, minWidth: 220, background: 'linear-gradient(135deg, #27548A 60%, #1a2636 100%)', borderRadius: 18, boxShadow: '0 2px 16px #0002', padding: '32px 24px', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 12, letterSpacing: 1 }}>Receita Total</div>
          <div style={{ fontSize: 38, fontWeight: 900, letterSpacing: 2 }}>R$ 98.500,00</div>
        </div>
        <div style={{ flex: 1, minWidth: 220, background: 'linear-gradient(135deg, #e67e22 60%, #a65c13 100%)', borderRadius: 18, boxShadow: '0 2px 16px #0002', padding: '32px 24px', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 12, letterSpacing: 1 }}>Últimos Clientes no mês</div>
          <div style={{ fontSize: 38, fontWeight: 900, letterSpacing: 2 }}>18</div>
        </div>
      </div>
      {/* Formulário de adicionar nova refeição */}
      {showForm && (
        <form
          style={{
            background: '#fff',
            borderRadius: 16,
            boxShadow: '0 2px 16px #0001',
            padding: 32,
            marginBottom: 36,
            maxWidth: 500,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
          onSubmit={e => {
            e.preventDefault();
            handleSave();
          }}
        >
          <label>
            Nome do Prato*:
            <input value={mealInput} onChange={e => setMealInput(e.target.value)} required />
          </label>
          <label>
            Ingredientes*:
            <input value={ingredients} onChange={e => setIngredients(e.target.value)} required />
          </label>
          <label>
            Preço*:
            <input value={price} onChange={e => setPrice(e.target.value)} required />
          </label>
          <label>
            URL da Imagem*:
            <input value={image} onChange={e => setImage(e.target.value)} required />
          </label>
          {/* Adicione outros campos se necessário */}
          <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
            <button type="submit" disabled={loading}>
              {loading ? 'Salvando...' : 'Salvar'}
            </button>
            <button type="button" onClick={handleCancel} style={{ background: '#eee', color: '#333' }}>
              Cancelar
            </button>
          </div>
          {error && (
            <div style={{ color: 'red', marginTop: 8, fontWeight: 600 }}>{error}</div>
          )}
          {success && (
            <div style={{ color: 'green', marginTop: 8, fontWeight: 600 }}>Refeição adicionada com sucesso!</div>
          )}
        </form>
      )}
      {/* Gráficos fictícios */}
      <div style={{ width: '100%', maxWidth: 1100, background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px #0001', padding: 32, marginBottom: 36, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 style={{ color: '#2d7a46', fontWeight: 700, fontSize: 26, marginBottom: 18 }}>Resumo de Vendas e Receita</h2>
        <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', gap: 32, justifyContent: 'center', alignItems: 'flex-start' }}>
          <div style={{ flex: 1, minWidth: 320, maxWidth: 500, background: '#f7f7f7', borderRadius: 12, boxShadow: '0 2px 8px #0001', padding: 18, marginBottom: 18 }}>
            <div style={{ fontWeight: 700, color: '#2d7a46', marginBottom: 8, fontSize: 18 }}>Vendas por mês</div>
            <img src="https://quickchart.io/chart?c=%7B%22type%22%3A%22bar%22%2C%22data%22%3A%7B%22labels%22%3A%5B%22Jan%22%2C%22Fev%22%2C%22Mar%22%2C%22Abr%22%2C%22Mai%22%2C%22Jun%22%5D%2C%22datasets%22%3A%5B%7B%22label%22%3A%22Vendas%22%2C%22backgroundColor%22%3A%22%232d7a46%22%2C%22data%22%3A%5B180%2C210%2C160%2C250%2C220%2C230%5D%7D%5D%7D%7D" alt="Gráfico de vendas" style={{ width: '100%', borderRadius: 8 }} />
          </div>
          <div style={{ flex: 1, minWidth: 320, maxWidth: 500, background: '#f7f7f7', borderRadius: 12, boxShadow: '0 2px 8px #0001', padding: 18, marginBottom: 18 }}>
            <div style={{ fontWeight: 700, color: '#27548A', marginBottom: 8, fontSize: 18 }}>Receita por mês</div>
            <img src="https://quickchart.io/chart?c=%7B%22type%22%3A%22line%22%2C%22data%22%3A%7B%22labels%22%3A%5B%22Jan%22%2C%22Fev%22%2C%22Mar%22%2C%22Abr%22%2C%22Mai%22%2C%22Jun%22%5D%2C%22datasets%22%3A%5B%7B%22label%22%3A%22Receita%22%2C%22borderColor%22%3A%22%2327548A%22%2C%22backgroundColor%22%3A%22rgba(39%2C84%2C138%2C0.15)%22%2C%22data%22%3A%5B14500%2C16200%2C13800%2C18000%2C17000%2C19000%5D%2C%22fill%22%3Atrue%7D%5D%7D%7D" alt="Gráfico de receita" style={{ width: '100%', borderRadius: 8 }} />
          </div>
        </div>
        <div style={{ width: '100%', maxWidth: 600, background: '#f7f7f7', borderRadius: 12, boxShadow: '0 2px 8px #0001', padding: 18, margin: '32px auto 0 auto' }}>
          <div style={{ fontWeight: 700, color: '#e67e22', marginBottom: 8, fontSize: 18 }}>Novos clientes por mês</div>
          <img src="https://quickchart.io/chart?c=%7B%22type%22%3A%22bar%22%2C%22data%22%3A%7B%22labels%22%3A%5B%22Jan%22%2C%22Fev%22%2C%22Mar%22%2C%22Abr%22%2C%22Mai%22%2C%22Jun%22%5D%2C%22datasets%22%3A%5B%7B%22label%22%3A%22Clientes%22%2C%22backgroundColor%22%3A%22%23e67e22%22%2C%22data%22%3A%5B12%2C15%2C18%2C20%2C17%2C18%5D%7D%5D%7D%7D" alt="Gráfico de clientes" style={{ width: '100%', borderRadius: 8 }} />
        </div>
      </div>
      {/* Removido: Formulário de adicionar nova refeição e tabela de pratos */}
      {/* Exemplo de exibição de erro */}
      {error && (
        <div style={{ color: 'red', margin: '12px 0', fontWeight: 600 }}>{error}</div>
      )}
    </div>
  );
}

/*
Exemplo de rotas (ajuste conforme seu roteador)
Adicione as rotas abaixo no seu AppRouter.jsx ou onde faz o roteamento:
<Route path="/dashboard/admin/cardapio" element={<AdminMenu ...props />} />
<Route path="/dashboard/admin/comentarios" element={<AdminComments />} />
<Route path="/dashboard/admin/usuarios" element={<AdminUsers />} />
*/
