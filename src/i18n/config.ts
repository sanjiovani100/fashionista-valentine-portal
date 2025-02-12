import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import enCommon from './locales/en/common.json';
import enHome from './locales/en/home.json';
import enModels from './locales/en/models.json';
import enSponsors from './locales/en/sponsors.json';

import esCommon from './locales/es/common.json';
import esHome from './locales/es/home.json';
import esModels from './locales/es/models.json';
import esSponsors from './locales/es/sponsors.json';

export const defaultNS = 'common';
export const resources = {
  en: {
    common: enCommon,
    home: enHome,
    models: enModels,
    sponsors: enSponsors,
  },
  es: {
    common: esCommon,
    home: esHome,
    models: esModels,
    sponsors: esSponsors,
  },
} as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    defaultNS,
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    react: {
      useSuspense: true,
    },
  });

export default i18n; 


