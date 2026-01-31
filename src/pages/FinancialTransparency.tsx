import { Layout } from "@/components/layout/Layout";
import { FileText, Shield, PieChart, Building2, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const FinancialTransparency = () => {
  const { t } = useTranslation();

  const sections = [
    { title: t("governanceContent.financial.sections.fundingSources"), body: t("governanceContent.financial.bodies.fundingSources"), icon: Building2 },
    { title: t("governanceContent.financial.sections.fundAllocation"), body: t("governanceContent.financial.bodies.fundAllocation"), icon: PieChart },
    { title: t("governanceContent.financial.sections.auditPolicy"), body: t("governanceContent.financial.bodies.auditPolicy"), icon: Shield },
    { title: t("governanceContent.financial.sections.antiFraud"), body: t("governanceContent.financial.bodies.antiFraud"), icon: CheckCircle },
  ];

  return (
    <Layout>
      <div className="section-container py-12 lg:py-20">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <FileText className="h-4 w-4" />
            {t("governanceContent.badge")}
          </div>
          <h1 className="mt-4 font-display text-4xl font-bold text-foreground sm:text-5xl">
            {t("governancePages.financialTitle")}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            {t("governanceContent.financial.lead")}
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {sections.map((s) => (
            <Card key={s.title} className="border-border">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <s.icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{s.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{s.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 max-w-3xl space-y-8">
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground">
              {t("governanceContent.financial.reportsTitle")}
            </h2>
            <p className="mt-4 text-muted-foreground">{t("governanceContent.financial.reportsBody")}</p>

            <div className="mt-6 rounded-lg border border-border bg-secondary/30 p-6">
              <h3 className="font-semibold text-foreground">{t("governanceContent.financial.archiveTitle")}</h3>
              <div className="mt-4 space-y-3">
                <Button variant="outline" className="w-full justify-start" disabled>
                  <FileText className="mr-2 h-4 w-4" />
                  {t("governanceContent.financial.actions.viewReports")}
                </Button>
                <Button variant="outline" className="w-full justify-start" disabled>
                  <FileText className="mr-2 h-4 w-4" />
                  {t("governanceContent.financial.actions.accessArchive")}
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default FinancialTransparency;
