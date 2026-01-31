import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { Button } from "@/components/ui/button";
import { BookOpen, Trophy, Users, Palette, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export function ProgramsSection() {
  const { t } = useTranslation();

  const programs = [
    {
      title: t("programs.schoolSupport"),
      description: t("programs.schoolSupportDescription"),
      icon: BookOpen,
      href: "/programs/school-support",
      color: "bg-info/10 text-info",
    },
    {
      title: t("programs.footballDevelopment"),
      description: t("programs.footballDescription"),
      icon: Trophy,
      href: "/programs/football",
      color: "bg-warning/10 text-warning",
    },
    {
      title: t("programs.mentorship"),
      description: t("programs.mentorshipDescription"),
      icon: Users,
      href: "/programs/mentorship",
      color: "bg-success/10 text-success",
    },
    {
      title: t("programs.creativeSkills"),
      description: t("programs.creativeSkillsDescription"),
      icon: Palette,
      href: "/programs/creative-skills",
      color: "bg-primary/10 text-primary",
    },
  ];

  return (
    <section className="relative overflow-hidden border-t border-border/40 bg-muted/30">
      <div className="section-container py-16 lg:py-20">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {t("home.programsTitle")}
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">
              {t("home.programsSubtitle")}
            </p>
          </div>
          <Link to="/programs">
            <Button variant="outline" className="w-full lg:w-auto">
              {t("home.viewAllPrograms")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {programs.map((program) => (
            <Link key={program.title} to={program.href} className="group">
              <div className="card-elevated h-full p-6 transition-all duration-300 hover:scale-[1.02]">
                <div className={`inline-flex rounded-xl p-3 ${program.color}`}>
                  <program.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-foreground group-hover:text-primary">
                  {program.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-4">
                  {program.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
