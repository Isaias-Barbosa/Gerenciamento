import React, { useEffect } from 'react';
import Carousel from '../components/Carousel';
import CommentsCarousel from '../components/CommentsCarousel';
import Footer from '../components/Footer';
import HorizontalAutoCarousel from '../components/HorizontalAutoCarousel';
import { useNavigate } from 'react-router-dom';
import MenuExecutivoBanner from '../pages/MenuExecutivoBanner';

const comments = [
  { name: 'Ana Paula', text: 'Comida deliciosa e atendimento excelente!', photo: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { name: 'Carlos Silva', text: 'O melhor restaurante da cidade!', photo: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { name: 'Juliana Souza', text: 'Ambiente aconchegante e pratos incríveis.', photo: 'https://randomuser.me/api/portraits/women/68.jpg' },
  { name: 'Fernanda Lima', text: 'Os pratos surpreendem a cada visita. Recomendo muito!', photo: 'https://randomuser.me/api/portraits/women/65.jpg' },
  { name: 'Ricardo Alves', text: 'Atendimento impecável e ambiente sofisticado.', photo: 'https://randomuser.me/api/portraits/men/45.jpg' },
  { name: 'Patrícia Gomes', text: 'A sobremesa é simplesmente maravilhosa!', photo: 'https://randomuser.me/api/portraits/women/12.jpg' },
  { name: 'Eduardo Tavares', text: 'Melhor experiência gastronômica da região.', photo: 'https://randomuser.me/api/portraits/men/23.jpg' },
  { name: 'Marina Rocha', text: 'Cardápio variado e ingredientes frescos.', photo: 'https://randomuser.me/api/portraits/women/33.jpg' },
  { name: 'João Pedro', text: 'Voltarei com certeza! Tudo perfeito.', photo: 'https://randomuser.me/api/portraits/men/56.jpg' },
  { name: 'Sofia Martins', text: 'O chef está de parabéns, pratos autorais incríveis.', photo: 'https://randomuser.me/api/portraits/women/77.jpg' },
  { name: 'Lucas Ferreira', text: 'Ambiente familiar e pratos deliciosos.', photo: 'https://randomuser.me/api/portraits/men/41.jpg' },
  { name: 'Beatriz Ramos', text: 'Experiência inesquecível, recomendo!', photo: 'https://randomuser.me/api/portraits/women/25.jpg' },
  { name: 'Gabriel Costa', text: 'Atendimento rápido e cordial.', photo: 'https://randomuser.me/api/portraits/men/36.jpg' },
  { name: 'Larissa Dias', text: 'Pratos bem servidos e saborosos.', photo: 'https://randomuser.me/api/portraits/women/50.jpg' },
  { name: 'Felipe Souza', text: 'Voltarei para experimentar outros pratos.', photo: 'https://randomuser.me/api/portraits/men/60.jpg' },
];

export default function Home({ meals, propagandaIds }) {
  useEffect(() => {
    document.title = 'Sabor & Alma - Restaurante Gourmet';
  }, []);
  const navigate = useNavigate();

  // Pratos de propaganda (carousel)
  let propagandaIdsLocal = [];
  try {
    propagandaIdsLocal = JSON.parse(localStorage.getItem('propagandaIds')) || [];
  } catch {}
  const propagandaMeals = meals.filter(m => propagandaIdsLocal.includes(m.id));
  const propagandaImages = propagandaMeals.length > 0
    ? propagandaMeals.map(m => ({ url: m.image, alt: m.name, caption: m.name }))
    : [
      { url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80', alt: 'Prato 1', caption: 'Experimente o melhor da culinária!' },
      { url: 'https://images.unsplash.com/photo-1516685018646-5499d0a7d42f?auto=format&fit=crop&w=800&q=80', alt: 'Prato 2', caption: 'Sabor e qualidade todos os dias.' },
      { url: 'https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=800&q=80', alt: 'Prato 3', caption: 'Menu variado para todos os gostos.' },
    ];

  // Hero/banner
  const heroImage = 'https://static.wixstatic.com/media/f2ddd6_15bcb0dd060543a38b8b70c5b66291e7~mv2.jpg'; // Imagem chamativa de restaurante por dentro

  // Prato em Destaque
  const pratoDestaque = meals.find(m => m.isDestaque);

  return (
    <div style={{ minHeight: '100vh', fontFamily: 'Cormorant Garamond, serif', background: '#18181b', overflowX: 'hidden' }}>
      {/* Hero Section */}
      <div style={{ width: '100vw', maxWidth: '100vw', height: 750, background: `url(${heroImage}) center no-repeat`, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 32px #0008', margin: '0 auto', paddingTop: 0 }}>
        <div style={{ background: 'rgba(24,24,27,0.65)', borderRadius: 0, padding: '60px 0', textAlign: 'center', width: '100%' }}>
          <h1 style={{ color: '#fff', fontSize: 90, fontWeight: 900, letterSpacing: 6, marginBottom: 18, fontFamily: 'Cormorant Garamond, serif', textTransform: 'uppercase', textShadow: '0 4px 32px #000b' }}>Sabor & Alma</h1>
          <p style={{ color: '#e0e0e0', fontSize: 32, fontWeight: 400, marginBottom: 0, fontFamily: 'Cormorant Garamond, serif', textShadow: '0 2px 8px #000a' }}>Cozinha de Alma, Tradição e Paixão</p>
        </div>
      </div>

      {/* Prato em Destaque */}
      {pratoDestaque && (
        <section style={{ width: '100%', maxWidth: '100vw', margin: '2vh 0 0 0', padding: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width:'100%', padding:'24px 0', marginBottom:32}}>
            <h1 style={{color: '#fff', textAlign: 'center', fontFamily: 'Cormorant Garamond, serif', fontSize: 48, letterSpacing: 2, textShadow: '0 2px 12px #000a', margin:0}}>
              Você conhece o nosso {pratoDestaque.name}?
            </h1>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', background: 'rgba(0,0,0,0.85)', borderRadius: 24, boxShadow: '0 30px 32px #0004', alignItems: 'center', overflow: 'hidden', minHeight: 320, maxWidth: 1100, margin: '0 auto 32px auto', flexDirection: window.innerWidth <= 768 ? 'column' : 'row' }}>
            <div style={{ flex: 1, minWidth: window.innerWidth <= 768 ? 220 : 500, maxWidth: window.innerWidth <= 768 ? 320 : 420, display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(0,0,0,0.15)', height: '100%' }}>
              <img src={pratoDestaque.image} alt={pratoDestaque.name} style={{ width: window.innerWidth <= 768 ? 220 : 450, height: window.innerWidth <= 768 ? 160 : 360, objectFit: 'cover', borderRadius: '24px', boxShadow: '0 2px 16px #0006', margin: 32 }} />
            </div>
            <div style={{ flex: 2, minWidth: 220, padding: window.innerWidth <= 768 ? '24px 10px' : '40px 25px', color: '#fff', fontSize: window.innerWidth <= 768 ? 18 : 24, fontWeight: 500, letterSpacing: 1, textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ marginBottom: 32, fontSize: window.innerWidth <= 768 ? 16 : 22, color: '#e0e0e0', fontWeight: 400, lineHeight: 1.5 }}>{pratoDestaque.description || 'Experimente o melhor da nossa culinária!'}</div>
              <button onClick={() => navigate(`/meals/${pratoDestaque.id}`)} style={{ fontSize: window.innerWidth <= 768 ? 16 : 22, fontWeight: 700, background: 'linear-gradient(90deg,#2d7a46 60%,#27548A 100%)', color: '#fff', border: 'none', borderRadius: 32, padding: window.innerWidth <= 768 ? '12px 24px' : '18px 48px', cursor: 'pointer', boxShadow: '0 2px 16px #0006', letterSpacing: 1, marginTop: 8, alignSelf: 'center', transition: 'background 0.2s' }}>
                Saber Mais
              </button>
            </div>
          </div>
        </section>
      )}


      {/* Cardápio - carrossel horizontal só de imagens */}
      <section style={{ maxWidth: 1200, margin: '20px auto 0 auto', padding: '0 10px'}}>
        <div style={{ width:'100%', padding:'24px 0', marginBottom:32}}>
          <h2 style={{ color: '#fff', fontSize: 48, fontWeight: 700, letterSpacing: 1, textAlign: 'center', margin:0 }}>Veja o nosso Cardápio</h2>
        </div>
        <HorizontalAutoCarousel
          items={meals}
          itemWidth={320}
          itemGap={48}
          visible={4}
          interval={4000}
          onItemClick={meal => navigate(`/api/meals/${meal.id}` )}
          
        />
      </section>

      {/* Comentários */}
      <section style={{ maxWidth: 1100, margin: '60px auto', padding: '0 16px' }}>
        <div style={{ width:'100%', padding:'24px 0', marginBottom:28}}>
          <h2 style={{ color: '#fff', fontSize: 48, fontWeight: 700, textAlign: 'center', margin:0 }}>Comentários de Clientes</h2>
        </div>
        <CommentsCarousel comments={comments} cardsPerView={window.innerWidth <= 768 ? 1 : 4} />
      </section>
      {/* Section: Já provou o nosso Menu Executivo? */}
      <section style={{ width: '100vw', position: 'relative', left: '50%', right: '50%', marginLeft: '-50vw', marginRight: '-50vw', marginTop: 60, marginBottom: 0, padding: 0, minHeight: 420, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(90deg,rgba(24,24,27,0.82) 0%,rgba(24,24,27,0.45) 60%,rgba(24,24,27,0.82) 100%)' }}></div>
        {/* Imagem do menu executivo do backend */}
        <MenuExecutivoBanner />
        <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 1100, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', color: '#fff', padding: '48px 16px' }}>
          <h2 style={{ fontSize: 54, fontWeight: 900, letterSpacing: 2, marginBottom: 18, textShadow: '0 4px 32px #000b', fontFamily: 'Cormorant Garamond, serif', maxWidth: window.innerWidth <= 768 ? 320 : 1000, whiteSpace: 'pre-line', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            Já provou o nosso Menu Executivo?
          </h2>
          <p style={{ fontSize: window.innerWidth <= 768 ? 16 : 26, fontWeight: 500, maxWidth: window.innerWidth <= 768 ? 320 : 700, margin: '0 auto 32px auto', textShadow: '0 2px 12px #000a', lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: window.innerWidth <= 768 ? 3 : 'unset', WebkitBoxOrient: 'vertical' }}>
            Descubra uma experiência gastronômica única com pratos selecionados especialmente para o seu almoço executivo. Todo dia um prato diferente, preparado com ingredientes frescos e o toque especial do nosso chef. Aproveite o sabor, a praticidade e o preço especial do nosso Menu Executivo!
          </p>
          <button onClick={() => navigate('/menu-executivo')} style={{ fontSize: window.innerWidth <= 768 ? 16 : 22, fontWeight: 700, background: 'linear-gradient(90deg,#2d7a46 60%,#27548A 100%)', color: '#fff', border: 'none', borderRadius: 32, padding: window.innerWidth <= 768 ? '12px 24px' : '18px 48px', cursor: 'pointer', boxShadow: '0 2px 16px #0006', letterSpacing: 1, marginTop: 8, transition: 'background 0.2s' }}>
            Conheça o nosso Menu Executivo
          </button>
        </div>
      </section>
      {/* Localização */}
      <section style={{ width: '100vw', position: 'relative', left: '50%', right: '50%', marginLeft: '-50vw', marginRight: '-50vw', padding: 0, marginTop: 60, marginBottom: 0 }}>
        <div style={{ position: 'relative', top: 0, left: 0, width: '100%', zIndex: 2, textAlign: 'center', pointerEvents: 'none' }}>
          <h2 style={{ color: '#fff', fontSize: 48, fontWeight: 800, letterSpacing: 1, textShadow: '0 4px 24px #000a', margin: 12, fontFamily: 'Cormorant Garamond, serif' }}>Nossa Localização</h2>
        </div>
        <div style={{ width: '100vw', height: 480, position: 'relative', zIndex: 1, overflow: 'hidden', borderRadius: 0, boxShadow: '0 4px 32px #0008' }}>
          <iframe
            title="Localização Sabor & Alma"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.879013073624!2d-46.65657468447544!3d-23.57696466867095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8e6b7b7b7%3A0x7e4b7b7b7b7b7b7b!2sAvenida%20Paulista!5e0!3m2!1spt-BR!2sbr!4v1688150000000!5m2!1spt-BR!2sbr"
            width="100%"
            height="480"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
      {/* Card com frase do chef */}
      <section style={{ maxWidth: 1100, margin: '60px auto', padding: '0 16px' }}>
        <div style={{ width:'100%', padding:'24px 0', margin:'0 0 32px 0'}}>
          <h2 style={{ color: '#fff', fontSize: 48, fontWeight: 800, textAlign: 'center', margin:0, letterSpacing: 1 }}>Comentário do nosso Chefe</h2>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', background: 'rgba(0,0,0,0.85)', borderRadius: 24, boxShadow: '0 30px 32px #0004', alignItems: 'center', overflow: 'hidden', minHeight: 320 }}>
          <div style={{ flex: 1, minWidth: 260, padding: '40px 32px', color: '#fff', fontSize: 28, fontWeight: 700, letterSpacing: 1, textAlign: 'left' }}>
            “No Sabor & Alma, cada prato é uma experiência única. Recomendo a todos que buscam excelência e paixão pela gastronomia.”
            <div style={{ fontSize: 20, fontWeight: 400, marginTop: 24, color: '#f1c40f' }}>— Chef Olivier Laurent</div>
          </div>
          <div style={{ flex: 1, minWidth: 260, display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(0,0,0,0.15)', height: '100%' }}>
            <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=500&q=80" alt="Chef" style={{ width: 260, height: 260, objectFit: 'cover', borderRadius: '50%', boxShadow: '0 2px 16px #0006', margin: 32 }} />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
