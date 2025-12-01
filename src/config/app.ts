import {
  BenchNine as createBenchNineFont,
  Fira_Sans as createFiraSansFont,
  Fira_Sans_Condensed as createFiraSansCondensedFont,
  Fira_Sans_Extra_Condensed as createFiraSansExtraCondensedFont,
} from 'next/font/google';

export const benchNineFont = createBenchNineFont({
  display: 'block',
  preload: true,
  subsets: ['latin'],
  variable: '--font-bench-nine',
  weight: ['300', '400'],
});

export const firaSansFont = createFiraSansFont({
  display: 'block',
  preload: true,
  subsets: ['latin'],
  variable: '--font-fira-sans',
  weight: ['300', '400', '500'],
});

export const firaSansCondensedFont = createFiraSansCondensedFont({
  display: 'block',
  preload: true,
  subsets: ['latin'],
  variable: '--font-fira-sans-condensed',
  weight: ['300', '400', '500'],
});

export const firaSansExtraCondensedFont = createFiraSansExtraCondensedFont({
  display: 'block',
  preload: true,
  subsets: ['latin'],
  variable: '--font-fira-sans-extra-condensed',
  weight: ['300', '400'],
});

// Detect base URL and path to use when loading assets
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://smithyhelen.github.io/woth-toolbox';
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
export const metadataBase = baseUrl ? new URL(baseUrl) : undefined;

// Google Analytics tracking ID
export const googleAnalyticsId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ?? '';

// External URLs
export const urlDiscord = 'https://discord.gg/wayofthehunter';
export const urlSteam =
  'https://steamcommunity.com/sharedfiles/filedetails/?id=2882064749';

