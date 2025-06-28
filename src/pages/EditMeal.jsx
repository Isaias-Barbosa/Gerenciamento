import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditMeal({ meals, onEdit }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const meal = meals.find(m => m.id === id);
  const [form, setForm] = useState({
    name: '',
    description: '',
    date: '',
    ingredients: '',
    price: '',
    image: '',
    isMenuOfDay: false,
    categoria: '',
    tipoPrato: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (meal) {
      setForm({
        name: meal.name || '',
        description: meal.description || '',
        date: meal.date || '',
        ingredients: (meal.ingredients || []).join(', '),
        price: meal.price || '',
        image: meal.image || '',
        isMenuOfDay: !!meal.isMenuOfDay,
        categoria: meal.categoria || '',
        tipoPrato: meal.tipoPrato || ''
      });
    }
  }, [meal]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setTimeout(() => {
      onEdit({
        ...meal,
        ...form,
        ingredients: form.ingredients.split(',').map(i => i.trim()).filter(i => i),
        isMenuOfDay: form.isMenuOfDay,
        categoria: form.categoria,
        tipoPrato: form.tipoPrato
      });
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate('/dashboard/admin');
      }, 1200);
    }, 1200);
  };

  if (!meal) return <div style={{ textAlign: 'center', margin: 40, color: '#e74c3c' }}>Prato não encontrado.</div>;

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px #0001', padding: 32, position: 'relative' }}>
      <h2 style={{ color: '#2d7a46', marginBottom: 24 }}>Editar Prato</h2>
      {loading && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(255,255,255,0.85)', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: 12 }}>
          <div className="loader" style={{ border: '4px solid #e0e0e0', borderTop: '4px solid #2d7a46', borderRadius: '50%', width: 48, height: 48, animation: 'spin 1s linear infinite', marginBottom: 18 }} />
          <div style={{ color: '#2d7a46', fontWeight: 700, fontSize: 20 }}>Salvando alterações...</div>
        </div>
      )}
      {success && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(255,255,255,0.92)', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: 12 }}>
          <div style={{ color: '#2d7a46', fontWeight: 800, fontSize: 22, marginBottom: 8 }}>Editado com sucesso!</div>
        </div>
      )}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <label style={{ color: '#222', fontWeight: 500, marginBottom: 2 }}>
          Nome do prato
          <input name="name" value={form.name} onChange={handleChange} placeholder="Nome do prato" style={{ display: 'block', width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', marginTop: 4, background: '#fff', color: '#222' }} />
        </label>
        <label style={{ color: '#222', fontWeight: 500, marginBottom: 2 }}>
          Preço (R$)
          <input name="price" value={form.price} onChange={handleChange} placeholder="Preço (R$)" type="number" min="0" step="0.01" style={{ display: 'block', width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', marginTop: 4, background: '#fff', color: '#222' }} />
        </label>
        <label style={{ color: '#222', fontWeight: 500, marginBottom: 2 }}>
          Data
          <input name="date" value={form.date} onChange={handleChange} type="date" style={{ display: 'block', width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', marginTop: 4, background: '#fff', color: '#222' }} />
        </label>
        <label style={{ color: '#222', fontWeight: 500, marginBottom: 2 }}>
          Ingredientes (separe por vírgula)
          <input name="ingredients" value={form.ingredients} onChange={handleChange} placeholder="Ingredientes (separe por vírgula)" style={{ display: 'block', width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', marginTop: 4, background: '#fff', color: '#222' }} />
        </label>
        <label style={{ color: '#222', fontWeight: 500, marginBottom: 2 }}>
          URL da imagem
          <input name="image" value={form.image} onChange={handleChange} placeholder="URL da imagem" style={{ display: 'block', width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', marginTop: 4, background: '#fff', color: '#222' }} />
        </label>
        <label style={{ color: '#222', fontWeight: 500, marginBottom: 2 }}>
          Descrição
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Descrição" style={{ display: 'block', width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', minHeight: 80, marginTop: 4, background: '#fff', color: '#222' }} />
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#222', fontWeight: 500, marginBottom: 2 }}>
          <input type="checkbox" name="isMenuOfDay" checked={form.isMenuOfDay} onChange={handleChange} />
          Prato do Dia
        </label>
        <label style={{ color: '#222', fontWeight: 500, marginBottom: 2 }}>
          Categoria
          <select name="categoria" value={form.categoria} onChange={handleChange} style={{ display: 'block', width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', marginTop: 4, background: '#fff', color: '#222' }}>
            <option value="">Selecione a categoria</option>
            <option value="Aperitivos">Aperitivos</option>
            <option value="Carnes">Carnes</option>
            <option value="Massas">Massas</option>
            <option value="Frangos e Peixes">Frangos e Peixes</option>
            <option value="Saladas">Saladas</option>
            <option value="Acompanhamentos">Acompanhamentos</option>
            <option value="Bebidas">Bebidas</option>
          </select>
        </label>
        <label style={{ color: '#222', fontWeight: 500, marginBottom: 2 }}>
          Tipo de prato
          <select name="tipoPrato" value={form.tipoPrato} onChange={handleChange} style={{ display: 'block', width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', marginTop: 4, background: '#fff', color: '#222' }}>
            <option value="">Tipo de prato</option>
            <option value="Entrada">Entrada</option>
            <option value="Prato Principal">Prato Principal</option>
            <option value="Sobremesa">Sobremesa</option>
          </select>
        </label>
        <button type="submit" style={{ background: '#2d7a46', color: '#fff', border: 'none', borderRadius: 6, padding: '10px 24px', fontWeight: 600, cursor: 'pointer', marginTop: 12 }}>Salvar Alterações</button>
      </form>
    </div>
  );
}
