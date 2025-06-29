import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

export default function MenuExecutivo() {
  const [menu, setMenu] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [reservaFeita, setReservaFeita] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/menuExecutivo')
      .then(res => res.json())
      .then(data => {
        setMenu(data && data.length > 0 ? data[0] : null);
      });
  }, []);

  if (!menu) {
    return (
      <div style={{ minHeight: '100vh', background: '#18181b', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h2 style={{ marginTop: 80 }}>Menu Executivo não encontrado.</h2>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#18181b', color: '#fff', fontFamily: 'Cormorant Garamond, serif', display: 'flex', flexDirection: 'column' }}>
      {/* Imagem do menu executivo */}
      <div style={{ width: '100%', maxHeight: 420, overflow: 'hidden', marginBottom: 0 }}>
        <img src={menu.imagem} alt={menu.nome} style={{ width: '100%', height: 420, objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
      </div>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 16px 0 16px', position: 'relative', flex: 1 }}>
        <h1 style={{ fontSize: 54, fontWeight: 900, letterSpacing: 2, marginBottom: 18, textShadow: '0 4px 32px #000b', fontFamily: 'Cormorant Garamond, serif', textAlign: 'center' }}>{menu.nome}</h1>
        <div style={{ margin: '32px 0 40px 0', fontSize: 22, color: '#e0e0e0', textAlign: 'center', maxWidth: 700, marginLeft: 'auto', marginRight: 'auto' }}>
          Uma experiência executiva completa para o seu almoço! Aproveite uma seleção especial de pratos, preparados com ingredientes frescos e o toque do nosso chef. Reserve já e surpreenda-se!
        </div>
        {/* Cards das etapas */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32, marginBottom: 40 }}>
          <div>
            <h2 style={{ fontSize: 32, color: '#27548A', fontWeight: 800, marginBottom: 12 }}>Entrada</h2>
            <div style={{ background: '#fff', color: '#222', borderRadius: 16, boxShadow: '0 2px 16px #0001', padding: 24, display: 'flex', alignItems: 'center', gap: 24, minHeight: 120 }}>
              <img src={menu.entrada?.image} alt={menu.entrada?.name} style={{ width: 100, height: 80, objectFit: 'cover', borderRadius: 10, boxShadow: '0 2px 8px #0002' }} />
              <div>
                <div style={{ fontSize: 22, fontWeight: 700 }}>{menu.entrada?.name}</div>
                <div style={{ fontSize: 16, color: '#555', marginTop: 4 }}>{menu.entrada?.description || 'Uma deliciosa entrada para abrir o apetite.'}</div>
              </div>
            </div>
          </div>
          <div>
            <h2 style={{ fontSize: 32, color: '#27548A', fontWeight: 800, marginBottom: 12 }}>Prato Principal</h2>
            <div style={{ background: '#fff', color: '#222', borderRadius: 16, boxShadow: '0 2px 16px #0001', padding: 24, display: 'flex', alignItems: 'center', gap: 24, minHeight: 120 }}>
              <img src={menu.principal?.image} alt={menu.principal?.name} style={{ width: 100, height: 80, objectFit: 'cover', borderRadius: 10, boxShadow: '0 2px 8px #0002' }} />
              <div>
                <div style={{ fontSize: 22, fontWeight: 700 }}>{menu.principal?.name}</div>
                <div style={{ fontSize: 16, color: '#555', marginTop: 4 }}>{menu.principal?.description || 'O prato principal do dia, preparado com excelência.'}</div>
              </div>
            </div>
          </div>
          <div>
            <h2 style={{ fontSize: 32, color: '#27548A', fontWeight: 800, marginBottom: 12 }}>Sobremesa</h2>
            <div style={{ background: '#fff', color: '#222', borderRadius: 16, boxShadow: '0 2px 16px #0001', padding: 24, display: 'flex', alignItems: 'center', gap: 24, minHeight: 120 }}>
              <img src={menu.sobremesa?.image} alt={menu.sobremesa?.name} style={{ width: 100, height: 80, objectFit: 'cover', borderRadius: 10, boxShadow: '0 2px 8px #0002' }} />
              <div>
                <div style={{ fontSize: 22, fontWeight: 700 }}>{menu.sobremesa?.name}</div>
                <div style={{ fontSize: 16, color: '#555', marginTop: 4 }}>{menu.sobremesa?.description || 'Uma sobremesa especial para fechar com chave de ouro.'}</div>
              </div>
            </div>
          </div>
        </div>
        {/* Preço e botão de reserva */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 24, marginBottom: 32 }}>
          <button
            style={{ fontSize: 22, fontWeight: 700, background: 'linear-gradient(90deg,#2d7a46 60%,#27548A 100%)', color: '#fff', border: 'none', borderRadius: 32, padding: '18px 48px', cursor: 'pointer', boxShadow: '0 2px 16px #0006', letterSpacing: 1, transition: 'background 0.2s', marginBottom: 18 }}
            onClick={() => { setShowModal(true); setReservaFeita(false); }}
          >
            Desejo fazer a Reserva
          </button>
          <div style={{ background: '#27548A', color: '#fff', borderRadius: 16, padding: '16px 32px', fontSize: 28, fontWeight: 800, boxShadow: '0 2px 16px #0004', marginBottom: 0 }}>
            R$ {menu.preco}
          </div>
        </div>
        {/* Modal de reserva */}
        {showModal && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(24,24,27,0.85)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ background: '#fff', color: '#222', borderRadius: 24, padding: 40, minWidth: 340, maxWidth: 400, boxShadow: '0 8px 32px #000a', textAlign: 'center', position: 'relative' }}>
              <button onClick={() => setShowModal(false)} style={{ position: 'absolute', top: 18, right: 18, background: 'none', border: 'none', fontSize: 28, color: '#888', cursor: 'pointer', fontWeight: 700 }} aria-label="Fechar">×</button>
              {!reservaFeita ? (
                <>
                  <h2 style={{ fontSize: 32, color: '#27548A', fontWeight: 900, marginBottom: 18 }}>Confirmar Reserva</h2>
                  <p style={{ fontSize: 20, marginBottom: 28 }}>Deseja reservar o Menu Executivo <b>{menu.nome}</b> por <b>R$ {menu.preco}</b>?</p>
                  <button
                    style={{ fontSize: 20, fontWeight: 700, background: 'linear-gradient(90deg,#2d7a46 60%,#27548A 100%)', color: '#fff', border: 'none', borderRadius: 24, padding: '14px 36px', cursor: 'pointer', boxShadow: '0 2px 12px #0004', letterSpacing: 1, marginTop: 8, transition: 'background 0.2s' }}
                    onClick={() => { setReservaFeita(true); setTimeout(() => { setShowModal(false); }, 1800); }}
                  >
                    Confirmar Reserva
                  </button>
                </>
              ) : (
                <div style={{ padding: '32px 0 12px 0' }}>
                  <div style={{ fontSize: 26, color: '#2d7a46', fontWeight: 800, marginBottom: 12 }}>Reserva realizada com sucesso!</div>
                  <div style={{ fontSize: 18, color: '#27548A', marginBottom: 0 }}>Aguardamos sua visita!</div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
