import { useEffect, useMemo } from "react";
import {
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import i18n, {
  SUPPORTED_LANGUAGES,
  isRtlLanguage,
  type SupportedLanguage,
} from "@/i18n";

/**
 * LanguageRouter
 * - Reads `:lng` from the URL (e.g. /sv/..., /en/..., /ar/...)
 * - Keeps i18n language + <html lang/dir> in sync with the URL
 * - If the param is invalid, redirects to the current i18n language (or sv)
 * - First-visit browser-language detection:
 *   - only if user has NO stored preference
 *   - only if current URL language is sv (default)
 *   - redirects once to detected language while keeping same path
 */
const STORAGE_KEY = "app_language";

function detectBrowserLanguage(): SupportedLanguage | null {
  const candidates = (navigator.languages?.length
    ? navigator.languages
    : [navigator.language]
  )
    .map((l) => (l || "").slice(0, 2).toLowerCase())
    .filter(Boolean);

  for (const c of candidates) {
    if (SUPPORTED_LANGUAGES.includes(c as SupportedLanguage)) {
      return c as SupportedLanguage;
    }
  }
  return null;
}

function setDocumentLangDir(lang: SupportedLanguage) {
  document.documentElement.setAttribute("lang", lang);
  document.documentElement.setAttribute("dir", isRtlLanguage(lang) ? "rtl" : "ltr");
}

export default function LanguageRouter() {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const lng = useMemo(() => {
    const raw = (params.lng || "").slice(0, 2).toLowerCase();
    return SUPPORTED_LANGUAGES.includes(raw as SupportedLanguage)
      ? (raw as SupportedLanguage)
      : null;
  }, [params.lng]);

  // Keep i18n + document attributes in sync with the URL language
  useEffect(() => {
    if (!lng) return;

    const current = (i18n.language || "sv").slice(0, 2) as SupportedLanguage;
    if (current !== lng) {
      i18n.changeLanguage(lng);
    }

    setDocumentLangDir(lng);
  }, [lng]);

  // First-visit browser-language detection (only when user hasn't explicitly chosen yet)
  useEffect(() => {
    if (!lng) return;

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return;

    // Default is Swedish; only auto-redirect off Swedish on first visit
    if (lng !== "sv") return;

    const detected = detectBrowserLanguage();
    if (!detected || detected === "sv") return;

    // Preserve rest of the path after /sv
    const rest = location.pathname.replace(/^\/sv(\/|$)/, "/");
    const nextPath =
      `/${detected}` +
      (rest === "/" ? "" : rest) +
      (location.search || "") +
      (location.hash || "");

    // Store so we don't flip-flop or override later
    localStorage.setItem(STORAGE_KEY, detected);

    navigate(nextPath, { replace: true });
  }, [lng, location.pathname, location.search, location.hash, navigate]);

  // Invalid lang param => redirect to current i18n language (or sv)
  if (!lng) {
    const fallback = (i18n.language || "sv").slice(0, 2) as SupportedLanguage;
    const safeFallback: SupportedLanguage = SUPPORTED_LANGUAGES.includes(fallback)
      ? fallback
      : "sv";

    const rest = location.pathname.replace(/^\/[^/]+/, "");
    return (
      <Navigate
        to={`/${safeFallback}${rest}${location.search || ""}${location.hash || ""}`}
        replace
      />
    );
  }

  return <Outlet />;
}
