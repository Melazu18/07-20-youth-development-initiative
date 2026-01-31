import { ReactNode, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { SUPPORTED_LANGUAGES, type SupportedLanguage } from "@/i18n";

interface LayoutProps {
  children: ReactNode;
}

function getOrigin() {
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

  const lang: SupportedLanguage = (
    SUPPORTED_LANGUAGES as readonly string[]
  ).includes(maybeLang)
    ? maybeLang
    : "sv";

  const restParts = (SUPPORTED_LANGUAGES as readonly string[]).includes(
    maybeLang,
  )
    ? parts.slice(1)
    : parts;

  const rest = "/" + restParts.join("/");
  const normalizedRest = rest === "/" ? "/" : rest.replace(/\/+$/, "");
  return { lang, rest: normalizedRest };
}

function upsertLink(rel: string, attrs: Record<string, string>) {
  // canonical: link[rel="canonical"]
  // alternate: link[rel="alternate"][hreflang="xx"]
  const selector =
    rel === "canonical"
      ? `link[rel="canonical"]`
      : `link[rel="alternate"][hreflang="${attrs.hreflang}"]`;

  let el = document.head.querySelector(selector) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    document.head.appendChild(el);
  }

  Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
}

function SeoLinks() {
  const location = useLocation();

  const { rest } = useMemo(
    () => parseLangAndRest(location.pathname),
    [location.pathname],
  );

  useEffect(() => {
    const origin = getOrigin();
    const search = location.search || "";

    // Canonical: Swedish version for consistency
    const canonical = `${origin}/sv${rest === "/" ? "" : rest}${search}`;
    upsertLink("canonical", { href: canonical });

    // Alternates for each language
    for (const l of SUPPORTED_LANGUAGES) {
      const href = `${origin}/${l}${rest === "/" ? "" : rest}${search}`;
      upsertLink("alternate", { hreflang: l, href });
    }

    // x-default goes to Swedish
    upsertLink("alternate", {
      hreflang: "x-default",
      href: `${origin}/sv${rest === "/" ? "" : rest}${search}`,
    });
  }, [location.pathname, location.search, rest]);

  return null;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <SeoLinks />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
