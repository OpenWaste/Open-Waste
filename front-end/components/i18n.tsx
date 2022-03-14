import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import english from "./language/en.json";
import french from "./language/fr.json";
import { getValueFor } from '../utils/PersistInfo';

const resources = {
  en: {
    translation: english
  },
  fr: {
    translation: french
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    compatibilityJSON: 'v3',
    resources,
    lng: "en",

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

getValueFor('language').then((output) => {
    if(output == 'fr'){
      i18n.changeLanguage("fr")
   }
});

export default i18n;