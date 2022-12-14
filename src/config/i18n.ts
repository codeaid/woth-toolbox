import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import toolboxResources from '../../public/locales/en/toolbox.json';
import wothResources from '../../public/locales/en/woth.json';

// Default internationalization namespace
export const defaultNS = 'woth';

// List of default internationalization resources
export const resources = {
  en: {
    toolbox: toolboxResources,
    woth: wothResources,
  },
} as const;

// Initialize internationalization options
i18next.use(initReactI18next).init({
  defaultNS,
  nsSeparator: false,
  keySeparator: false,
  resources,
});

export { wothResources, toolboxResources };
