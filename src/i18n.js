import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './auxiliary/locales/en/translation.json';
import nl from './auxiliary/locales/nl/translation.json';



i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    nl: { translation: nl },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;