import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { useLocation } from "react-router-dom";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Heart,
  BookOpen,
  Trophy,
  Users,
  Palette,
  Shield,
  Eye,
  FileText,
  Scale,
} from "lucide-react";
import { SUPPORTED_LANGUAGES, type SupportedLanguage } from "@/i18n";

const footerLinks = {
  programs: [
    { name: "programs.schoolSupport", href: "/programs/school-support", icon: BookOpen },
    { name: "programs.footballDevelopment", href: "/programs/football", icon: Trophy },
    { name: "programs.mentorship", href: "/programs/mentorship", icon: Users },
    { name: "programs.creativeSkills", href: "/programs/creative-skills", icon: Palette },
    { name: "programs.socialIntegration", href: "/programs/social-integration", icon: Users },
  ],
  governance: [
    { name: "governance.safeguarding", href: "/safeguarding", icon: Shield },
    { name: "governance.dataProtection", href: "/data-protection", icon: Eye },
    { name: "governance.financialTransparency", href: "/financial-transparency", icon: FileText },
    { name: "governance.conflictOfInterest", href: "/conflict-of-interest", icon: Scale },
  ],
  organization: [
    { name: "nav.home", href: "/" },
    { name: "nav.about", href: "/about" },
    { name: "nav.programs", href: "/programs" },
    { name: "nav.activities", href: "/activities" },
    { name: "nav.contact", href: "/contact" },
    { name: "nav.staffPortal", href: "/staff" },
  ],
} as const;

function normalizePath(pathname: string) {
  const path = pathname.split("?")[0].split("#")[0];
  const trimmed = path.length > 1 ? path.replace(/\/+$/, "") : path;

  const parts = trimmed.split("/").filter(Boolean);
  const maybeLang = parts[0] as SupportedLanguage | undefined;

  if (maybeLang && SUPPORTED_LANGUAGES.includes(maybeLang)) {
    const rest = parts.slice(1).join("/");
    return rest ? `/${rest}` : "/";
  }

  return trimmed || "/";
}

function isRouteActive(currentPath: string, href: string) {
  if (!href || href === "#") return false;
  if (href === "/") return currentPath === "/";
  return currentPath === href || currentPath.startsWith(`${href}/`);
}

export function Footer() {
  const { t } = useTranslation();
  const location = useLocation();

  const currentPath = useMemo(
    () => normalizePath(location.pathname),
    [location.pathname],
  );

  const isActive = (href: string) => isRouteActive(currentPath, href);

  const footerLinkClass = (active: boolean) =>
    [
      "text-sm transition-colors",
      active
        ? "text-foreground font-medium"
        : "text-muted-foreground hover:text-foreground",
    ].join(" ");

  const footerLinkRowClass = (active: boolean) =>
    [
      "flex items-center gap-2 text-sm transition-colors",
      active
        ? "text-foreground font-medium"
        : "text-muted-foreground hover:text-foreground",
    ].join(" ");

  return (
    <footer className="bg-background border-t">
      <div className="section-container">
        <div className="grid grid-cols-1 gap-8 py-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand & Description */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/assets/0007.png"
                alt={t("app.name")}
                className="h-12 w-12 rounded-lg object-contain"
              />
              <div className="flex flex-col">
                <span className="text-lg font-bold text-foreground">07-20</span>
                <span className="text-sm text-muted-foreground">
                  {t("app.name")}
                </span>
              </div>
            </Link>

            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              {t("app.tagline")}
            </p>

            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{t("contact.locationValue")}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <a
                  href="mailto:contact@07-20.org"
                  className="hover:text-foreground"
                >
                  contact@07-20.org
                </a>
              </div>
            </div>

            {/* FOLLOW US */}
            <div className="mt-8">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
                {t("footer.followUs")}
              </h3>
              <div className="flex gap-3">
                {[
                  { icon: Facebook, label: "Facebook" },
                  { icon: Twitter, label: "Twitter" },
                  { icon: Instagram, label: "Instagram" },
                  { icon: Linkedin, label: "LinkedIn" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href="#"
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Programs */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              {t("footer.programs")}
            </h3>
            <ul className="space-y-2">
              {footerLinks.programs.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className={footerLinkRowClass(isActive(link.href))}>
                    {link.icon && <link.icon className="h-4 w-4" />}
                    {t(link.name)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Governance */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              {t("footer.governance")}
            </h3>
            <ul className="space-y-2">
              {footerLinks.governance.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className={footerLinkRowClass(isActive(link.href))}>
                    {link.icon && <link.icon className="h-4 w-4" />}
                    {t(link.name)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Organization */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              {t("footer.organization")}
            </h3>
            <ul className="space-y-2">
              {footerLinks.organization.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className={footerLinkClass(isActive(link.href))}>
                    {t(link.name)}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Map Section */}
            <div className="mt-8 space-y-3 rounded-lg border border-border bg-card p-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-0.5 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {t("contact.locationValue")}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {t("footer.addressNote")}
                  </p>
                </div>
              </div>
              <a
                href="https://www.openstreetmap.org/search?query=Trollhättan%2C%20Sweden"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-xs font-medium text-primary hover:underline"
              >
                {t("footer.viewMapFullScreen")}
              </a>
              <p className="text-xs text-muted-foreground pt-3 border-t">
                {t("footer.mapAttribution")}
              </p>
            </div>
          </div>
        </div>

        <div className="border-t"></div>

        <div className="flex flex-col items-center justify-between gap-4 py-6 md:flex-row">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{t("footer.copyright")}</span>
            <Heart className="h-3 w-3 text-red-500" />
          </div>

          <div className="text-center text-sm text-muted-foreground md:text-right">
            <p>{t("footer.nonProfitRegistration")}</p>
            <p className="mt-1">{t("footer.madeWithPassion")}</p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-6 border-t py-6 text-xs text-muted-foreground">
          <Link to="/privacy" className={isActive("/privacy") ? "text-foreground font-medium" : "hover:text-foreground transition-colors"}>
            {t("footer.privacyPolicy")}
          </Link>
          <Link to="/terms" className={isActive("/terms") ? "text-foreground font-medium" : "hover:text-foreground transition-colors"}>
            {t("footer.termsOfService")}
          </Link>
          <Link to="/cookies" className={isActive("/cookies") ? "text-foreground font-medium" : "hover:text-foreground transition-colors"}>
            {t("footer.cookiePolicy")}
          </Link>
          <Link to="/sitemap" className={isActive("/sitemap") ? "text-foreground font-medium" : "hover:text-foreground transition-colors"}>
            {t("footer.sitemap")}
          </Link>
          <Link to="/imprint" className={isActive("/imprint") ? "text-foreground font-medium" : "hover:text-foreground transition-colors"}>
            {t("footer.imprint")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
