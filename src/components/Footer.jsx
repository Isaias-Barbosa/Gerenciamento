import React from 'react';

export default function Footer() {
  const [hovered, setHovered] = React.useState('');
  const menuItems = [
    { label: 'Quem Somos', href: '#' },
    { label: 'Destaques', href: '#' },
    { label: 'Trabalhe Conosco', href: '#' },
  ];
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  return (
    <footer style={{ background: '#fff', color: '#27548A', textAlign: 'center', padding: 0, marginTop: 47, margin: 0, borderRadius: '0 0 10px 10px', fontWeight: 600, fontSize: 16, boxShadow: '0 -2px 12px #0001' }}>
      <div style={{ borderBottom: '1px solid #e0e0e0', padding: isMobile ? '24px 0 12px 0' : '36px 0 18px 0', display: 'flex', flexDirection: isMobile ? 'column' : 'row', flexWrap: 'wrap', alignItems: isMobile ? 'flex-start' : 'center', justifyContent: isMobile ? 'center' : 'space-between', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ fontSize: 24, fontWeight: 800, color: '#27548A', letterSpacing: 1, marginBottom: isMobile ? 12 : 0, marginLeft: isMobile ? 0 : 16, textAlign: isMobile ? 'center' : 'left', width: isMobile ? '100%' : 'auto' }}>Sabor & Alma</div>
        <div style={{ display: 'flex', flexDirection: isMobile ? 'row' : '', justifyContent: 'center', alignItems: isMobile ? 'center' : 'center', gap: isMobile ? 16 : 0, flex: 1, fontSize: 15, fontWeight: 600, marginBottom: isMobile ? 12 : 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: isMobile ? 'flex-end' : 'center', minWidth: 170, padding: isMobile ? '0 10px' : '0' }}>
            <div style={{ fontWeight: 700, color: '#27548A', marginBottom: 2 }}>Horários: Asa Sul</div>
            <div>Seg-Sáb: 11:00 às 23:00</div>
            <div>Dom: 11:00 às 16:00</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: isMobile ? 'flex-start' : 'center', minWidth: 120, marginLeft: isMobile ? 16 : 0 }}>
            <div style={{ fontWeight: 700, color: '#27548A', marginBottom: 2 }}>Endereço</div>
            <div>Av. das Nações, 1234</div>
            <div>Asa Sul, Brasília - DF</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 18, margin: isMobile ? '12px auto 0 auto' : '0 16px 0 0', justifyContent: 'center' }}>
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
      <div style={{ borderBottom: '1px solid #e0e0e0', padding: '18px 0 18px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', maxWidth: 1200, margin: '0 auto' }}>
        <nav style={{ display: 'flex', gap: 32, fontSize: 18, fontWeight: 600, justifyContent: 'center' }}>
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
      </div>
      <div style={{ padding: 18, fontSize: 15, color: '#27548A99' }}>© {new Date().getFullYear()} Sabor & Alma. Todos os direitos reservados.</div>
    </footer>
  );
}
