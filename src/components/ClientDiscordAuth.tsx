'use client';

import dynamic from 'next/dynamic';

const DiscordAuth = dynamic(
  () => import('./DiscordAuth'),
  { ssr: false }
);

export function ClientDiscordAuth() {
  return <DiscordAuth />;
}
