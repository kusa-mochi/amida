"use client"

import i18n from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import { initReactI18next } from "react-i18next"
import enTranslation from "@/public/locales/en/translation.json"
import jaTranslation from "@/public/locales/ja/translation.json"

export const supportedLanguages = {
    en: 'English',
    ja: '日本語',
}

if (!i18n.isInitialized) {
    i18n
        .use(LanguageDetector)
        .use(initReactI18next)
        .init({
            fallbackLng: 'en',
            returnEmptyString: false,
            supportedLngs: Object.keys(supportedLanguages),
            debug: true,
            detection: {
                order: ["navigator"],
                caches: [],
            },
            resources: {
                en: { translation: enTranslation },
                ja: { translation: jaTranslation },
            },
            interpolation: {
                escapeValue: false,
            },
        })
}

export default i18n
