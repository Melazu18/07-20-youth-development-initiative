import { Layout } from "@/components/layout/Layout";
import { Scale, AlertCircle, FileCheck, Users, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const conflictTypes = [
  {
    title: "Financial Conflicts",
    description: "Personal financial interests that could influence decisions, including investments, business relationships, or compensation.",
    icon: AlertCircle,
  },
  {
    title: "Relational Conflicts",
    description: "Family relationships, friendships, or other personal connections that could create bias in decision-making.",
    icon: Users,
  },
  {
    title: "Organizational Conflicts",
    description: "Roles or positions in other organizations that may compete with or influence our mission and activities.",
    icon: FileCheck,
  },
];

const ConflictOfInterest = () => {
  return (
    <Layout>
      <div className="section-container py-12 lg:py-20">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Scale className="h-4 w-4" />
            Ethical Governance
          </div>
          <h1 className="mt-4 font-display text-4xl font-bold text-foreground sm:text-5xl">
            Conflict of Interest Policy
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Maintaining ethical standards and impartiality in all our operations. This policy 
            ensures transparency and accountability in decision-making processes.
          </p>
        </div>

        {/* Conflict Types */}
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {conflictTypes.map((type) => (
            <Card key={type.title} className="border-border">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <type.icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{type.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{type.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Policy Details */}
        <div className="mt-16 max-w-3xl space-y-8">
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground">Disclosure Requirements</h2>
            <p className="mt-4 text-muted-foreground">
              All board members, staff, and key partners are required to disclose any actual, 
              potential, or perceived conflicts of interest upon joining the organization and 
              whenever a new conflict arises.
            </p>
            <ul className="mt-4 space-y-3">
              {[
                "Annual disclosure forms completed by all board members and senior staff",
                "Immediate disclosure when new conflicts arise during the year",
                "Disclosure of family members' relevant interests and positions",
                "Declaration of any gifts, hospitality, or benefits received",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-foreground">Recusal Procedures</h2>
            <p className="mt-4 text-muted-foreground">
              When a conflict of interest is identified, the following procedures apply:
            </p>
            <div className="mt-6 space-y-4">
              {[
                { step: "1", title: "Disclosure", desc: "The individual must immediately disclose the conflict to the board or relevant supervisor." },
                { step: "2", title: "Assessment", desc: "The conflict is assessed to determine its nature and potential impact on decisions." },
                { step: "3", title: "Recusal", desc: "The individual must recuse themselves from any discussion, voting, or decision-making related to the matter." },
                { step: "4", title: "Documentation", desc: "All conflicts and recusals are documented in meeting minutes and the conflict register." },
              ].map((item) => (
                <div key={item.step} className="flex gap-4 rounded-lg border border-border p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-foreground">Transparency Reporting</h2>
            <p className="mt-4 text-muted-foreground">
              We maintain a register of all declared conflicts of interest. Summary information 
              is included in our annual governance report to ensure stakeholders can verify our 
              commitment to ethical operations.
            </p>
            <div className="mt-6 rounded-lg border border-border bg-secondary/30 p-6">
              <h3 className="font-semibold text-foreground">Internal Disclosure Process</h3>
              <p className="mt-2 text-muted-foreground">
                Staff and board members can submit conflict of interest disclosures through 
                the internal portal. All submissions are reviewed by an admin-only review panel.
              </p>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default ConflictOfInterest;
