import { Shield, Eye, FileText, Scale } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function MissionSection() {
  const { t } = useTranslation();

  const pillars = [
    {
      title: t("home.childSafeguardingPolicy"),
      description: t("home.missionPillars.safeguardingDesc"),
      icon: Shield,
      href: "/safeguarding",
    },
    {
      title: t("home.dataProtection"),
      description: t("home.missionPillars.dataProtectionDesc"),
      icon: Eye,
      href: "/data-protection",
    },
    {
      title: t("home.financialTransparency"),
      description: t("home.missionPillars.financialDesc"),
      icon: FileText,
      href: "/financial-transparency",
    },
    {
      title: t("home.ethicalGovernance"),
      description: t("home.missionPillars.ethicalDesc"),
      icon: Scale,
      href: "/conflict-of-interest",
    },
  ];

  return (
    <section className="relative overflow-hidden border-t border-border/40 bg-background">
      <div className="section-container py-16 lg:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("home.missionTitle")}
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
            {t("home.missionBody")}
          </p>
          <p className="mx-auto mt-4 max-w-3xl text-base text-muted-foreground">
            {t("home.missionStandards")}
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar) => (
            <Link key={pillar.title} to={pillar.href} className="group">
              <div className="card-elevated h-full p-6 transition-all duration-300 hover:scale-[1.02]">
                <pillar.icon className="h-9 w-9 text-primary" />
                <h3 className="mt-4 text-lg font-semibold text-foreground group-hover:text-primary">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{pillar.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
