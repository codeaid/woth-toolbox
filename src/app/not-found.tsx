'use client';

import { Suspense, useEffect, useState } from 'react';
import { DiscordAuth } from 'components/DiscordAuth';
import { HerdMapOverlay } from 'components/HerdMapOverlay';
import { NotFoundContent } from 'components/NotFoundContent';

const NotFoundPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Only check login status on client side (after page loads in browser)
    const token = typeof window !== 'undefined' ? localStorage.getItem('jwt_token') : null;
    setIsLoggedIn(!!token);
  }, []);

  return (
    <>
      <DiscordAuth />
      <NotFoundContent />
      {isLoggedIn && (
        <Suspense fallback={<div>Loading herd overlay...</div>}>
          <HerdMapOverlay currentMap="Unknown" />
        </Suspense>
      )}
    </>
  );
};

export default NotFoundPage;
