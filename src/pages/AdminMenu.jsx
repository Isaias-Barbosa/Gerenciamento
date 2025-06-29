import React, { useState, useMemo } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import AdminMenuBar from '../components/AdminMenuBar';

const ADMINS = ['isaiasbarbosa111@gmail.com'];

export default function AdminMenu(props) {
  // Todos os hooks devem vir antes de qualquer return condicional
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('desc'); // 'desc' = mais recentes, 'asc' = mais antigos
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const itemsPerPage = 10;
  const navigate = useNavigate();

  // Novo estado para Menus Executivos
  const [executivoInput, setExecutivoInput] = useState('');
  const [executivoDate, setExecutivoDate] = useState('');
  const [executivoList, setExecutivoList] = useState([]);
  const [isExecutive, setIsExecutive] = useState(false);

  // Função para alterar a ordenação
  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  // Recebe todas as props do AdminDashboard
  const {
    meals, onAdd, onDelete, mealInput, setMealInput, descInput, setDescInput, dateInput, setDateInput,
    user, ingredients, setIngredients, price, setPrice, image, setImage, categoria, setCategoria, tipoPrato, setTipoPrato,
    toggleMenuOfDay
  } = props;

  // Ordenação e paginação dos pratos
  const filteredMeals = useMemo(() => {
    if (!search) return meals;
    return meals.filter(m => m.name.toLowerCase().includes(search.toLowerCase()));
  }, [meals, search]);
  const sortedMeals = useMemo(() => {
    return [...filteredMeals].sort((a, b) => {
      if (!a.date || !b.date) return 0;
      if (sortOrder === 'desc') {
        return new Date(b.date) - new Date(a.date);
      } else {
        return new Date(a.date) - new Date(b.date);
      }
    });
  }, [filteredMeals, sortOrder]);

  const totalPages = Math.ceil(sortedMeals.length / itemsPerPage);
  const paginatedMeals = sortedMeals.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Substituir o onClick do botão Salvar para redirecionar após sucesso
  const handleSaveAndRedirect = async () => {
    if (typeof props.handleSave !== 'function') {
      alert('Erro: handleSave não foi passado para AdminMenu.');
      return;
    }
    try {
      setLoading(true);
      setSuccess(false);
      await props.handleSave();
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate('/dashboard/admin/cardapio', { replace: true });
      }, 1200);
    } catch (err) {
      setLoading(false);
      alert('Erro ao salvar a refeição. Verifique o console para detalhes.');
      console.error('Erro ao salvar:', err);
    }
  };

  // Função para alterar a página da tabela
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
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
    setIsExecutive(false);
    setError('');
  };

  // Função para salvar com validação dos campos obrigatórios
  const handleSave = () => {
    if (!mealInput || !ingredients || !price || !image) {
      setError('Preencha todos os campos obrigatórios: Nome, Ingredientes, Preço e Imagem.');
      return;
    }
    setError('');
    setLoading(true);
    setSuccess(false);
    onAdd({
      id: Date.now().toString(),
      name: mealInput,
      description: descInput,
      date: dateInput,
      ingredients: ingredients.split(',').map(i => i.trim()).filter(i => i),
      price,
      image,
      categoria,
      tipoPrato,
      isExecutive
    });
    setLoading(false);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      handleCancel();
    }, 1200);
  };

  // Função para adicionar novo Menu Executivo
  const handleAddExecutivo = () => {
    if (!executivoInput || !executivoDate) {
      setError('Preencha o nome e a data do Menu Executivo.');
      return;
    }
    const novoMenu = {
      id: Date.now().toString(),
      nome: executivoInput,
      data: executivoDate
    };
    setExecutivoList([novoMenu, ...executivoList]);
    setExecutivoInput('');
    setExecutivoDate('');
    setError('');
  };

  // --- VERIFICAÇÕES DE USUÁRIO/ADMIN APÓS OS HOOKS ---
  if (user === null) {
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

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: 'linear-gradient(135deg, #23272f 0%, #18181b 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 0, padding: 0 }}>
      <h1 style={{ textAlign: 'center', color: '#2d7a46', marginTop: 24 }}>Cardápio - Admin</h1>
      <AdminMenuBar />
      {/* Formulário de adicionar nova refeição */}
      <div style={{ width: '100%', maxWidth: 1100, background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px #0001', padding: 32, marginBottom: 36, display: showForm ? 'flex' : 'none', flexDirection: 'column', alignItems: 'center' }}>
        <h2 style={{ color: '#2d7a46', fontWeight: 700, fontSize: 22, marginBottom: 18 }}>Adicionar Nova Refeição</h2>
        <form style={{ display: 'flex', flexWrap: 'wrap', gap: 24, width: '100%', justifyContent: 'center' }} onSubmit={e => { e.preventDefault(); handleSave(); }}>
          <div style={{ flex: 1, minWidth: 180 }}>
            <label htmlFor="nome" style={{ fontWeight: 600, color: '#222' }}>Nome do Prato*:</label>
            <input id="nome" value={mealInput} onChange={e => setMealInput(e.target.value)} required style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #d0e6db', marginBottom: 8, background: '#fff', color: '#222' }} />
          </div>
          <div style={{ flex: 2, minWidth: 220 }}>
            <label htmlFor="desc" style={{ fontWeight: 600, color: '#222' }}>Descrição:</label>
            <input id="desc" value={descInput} onChange={e => setDescInput(e.target.value)} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #d0e6db', marginBottom: 8, background: '#fff', color: '#222' }} />
          </div>
          <div style={{ flex: 1, minWidth: 140 }}>
            <label htmlFor="data" style={{ fontWeight: 600, color: '#222' }}>Data:</label>
            <input id="data" type="date" value={dateInput} onChange={e => setDateInput(e.target.value)} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #d0e6db', marginBottom: 8, background: '#fff', color: '#222' }} />
          </div>
          <div style={{ flex: 2, minWidth: 220 }}>
            <label htmlFor="ingredientes" style={{ fontWeight: 600, color: '#222' }}>Ingredientes*:</label>
            <input id="ingredientes" value={ingredients} onChange={e => setIngredients(e.target.value)} required style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #d0e6db', marginBottom: 8, background: '#fff', color: '#222' }} />
          </div>
          <div style={{ flex: 1, minWidth: 100 }}>
            <label htmlFor="preco" style={{ fontWeight: 600, color: '#222' }}>Preço*:</label>
            <input id="preco" type="number" step="0.01" min="0" placeholder="Ex: 14,99" value={price} onChange={e => setPrice(e.target.value)} required style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #d0e6db', marginBottom: 8, background: '#fff', color: '#222' }} />
          </div>
          <div style={{ flex: 2, minWidth: 220 }}>
            <label htmlFor="imagem" style={{ fontWeight: 600, color: '#222' }}>URL da Imagem*:</label>
            <input id="imagem" value={image} onChange={e => setImage(e.target.value)} required style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #d0e6db', marginBottom: 8, background: '#fff', color: '#222' }} />
          </div>
          <div style={{ flex: 1, minWidth: 120 }}>
            <label htmlFor="categoria" style={{ fontWeight: 600, color: '#222' }}>Categoria:</label>
            <select id="categoria" value={categoria} onChange={e => setCategoria(e.target.value)} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #d0e6db', marginBottom: 8, background: '#fff', color: '#222' }}>
              <option value="">Categoria</option>
              <option value="Aperitivos">Aperitivos</option>
              <option value="Carnes">Carnes</option>
              <option value="Massas">Massas</option>
              <option value="Frangos e Peixes">Frangos e Peixes</option>
              <option value="Saladas">Saladas</option>
              <option value="Acompanhamentos">Acompanhamentos</option>
              <option value="Bebidas">Bebidas</option>
            </select>
          </div>
          <div style={{ flex: 1, minWidth: 120 }}>
            <label htmlFor="tipoPrato" style={{ fontWeight: 600, color: '#222' }}>Tipo de Prato:</label>
            <select id="tipoPrato" value={tipoPrato} onChange={e => setTipoPrato(e.target.value)} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #d0e6db', marginBottom: 8, background: '#fff', color: '#222' }}>
              <option value="">Tipo de Prato</option>
              <option value="Entrada">Entrada</option>
              <option value="Prato Principal">Prato Principal</option>
              <option value="Sobremesa">Sobremesa</option>
              <option value="Bebida">Bebida</option>
              <option value="Complemento">Complemento</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: 18, marginTop: 18, width: '100%', justifyContent: 'center' }}>
            <button type="submit" disabled={loading} style={{ background: '#2d7a46', color: '#fff', fontWeight: 700, fontSize: 18, border: 'none', borderRadius: 8, padding: '10px 32px', cursor: loading ? 'not-allowed' : 'pointer', transition: 'background 0.2s' }}>{loading ? 'Salvando...' : 'Salvar'}</button>
            <button type="button" onClick={handleCancel} style={{ background: '#e74c3c', color: '#fff', fontWeight: 700, fontSize: 18, border: 'none', borderRadius: 8, padding: '10px 32px', cursor: 'pointer', transition: 'background 0.2s' }}>Cancelar</button>
          </div>
          {loading && <div style={{ color: '#2d7a46', fontWeight: 600, marginTop: 16 }}>Salvando...</div>}
          {success && <div style={{ color: '#2d7a46', fontWeight: 600, marginTop: 16 }}>Refeição adicionada com sucesso!</div>}
          {error && <div style={{ color: '#e74c3c', fontWeight: 600, marginTop: 16 }}>{error}</div>}
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#222', fontWeight: 500, marginBottom: 2 }}>
            <input type="checkbox" checked={isExecutive} onChange={e => setIsExecutive(e.target.checked)} />
            Prato executivo?
          </label>
        </form>
      </div>
      {/* Botão para abrir formulário */}
      <div style={{ width: '100%', maxWidth: 1100, display: showForm ? 'none' : 'flex', justifyContent: 'center', marginBottom: 24 }}>
        <button onClick={() => setShowForm(true)} style={{ background: '#2d7a46', color: '#fff', fontWeight: 700, fontSize: 18, border: 'none', borderRadius: 8, padding: '10px 32px', cursor: 'pointer', transition: 'background 0.2s' }}>Adicionar Nova Refeição</button>
      </div>
      {/* Filtro e paginação */}
      <div style={{ width: '100%', maxWidth: 1400, display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <label style={{ color: '#2d7a46', fontWeight: 600 }}>Ordenar por:</label>
          <select value={sortOrder} onChange={handleSortChange} style={{ padding: 8, borderRadius: 6, border: '1px solid #d0e6db', fontWeight: 600 }}>
            <option value="desc">Mais recentes</option>
            <option value="asc">Mais antigos</option>
          </select>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <input
            type="text"
            placeholder="Buscar prato..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ padding: 8, borderRadius: 6, border: '1px solid #d0e6db', fontWeight: 500, minWidth: 180 }}
          />
          <button onClick={() => handlePageChange(1)} disabled={currentPage === 1} style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid #d0e6db', background: currentPage === 1 ? '#eee' : '#fff', color: '#2d7a46', fontWeight: 700, cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}>{'<<'}</button>
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid #d0e6db', background: currentPage === 1 ? '#eee' : '#fff', color: '#2d7a46', fontWeight: 700, cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}>{'<'}</button>
          <span style={{ color: '#2d7a46', fontWeight: 600 }}>Página {currentPage} de {totalPages}</span>
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid #d0e6db', background: currentPage === totalPages ? '#eee' : '#fff', color: '#2d7a46', fontWeight: 700, cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}>{'>'}</button>
          <button onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid #d0e6db', background: currentPage === totalPages ? '#eee' : '#fff', color: '#2d7a46', fontWeight: 700, cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}>{'>>'}</button>
        </div>
      </div>
      {/* Tabela de refeições */}
      <div style={{ width: '100%', maxWidth: 1400, background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px #0001', padding: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 48 }}>
        <div style={{ width: '100%', overflowX: 'auto', paddingBottom: 32 }}>
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
          {paginatedMeals.map(meal => (
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
      {/* Formulário de criar novo Menu Executivo */}
      {/* Tabela de Menus Executivos */}
    </div>
  );
}
