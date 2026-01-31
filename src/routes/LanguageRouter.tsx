import { useEffect } from "react";
import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";
import i18n, { SUPPORTED_LANGUAGES, type SupportedLanguage } from "@/i18n";

/**
 * LanguageRouter
 * - Reads `:lng` from the URL (e.g. /sv/..., /en/..., /ar/...)
 * - Keeps i18n language in sync with the URL
 * - If the param is invalid, redirects to the current i18n language
 */
export default function LanguageRouter() {
  const params = useParams();
  const location = useLocation();

  const raw = (params.lng || "").slice(0, 2).toLowerCase();
  const lng = SUPPORTED_LANGUAGES.includes(raw as SupportedLanguage)
    ? (raw as SupportedLanguage)
    : null;

  useEffect(() => {
    if (!lng) return;
    const current = (i18n.language || "sv").slice(0, 2) as SupportedLanguage;
    if (current !== lng) {
      i18n.changeLanguage(lng);
    }
  }, [lng]);

  if (!lng) {
    const fallback = (i18n.language || "sv").slice(0, 2) as SupportedLanguage;
    const rest = location.pathname.replace(/^\/[^/]+/, "");
    return <Navigate to={`/${fallback}${rest}${location.search}`} replace />;
  }

  return <Outlet />;
}
