import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

/**
 * Program page.
 */
export default function ProgramPage() {
  const { t } = useTranslation();

  return (
    <Layout>
      <div className="section-container py-12 lg:py-20">
        <h1 className="font-display text-4xl font-bold text-foreground">{t("programs.footballDevelopment")}</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          {t("programs.footballDescription")}
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Card className="border-border">
            <CardHeader>
              <CardTitle>{t("programs.weeklyTraining")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-muted-foreground">
              <ul className="list-disc pl-5">
                <li>{t("programPages.football.weeklyTraining.1")}</li>
                <li>{t("programPages.football.weeklyTraining.2")}</li>
                <li>{t("programPages.football.weeklyTraining.3")}</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle>{t("programs.intensiveTraining")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-muted-foreground">
              <ul className="list-disc pl-5">
                <li>{t("programPages.football.intensiveTraining.1")}</li>
                <li>{t("programPages.football.intensiveTraining.2")}</li>
                <li>{t("programPages.football.intensiveTraining.3")}</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
