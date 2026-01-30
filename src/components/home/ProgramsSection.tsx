import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Trophy, Users, Palette, ArrowRight } from "lucide-react";

const programs = [
  {
    title: "School Support",
    description: "Academic tutoring, homework help, and educational guidance to ensure every young person reaches their full potential.",
    icon: BookOpen,
    href: "/programs/school-support",
    color: "bg-info/10 text-info",
  },
  {
    title: "Football Development",
    description: "Structured sports training with a strong focus on girls' football retention, building teamwork and discipline.",
    icon: Trophy,
    href: "/programs/football",
    color: "bg-success/10 text-success",
  },
  {
    title: "Mentorship",
    description: "Connecting young people with experienced mentors who guide, support, and inspire their personal development.",
    icon: Users,
    href: "/programs/mentorship",
    color: "bg-accent/10 text-accent-foreground",
  },
  {
    title: "Creative Skills",
    description: "Artistic expression, digital skills, and creative workshops that nurture imagination and build confidence.",
    icon: Palette,
    href: "/programs/creative-skills",
    color: "bg-primary/10 text-primary",
  },
];

export function ProgramsSection() {
  return (
    <section className="bg-secondary/30 py-16 lg:py-24">
      <div className="section-container">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
            Our Development Programs
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Comprehensive pathways designed to support every aspect of youth development, 
            from academic achievement to personal growth.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {programs.map((program, index) => (
            <Link
              key={program.title}
              to={program.href}
              className="group card-elevated p-6 transition-all duration-300 hover:scale-[1.02]"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`inline-flex rounded-lg p-3 ${program.color}`}>
                <program.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {program.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {program.description}
              </p>
              <div className="mt-4 flex items-center text-sm font-medium text-primary">
                Learn more
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/programs">
            <Button variant="outline" size="lg">
              View All Programs
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
