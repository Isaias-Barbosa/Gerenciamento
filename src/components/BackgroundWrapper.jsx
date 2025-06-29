import React from 'react';

export default function BackgroundWrapper({ children, isAdmin }) {
  if (isAdmin) return <>{children}</>;
  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: -1,
      background: `url(https://plus.unsplash.com/premium_photo-1661883237884-263e8de8869b?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cmVzdGF1cmFudGV8ZW58MHx8MHx8fDA%3D) center/cover no-repeat fixed`,
      filter: 'blur(6px) brightness(0.7)',
    }} />
  );
}
