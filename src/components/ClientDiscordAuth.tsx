'use client';

import dynamic from 'next/dynamic';

const DiscordAuth = dynamic(
  () => import('./DiscordAuth').then(mod => ({ default: mod.DiscordAuth })),
  { ssr: false }
);

export function ClientDiscordAuth() {
  return <DiscordAuth />;
}
