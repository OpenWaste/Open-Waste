import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import english from "./components/language/en.json";
import french from "./components/language/fr.json";
import { getValueFor } from './utils/PersistInfo';

// json files used for translation 
const resources = {
  en: {
    translation: english
  },
  fr: {
    translation: french
  }
};

// using i18n, we set the default language to english and the json format to v3
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

// set language to french on startup if the app was set to french previously
getValueFor('language').then((output) => {
    if(output == 'fr'){
      i18n.changeLanguage("fr")
   }
}).catch(() => {});

// other files can call this and use the translations from the json files
export default i18n;