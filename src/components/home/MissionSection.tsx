import { Shield, Eye, FileText, Scale } from "lucide-react";
import { Link } from "react-router-dom";

const pillars = [
  {
    title: "Child Safeguarding",
    description: "Zero-tolerance policy for abuse with mandatory background checks and clear reporting procedures.",
    icon: Shield,
    href: "/safeguarding",
  },
  {
    title: "Data Protection",
    description: "Full GDPR compliance with transparent data handling, retention policies, and user rights.",
    icon: Eye,
    href: "/data-protection",
  },
  {
    title: "Financial Transparency",
    description: "Open reporting on funding allocation, annual audits, and anti-fraud prevention measures.",
    icon: FileText,
    href: "/financial-transparency",
  },
  {
    title: "Ethical Governance",
    description: "Clear conflict of interest policies, disclosure requirements, and accountability structures.",
    icon: Scale,
    href: "/conflict-of-interest",
  },
];

export function MissionSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="section-container">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Content */}
          <div>
            <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
              Built on Trust,
              <span className="block text-primary">Committed to Excellence</span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Operating under the <strong>Made By Young Hands</strong> youth development model, 
              we connect schools, sports clubs, families, and community partners into a unified 
              system that tracks development, participation, and long-term outcomes.
            </p>
            <p className="mt-4 text-muted-foreground">
              Our platform meets the rigorous standards reviewed by municipalities, Vinnova, 
              schools, sports federations, corporate sponsors, and NGOs across Sweden.
            </p>
          </div>

          {/* Governance pillars */}
          <div className="grid gap-4 sm:grid-cols-2">
            {pillars.map((pillar, index) => (
              <Link
                key={pillar.title}
                to={pillar.href}
                className="group rounded-lg border border-border bg-card p-5 transition-all hover:border-primary/20 hover:shadow-card"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <pillar.icon className="h-8 w-8 text-primary" />
                <h3 className="mt-3 font-semibold text-foreground group-hover:text-primary transition-colors">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {pillar.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
