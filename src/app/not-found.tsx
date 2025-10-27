'use client';

import { Suspense, useEffect, useState } from 'react';
import { DiscordAuth } from 'components/DiscordAuth';

const NotFoundPage = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Mark that we're now on the client side
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient && <DiscordAuth />}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        padding: '20px'
      }}>
        <h1 style={{ fontSize: '72px', margin: '0' }}>404</h1>
        <h2 style={{ fontSize: '24px', margin: '20px 0' }}>Page Not Found</h2>
        <p style={{ fontSize: '16px', color: '#666', maxWidth: '500px' }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <a 
          href="/"
          style={{
            marginTop: '30px',
            padding: '12px 24px',
            background: '#5865F2',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            fontWeight: 'bold'
          }}
        >
          Go Back Home
        </a>
      </div>
    </>
  );
};

export default NotFoundPage;
