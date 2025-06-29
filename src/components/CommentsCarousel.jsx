import React from 'react';

export default function CommentsCarousel({ comments, cardsPerView = 1 }) {
  const [idx, setIdx] = React.useState(0);
  React.useEffect(() => {
    const timer = setInterval(() => setIdx(i => (i + cardsPerView) % comments.length), 4000);
    return () => clearInterval(timer);
  }, [comments.length, cardsPerView]);
  if (!comments.length) return null;
  // Exibe cardsPerView comentários por vez
  const visibleComments = [];
  for (let i = 0; i < cardsPerView; i++) {
    visibleComments.push(comments[(idx + i) % comments.length]);
  }
  return (
    <div style={{ width: '100%', maxWidth: 1200, margin: '32px auto', position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 38 }}>
        {visibleComments.map((c, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: 24, boxShadow: '0 6px 24px #0002', padding: 40, minWidth: 340, maxWidth: 340, width: 340, minHeight: 260, maxHeight: 260, display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'box-shadow 0.2s', border: '1.5px solid #f1f6fa', overflow: 'hidden' }}>
            <img src={c.photo} alt={c.name} style={{ width: 90, height: 90, borderRadius: '50%', objectFit: 'cover', border: '2.5px solid #27548A', marginBottom: 18 }} />
            <div style={{ fontWeight: 700, fontSize: 22, color: '#23272f', marginBottom: 10 }}>{c.name}</div>
            <div style={{ color: '#555', fontSize: 18, textAlign: 'center', width: '100%', overflow: 'hidden', maxWidth: 260 }} title={c.text}>{c.text}</div>
          </div>
        ))}
      </div>
      {/* Bolinhas de navegação removidas */}
    </div>
  );
}
