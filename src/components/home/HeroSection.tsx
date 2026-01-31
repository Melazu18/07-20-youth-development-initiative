import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, BookOpen, Trophy, Heart } from "lucide-react";
import { useTranslation } from "react-i18next";

export function HeroSection() {
  const { t } = useTranslation();

  const stats = [
    { label: t("home.stats.ageRange"), value: t("home.stats.ageRangeValue"), icon: Users },
    { label: t("home.stats.programs"), value: t("home.stats.programsValue"), icon: BookOpen },
    { label: t("home.stats.focusAreas"), value: t("home.stats.focusAreasValue"), icon: Trophy },
    { label: t("home.stats.communityPartners"), value: t("home.stats.communityPartnersValue"), icon: Heart },
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-hero opacity-[0.03]" />

      <div className="section-container relative py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent-foreground">
              <span className="flex h-2 w-2 rounded-full bg-accent" />
              {t("home.basedIn")}
            </div>

            <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {t("home.heroTitle")}
            </h1>

            <p className="max-w-xl text-lg text-muted-foreground">
              {t("home.heroSubtitle")}
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link to="/programs">
                <Button size="lg" className="w-full bg-gradient-hero hover:opacity-90 sm:w-auto">
                  {t("nav.programs")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/auth?mode=signup">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  {t("home.ctaSecondary")}
                </Button>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center gap-6 pt-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-success" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>{t("home.gdprCompliant")}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-success" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>{t("home.childSafeguarding")}</span>
              </div>
            </div>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="card-elevated p-6 transition-all duration-300 hover:scale-[1.02]"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <stat.icon className="h-8 w-8 text-primary" />
                <div className="mt-4">
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
