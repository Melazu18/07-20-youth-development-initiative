import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

export default function CreativeSkills() {
  const { t } = useTranslation();

  return (
    <Layout>
      <div className="section-container py-12 lg:py-20">
        <h1 className="font-display text-4xl font-bold text-foreground">
          {t("programs.creativeSkills")}
        </h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          {t("programs.creativeSkillsDescription")}
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Card className="border-border">
            <CardHeader>
              <CardTitle>{t("programs.workshops")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-muted-foreground">
              <ul className="list-disc pl-5">
                <li>Creative workshops (media, arts, and project-based learning)</li>
                <li>Safe and inclusive environment with clear conduct expectations</li>
                <li>Age-adapted sessions for 8–14 and mixed groups</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle>{t("programs.outcomes")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-muted-foreground">
              <ul className="list-disc pl-5">
                <li>Confidence and communication improvements</li>
                <li>Documented participation and progress notes</li>
                <li>Exportable summaries for partners when consent applies</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}