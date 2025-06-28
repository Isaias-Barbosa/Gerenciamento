import React from 'react';

export default function CommentsCarousel({ comments }) {
  const [idx, setIdx] = React.useState(0);
  React.useEffect(() => {
    const timer = setInterval(() => setIdx(i => (i + 1) % comments.length), 4000);
    return () => clearInterval(timer);
  }, [comments.length]);
  if (!comments.length) return null;
  return (
    <div style={{ width: '100%', maxWidth: 900, margin: '32px auto', position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 0 }}>
        <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 4px 18px #0002', padding: 32, minWidth: 340, maxWidth: 420, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'box-shadow 0.2s', border: '1.5px solid #f1f6fa' }}>
          <img src={comments[idx].photo} alt={comments[idx].name} style={{ width: 70, height: 70, borderRadius: '50%', objectFit: 'cover', border: '2.5px solid #27548A', marginBottom: 16 }} />
          <div style={{ fontWeight: 700, fontSize: 20, color: '#23272f', marginBottom: 8 }}>{comments[idx].name}</div>
          <div style={{ color: '#555', fontSize: 17, textAlign: 'center' }}>{comments[idx].text}</div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 18 }}>
        {comments.map((_, i) => (
          <span key={i} style={{ width: 12, height: 12, borderRadius: '50%', background: i === idx ? '#27548A' : '#bbb', display: 'inline-block', cursor: 'pointer', border: 'none', transition: 'background 0.2s' }} onClick={() => setIdx(i)} />
        ))}
      </div>
    </div>
  );
}
