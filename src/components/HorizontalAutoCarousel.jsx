import React from 'react';

export default function HorizontalAutoCarousel({ items, itemWidth = 340, itemGap = 38, visible = 5, interval = 4000, onItemClick }) {
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
            style={{ minWidth: itemWidth, maxWidth: itemWidth, borderRadius: 24, boxShadow: '0 6px 24px #0002', background: 'none', cursor: 'pointer', overflow: 'hidden', minHeight: 160, maxHeight: 260, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
            onClick={() => onItemClick && onItemClick(item)}
          >
            <img src={item.image} alt={item.name} title={item.name} style={{ width: '100%', height: 260, objectFit: 'cover', borderRadius: 18, marginBottom: 18 }} />
          </div>
        ))}
      </div>
    </div>
  );
}
