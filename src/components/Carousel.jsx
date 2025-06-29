import React from 'react';

export default function Carousel({ images, style }) {
  // Exibe até 2 imagens lado a lado
  const showImages = images.slice(0, 2);
  return (
    <div style={{ width: '100vw', maxWidth: '100vw', display: 'flex', gap: 48, justifyContent: 'center', alignItems: 'flex-end', margin: '0 auto', ...style }}>
      {showImages.map((img, i) => (
        <div key={i} style={{ flex: 1, maxWidth: 600, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img src={img.url} alt={img.alt} style={{ width: '100%', maxWidth: 520, height: 380, objectFit: 'cover', borderRadius: 24, boxShadow: '0 6px 40px #0005', border: 'none', display: 'block' }} />
          <div style={{ width: '100%', color: '#fff', fontSize: 36, fontWeight: 700, letterSpacing: 1, textShadow: '0 2px 16px #000b', textAlign: 'center', marginTop: 18, fontFamily: 'Cormorant Garamond, serif', background: 'none' }}>
            {img.caption}
          </div>
        </div>
      ))}
    </div>
  );
}
