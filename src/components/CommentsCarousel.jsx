import React, { useEffect, useState } from 'react';

export default function CommentsCarousel({ cardsPerView = 1 }) {
  const [comments, setComments] = useState([]);
  const [idx, setIdx] = React.useState(0);
  const [cards, setCards] = React.useState(cardsPerView);

  useEffect(() => {
    fetch('/api/comments/last/10')
      .then(res => res.json())
      .then(data => setComments(data.map(c => ({
        name: c.nome,
        text: c.comentario,
        photo: c.foto
      }))));
  }, []);

  React.useEffect(() => {
    const updateCards = () => setCards(window.innerWidth <= 768 ? 1 : cardsPerView);
    updateCards();
    window.addEventListener('resize', updateCards);
    return () => window.removeEventListener('resize', updateCards);
  }, [cardsPerView]);
  React.useEffect(() => {
    if (!comments.length) return;
    const timer = setInterval(() => setIdx(i => (i + cards) % comments.length), 4000);
    return () => clearInterval(timer);
  }, [comments.length, cards]);
  if (!comments.length) return null;
  const visibleComments = [];
  for (let i = 0; i < cards; i++) {
    visibleComments.push(comments[(idx + i) % comments.length]);
  }
  return (
    <div style={{ width: '100%', maxWidth: 1200, margin: '32px auto', position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: window.innerWidth <= 768 ? 12 : 38 }}>
        {visibleComments.map((c, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: 24, boxShadow: '0 6px 24px #0002', padding: window.innerWidth <= 768 ? 40 : 40, minWidth: window.innerWidth <= 768 ? 180 : 340, maxWidth: window.innerWidth <= 768 ? 180 : 340, width: window.innerWidth <= 768 ? 180 : 340, minHeight: window.innerWidth <= 768 ? 120 : 260, maxHeight: window.innerWidth <= 768 ? 120 : 260, display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'box-shadow 0.2s', border: '1.5px solid #f1f6fa', overflow: 'hidden' }}>
            <img src={c.photo} alt={c.name} style={{ width: window.innerWidth <= 768 ? 44 : 90, height: window.innerWidth <= 768 ? 44 : 90, borderRadius: '50%', objectFit: 'cover', border: '2.5px solid #27548A', marginBottom: window.innerWidth <= 768 ? 8 : 18 }} />
            <div style={{ fontWeight: 700, fontSize: window.innerWidth <= 768 ? 14 : 22, color: '#23272f', marginBottom: window.innerWidth <= 768 ? 4 : 10 }}>{c.name}</div>
            <div style={{ color: '#555', fontSize: window.innerWidth <= 768 ? 11 : 18, textAlign: 'center', width: '100%', overflow: 'hidden', maxWidth: window.innerWidth <= 768 ? 120 : 260 }} title={c.text}>{c.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
