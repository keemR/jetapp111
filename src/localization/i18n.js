import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import en from './translations/en';
import ar from './translations/ar';

const LANGUAGES = {
  en,
  ar,
};

const LANG_CODES = Object.keys(LANGUAGES);

const LANGUAGE_DETECTOR = {
  type: 'languageDetector',
  async: true,
  detect: async (callback) => {
    try {
      const languageCode = await AsyncStorage.getItem('user-language');
      if (languageCode) {
        return callback(languageCode);
      }
      // Default to Arabic if no language is set
      return callback('ar');
    } catch (error) {
      console.log('Error reading language', error);
      return callback('ar');
    }
  },
  init: () => {},
  cacheUserLanguage: async (languageCode) => {
    try {
      await AsyncStorage.setItem('user-language', languageCode);
    } catch (error) {
      console.log('Error saving language', error);
    }
  },
};

i18n
  .use(LANGUAGE_DETECTOR)
  .use(initReactI18next)
  .init({
    resources: LANGUAGES,
    react: {
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false,
    },
    defaultNS: 'common',
    fallbackLng: 'ar',
  });

export default i18n; 