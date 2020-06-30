import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import XHR from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { WebpackBackend } from "i18next-webpack-backend";
import BackendAdapter from "i18next-multiload-backend-adapter";

const allowedLanguages = ['en', 'es'];

const defaultLng = 'en';
let lng = defaultLng;

const storageLanguage = localStorage.getItem('language');
if (storageLanguage && allowedLanguages.indexOf(storageLanguage) > -1) {
    lng = storageLanguage;
}

i18next
    // load translation using http -> see /public/locales
    // learn more: https://github.com/i18next/i18next-http-backend
    .use(XHR)
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    .use(BackendAdapter)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init(
        {
            lng,
            fallbackLng: lng,
            debug: true,
            interpolation: {
                escapeValue: false
            },
            ns: ['common', 'navigationItems', 'contactData'],
            backend: {
                backend: WebpackBackend,
                backendOption: {
                    context: require.context("../../public/locales", true, /\.json$/, "lazy")
                }
            },
            react: {
                wait: true,
                useSuspense: true
            }
        }
    );

export default i18next;