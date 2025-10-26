'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://65.109.100.181:8080';

export function DiscordAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams?.get('token');
    
    if (token) {
      localStorage.setItem('jwt_token', token);
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    const storedToken = localStorage.getItem('jwt_token');
    if (storedToken) {
      setIsLoggedIn(true);
      
      try {
        const payload = JSON.parse(atob(storedToken.split('.')[1]));
        setUsername(payload.username || 'Discord User');
      } catch (e) {
        console.error('Failed to parse JWT', e);
      }
    }
  }, [searchParams]);

  const handleLogin = () => {
    window.location.href = `${API_BASE_URL}/api/auth/login`;
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('selected_herds');
    setIsLoggedIn(false);
    setUsername(null);
    window.location.reload();
  };

  return (
    <div className="discord-auth-container" style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 1000,
      background: 'rgba(0, 0, 0, 0.8)',
      padding: '12px 20px',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
    }}>
      {!isLoggedIn ? (
        <button
          onClick={handleLogin}
          style={{
            background: '#5865F2',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '14px'
          }}
        >
          🔗 Login with Discord
        </button>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ color: 'white', fontSize: '14px' }}>
            👋 {username}
          </span>
          <button
            onClick={handleLogout}
            style={{
              background: '#ed4245',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '13px'
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
