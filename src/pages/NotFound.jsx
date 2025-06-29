import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/', { replace: true });
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#18181b',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'inherit',
      fontSize: 32,
      fontWeight: 700
    }}>
      Essa Página não Existe
      <div style={{ fontSize: 18, marginTop: 24, color: '#bbb' }}>
        Você será redirecionado para a Home em 5 segundos.
      </div>
    </div>
  );
}
