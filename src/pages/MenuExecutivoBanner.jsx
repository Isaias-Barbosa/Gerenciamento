import React, { useEffect, useState } from 'react';

export default function MenuExecutivoBanner() {
  const [imagem, setImagem] = useState(null);

  useEffect(() => {
    fetch('/api/menuExecutivo')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) setImagem(data[0].imagem);
      });
  }, []);

  if (!imagem) return null;

  return (
    <img src={imagem} alt="Menu Executivo" style={{ width: '100vw', height: 420, objectFit: 'cover', objectPosition: 'center', position: 'absolute', inset: 0, zIndex: 0 }} />
  );
}
