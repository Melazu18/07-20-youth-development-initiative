import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ChevronDown } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { SUPPORTED_LANGUAGES, type SupportedLanguage } from "@/i18n";

type NavChild = {
  key: string;
  href: string;
  descriptionKey?: string; // optional (used for org dropdown)
  imageSrc?: string; // optional (used for org dropdown)
};

type NavItem = {
  key: string;
  href: string;
  children?: readonly NavChild[];
};

/**
 * Top-level site navigation.
 *
 * Routes are implemented in `src/App.tsx`.
 */
const navigation = [
  { key: "nav.home", href: "/" },
  { key: "nav.about", href: "/about" },

  // ✅ Organization dropdown (Team / Founder / Board / Volunteers)
  {
    key: "nav.organizationMenu",
    href: "/team",
    children: [
      {
        key: "nav.founder",
        href: "/team/founder",
        descriptionKey: "team.dropdown.founderRole",
        imageSrc: "/assets/team/profilePix.png",
      },
      {
        key: "nav.board",
        href: "/team/board",
        descriptionKey: "team.dropdown.boardRole",
        imageSrc: "/assets/team/board.jpg",
      },
      {
        key: "nav.volunteers",
        href: "/team/volunteers",
        descriptionKey: "team.dropdown.volunteersRole",
        imageSrc: "/assets/team/volunteers.jpg",
      },
    ],
  },

  {
    key: "nav.programs",
    href: "/programs",
    children: [
      { key: "programs.schoolSupport", href: "/programs/school-support" },
      { key: "programs.footballDevelopment", href: "/programs/football" },
      { key: "programs.mentorship", href: "/programs/mentorship" },
      { key: "programs.creativeSkills", href: "/programs/creative-skills" },
      {
        key: "programs.socialIntegrationTitle",
        href: "/programs/social-integration",
      },
    ],
  },
  { key: "nav.activities", href: "/activities" },
  {
    key: "nav.governance",
    href: "#",
    children: [
      { key: "governance.safeguarding", href: "/safeguarding" },
      { key: "governance.dataProtection", href: "/data-protection" },
      {
        key: "governance.financialTransparency",
        href: "/financial-transparency",
      },
      { key: "governance.conflictOfInterest", href: "/conflict-of-interest" },
    ],
  },
  { key: "nav.contact", href: "/contact" },
] as const satisfies readonly NavItem[];

function normalizePath(pathname: string) {
  // Remove query/hash (location.pathname shouldn’t include it, but keep safe).
  const path = pathname.split("?")[0].split("#")[0];

  // Strip trailing slash except root
  const trimmed = path.length > 1 ? path.replace(/\/+$/, "") : path;

  // Handle language prefix: "/en/about" => "/about"
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

  // Exact match for home
  if (href === "/") return currentPath === "/";

  // Active for the whole section
  return currentPath === href || currentPath.startsWith(`${href}/`);
}

function initialsFromKey(key: string) {
  // "nav.founder" => "F"
  const last = key.split(".").pop() || "";
  return (last[0] || "?").toUpperCase();
}

function Avatar({
  src,
  alt,
  fallback,
}: {
  src?: string;
  alt: string;
  fallback: string;
}) {
  const [imgOk, setImgOk] = useState(true);

  return (
    <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-border/50 bg-secondary/40">
      {src && imgOk ? (
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          loading="lazy"
          onError={() => setImgOk(false)}
        />
      ) : (
        <div className="h-full w-full grid place-items-center">
          <span className="text-xs font-semibold text-muted-foreground">
            {fallback}
          </span>
        </div>
      )}
    </div>
  );
}

export function Header() {
  const { profile } = useAuth();
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const currentPath = useMemo(
    () => normalizePath(location.pathname),
    [location.pathname],
  );

  // Close mobile menu when route changes (prevents “stuck open” state)
  useEffect(() => {
    if (mobileMenuOpen) setMobileMenuOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const isActive = (href: string) => isRouteActive(currentPath, href);

  const isAnyChildActive = (children?: readonly { href: string }[]) =>
    children?.some((c) => isActive(c.href)) ?? false;

  // Polished “active looks like hover” style:
  // - subtle background
  // - underline animation
  const navButtonClass = (active: boolean) =>
    [
      "relative text-sm font-medium transition-colors",
      "px-3",
      "hover:text-foreground hover:bg-secondary/50",
      active ? "text-foreground bg-secondary/60" : "text-muted-foreground",
      // underline animation
      "after:absolute after:left-3 after:right-3 after:-bottom-1 after:h-px after:rounded-full after:bg-foreground/60 after:transition-transform after:duration-200",
      active ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100",
    ].join(" ");

  const dropdownItemClass = (active: boolean) =>
    [
      "w-full rounded-sm px-2 py-1.5 transition-colors",
      active ? "bg-secondary text-foreground" : "hover:bg-secondary/50",
    ].join(" ");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="section-container flex h-16 items-center justify-between">
        {/* Brand logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative flex items-center gap-3">
            <div className="relative h-12 w-12 flex items-center justify-center rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-border/50">
              <img
                src="/assets/00007.png"
                alt={t("common.logoAlt")}
                className="h-10 w-10 object-contain transition-transform group-hover:scale-105"
                loading="eager"
              />
            </div>

            <div className="hidden sm:block">
              <div className="flex flex-col leading-tight">
                <span className="text-xl font-bold tracking-tight text-foreground">
                  07–20
                </span>
                <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
                  {t("app.name")}
                </span>
              </div>
            </div>
          </div>

          <div className="hidden md:block h-6 w-px bg-border/50 ml-2" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:items-center lg:gap-1">
          {navigation.map((item) =>
            item.children ? (
              <DropdownMenu key={item.key}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className={navButtonClass(
                      isActive(item.href) || isAnyChildActive(item.children),
                    )}
                  >
                    {t(item.key)}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>

                {/* Special layout for Organization menu (profile pictures + subtitles) */}
                {item.key === "nav.organizationMenu" ? (
                  <DropdownMenuContent
                    align="start"
                    side="bottom"
                    sideOffset={8}
                    collisionPadding={12}
                    avoidCollisions
                    forceMount
                    className="z-[60] w-80 p-2"
                  >
                    <div className="px-2 pb-2 pt-1">
                      <div className="text-xs font-semibold text-muted-foreground">
                        {t("nav.team")}
                      </div>
                    </div>

                    <div className="space-y-1">
                      {item.children.map((child) => {
                        const active = isActive(child.href);
                        const title = t(child.key);
                        const subtitle = child.descriptionKey
                          ? t(child.descriptionKey)
                          : "";

                        return (
                          <DropdownMenuItem key={child.href} asChild>
                            <Link
                              to={child.href}
                              className={[
                                "flex items-center gap-3 rounded-md px-2 py-2 transition-colors",
                                active
                                  ? "bg-secondary text-foreground"
                                  : "hover:bg-secondary/50",
                              ].join(" ")}
                            >
                              <Avatar
                                src={child.imageSrc}
                                alt={title}
                                fallback={initialsFromKey(child.key)}
                              />
                              <div className="flex min-w-0 flex-col">
                                <span className="text-sm font-medium leading-tight">
                                  {title}
                                </span>
                                {subtitle ? (
                                  <span className="text-xs text-muted-foreground leading-tight">
                                    {subtitle}
                                  </span>
                                ) : null}
                              </div>
                            </Link>
                          </DropdownMenuItem>
                        );
                      })}
                    </div>

                    <div className="mt-2 border-t border-border/50 pt-2">
                      <DropdownMenuItem asChild>
                        <Link
                          to="/team"
                          className="w-full rounded-md px-2 py-2 text-sm text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-colors"
                        >
                          {t("team.dropdown.viewAll")}
                        </Link>
                      </DropdownMenuItem>
                    </div>
                  </DropdownMenuContent>
                ) : (
                  <DropdownMenuContent
                    align="start"
                    side="bottom"
                    sideOffset={8}
                    collisionPadding={12}
                    avoidCollisions
                    forceMount
                    className="z-[60] w-56"
                  >
                    {item.children.map((child) => {
                      const active = isActive(child.href);
                      return (
                        <DropdownMenuItem key={child.href} asChild>
                          <Link
                            to={child.href}
                            className={dropdownItemClass(active)}
                          >
                            {t(child.key)}
                          </Link>
                        </DropdownMenuItem>
                      );
                    })}
                  </DropdownMenuContent>
                )}
              </DropdownMenu>
            ) : (
              <Link key={item.key} to={item.href}>
                <Button
                  variant="ghost"
                  className={navButtonClass(isActive(item.href))}
                >
                  {t(item.key)}
                </Button>
              </Link>
            ),
          )}
        </div>

        {/* CTA Buttons */}
        <div className="hidden lg:flex lg:items-center lg:gap-3">
          <LanguageSwitcher />

          {profile &&
            ["volunteer", "staff", "board", "admin"].includes(profile.role) && (
              <Link to="/staff" className="hidden lg:inline-flex">
                <Button variant="outline">{t("nav.staffPortal")}</Button>
              </Link>
            )}

          {profile?.role === "admin" && (
            <Link to="/admin" className="hidden lg:inline-flex">
              <Button variant="outline">{t("nav.admin")}</Button>
            </Link>
          )}

          <Link to="/auth">
            <Button variant="outline" size="sm">
              {t("nav.login")}
            </Button>
          </Link>

          <Link to="/auth?mode=signup">
            <Button size="sm" className="bg-gradient-hero hover:opacity-90">
              {t("home.ctaSecondary")}
            </Button>
          </Link>
        </div>

        {/* Mobile Menu */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">{t("common.openMenu")}</span>
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-full max-w-sm">
            <div className="flex flex-col gap-6 py-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">
                  {t("common.language")}
                </span>
                <LanguageSwitcher />
              </div>

              {profile &&
              ["volunteer", "staff", "board", "admin"].includes(
                profile.role,
              ) ? (
                <Link
                  to="/staff"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm font-medium transition-colors ${
                    isActive("/staff")
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t("nav.staffPortal")}
                </Link>
              ) : null}

              {navigation.map((item) =>
                item.children ? (
                  <div key={item.key} className="space-y-2">
                    <span
                      className={`text-sm font-semibold ${
                        isActive(item.href) || isAnyChildActive(item.children)
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {t(item.key)}
                    </span>

                    <div className="ml-4 flex flex-col gap-2">
                      {item.children.map((child) => {
                        const active = isActive(child.href);
                        return (
                          <Link
                            key={child.href}
                            to={child.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`text-sm transition-colors ${
                              active
                                ? "text-foreground font-medium"
                                : "text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            {t(child.key)}
                          </Link>
                        );
                      })}

                      {/* "View full team page" on mobile only for org menu */}
                      {item.key === "nav.organizationMenu" ? (
                        <Link
                          to="/team"
                          onClick={() => setMobileMenuOpen(false)}
                          className={`text-sm transition-colors ${
                            isActive("/team")
                              ? "text-foreground font-medium"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {t("team.dropdown.viewAll")}
                        </Link>
                      ) : null}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.key}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {t(item.key)}
                  </Link>
                ),
              )}

              <div className="mt-4 flex flex-col gap-3">
                {profile &&
                ["volunteer", "staff", "board", "admin"].includes(
                  profile.role,
                ) ? (
                  <Link to="/staff" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full">
                      {t("nav.staffPortal")}
                    </Button>
                  </Link>
                ) : null}

                <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    {t("nav.login")}
                  </Button>
                </Link>

                <Link
                  to="/auth?mode=signup"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button className="w-full bg-gradient-hero hover:opacity-90">
                    {t("home.ctaSecondary")}
                  </Button>
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
