'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { exchangeCodeForToken, fetchUserData, fetchUserHerds } from '@/services/discordApiService';

function DiscordAuthContent() {
  const searchParams = useSearchParams();
  const [user, setUser] = useState<any>(null);
  const [herds, setHerds] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const code = searchParams.get('code');
    if (code && !user) {
      handleDiscordCallback(code);
    }

    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('discord_token');
      const storedUser = localStorage.getItem('discord_user');
      if (storedToken && storedUser && !user) {
        setUser(JSON.parse(storedUser));
        loadUserHerds();
      }
    }
  }, [searchParams]);

  const handleDiscordCallback = async (code: string) => {
    setLoading(true);
    try {
      const tokenData = await exchangeCodeForToken(code);
      if (tokenData && tokenData.access_token) {
        const userData = await fetchUserData(tokenData.access_token);
        if (userData) {
          localStorage.setItem('discord_token', tokenData.access_token);
          localStorage.setItem('discord_user', JSON.stringify(userData));
          setUser(userData);
          await loadUserHerds();
        }
      }
    } catch (error) {
      console.error('Discord auth error:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadUserHerds = async () => {
  try {
    const response = await fetchUserHerds();
    const animals = response?.herds || response?.habitats?.flatMap(h => h.animals) || [];
    setHerds(animals);  // ✅ Correct - extract the array from the response
  } catch (error) {
    console.error('Error loading herds:', error);
  }
};

  const handleLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID;
    const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL}/`;
    const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=identify`;
    window.location.href = discordAuthUrl;
  };

  const handleLogout = () => {
    localStorage.removeItem('discord_token');
    localStorage.removeItem('discord_user');
    setUser(null);
    setHerds([]);
  };

  return (
    <div style={{ 
      position: 'fixed', 
      top: '80px',
      right: '20px', 
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      alignItems: 'flex-end'
    }}>
      {!user ? (
        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            backgroundColor: '#5865F2',
            color: 'white',
            padding: '12px 24px',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: loading ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
          </svg>
          {loading ? 'Connecting...' : 'Login with Discord'}
        </button>
      ) : (
        <div style={{
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: '12px 16px',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
          maxWidth: '250px',
        }}>
          <div style={{ 
            color: 'white', 
            fontSize: '14px',
            marginBottom: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <img 
              src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`} 
              alt="avatar"
              style={{ width: '24px', height: '24px', borderRadius: '50%' }}
            />
            <span style={{ fontWeight: 'bold' }}>{user.username}</span>
          </div>
          {herds.length > 0 && (
            <div style={{ 
              color: '#aaa', 
              fontSize: '12px',
              marginBottom: '8px'
            }}>
              {herds.length} tracked animal{herds.length !== 1 ? 's' : ''}
            </div>
          )}
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: '#ed4245',
              color: 'white',
              padding: '6px 12px',
              border: 'none',
              borderRadius: '4px',
              fontSize: '12px',
              cursor: 'pointer',
              width: '100%',
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default function ClientDiscordAuth() {
  return (
    <Suspense fallback={null}>
      <DiscordAuthContent />
    </Suspense>
  );
}
