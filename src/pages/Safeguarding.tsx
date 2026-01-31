import { Layout } from "@/components/layout/Layout";
import { Shield, AlertTriangle, Phone, FileText, Users, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

const Safeguarding = () => {
  const { t } = useTranslation();

  const policies = [
    {
      title: t("governanceContent.safeguarding.policies.zeroTolerance.title"),
      description: t("governanceContent.safeguarding.policies.zeroTolerance.desc"),
      icon: AlertTriangle,
    },
    {
      title: t("governanceContent.safeguarding.policies.backgroundChecks.title"),
      description: t("governanceContent.safeguarding.policies.backgroundChecks.desc"),
      icon: Users,
    },
    {
      title: t("governanceContent.safeguarding.policies.codeOfConduct.title"),
      description: t("governanceContent.safeguarding.policies.codeOfConduct.desc"),
      icon: FileText,
    },
    {
      title: t("governanceContent.safeguarding.policies.reporting.title"),
      description: t("governanceContent.safeguarding.policies.reporting.desc"),
      icon: Phone,
    },
  ];

  const principles = [
    t("governanceContent.safeguarding.principles.1"),
    t("governanceContent.safeguarding.principles.2"),
    t("governanceContent.safeguarding.principles.3"),
    t("governanceContent.safeguarding.principles.4"),
    t("governanceContent.safeguarding.principles.5"),
  ];

  return (
    <Layout>
      <div className="section-container py-12 lg:py-20">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Shield className="h-4 w-4" />
            {t("governanceContent.badge")}
          </div>
          <h1 className="mt-4 font-display text-4xl font-bold text-foreground sm:text-5xl">
            {t("governancePages.safeguardingTitle")}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            {t("governanceContent.safeguarding.lead")}
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
            <h2 className="font-display text-2xl font-bold text-foreground">
              {t("governanceContent.safeguarding.commitmentTitle")}
            </h2>
            <p className="mt-4 text-muted-foreground">{t("governanceContent.safeguarding.commitmentBody")}</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-foreground">
              {t("governanceContent.safeguarding.principlesTitle")}
            </h2>
            <ul className="mt-4 space-y-3">
              {principles.map((principle, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                  <span className="text-muted-foreground">{principle}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-foreground">
              {t("governanceContent.safeguarding.reportingTitle")}
            </h2>
            <p className="mt-4 text-muted-foreground">{t("governanceContent.safeguarding.reportingBody")}</p>
            <div className="mt-6 rounded-lg border border-border bg-secondary/30 p-6">
              <h3 className="font-semibold text-foreground">{t("governanceContent.safeguarding.contactTitle")}</h3>
              <p className="mt-2 text-muted-foreground">
                {t("governanceContent.safeguarding.contactEmail")}
                <br />
                {t("governanceContent.safeguarding.contactNote")}
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-foreground">
              {t("governanceContent.safeguarding.ackTitle")}
            </h2>
            <p className="mt-4 text-muted-foreground">{t("governanceContent.safeguarding.ackBody")}</p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Safeguarding;
