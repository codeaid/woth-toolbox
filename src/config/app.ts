import {
  BenchNine as createBenchNineFont,
  Fira_Sans as createFiraSansFont,
  Fira_Sans_Condensed as createFiraSansCondensedFont,
  Fira_Sans_Extra_Condensed as createFiraSansExtraCondensedFont,
} from 'next/font/google';
import { defaultLocale } from 'config/i18n';
import type { Settings } from 'types/app';

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
export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
export const metadataBase = baseUrl ? new URL(baseUrl) : undefined;

// Default application settings values
export const defaultSettings: Required<Settings> = {
  animalMarkerRatings: true,
  animalMarkerSize: 50,
  genericMarkerSize: 40,
  locale: defaultLocale,
  zoneMarkerSize: 35,
};

// Google Analytics tracking ID
export const googleAnalyticsId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ?? '';

// External URLs
export const urlDiscord = 'https://discord.gg/wayofthehunter';
export const urlSteam =
  'https://steamcommunity.com/sharedfiles/filedetails/?id=2882064749';
