import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Calendar, Heart } from "lucide-react";

const roles = [
  {
    title: "Volunteer",
    description: "Share your skills and time to make a difference",
    icon: Heart,
    href: "/volunteer",
  },
  {
    title: "Mentor",
    description: "Guide and inspire the next generation",
    icon: Users,
    href: "/auth?mode=signup&role=mentor",
  },
  {
    title: "Partner",
    description: "Collaborate as a school, club, or organization",
    icon: Calendar,
    href: "/contact",
  },
];

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero py-16 lg:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
      
      <div className="section-container relative">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold text-primary-foreground sm:text-4xl">
            Join Our Community
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/80">
            Whether you're a young person seeking growth, a parent looking for support, 
            or someone who wants to contribute, there's a place for you here.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {roles.map((role) => (
            <Link
              key={role.title}
              to={role.href}
              className="group rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 p-6 transition-all hover:bg-white/15"
            >
              <role.icon className="h-10 w-10 text-accent" />
              <h3 className="mt-4 text-xl font-semibold text-primary-foreground">
                {role.title}
              </h3>
              <p className="mt-2 text-primary-foreground/70">
                {role.description}
              </p>
              <div className="mt-4 flex items-center text-sm font-medium text-accent">
                Get started
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/auth?mode=signup">
            <Button 
              size="lg" 
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              Create Your Account
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
