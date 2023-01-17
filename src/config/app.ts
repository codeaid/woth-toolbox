import { defaultLocale } from 'config/i18n';
import { Settings } from 'types/app';

// Detect base URL to use when loading assets
export const baseUrl = process.env.NEXT_PUBLIC_BASE_PATH || '';

// Default application settings values
export const defaultSettings: Required<Settings> = {
  animalMarkerSize: 50,
  genericMarkerSize: 40,
  locale: defaultLocale,
  zoneMarkerSize: 35,
};

// Google Analytics tracking ID
export const googleAnalyticsId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;

// External URLs
export const urlDiscord = 'https://discord.gg/wayofthehunter';
export const urlSteam =
  'https://steamcommunity.com/sharedfiles/filedetails/?id=2882064749';
