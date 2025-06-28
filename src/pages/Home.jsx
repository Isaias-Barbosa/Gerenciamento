import React, { useEffect } from 'react';
import Carousel from '../components/Carousel';
import CommentsCarousel from '../components/CommentsCarousel';
import Footer from '../components/Footer';
import HorizontalAutoCarousel from '../components/HorizontalAutoCarousel';
import { useNavigate } from 'react-router-dom';

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

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #23272f 0%, #18181b 100%)', fontFamily: 'Segoe UI, Arial, sans-serif' }}>
      {/* Hero Section */}
      <div style={{ width: '100%', height: 420, background: `url(${heroImage}) center/cover no-repeat`, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 32px #0008' }}>
        <div style={{ background: 'rgba(24,24,27,0.75)', borderRadius: 24, padding: '40px 60px', textAlign: 'center', boxShadow: '0 2px 16px #0006' }}>
          <h1 style={{ color: '#fff', fontSize: 48, fontWeight: 800, letterSpacing: 2, marginBottom: 12 }}>Sabor & Alma</h1>
          <p style={{ color: '#e0e0e0', fontSize: 22, fontWeight: 500, marginBottom: 0 }}>Somos apaixonados por transformar ingredientes frescos e selecionados em experiências que aquecem o coração e despertam memórias</p>
        </div>
      </div>

      {/* Carrossel de imagens de propaganda */}
      <section style={{ maxWidth: 1200, margin: '40px auto 0 auto', padding: '0 16px' }}>
        <h2 style={{ color: '#fff', marginBottom: 32, fontSize: 32, fontWeight: 700, letterSpacing: 1, textAlign: 'center' }}>Destaques do Sabor & Alma</h2>
        <Carousel images={propagandaImages} auto={true} interval={3500} />
      </section>

      {/* Cardápio - carrossel horizontal só de imagens */}
      <section style={{ maxWidth: 1200, margin: '40px auto 0 auto', padding: '0 16px' }}>
        <h2 style={{ color: '#fff', marginBottom: 32, fontSize: 32, fontWeight: 700, letterSpacing: 1, textAlign: 'center' }}>Veja o nosso cardápio</h2>
        <HorizontalAutoCarousel
          items={meals}
          itemWidth={240}
          itemGap={36}
          visible={5}
          interval={2200}
          onItemClick={meal => navigate(`/meals/${meal.id}`)}
        />
      </section>

      {/* Comentários */}
      <section style={{ maxWidth: 1100, margin: '60px auto', padding: '0 16px' }}>
        <h2 style={{ color: '#fff', marginBottom: 28, fontSize: 28, fontWeight: 700, textAlign: 'center' }}>Comentários de Clientes</h2>
        <CommentsCarousel comments={comments} />
        {/* Localização */}
        <h2 style={{ color: '#27548A', fontSize: 38, fontWeight: 800, textAlign: 'center', margin: '60px 0 18px 0', letterSpacing: 1 }}>Nossa Localização</h2>
        <div style={{ width: '100%', maxWidth: 700, margin: '0 auto 0 auto', borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 16px #0002' }}>
          <iframe
            title="Localização Sabor & Alma"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.879013073624!2d-46.65657468447544!3d-23.57696466867095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8e6b7b7b7%3A0x7e4b7b7b7b7b7b7b!2sAvenida%20Paulista!5e0!3m2!1spt-BR!2sbr!4v1688150000000!5m2!1spt-BR!2sbr"
            width="100%"
            height="320"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
      {/* Card com frase do chef */}
      <section style={{ maxWidth: 1100, margin: '60px auto', padding: '0 16px' }}>
        <h2 style={{ color: '#27548A', fontSize: 32, fontWeight: 800, textAlign: 'center', margin: '0 0 32px 0', letterSpacing: 1 }}>Comentário do nosso Chefe</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', background: 'rgba(0,0,0,0.85)', borderRadius: 24, boxShadow: '0 4px 32px #0004', alignItems: 'center', overflow: 'hidden', minHeight: 320 }}>
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
