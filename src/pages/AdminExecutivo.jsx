import React, { useState, useEffect, useRef } from 'react';
import AdminMenuBar from '../components/AdminMenuBar';

export default function AdminExecutivo() {
  const [executivoList, setExecutivoList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  const [meals, setMeals] = useState([]);

  // Campos do formulário
  const [nome, setNome] = useState('');
  const [data, setData] = useState('');
  const [entrada, setEntrada] = useState(null);
  const [principal, setPrincipal] = useState(null);
  const [sobremesa, setSobremesa] = useState(null);
  const [preco, setPreco] = useState('');
  const [imagem, setImagem] = useState('');

  // Dropdowns abertos
  const [openDropdown, setOpenDropdown] = useState(''); // '', 'entrada', 'principal', 'sobremesa'
  const dropdownRef = useRef(null);

  // Carregar pratos do backend
  useEffect(() => {
    fetch('/api/meals')
      .then(res => res.json())
      .then(data => {
        console.log('Resposta bruta de /api/meals:', data);
        setMeals(data);
        const executivos = data.filter(m => m.isExecutive);
        console.log('Pratos executivos retornados:', executivos);
      })
      .catch((err) => {
        console.error('Erro ao buscar /api/meals:', err);
        setMeals([]);
      });
    // Carregar menus executivos do backend
    fetch('/api/menuExecutivo')
      .then(res => res.json())
      .then(data => setExecutivoList(data))
      .catch(() => setExecutivoList([]));
  }, []);

  // Fecha dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown('');
      }
    }
    if (openDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdown]);

  const pratosExecutivos = meals.filter(m => m.isExecutive);

  const handleAddExecutivo = async () => {
    if (!nome || !data || !entrada || !principal || !sobremesa || !preco || !imagem) {
      setError('Preencha todos os campos obrigatórios.');
      return;
    }
    if (!entrada.id || !principal.id || !sobremesa.id) {
      setError('Selecione um prato válido para cada campo.');
      return;
    }
    const novoMenu = {
      id: editId ? editId : Date.now().toString(),
      nome,
      data,
      entrada,
      principal,
      sobremesa,
      preco,
      imagem
    };
    try {
      let listaAtualizada;
      if (editId) {
        // Editar: substitui o menu pelo novo
        const res = await fetch('/api/menuExecutivo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(novoMenu)
        });
        if (!res.ok) throw new Error('Erro ao editar');
        listaAtualizada = await res.json();
      } else {
        // Criar novo
        const res = await fetch('/api/menuExecutivo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(novoMenu)
        });
        if (!res.ok) throw new Error('Erro ao salvar');
        listaAtualizada = await res.json();
      }
      setExecutivoList(listaAtualizada);
      setNome(''); setData(''); setEntrada(null); setPrincipal(null); setSobremesa(null); setPreco(''); setImagem(''); setError(''); setShowForm(false); setEditId(null);
      setOpenDropdown('');
    } catch {
      setError('Erro ao salvar menu executivo.');
    }
  };

  // Excluir menu executivo
  const handleDeleteExecutivo = async (id) => {
    try {
      const res = await fetch(`/api/menuExecutivo/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Erro ao excluir');
      const listaAtualizada = await res.json();
      setExecutivoList(listaAtualizada);
    } catch {
      setError('Erro ao excluir menu executivo.');
    }
  };

  // Função para editar menu executivo (abre o formulário preenchido)
  const handleEditExecutivo = (menu) => {
    setShowForm(true);
    setNome(menu.nome);
    setData(menu.data);
    setEntrada(menu.entrada);
    setPrincipal(menu.principal);
    setSobremesa(menu.sobremesa);
    setPreco(menu.preco);
    setImagem(menu.imagem);
    setEditId(menu.id);
    setError('');
    setOpenDropdown('');
  };

  // Novo estado para saber se está editando
  const [editId, setEditId] = useState(null);

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: 'linear-gradient(135deg, #23272f 0%, #18181b 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 0, padding: 0 }}>
      <h1 style={{ textAlign: 'center', color: '#27548A', marginTop: 24 }}>Executivo - Admin</h1>
      <AdminMenuBar />
      {/* Botão para abrir formulário */}
      <div style={{ width: '100%', maxWidth: 700, display: showForm ? 'none' : 'flex', justifyContent: 'center', marginBottom: 24 }}>
        <button onClick={() => setShowForm(true)} style={{ background: '#27548A', color: '#fff', fontWeight: 700, fontSize: 18, border: 'none', borderRadius: 8, padding: '10px 32px', cursor: 'pointer', transition: 'background 0.2s' }}>Criar Menu Executivo</button>
      </div>
      {/* Formulário de criar novo Menu Executivo */}
      {showForm && (
        <div style={{ width: '100%', maxWidth: 700, background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px #0001', padding: 24, marginBottom: 24, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2 style={{ color: '#27548A', fontWeight: 700, fontSize: 20, marginBottom: 12 }}>
            {editId ? 'Editar Menu Executivo' : 'Criar Menu Executivo'}
          </h2>
          <form style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10 }} onSubmit={e => { e.preventDefault(); handleAddExecutivo(); }}>
            <div style={{ display: 'flex', gap: 16 }}>
              <input placeholder="Nome do Menu Executivo*" value={nome} onChange={e => setNome(e.target.value)} style={{ flex: 2, minWidth: 180, padding: 10, borderRadius: 8, border: '1px solid #d0e6db', background: '#fff', color: '#222' }} />
              <input type="date" value={data} onChange={e => setData(e.target.value)} style={{ flex: 1, minWidth: 120, padding: 10, borderRadius: 8, border: '1px solid #d0e6db', background: '#fff', color: '#222' }} />
            </div>
            {/* Campo de seleção para Entrada */}
            <div ref={openDropdown === 'entrada' ? dropdownRef : null}>
              <label style={{ fontWeight: 600, color: '#222' }}>Entrada*:</label>
              <div style={{ position: 'relative' }}>
                <div
                  style={{
                    width: '100%',
                    padding: 2,
                    borderRadius: 8,
                    border: '1px solid #d0e6db',
                    background: '#fff',
                    color: '#222',
                    cursor: 'pointer',
                    minHeight: 38,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                  onClick={() => setOpenDropdown(openDropdown === 'entrada' ? '' : 'entrada')}
                  tabIndex={0}
                >
                  {entrada ? (
                    <span style={{ color: '#27548A', fontWeight: 600 }}>{entrada.name} <span style={{ color: '#888', fontWeight: 400, fontSize: 13 }}>({entrada.tipoPrato})</span></span>
                  ) : (
                    <span style={{ color: '#888' }}>Selecione uma entrada...</span>
                  )}
                  {entrada && (
                    <button type="button" onClick={e => { e.stopPropagation(); setEntrada(null); }} style={{ background: 'none', border: 'none', color: '#e74c3c', fontWeight: 700, cursor: 'pointer', fontSize: 16, marginLeft: 8 }}>×</button>
                  )}
                  <span style={{ marginLeft: 8, color: '#888' }}>▼</span>
                </div>
                {openDropdown === 'entrada' && (
                  <div style={{ position: 'absolute', left: 0, right: 0, top: 44, background: '#fff', border: '1px solid #d0e6db', borderRadius: 8, maxHeight: 220, overflowY: 'auto', zIndex: 10, padding: 8 }}>
                    {pratosExecutivos.length > 0 ? (
                      pratosExecutivos.map(p => (
                        <div key={p.id} style={{ padding: 8, cursor: 'pointer', color: '#222' }} onClick={() => { setEntrada(p); setOpenDropdown(''); }}>
                          {p.name} <span style={{ color: '#888', fontWeight: 400, fontSize: 13 }}>({p.tipoPrato})</span>
                        </div>
                      ))
                    ) : (
                      <div style={{ padding: 8, color: '#888' }}>Nenhum prato executivo cadastrado.</div>
                    )}
                  </div>
                )}
              </div>
            </div>
            {/* Campo de seleção para Prato Principal */}
            <div ref={openDropdown === 'principal' ? dropdownRef : null}>
              <label style={{ fontWeight: 600, color: '#222' }}>Prato Principal*:</label>
              <div style={{ position: 'relative' }}>
                <div
                  style={{
                    width: '100%',
                    padding: 2,
                    borderRadius: 8,
                    border: '1px solid #d0e6db',
                    background: '#fff',
                    color: '#222',
                    cursor: 'pointer',
                    minHeight: 38,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                  onClick={() => setOpenDropdown(openDropdown === 'principal' ? '' : 'principal')}
                  tabIndex={0}
                >
                  {principal ? (
                    <span style={{ color: '#27548A', fontWeight: 600 }}>{principal.name} <span style={{ color: '#888', fontWeight: 400, fontSize: 13 }}>({principal.tipoPrato})</span></span>
                  ) : (
                    <span style={{ color: '#888' }}>Selecione um prato principal...</span>
                  )}
                  {principal && (
                    <button type="button" onClick={e => { e.stopPropagation(); setPrincipal(null); }} style={{ background: 'none', border: 'none', color: '#e74c3c', fontWeight: 700, cursor: 'pointer', fontSize: 16, marginLeft: 8 }}>×</button>
                  )}
                  <span style={{ marginLeft: 8, color: '#888' }}>▼</span>
                </div>
                {openDropdown === 'principal' && (
                  <div style={{ position: 'absolute', left: 0, right: 0, top: 44, background: '#fff', border: '1px solid #d0e6db', borderRadius: 8, maxHeight: 220, overflowY: 'auto', zIndex: 10, padding: 8 }}>
                    {pratosExecutivos.length > 0 ? (
                      pratosExecutivos.map(p => (
                        <div key={p.id} style={{ padding: 8, cursor: 'pointer', color: '#222' }} onClick={() => { setPrincipal(p); setOpenDropdown(''); }}>
                          {p.name} <span style={{ color: '#888', fontWeight: 400, fontSize: 13 }}>({p.tipoPrato})</span>
                        </div>
                      ))
                    ) : (
                      <div style={{ padding: 8, color: '#888' }}>Nenhum prato executivo cadastrado.</div>
                    )}
                  </div>
                )}
              </div>
            </div>
            {/* Campo de seleção para Sobremesa */}
            <div ref={openDropdown === 'sobremesa' ? dropdownRef : null}>
              <label style={{ fontWeight: 600, color: '#222' }}>Sobremesa*:</label>
              <div style={{ position: 'relative' }}>
                <div
                  style={{
                    width: '100%',
                    padding: 2,
                    borderRadius: 8,
                    border: '1px solid #d0e6db',
                    background: '#fff',
                    color: '#222',
                    cursor: 'pointer',
                    minHeight: 38,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                  onClick={() => setOpenDropdown(openDropdown === 'sobremesa' ? '' : 'sobremesa')}
                  tabIndex={0}
                >
                  {sobremesa ? (
                    <span style={{ color: '#27548A', fontWeight: 600 }}>{sobremesa.name} <span style={{ color: '#888', fontWeight: 400, fontSize: 13 }}>({sobremesa.tipoPrato})</span></span>
                  ) : (
                    <span style={{ color: '#888' }}>Selecione uma sobremesa...</span>
                  )}
                  {sobremesa && (
                    <button type="button" onClick={e => { e.stopPropagation(); setSobremesa(null); }} style={{ background: 'none', border: 'none', color: '#e74c3c', fontWeight: 700, cursor: 'pointer', fontSize: 16, marginLeft: 8 }}>×</button>
                  )}
                  <span style={{ marginLeft: 8, color: '#888' }}>▼</span>
                </div>
                {openDropdown === 'sobremesa' && (
                  <div style={{ position: 'absolute', left: 0, right: 0, top: 44, background: '#fff', border: '1px solid #d0e6db', borderRadius: 8, maxHeight: 220, overflowY: 'auto', zIndex: 10, padding: 8 }}>
                    {pratosExecutivos.length > 0 ? (
                      pratosExecutivos.map(p => (
                        <div key={p.id} style={{ padding: 8, cursor: 'pointer', color: '#222' }} onClick={() => { setSobremesa(p); setOpenDropdown(''); }}>
                          {p.name} <span style={{ color: '#888', fontWeight: 400, fontSize: 13 }}>({p.tipoPrato})</span>
                        </div>
                      ))
                    ) : (
                      <div style={{ padding: 8, color: '#888' }}>Nenhum prato executivo cadastrado.</div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 16 }}>
              <input type="number" step="0.01" min="0" placeholder="Preço do Menu*" value={preco} onChange={e => setPreco(e.target.value)} style={{ flex: 1, minWidth: 100, padding: 10, borderRadius: 8, border: '1px solid #d0e6db', background: '#fff', color: '#222' }} />
              <input placeholder="URL da Imagem*" value={imagem} onChange={e => setImagem(e.target.value)} style={{ flex: 2, minWidth: 180, padding: 10, borderRadius: 8, border: '1px solid #d0e6db', background: '#fff', color: '#222' }} />
            </div>
            <div style={{ display: 'flex', gap: 18, marginTop: 8, width: '100%', justifyContent: 'center' }}>
              <button type="submit" style={{ background: '#27548A', color: '#fff', fontWeight: 700, fontSize: 16, border: 'none', borderRadius: 8, padding: '10px 32px', cursor: 'pointer' }}>{editId ? 'Salvar Alterações' : 'Salvar'}</button>
              <button type="button" onClick={() => { setShowForm(false); setNome(''); setData(''); setEntrada(null); setPrincipal(null); setSobremesa(null); setPreco(''); setImagem(''); setError(''); setOpenDropdown(''); setEditId(null); }} style={{ background: '#e74c3c', color: '#fff', fontWeight: 700, fontSize: 16, border: 'none', borderRadius: 8, padding: '10px 32px', cursor: 'pointer' }}>Cancelar</button>
            </div>
            {error && <div style={{ color: '#e74c3c', fontWeight: 600, marginTop: 8 }}>{error}</div>}
          </form>
        </div>
      )}
      {/* Tabela de Menus Executivos */}
      {executivoList.length > 0 && (
        <div style={{ width: '100%', maxWidth: 700, background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px #0001', padding: 24, marginBottom: 36 }}>
          <h3 style={{ color: '#27548A', fontWeight: 700, fontSize: 20, marginBottom: 12 }}>Menus Executivos Criados</h3>
          <div style={{ width: '100%', overflowX: 'auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr', background: '#e9f5ee', color: '#27548A', fontWeight: 700, borderRadius: 8, marginBottom: 8, minWidth: 500 }}>
              <div style={{ padding: 16, textAlign: 'left', borderBottom: '1px solid #d0e6db' }}>Nome</div>
              <div style={{ padding: 16, textAlign: 'left', borderBottom: '1px solid #d0e6db' }}>Data</div>
              <div style={{ padding: 16, textAlign: 'left', borderBottom: '1px solid #d0e6db' }}>Ações</div>
            </div>
            {executivoList.map(menu => (
              <div key={menu.id} style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr', alignItems: 'center', background: '#f7f7f7', minWidth: 500 }}>
                <div style={{ padding: 16, color: '#000', fontSize: 16, wordBreak: 'break-word', textAlign: 'left', borderBottom: '1px solid #d0e6db' }}>{menu.nome}</div>
                <div style={{ padding: 16, color: '#000', fontSize: 16, textAlign: 'left', borderBottom: '1px solid #d0e6db' }}>{menu.data}</div>
                <div style={{ padding: 16, display: 'flex', gap: 16, textAlign: 'left', borderBottom: '1px solid #d0e6db', alignItems: 'center' }}>
                  <button onClick={() => handleEditExecutivo(menu)} title="Editar" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}>
                    <svg width="22" height="22" fill="#27548A" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75l11.06-11.06-3.75-3.75L3 17.25zm17.71-10.04a1.003 1.003 0 0 0 0-1.42l-2.5-2.5a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
                  </button>
                  <button onClick={() => handleDeleteExecutivo(menu.id)} title="Excluir" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}>
                    <svg width="22" height="22" fill="#e74c3c" viewBox="0 0 24 24"><path d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zm3.46-7.12a1 1 0 0 1 1.41 0L12 12.59l1.12-1.12a1 1 0 1 1 1.41 1.41L13.41 14l1.12 1.12a1 1 0 0 1-1.41 1.41L12 15.41l-1.12 1.12a1 1 0 0 1-1.41-1.41L10.59 14l-1.12-1.12a1 1 0 0 1 0-1.41zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"/></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
