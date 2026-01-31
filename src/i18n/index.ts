/**
 * Internationalization (i18n) setup.
 *
 * - Uses i18next + react-i18next
 * - Persists language in localStorage (via i18next-browser-languagedetector)
 * - Keeps <html lang> and <html dir> in sync (RTL for Arabic)
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

/**
 * Native/original language names (must NOT be translated).
 * Always show:
 * - English (not "Engelska")
 * - Svenska (not "Swedish")
 * - Français (not "Franska")
 * - العربية (not "Arabiska")
 */
export const LANGUAGE_NAMES_NATIVE: Record<SupportedLanguage, string> = {
  sv: "Svenska",
  en: "English",
  fr: "Français",
  ar: "العربية",
};

// Backwards compatibility (older imports)
export const LANGUAGE_NAMES = LANGUAGE_NAMES_NATIVE;

export const LANGUAGE_DIRECTIONS: Record<SupportedLanguage, "ltr" | "rtl"> = {
  sv: "ltr",
  en: "ltr",
  fr: "ltr",
  ar: "rtl",
};

export function isRtlLanguage(lang: string): boolean {
  const langCode = (lang || DEFAULT_LANGUAGE).split("-")[0] as SupportedLanguage;
  return (LANGUAGE_DIRECTIONS[langCode] || "ltr") === "rtl";
}

export function getCurrentLanguage(): SupportedLanguage {
  const lang = i18n.language || DEFAULT_LANGUAGE;
  const langCode = lang.split("-")[0] as SupportedLanguage;
  return SUPPORTED_LANGUAGES.includes(langCode) ? langCode : DEFAULT_LANGUAGE;
}

export function getCurrentDirection(): "ltr" | "rtl" {
  const langCode = getCurrentLanguage();
  return LANGUAGE_DIRECTIONS[langCode] || "ltr";
}

/**
 * Change language and synchronise <html lang/dir>.
 * NOTE: language persistence is handled by the detector cache.
 */
export async function changeLanguage(lng: SupportedLanguage): Promise<void> {
  await i18n.changeLanguage(lng);
  document.documentElement.dir = LANGUAGE_DIRECTIONS[lng] || "ltr";
  document.documentElement.lang = lng;
}

function syncDocumentAttributes(lng: string) {
  const langCode = (lng || DEFAULT_LANGUAGE).split("-")[0] as SupportedLanguage;
  document.documentElement.dir = LANGUAGE_DIRECTIONS[langCode] || "ltr";
  document.documentElement.lang = langCode;
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
    // Important: treat en-US, sv-SE, etc as their base language keys
    load: "languageOnly",
    nonExplicitSupportedLngs: true,
    defaultNS: "translation",
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
    detection: {
      order: ["localStorage", "navigator"],
      lookupLocalStorage: "app_language",
      caches: ["localStorage"],
    },
    // Avoid returning null for missing keys (prevents React warnings)
    returnNull: false,
  });

// Set initial document attributes
syncDocumentAttributes(getCurrentLanguage());

// Keep document attributes synced on change
i18n.on("languageChanged", (lng: string) => {
  syncDocumentAttributes(lng);
});

export default i18n;
