import React from 'react';

export default function Footer() {
  const [hovered, setHovered] = React.useState('');
  const menuItems = [
    { label: 'Quem Somos', href: '#' },
    { label: 'Destaques', href: '#' },
    { label: 'Trabalhe Conosco', href: '#' },
  ];
  return (
    <footer style={{ background: '#fff', color: '#27548A', textAlign: 'center', padding: 0, marginTop: 47, margin: 0, borderRadius: '0 0 10px 10px', fontWeight: 600, fontSize: 16, boxShadow: '0 -2px 12px #0001' }}>
      <div style={{ borderBottom: '1px solid #e0e0e0', padding: '36px 0 18px 0', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ fontSize: 28, fontWeight: 800, color: '#27548A', letterSpacing: 1, marginLeft: 16 }}>Sabor & Alma</div>
        <nav style={{ display: 'flex', gap: 32, fontSize: 18, fontWeight: 600 }}>
          {menuItems.map((item, i) => (
            <a
              key={item.label}
              href={item.href}
              style={{
                color: hovered === item.label ? '#fff' : '#27548A',
                background: hovered === item.label ? '#27548A' : 'none',
                borderRadius: 8,
                padding: '6px 18px',
                textDecoration: 'none',
                transition: 'all 0.2s',
                fontWeight: 600,
              }}
              onMouseEnter={() => setHovered(item.label)}
              onMouseLeave={() => setHovered('')}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div style={{ display: 'flex', gap: 18, marginRight: 16 }}>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg" alt="Instagram" style={{ width: 28, height: 28, filter: 'invert(27%) sepia(54%) saturate(747%) hue-rotate(181deg) brightness(92%) contrast(92%)' }} />
          </a>
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/facebook.svg" alt="Facebook" style={{ width: 28, height: 28, filter: 'invert(27%) sepia(54%) saturate(747%) hue-rotate(181deg) brightness(92%) contrast(92%)' }} />
          </a>
          <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/whatsapp.svg" alt="WhatsApp" style={{ width: 28, height: 28, filter: 'invert(27%) sepia(54%) saturate(747%) hue-rotate(181deg) brightness(92%) contrast(92%)' }} />
          </a>
        </div>
      </div>
      <div style={{ padding: 18, fontSize: 15, color: '#27548A99' }}>© {new Date().getFullYear()} Restaurante Gourmet. Todos os direitos reservados.</div>
    </footer>
  );
}
