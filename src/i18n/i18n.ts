import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import en from './en.json';
import he from './he.json';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: {
      // english translation
      translation: en,
    },
    he: {
      // hebrew translation
      translation: he,
    },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
