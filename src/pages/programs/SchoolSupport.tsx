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
        <h1 className="font-display text-4xl font-bold text-foreground">{t("programs.schoolSupport")}</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          {t("programs.schoolSupportDescription")}
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Card className="border-border">
            <CardHeader>
              <CardTitle>{t("programs.whatWeDo")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-muted-foreground">
              <ul className="list-disc pl-5">
                <li>{t("programPages.schoolSupport.whatWeDo.1")}</li>
                <li>{t("programPages.schoolSupport.whatWeDo.2")}</li>
                <li>{t("programPages.schoolSupport.whatWeDo.3")}</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle>{t("programs.howItConnects")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-muted-foreground">
              <ul className="list-disc pl-5">
                <li>{t("programPages.schoolSupport.howItConnects.1")}</li>
                <li>{t("programPages.schoolSupport.howItConnects.2")}</li>
                <li>{t("programPages.schoolSupport.howItConnects.3")}</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
