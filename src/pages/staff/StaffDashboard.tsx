import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/lib/auth";

/**
 * Staff Portal
 *
 * A lightweight landing area for volunteers, workers/coaches, and board members.
 * This page is protected by `RequireStaff`.
 */
export default function StaffDashboard() {
  const { t } = useTranslation();
  const { profile } = useAuth();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold">{t("staff.title")}</h1>
          <p className="mt-2 text-muted-foreground">
            {t("staff.subtitle")}
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>{t("staff.cards.activities.title")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  {t("staff.cards.activities.description")}
                </p>
                <Button asChild variant="outline">
                  <Link to="/activities">{t("staff.cards.activities.cta")}</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t("staff.cards.governance.title")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  {t("staff.cards.governance.description")}
                </p>
                <Button asChild variant="outline">
                  <Link to="/safeguarding">{t("staff.cards.governance.cta")}</Link>
                </Button>
              </CardContent>
            </Card>

            {profile?.role === "admin" ? (
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>{t("staff.cards.admin.title")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    {t("staff.cards.admin.description")}
                  </p>
                  <Button asChild>
                    <Link to="/admin">{t("staff.cards.admin.cta")}</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : null}
          </div>
        </div>
      </div>
    </Layout>
  );
}
