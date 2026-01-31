import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

/**
 * Social Integration & Belonging Through Sport & Creativity
 *
 * Focus: youth with foreign background / youth new in Sweden.
 *
 * This page is written in sponsor- and municipality-ready language.
 */
export default function SocialIntegration() {
  const { t } = useTranslation();

  return (
    <Layout>
      <div className="section-container py-12 lg:py-20">
        <h1 className="font-display text-4xl font-bold text-foreground">
          {t("programs.socialIntegrationTitle")}
        </h1>
        <p className="mt-2 max-w-3xl text-muted-foreground">
          {t("programs.socialIntegrationSubtitle")}
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t("programPages.socialIntegration.fundableTitle")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>{t("programs.socialIntegrationDescription")}</p>
                <p>{t("programPages.socialIntegration.fundableBody")}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t("programs.activitiesTitle")}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <ul className="list-disc space-y-2 pl-5">
                  <li>{t("programs.mixedTeams")}</li>
                  <li>{t("programs.languageThroughSport")}</li>
                  <li>{t("programs.mentorshipPairing")}</li>
                  <li>{t("programs.parentEvenings")}</li>
                  <li>{t("programs.creativeWorkshops")}</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t("programPages.socialIntegration.outcomesMeasuredTitle")}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground space-y-3">
                <p>{t("programPages.socialIntegration.outcomesMeasured.1")}</p>
                <p>{t("programPages.socialIntegration.outcomesMeasured.2")}</p>
                <p>{t("programPages.socialIntegration.outcomesMeasured.3")}</p>
                <p>{t("programPages.socialIntegration.outcomesMeasured.4")}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t("programPages.socialIntegration.whoForTitle")}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>{t("programPages.socialIntegration.whoForBody")}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
