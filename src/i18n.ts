import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from '../public/locales/en/translation.json';
import translationCZ from '../public/locales/cz/translation.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: translationEN },
    cz: { translation: translationCZ },
  },
  lng: localStorage.getItem('user-lang') || 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
