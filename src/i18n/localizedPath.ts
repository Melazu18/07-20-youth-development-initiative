import i18n, { SUPPORTED_LANGUAGES, type SupportedLanguage } from "@/i18n";

/**
 * Prefix an internal path with the current language: /sv, /en, /fr, /ar.
 * - Leaves external URLs untouched.
 * - Leaves already-prefixed paths untouched.
 */
export function localizedPath(to: string): string {
  if (!to) return to;

  // external
  if (/^(https?:)?\/\//i.test(to) || to.startsWith("mailto:") || to.startsWith("tel:")) {
    return to;
  }

  // hash-only or query-only
  if (to.startsWith("#") || to.startsWith("?")) return to;

  const lang = (i18n.language || "sv").slice(0, 2) as SupportedLanguage;

  // already prefixed: /sv/..., /en/...
  const m = to.match(/^\/([a-z]{2})(\/|$)/i);
  if (m) {
    const candidate = m[1].toLowerCase() as SupportedLanguage;
    if (SUPPORTED_LANGUAGES.includes(candidate)) return to;
  }

  // ensure leading slash
  const path = to.startsWith("/") ? to : `/${to}`;
  return `/${lang}${path}`;
}
