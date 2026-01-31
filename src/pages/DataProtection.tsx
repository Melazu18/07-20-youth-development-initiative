import { Layout } from "@/components/layout/Layout";
import { Eye, Database, Clock, FileText, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const DataProtection = () => {
  const { t } = useTranslation();

  const dataCategories = [
    {
      title: t("governanceContent.dataProtection.categories.collect.title"),
      description: t("governanceContent.dataProtection.categories.collect.desc"),
      icon: Database,
    },
    {
      title: t("governanceContent.dataProtection.categories.use.title"),
      description: t("governanceContent.dataProtection.categories.use.desc"),
      icon: FileText,
    },
    {
      title: t("governanceContent.dataProtection.categories.retention.title"),
      description: t("governanceContent.dataProtection.categories.retention.desc"),
      icon: Clock,
    },
    {
      title: t("governanceContent.dataProtection.categories.rights.title"),
      description: t("governanceContent.dataProtection.categories.rights.desc"),
      icon: Eye,
    },
  ];

  return (
    <Layout>
      <div className="section-container py-12 lg:py-20">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Eye className="h-4 w-4" />
            {t("governanceContent.badge")}
          </div>
          <h1 className="mt-4 font-display text-4xl font-bold text-foreground sm:text-5xl">
            {t("governancePages.dataProtectionTitle")}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            {t("governanceContent.dataProtection.lead")}
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {dataCategories.map((item) => (
            <Card key={item.title} className="border-border">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 max-w-3xl space-y-8">
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground">
              {t("governanceContent.dataProtection.consentTitle")}
            </h2>
            <p className="mt-4 text-muted-foreground">
              {t("governanceContent.dataProtection.consentBody")}
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-foreground">
              {t("governanceContent.dataProtection.exerciseTitle")}
            </h2>
            <p className="mt-4 text-muted-foreground">{t("governanceContent.dataProtection.exerciseBody")}</p>

            <div className="mt-6 rounded-lg border border-border bg-secondary/30 p-6">
              <h3 className="font-semibold text-foreground">{t("governanceContent.dataProtection.dpoTitle")}</h3>
              <p className="mt-2 text-muted-foreground">{t("governanceContent.dataProtection.dpoBody")}</p>
              <p className="mt-2 text-muted-foreground">{t("governanceContent.dataProtection.dpoEmail")}</p>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-foreground">
              {t("governanceContent.dataProtection.accountToolsTitle")}
            </h2>
            <p className="mt-4 text-muted-foreground">{t("governanceContent.dataProtection.accountToolsBody")}</p>

            <div className="mt-6 space-y-3">
              <Button variant="outline" className="w-full justify-start" disabled>
                <Eye className="mr-2 h-4 w-4" />
                {t("governanceContent.dataProtection.actions.viewData")}
              </Button>
              <Button variant="outline" className="w-full justify-start" disabled>
                <FileText className="mr-2 h-4 w-4" />
                {t("governanceContent.dataProtection.actions.exportData")}
              </Button>
              <Button variant="destructive" className="w-full justify-start" disabled>
                <Trash2 className="mr-2 h-4 w-4" />
                {t("governanceContent.dataProtection.actions.deleteAccount")}
              </Button>
              <p className="text-sm text-muted-foreground">{t("governanceContent.dataProtection.note")}</p>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default DataProtection;
