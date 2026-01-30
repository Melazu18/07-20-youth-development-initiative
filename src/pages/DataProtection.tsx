import { Layout } from "@/components/layout/Layout";
import { Eye, Database, Clock, Shield, FileText, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const dataCategories = [
  {
    title: "What We Collect",
    description: "Personal information necessary for program participation, including names, contact details, and development records.",
    icon: Database,
  },
  {
    title: "How We Use It",
    description: "Data is used solely for program delivery, progress tracking, and reporting to stakeholders with proper consent.",
    icon: FileText,
  },
  {
    title: "Data Retention",
    description: "Personal data is retained only as long as necessary for program purposes, with clear deletion timelines.",
    icon: Clock,
  },
  {
    title: "Security Measures",
    description: "All data is encrypted, stored on EU-based servers, and protected by industry-standard security protocols.",
    icon: Shield,
  },
];

const DataProtection = () => {
  return (
    <Layout>
      <div className="section-container py-12 lg:py-20">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Eye className="h-4 w-4" />
            GDPR Compliance
          </div>
          <h1 className="mt-4 font-display text-4xl font-bold text-foreground sm:text-5xl">
            Data Protection Policy
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            We are committed to protecting your personal data in full compliance with the 
            General Data Protection Regulation (GDPR) and Swedish data protection laws.
          </p>
        </div>

        {/* Data Categories */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {dataCategories.map((category) => (
            <Card key={category.title} className="border-border">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <category.icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{category.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{category.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Your Rights */}
        <div className="mt-16 max-w-3xl space-y-8">
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground">Your Rights</h2>
            <p className="mt-4 text-muted-foreground">
              Under GDPR, you have the following rights regarding your personal data:
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                { title: "Right to Access", desc: "Request a copy of your personal data" },
                { title: "Right to Rectification", desc: "Request correction of inaccurate data" },
                { title: "Right to Erasure", desc: "Request deletion of your data" },
                { title: "Right to Portability", desc: "Receive your data in a portable format" },
                { title: "Right to Object", desc: "Object to certain processing activities" },
                { title: "Right to Restrict", desc: "Request limited processing of your data" },
              ].map((right) => (
                <div key={right.title} className="rounded-lg border border-border p-4">
                  <h3 className="font-semibold text-foreground">{right.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{right.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-foreground">Exercise Your Rights</h2>
            <p className="mt-4 text-muted-foreground">
              Registered users can manage their data directly through their account dashboard. 
              The following options are available:
            </p>
            <div className="mt-6 flex flex-col gap-4 sm:flex-row">
              <Button variant="outline" className="gap-2">
                <FileText className="h-4 w-4" />
                Request My Data
              </Button>
              <Button variant="outline" className="gap-2 text-destructive hover:text-destructive">
                <Trash2 className="h-4 w-4" />
                Delete My Account
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Note: Sign in required to access these features. Requests are processed within 30 days.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-foreground">Data Protection Officer</h2>
            <div className="mt-4 rounded-lg border border-border bg-secondary/30 p-6">
              <h3 className="font-semibold text-foreground">Contact Our DPO</h3>
              <p className="mt-2 text-muted-foreground">
                For data protection inquiries or to exercise your rights:<br />
                Email: dpo@07-20.org
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-foreground">Consent Management</h2>
            <p className="mt-4 text-muted-foreground">
              All registration forms include GDPR consent checkboxes. Consent can be withdrawn 
              at any time through your account settings or by contacting our Data Protection Officer.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default DataProtection;
