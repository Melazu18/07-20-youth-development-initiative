/**
 * Language switcher dropdown with native language names.
 *
 * Always displays languages in their original/or native spelling:
 * - English (not "Engelska")
 * - Svenska (not "Swedish")
 * - Français (not "Franska")
 * - العربية (not "Arabiska")
 *
 * Stores the selected language in localStorage via i18next-browser-languagedetector.
 */

import { Globe, Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SUPPORTED_LANGUAGES,
  isRtlLanguage,
  LANGUAGE_NAMES_NATIVE,
  type SupportedLanguage,
} from "@/i18n";

// Optional: Add geographical context for better UX (kept as native strings)
const LANGUAGE_CONTEXT: Record<SupportedLanguage, string> = {
  sv: "Sweden",
  en: "International",
  fr: "France",
  ar: "Arabic World",
};

// Country flag emojis (optional visual aid)
const LANGUAGE_FLAGS: Record<SupportedLanguage, string> = {
  sv: "🇸🇪",
  en: "🇬🇧",
  fr: "🇫🇷",
  ar: "🇸🇦",
};

function normalizeLang(lng: string | undefined): SupportedLanguage {
  const code = (lng || "sv").slice(0, 2) as SupportedLanguage;
  return (SUPPORTED_LANGUAGES as readonly string[]).includes(code) ? code : "sv";
}

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const [currentLang, setCurrentLang] = useState<SupportedLanguage>(() =>
    normalizeLang(i18n.language),
  );
  const [isOpen, setIsOpen] = useState(false);

  // Update current language when i18n language changes
  useEffect(() => {
    const handleLanguageChanged = (lng: string) => {
      const lang = normalizeLang(lng);
      setCurrentLang(lang);
    };

    i18n.on("languageChanged", handleLanguageChanged);
    return () => {
      i18n.off("languageChanged", handleLanguageChanged);
    };
  }, [i18n]);

  const setLang = async (lang: SupportedLanguage) => {
    await i18n.changeLanguage(lang);

    // Ensure the document direction updates immediately (important for Arabic).
    const dir = isRtlLanguage(lang) ? "rtl" : "ltr";
    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", lang);

    setIsOpen(false);
  };

  // Current language name in native spelling
  const currentLanguageName = LANGUAGE_NAMES_NATIVE[currentLang] || "English";

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 hover:bg-accent/50"
          aria-label={t("common.currentLanguageAria", {
            languageName: currentLanguageName,
          })}
        >
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline text-sm font-medium">
            {currentLanguageName}
          </span>
          <span className="text-xs opacity-80">
            {currentLang.toUpperCase()}
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <div className="px-3 py-2 text-xs font-semibold text-muted-foreground border-b">
          {t("common.selectLanguage")}
        </div>

        {SUPPORTED_LANGUAGES.map((lang) => (
          <DropdownMenuItem
            key={lang}
            onClick={() => setLang(lang)}
            className="flex items-center justify-between px-3 py-2.5 cursor-pointer hover:bg-accent/50"
          >
            <div className="flex items-center gap-3">
              <span className="text-base" aria-hidden="true">
                {LANGUAGE_FLAGS[lang]}
              </span>
              <div className="flex flex-col">
                <span className="text-sm font-medium">
                  {LANGUAGE_NAMES_NATIVE[lang]}
                </span>
                <span className="text-xs text-muted-foreground">
                  {LANGUAGE_CONTEXT[lang]}
                </span>
              </div>
            </div>
            {currentLang === lang && <Check className="h-4 w-4 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Alternative: Compact version with just language codes
export function CompactLanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const [currentLang, setCurrentLang] = useState<SupportedLanguage>(() =>
    normalizeLang(i18n.language),
  );

  useEffect(() => {
    const handleLanguageChanged = (lng: string) => {
      setCurrentLang(normalizeLang(lng));
    };

    i18n.on("languageChanged", handleLanguageChanged);
    return () => {
      i18n.off("languageChanged", handleLanguageChanged);
    };
  }, [i18n]);

  const setLang = async (lang: SupportedLanguage) => {
    await i18n.changeLanguage(lang);

    const dir = isRtlLanguage(lang) ? "rtl" : "ltr";
    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", lang);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-1 px-2"
          aria-label={t("common.currentLanguageAria", {
            languageName: LANGUAGE_NAMES_NATIVE[currentLang],
          })}
        >
          <Globe className="h-3.5 w-3.5" />
          <span className="text-xs font-medium uppercase">{currentLang}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        {SUPPORTED_LANGUAGES.map((lang) => (
          <DropdownMenuItem
            key={lang}
            onClick={() => setLang(lang)}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm">{LANGUAGE_NAMES_NATIVE[lang]}</span>
              <span className="text-xs text-muted-foreground">
                ({lang.toUpperCase()})
              </span>
            </div>
            {currentLang === lang && <Check className="h-4 w-4 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Alternative: Minimalist flag-only switcher
export function FlagLanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const [currentLang, setCurrentLang] = useState<SupportedLanguage>(() =>
    normalizeLang(i18n.language),
  );

  useEffect(() => {
    const handleLanguageChanged = (lng: string) => {
      setCurrentLang(normalizeLang(lng));
    };

    i18n.on("languageChanged", handleLanguageChanged);
    return () => {
      i18n.off("languageChanged", handleLanguageChanged);
    };
  }, [i18n]);

  const setLang = async (lang: SupportedLanguage) => {
    await i18n.changeLanguage(lang);

    const dir = isRtlLanguage(lang) ? "rtl" : "ltr";
    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", lang);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          aria-label={t("common.currentLanguageAria", {
            languageName: LANGUAGE_NAMES_NATIVE[currentLang],
          })}
        >
          <span className="text-lg" role="img" aria-hidden="true">
            {LANGUAGE_FLAGS[currentLang]}
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        {SUPPORTED_LANGUAGES.map((lang) => (
          <DropdownMenuItem
            key={lang}
            onClick={() => setLang(lang)}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <span className="text-base" role="img" aria-hidden="true">
                {LANGUAGE_FLAGS[lang]}
              </span>
              <span className="text-sm">{LANGUAGE_NAMES_NATIVE[lang]}</span>
            </div>
            {currentLang === lang && <Check className="h-4 w-4 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
