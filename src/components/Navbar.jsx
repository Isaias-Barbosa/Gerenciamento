import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Navbar({ user, onLogin, onLogout, meals = [] }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdmin = user && user.emails && user.emails[0]?.value === 'isaiasbarbosa111@gmail.com';
  const linkStyle = base => ({
    cursor: 'pointer',
    color: base ? '#FF7F3E' : '#003285',
    position: 'relative',
    transition: 'color 0.2s',
    padding: '4px 8px',
    borderRadius: 6,
  });
  const [hovered, setHovered] = React.useState('');
  const [search, setSearch] = React.useState("");
  const [showResults, setShowResults] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const filteredMeals = search.length > 1 ? meals.filter(m =>
    m.name?.toLowerCase().includes(search.toLowerCase()) ||
    m.categoria?.toLowerCase().includes(search.toLowerCase()) ||
    m.tipoPrato?.toLowerCase().includes(search.toLowerCase())
  ) : [];

  // Responsividade: detecta se é mobile
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768);
  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fecha menu ao navegar
  React.useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  return (
    <nav style={{
      width: '100%',
      background: '#fff',
      color: '#133E87',
      boxShadow: '0 2px 12px #0001',
      padding: 0,
      height: 110,
      display: 'flex',
      alignItems: 'center',

      // Corrige alinhamento: centraliza tudo no desktop, só separa no mobile
      justifyContent: isMobile ? 'space-between' : 'space-around',
      position: 'relative',
      top: 0,
      left: 0,
      zIndex: 100,
      fontWeight: 700
    }}>
      {isMobile ? (
        <>
          {/* Menu hamburguer */}
          <button aria-label="Abrir menu" onClick={() => setMenuOpen(v => !v)} style={{ background: 'none', border: 'none', marginLeft: 12, marginRight: 8, cursor: 'pointer', padding: 8, display: 'flex', alignItems: 'center' }}>
            <svg width="32" height="32" viewBox="0 0 32 32"><rect y="7" width="32" height="3" rx="1.5" fill="#133E87"/><rect y="15" width="32" height="3" rx="1.5" fill="#133E87"/><rect y="23" width="32" height="3" rx="1.5" fill="#133E87"/></svg>
          </button>
          {/* Campo de busca ocupa todo o espaço */}
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <form onSubmit={e => { e.preventDefault(); if (search.length > 1) { navigate(`/search/${encodeURIComponent(search)}`); setShowResults(false); setSearch(''); } }} style={{ position: 'relative', width: '100%', maxWidth: 220 }}>
              <input
                type="text"
                value={search}
                onChange={e => { setSearch(e.target.value); setShowResults(true); }}
                placeholder="Pesquisar..."
                style={{
                  padding: '8px 38px 8px 12px',
                  borderRadius: 20,
                  border: '1.5px solid #e0e0e0',
                  fontSize: 16,
                  outline: 'none',
                  width: '100%',
                  maxWidth: 180,
                  background: '#f7fafc',
                  color: '#27548A',
                  fontWeight: 600,
                  boxShadow: '0 2px 8px #0001',
                  transition: 'border 0.2s, box-shadow 0.2s',
                }}
                onFocus={e => { e.target.style.border = '1.5px solid #27548A'; setShowResults(true); }}
                onBlur={e => setTimeout(() => setShowResults(false), 200)}
              />
              <button type="submit" style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                <svg width="20" height="20" fill="none" stroke="#27548A99" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </button>
            </form>
            {/* Resultados de busca (mobile) */}
            {showResults && filteredMeals.length > 0 && (
              <div style={{
                position: 'absolute',
                top: 56,
                right: 8,
                width: 220,
                background: '#fff',
                border: '1.5px solid #e0e0e0',
                borderRadius: 14,
                boxShadow: '0 4px 24px #0002',
                zIndex: 999,
                maxHeight: 220,
                overflowY: 'auto',
                padding: '8px 0',
              }}>
                {filteredMeals.map(meal => (
                  <div
                    key={meal.id}
                    style={{
                      padding: '10px 16px',
                      borderBottom: '1px solid #f1f1f1',
                      cursor: 'pointer',
                      fontWeight: 600,
                      color: '#27548A',
                      fontSize: 15,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      transition: 'background 0.18s',
                    }}
                    onClick={() => { setShowResults(false); setSearch(''); navigate(`/meals/${meal.id}`); }}
                    onMouseOver={e => e.currentTarget.style.background = '#eaf2fa'}
                    onMouseOut={e => e.currentTarget.style.background = '#fff'}
                  >
                    <img src={meal.image || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80'} alt={meal.name} style={{ width: 28, height: 28, objectFit: 'cover', borderRadius: 6, boxShadow: '0 2px 8px #0001' }} />
                    <span>{meal.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Menu lateral mobile */}
          {menuOpen && (
            <div style={{ position: 'fixed', top: 0, left: 0, width: 220, height: '100vh', background: '#fff', boxShadow: '2px 0 16px #0002', zIndex: 2000, display: 'flex', flexDirection: 'column', padding: '24px 0' }}>
              <button aria-label="Fechar menu" onClick={() => setMenuOpen(false)} style={{ alignSelf: 'flex-end', marginRight: 12, background: 'none', border: 'none', fontSize: 28, color: '#133E87', cursor: 'pointer' }}>&times;</button>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#001A6E', letterSpacing: 1, cursor: 'pointer', margin: '0 0 18px 18px', textAlign: 'left' }} onClick={() => { navigate('/'); setMenuOpen(false); }}>Sabor & Alma</div>
              <span style={{ ...linkStyle(location.pathname === '/'), margin: '18px 0 0 18px' }} onClick={() => { navigate('/'); setMenuOpen(false); }}>Home</span>
              <span style={{ ...linkStyle(location.pathname.startsWith('/meals')), margin: '18px 0 0 18px' }} onClick={() => { navigate('/meals'); setMenuOpen(false); }}>Cardápio</span>
              <span style={{ ...linkStyle(location.pathname.startsWith('/eventos')), margin: '18px 0 0 18px' }} onClick={() => { navigate('/eventos'); setMenuOpen(false); }}>Eventos</span>
              <span style={{ ...linkStyle(location.pathname === '/reserva'), margin: '18px 0 0 18px' }} onClick={() => { navigate('/reserva'); setMenuOpen(false); }}>Reserva</span>
              <span style={{ ...linkStyle(location.pathname === '/contato'), margin: '18px 0 0 18px' }} onClick={() => { navigate('/contato'); setMenuOpen(false); }}>Contato</span>
              <span style={{ ...linkStyle(location.pathname === '/delivery'), margin: '18px 0 0 18px' }} onClick={() => { window.open('https://wa.me/5561996242678?text=Olá! Gostaria de pedir um delivery do restaurante Sabor & Alma.', '_blank'); setMenuOpen(false); }}>Delivery</span>
              {user ? (
                <span style={{ ...linkStyle(false), color: '#e74c3c', margin: '18px 0 0 18px' }} onClick={() => { onLogout(); setMenuOpen(false); }}>Sair</span>
              ) : (
                <span style={{ ...linkStyle(false), color: '#27548A', margin: '18px 0 0 18px' }} onClick={() => { onLogin(); setMenuOpen(false); }}>Login</span>
              )}
            </div>
          )}
        </>
      ) : (
        // Desktop: layout antigo
        <>
          <div style={{ fontSize: 28, fontWeight: 800, color: '#001A6E', letterSpacing: 1, cursor: 'pointer', marginLeft: 24 }} onClick={() => navigate('/')}>Sabor & Alma</div>
          <div style={{ display: 'flex', gap: 32, alignItems: 'center', fontSize: 18}}>
            <span
              style={{ ...linkStyle(location.pathname === '/'), background: hovered === 'home' ? '#eaf2fa' : 'none' }}
              onMouseEnter={() => setHovered('home')}
              onMouseLeave={() => setHovered('')}
              onClick={() => navigate('/')}
            >Home</span>
            <span
              style={{ ...linkStyle(location.pathname.startsWith('/meals')), background: hovered === 'meals' ? '#eaf2fa' : 'none' }}
              onMouseEnter={() => setHovered('meals')}
              onMouseLeave={() => setHovered('')}
              onClick={() => navigate('/meals')}
            >Cardápio</span>
            <span
              style={{ ...linkStyle(location.pathname.startsWith('/eventos')), background: hovered === 'eventos' ? '#eaf2fa' : 'none' }}
              onMouseEnter={() => setHovered('eventos')}
              onMouseLeave={() => setHovered('')}
              onClick={() => navigate('/eventos')}
            >Eventos</span>
            <span
              style={{ ...linkStyle(location.pathname === '/reserva'), background: hovered === 'reserva' ? '#eaf2fa' : 'none' }}
              onMouseEnter={() => setHovered('reserva')}
              onMouseLeave={() => setHovered('')}
              onClick={() => navigate('/reserva')}
            >Reserva</span>
            <span
              style={{ ...linkStyle(location.pathname === '/contato'), background: hovered === 'contato' ? '#eaf2fa' : 'none' }}
              onMouseEnter={() => setHovered('contato')}
              onMouseLeave={() => setHovered('')}
              onClick={() => navigate('/contato')}
            >Contato</span>
            <span
              style={{ ...linkStyle(location.pathname === '/delivery'), background: hovered === 'delivery' ? '#eaf2fa' : 'none' }}
              onMouseEnter={() => setHovered('delivery')}
              onMouseLeave={() => setHovered('')}
              onClick={() => window.open('https://wa.me/5561996242678?text=Olá! Gostaria de pedir um delivery do restaurante Sabor & Alma.', '_blank')}
            >Delivery</span>
            <div style={{ position: 'relative', marginLeft: 18, marginRight: 8 }}>
              <form onSubmit={e => { e.preventDefault(); if (search.length > 1) { navigate(`/search/${encodeURIComponent(search)}`); setShowResults(false); setSearch(''); } }} style={{ display: 'inline', width: '100%', position: 'relative' }}>
                <input
                  type="text"
                  value={search}
                  onChange={e => { setSearch(e.target.value); setShowResults(true); }}
                  placeholder="Pesquisar..."
                  style={{
                    padding: '10px 48px 10px 18px',
                    borderRadius: 24,
                    border: '2px solid #e0e0e0',
                    fontSize: 18,
                    outline: 'none',
                    width: 220,
                    background: '#f7fafc',
                    color: '#27548A',
                    fontWeight: 600,
                    boxShadow: '0 2px 8px #0001',
                    transition: 'border 0.2s, box-shadow 0.2s',
                  }}
                  onFocus={e => { e.target.style.border = '2px solid #27548A'; setShowResults(true); }}
                  onBlur={e => setTimeout(() => setShowResults(false), 200)}
                />
                <button type="submit" style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                  <svg width="22" height="22" fill="none" stroke="#27548A99" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                </button>
              </form>
              {showResults && filteredMeals.length > 0 && (
                <div style={{
                  position: 'absolute',
                  top: 48,
                  left: 0,
                  width: 320,
                  background: '#fff',
                  border: '1.5px solid #e0e0e0',
                  borderRadius: 16,
                  boxShadow: '0 4px 24px #0002',
                  zIndex: 999,
                  maxHeight: 340,
                  overflowY: 'auto',
                  padding: '8px 0',
                }}>
                  {filteredMeals.map(meal => (
                    <div
                      key={meal.id}
                      style={{
                        padding: '12px 22px',
                        borderBottom: '1px solid #f1f1f1',
                        cursor: 'pointer',
                        fontWeight: 600,
                        color: '#27548A',
                        fontSize: 17,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        transition: 'background 0.18s',
                      }}
                      onClick={() => { setShowResults(false); setSearch(''); navigate(`/meals/${meal.id}`); }}
                      onMouseOver={e => e.currentTarget.style.background = '#eaf2fa'}
                      onMouseOut={e => e.currentTarget.style.background = '#fff'}
                    >
                      <img src={meal.image || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80'} alt={meal.name} style={{ width: 38, height: 38, objectFit: 'cover', borderRadius: 8, boxShadow: '0 2px 8px #0001' }} />
                      <span>{meal.name}</span>
                      <span style={{ fontSize: 13, color: '#309898', fontWeight: 700, marginLeft: 6 }}>{meal.categoria}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {user ? (
              <span
                style={{ cursor: 'pointer', color: hovered === 'sair' ? '#fff' : '#e74c3c', background: hovered === 'sair' ? '#e74c3c' : 'none', fontWeight: 600, borderRadius: 6, padding: '4px 16px', transition: 'all 0.2s' }}
                onClick={onLogout}
                onMouseEnter={() => setHovered('sair')}
                onMouseLeave={() => setHovered('')}
              >Sair</span>
            ) : (
              <span
                style={{ cursor: 'pointer', color: hovered === 'login' ? '#fff' : '#27548A', fontWeight: 600, background: hovered === 'login' ? '#27548A' : 'none', borderRadius: 6, padding: '4px 16px', transition: 'all 0.2s' }}
                onClick={onLogin}
                onMouseEnter={() => setHovered('login')}
                onMouseLeave={() => setHovered('')}
              >Login</span>
            )}
          </div>
        </>
      )}
    </nav>
  );
}
