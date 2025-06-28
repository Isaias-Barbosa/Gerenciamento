import React from 'react';

export default function Carousel({ images, style, auto = true, interval = 3500 }) {
  const [idx, setIdx] = React.useState(0);
  React.useEffect(() => {
    if (!auto) return;
    const timer = setInterval(() => setIdx(i => (i + 1) % images.length), interval);
    return () => clearInterval(timer);
  }, [images.length, auto, interval]);
  if (!images.length) return null;
  return (
    <div style={{ width: '100%', maxWidth: 1200, height: 520, margin: '40px auto 0 auto', position: 'relative', borderRadius: 32, overflow: 'hidden', boxShadow: '0 6px 40px #0003', background: '#18181b', ...style }}>
      <img src={images[idx].url} alt={images[idx].alt} style={{ width: '100%', height: 520, objectFit: 'cover', borderRadius: 32 }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(0deg, #18181b 90%, #0000 100%)', color: '#fff', padding: 18, fontSize: 26, fontWeight: 700, letterSpacing: 1, textShadow: 'none', border: 'none', boxShadow: 'none' }}>{images[idx].caption}</div>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 24, display: 'flex', gap: 14, justifyContent: 'center', zIndex: 2 }}>
        {images.map((_, i) => (
          <span key={i} style={{ width: 18, height: 18, borderRadius: '50%', background: i === idx ? '#27548A' : '#bbb', display: 'inline-block', cursor: 'pointer', border: 'none', transition: 'background 0.2s' }} onClick={() => setIdx(i)} />
        ))}
      </div>
    </div>
  );
}
