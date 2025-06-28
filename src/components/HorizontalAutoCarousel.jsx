import React from 'react';

export default function HorizontalAutoCarousel({ items, itemWidth = 220, itemGap = 32, visible = 5, interval = 2500, onItemClick }) {
  const [firstIdx, setFirstIdx] = React.useState(0);
  const totalItems = items.length;

  React.useEffect(() => {
    if (totalItems <= visible) return;
    const timer = setInterval(() => {
      setFirstIdx(idx => (idx + 1) % totalItems);
    }, interval);
    return () => clearInterval(timer);
  }, [totalItems, visible, interval]);

  // Gera a lista de itens visíveis, com looping infinito
  const visibleItems = [];
  for (let i = 0; i < Math.min(visible, totalItems); i++) {
    const idx = (firstIdx + i) % totalItems;
    visibleItems.push(items[idx]);
  }

  return (
    <div style={{ overflow: 'hidden', width: '100%' }}>
      <div
        style={{
          display: 'flex',
          gap: itemGap,
          transition: 'transform 0.5s',
        }}
      >
        {visibleItems.map((item, i) => (
          <div
            key={item.id || i}
            style={{ minWidth: itemWidth, maxWidth: itemWidth, borderRadius: 16, boxShadow: '0 2px 8px #0008', border: '3px solid #fff', background: 'none', cursor: 'pointer', overflow: 'hidden' }}
            onClick={() => onItemClick && onItemClick(item)}
          >
            <img src={item.image} alt={item.name} title={item.name} style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 16 }} />
          </div>
        ))}
      </div>
    </div>
  );
}
