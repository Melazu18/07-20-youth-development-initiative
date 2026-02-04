import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { SUPPORTED_LANGUAGES, type SupportedLanguage } from "@/i18n";

function getOrigin() {
  // Works on client only
  return window.location.origin;
}

function parseLangAndRest(pathname: string): {
  lang: SupportedLanguage;
  rest: string;
} {
  const parts = pathname.split("/").filter(Boolean);
  const maybeLang = (parts[0] || "")
    .slice(0, 2)
    .toLowerCase() as SupportedLanguage;

  const lang: SupportedLanguage = SUPPORTED_LANGUAGES.includes(maybeLang)
    ? maybeLang
    : "sv";
  const restParts = SUPPORTED_LANGUAGES.includes(maybeLang)
    ? parts.slice(1)
    : parts;
  const rest = "/" + restParts.join("/");

  return { lang, rest: rest === "/" ? "/" : rest.replace(/\/+$/, "") };
}

function upsertLink(rel: string, attrs: Record<string, string>) {
  const selectorParts = [`link[rel="${rel}"]`];

  if (attrs.hreflang)
    selectorParts.push(`link[rel="${rel}"][hreflang="${attrs.hreflang}"]`);
  const selector = attrs.hreflang ? selectorParts[1] : selectorParts[0];

  let el = document.head.querySelector(selector) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    document.head.appendChild(el);
  }

  for (const [k, v] of Object.entries(attrs)) {
    el.setAttribute(k, v);
  }
}

export function SeoLinks() {
  const location = useLocation();

  const { rest } = useMemo(
    () => parseLangAndRest(location.pathname),
    [location.pathname],
  );

  useEffect(() => {
    const origin = getOrigin();
    const search = location.search || "";

    // Canonical = Swedish version by default? (Common approach)
    // If you prefer canonical as current language, change to use current lang.
    const canonical = `${origin}/sv${rest === "/" ? "" : rest}${search}`;
    upsertLink("canonical", { href: canonical });

    // hreflang alternates for each language
    for (const l of SUPPORTED_LANGUAGES) {
      const href = `${origin}/${l}${rest === "/" ? "" : rest}${search}`;
      upsertLink("alternate", { hreflang: l, href });
    }

    // x-default: point to Swedish
    upsertLink("alternate", {
      hreflang: "x-default",
      href: `${origin}/sv${rest === "/" ? "" : rest}${search}`,
    });
  }, [location.pathname, location.search, rest]);

  return null;
}
