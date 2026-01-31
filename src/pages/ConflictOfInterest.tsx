import { Layout } from "@/components/layout/Layout";
import { Scale, AlertTriangle, FileText, Users, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

const ConflictOfInterest = () => {
  const { t } = useTranslation();

  const sections = [
    {
      title: t("governanceContent.coi.sections.disclosureTitle"),
      body: t("governanceContent.coi.sections.disclosureBody"),
      icon: FileText,
    },
    {
      title: t("governanceContent.coi.sections.recusalTitle"),
      body: t("governanceContent.coi.sections.recusalBody"),
      icon: AlertTriangle,
    },
    {
      title: t("governanceContent.coi.sections.internalProcessTitle"),
      body: t("governanceContent.coi.sections.internalProcessBody"),
      icon: Users,
    },
    {
      title: t("governanceContent.coi.sections.transparencyTitle"),
      body: t("governanceContent.coi.sections.transparencyBody"),
      icon: CheckCircle,
    },
  ];

  const procedures = [
    t("governanceContent.coi.procedures.1"),
    t("governanceContent.coi.procedures.2"),
    t("governanceContent.coi.procedures.3"),
    t("governanceContent.coi.procedures.4"),
  ];

  return (
    <Layout>
      <div className="section-container py-12 lg:py-20">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Scale className="h-4 w-4" />
            {t("governanceContent.badge")}
          </div>
          <h1 className="mt-4 font-display text-4xl font-bold text-foreground sm:text-5xl">
            {t("governancePages.conflictTitle")}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            {t("governanceContent.coi.lead")}
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
              {t("governanceContent.coi.proceduresTitle")}
            </h2>
            <p className="mt-4 text-muted-foreground">{t("governanceContent.coi.proceduresLead")}</p>
            <ul className="mt-4 space-y-3">
              {procedures.map((p, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                  <span className="text-muted-foreground">{p}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default ConflictOfInterest;
