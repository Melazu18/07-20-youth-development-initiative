import { Layout } from "@/components/layout/Layout";
import { FileText, PieChart, Shield, Download, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const fundingSources = [
  { name: "Municipal Support", percentage: 40 },
  { name: "Grants & Foundations", percentage: 30 },
  { name: "Corporate Sponsors", percentage: 20 },
  { name: "Donations", percentage: 10 },
];

const allocations = [
  { name: "Programs & Activities", percentage: 60 },
  { name: "Staff & Training", percentage: 20 },
  { name: "Facilities & Equipment", percentage: 15 },
  { name: "Administration", percentage: 5 },
];

const FinancialTransparency = () => {
  return (
    <Layout>
      <div className="section-container py-12 lg:py-20">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <FileText className="h-4 w-4" />
            Financial Governance
          </div>
          <h1 className="mt-4 font-display text-4xl font-bold text-foreground sm:text-5xl">
            Financial Transparency
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            We are committed to complete transparency in how we receive and allocate funds. 
            Our financial practices meet the standards required by municipalities, Vinnova, 
            and other stakeholders.
          </p>
        </div>

        {/* Funding Overview */}
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5 text-primary" />
                Funding Sources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {fundingSources.map((source) => (
                  <div key={source.name}>
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground">{source.name}</span>
                      <span className="font-medium text-foreground">{source.percentage}%</span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-secondary">
                      <div 
                        className="h-2 rounded-full bg-primary transition-all"
                        style={{ width: `${source.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5 text-accent" />
                Fund Allocation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {allocations.map((item) => (
                  <div key={item.name}>
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground">{item.name}</span>
                      <span className="font-medium text-foreground">{item.percentage}%</span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-secondary">
                      <div 
                        className="h-2 rounded-full bg-accent transition-all"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reports Section */}
        <div className="mt-16 max-w-3xl space-y-8">
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground">Annual Reports</h2>
            <p className="mt-4 text-muted-foreground">
              We publish comprehensive annual financial reports that detail our income, 
              expenditures, and program outcomes. All reports undergo independent audit review.
            </p>
            <div className="mt-6 rounded-lg border border-border bg-secondary/30 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Calendar className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="font-semibold text-foreground">Annual Report Archive</h3>
                    <p className="text-sm text-muted-foreground">
                      Access previous years' financial reports
                    </p>
                  </div>
                </div>
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  View Reports
                </Button>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-foreground">Audit Policy</h2>
            <p className="mt-4 text-muted-foreground">
              Our accounts are reviewed annually by an independent auditor. Audit reports 
              are made available to stakeholders and can be requested through our contact form.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-foreground">Anti-Fraud Prevention</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {[
                { title: "Dual Authorization", desc: "All major expenditures require dual sign-off" },
                { title: "Regular Reconciliation", desc: "Monthly financial reconciliation processes" },
                { title: "Whistleblower Protection", desc: "Anonymous reporting channels available" },
                { title: "Board Oversight", desc: "Financial oversight by independent board members" },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3 rounded-lg border border-border p-4">
                  <Shield className="h-5 w-5 shrink-0 text-success" />
                  <div>
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default FinancialTransparency;
