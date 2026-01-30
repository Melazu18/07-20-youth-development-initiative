import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/lib/auth";
import { Shield, AlertTriangle, Phone, FileText, Users, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const policies = [
  {
    title: "Zero Tolerance",
    description: "We maintain zero tolerance for abuse, neglect, exploitation, or harassment of any kind.",
    icon: AlertTriangle,
  },
  {
    title: "Background Checks",
    description: "All staff, volunteers, and coaches undergo mandatory background checks before working with children.",
    icon: Users,
  },
  {
    title: "Code of Conduct",
    description: "Clear behavioral standards for all adults interacting with young people in our programs.",
    icon: FileText,
  },
  {
    title: "Reporting Procedures",
    description: "Confidential and accessible channels for reporting any safeguarding concerns.",
    icon: Phone,
  },
];

const Safeguarding = () => {
  return (
    <Layout>
      <div className="section-container py-12 lg:py-20">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Shield className="h-4 w-4" />
            Governance Policy
          </div>
          <h1 className="mt-4 font-display text-4xl font-bold text-foreground sm:text-5xl">
            Child Safeguarding Policy
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            The safety and wellbeing of every young person in our programs is our highest priority. 
            This policy outlines our commitment to creating a safe environment for all participants.
          </p>
        </div>

        {/* Policy Cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {policies.map((policy) => (
            <Card key={policy.title} className="border-border">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <policy.icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{policy.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{policy.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detailed Policy */}
        <div className="mt-16 max-w-3xl space-y-8">
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground">Our Commitment</h2>
            <p className="mt-4 text-muted-foreground">
              07–20 Youth Development Initiative is committed to safeguarding and promoting the 
              welfare of children and young people. We expect all staff, volunteers, coaches, 
              and partner organizations to share this commitment.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-foreground">Key Principles</h2>
            <ul className="mt-4 space-y-3">
              {[
                "The welfare of children is paramount in all our work",
                "All children have the right to protection from abuse and exploitation",
                "Safeguarding is everyone's responsibility",
                "We work in partnership with families and communities",
                "We maintain transparent and accountable practices",
              ].map((principle, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                  <span className="text-muted-foreground">{principle}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-foreground">Reporting Concerns</h2>
            <p className="mt-4 text-muted-foreground">
              If you have any safeguarding concerns, please contact our designated safeguarding 
              lead immediately. All reports are handled confidentially and in accordance with 
              Swedish law and best practices.
            </p>
            <div className="mt-6 rounded-lg border border-border bg-secondary/30 p-6">
              <h3 className="font-semibold text-foreground">Safeguarding Contact</h3>
              <p className="mt-2 text-muted-foreground">
                Email: safeguarding@07-20.org<br />
                All staff and volunteers are required to acknowledge this policy upon joining.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-foreground">Policy Acknowledgement</h2>
            <p className="mt-4 text-muted-foreground">
              All staff and volunteers must digitally acknowledge and sign this policy upon 
              account creation. Signed acknowledgements are exportable as PDF for compliance 
              documentation.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Safeguarding;
