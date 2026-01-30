/**
 * Internationalization (i18n) setup.
 */

import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import sv from "./locales/sv.json";
import en from "./locales/en.json";
import fr from "./locales/fr.json";
import ar from "./locales/ar.json";

export const SUPPORTED_LANGUAGES = ["sv", "en", "fr", "ar"] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export const DEFAULT_LANGUAGE: SupportedLanguage = "sv";

export const LANGUAGE_NAMES: Record<SupportedLanguage, string> = {
  sv: "Svenska",
  en: "English",
  fr: "Français",
  ar: "العربية"
};

export const LANGUAGE_DIRECTIONS: Record<SupportedLanguage, "ltr" | "rtl"> = {
  sv: "ltr",
  en: "ltr",
  fr: "ltr",
  ar: "rtl"
};

export function isRtlLanguage(lang: string): boolean {
  const langCode = lang.split('-')[0] as SupportedLanguage;
  return LANGUAGE_DIRECTIONS[langCode] === "rtl";
}

export function getCurrentDirection(): "ltr" | "rtl" {
  const currentLang = i18n.language || DEFAULT_LANGUAGE;
  const langCode = currentLang.split('-')[0] as SupportedLanguage;
  return LANGUAGE_DIRECTIONS[langCode] || "ltr";
}

export function changeLanguage(lng: SupportedLanguage): Promise<void> {
  return i18n.changeLanguage(lng).then(() => {
    const direction = LANGUAGE_DIRECTIONS[lng];
    document.documentElement.dir = direction;
    document.documentElement.lang = lng;
    localStorage.setItem("app_language", lng);
  });
}

export function getCurrentLanguage(): SupportedLanguage {
  const lang = i18n.language;
  if (!lang) return DEFAULT_LANGUAGE;
  
  const langCode = lang.split('-')[0] as SupportedLanguage;
  return SUPPORTED_LANGUAGES.includes(langCode) ? langCode : DEFAULT_LANGUAGE;
}

// Initialize i18n
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      sv: { translation: sv },
      en: { translation: en },
      fr: { translation: fr },
      ar: { translation: ar },
    },
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: [...SUPPORTED_LANGUAGES],
    defaultNS: "translation",
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator"],
      lookupLocalStorage: "app_language",
      caches: ["localStorage"],
    },
  });

// Set initial document attributes
const initialLang = getCurrentLanguage();
document.documentElement.dir = getCurrentDirection();
document.documentElement.lang = initialLang;

// Update document when language changes
i18n.on("languageChanged", (lng: string) => {
  const langCode = lng.split('-')[0] as SupportedLanguage;
  document.documentElement.dir = LANGUAGE_DIRECTIONS[langCode] || "ltr";
  document.documentElement.lang = langCode;
});

export default i18n;