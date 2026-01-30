import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
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

/**
 * Top-level site navigation.
 *
 * Routes are implemented in `src/App.tsx`.
 */
const navigation = [
  { key: "nav.home", href: "/" },
  { key: "nav.about", href: "/about" },
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
];

export function Header() {
  const { profile } = useAuth();
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => location.pathname === href;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="section-container flex h-16 items-center justify-between">
        {/* Brand logo - Enhanced Professional Version */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative flex items-center gap-3">
            {/* Logo with subtle background */}
            <div className="relative h-12 w-12 flex items-center justify-center rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-border/50">
              <img
                src="/assets/00007.png"
                alt="07–20 Youth Development Initiative logo"
                className="h-10 w-10 object-contain transition-transform group-hover:scale-105"
                loading="eager"
              />
            </div>

            {/* Text container with improved typography */}
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

          {/* Optional: Add a vertical separator */}
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
                    className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
                  >
                    {t(item.key)}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  {item.children.map((child) => (
                    <DropdownMenuItem key={child.href} asChild>
                      <Link
                        to={child.href}
                        className={isActive(child.href) ? "bg-secondary" : ""}
                      >
                        {t(child.key)}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link key={item.key} to={item.href}>
                <Button
                  variant="ghost"
                  className={`text-sm font-medium ${
                    isActive(item.href)
                      ? "text-foreground bg-secondary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
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
              <span className="sr-only">Open menu</span>
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
                  className="text-sm font-medium text-foreground"
                >
                  {t("nav.staffPortal")}
                </Link>
              ) : null}

              {navigation.map((item) =>
                item.children ? (
                  <div key={item.key} className="space-y-2">
                    <span className="text-sm font-semibold text-foreground">
                      {t(item.key)}
                    </span>
                    <div className="ml-4 flex flex-col gap-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-sm text-muted-foreground hover:text-foreground"
                        >
                          {t(child.key)}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.key}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-sm font-medium ${
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
