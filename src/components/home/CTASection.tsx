import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Calendar, Heart } from "lucide-react";
import { useTranslation } from "react-i18next";

export function CTASection() {
  const { t } = useTranslation();

  const roles = [
    {
      title: t("home.volunteer"),
      description: t("home.volunteerDesc"),
      icon: Heart,
      href: "/volunteer",
    },
    {
      title: t("home.mentor"),
      description: t("home.mentorDesc"),
      icon: Users,
      href: "/auth?mode=signup&role=mentor",
    },
    {
      title: t("home.partner"),
      description: t("home.partnerDesc"),
      icon: Calendar,
      href: "/contact",
    },
  ];

  return (
    <section className="relative overflow-hidden border-t border-border/40 bg-muted/30">
      <div className="section-container py-16 lg:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("home.joinCommunityTitle")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            {t("home.joinCommunitySubtitle")}
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {roles.map((role) => (
            <Link key={role.title} to={role.href} className="group">
              <div className="card-elevated h-full p-6 transition-all duration-300 hover:scale-[1.02]">
                <role.icon className="h-10 w-10 text-primary" />
                <h3 className="mt-4 text-xl font-semibold text-foreground group-hover:text-primary">
                  {role.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{role.description}</p>
                <div className="mt-6 inline-flex items-center text-sm font-medium text-primary">
                  {t("common.learnMore")}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/auth?mode=signup">
            <Button size="lg" className="bg-gradient-hero hover:opacity-90">
              {t("home.createAccount")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
