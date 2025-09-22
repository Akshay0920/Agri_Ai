import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en/translation.json';
import hi from './locales/hi/translation.json';
import te from './locales/te/translation.json';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: { translation: en },
      hi: { translation: hi },
      te: { translation: te }
    },
    lng: 'en', // set the default language
    fallbackLng: 'en', // use English if the selected language translation is missing
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;