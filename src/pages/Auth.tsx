import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { useTranslation } from "react-i18next";

/**
 * Authentication entry page.
 * Users choose between youth/participant auth and staff/board/volunteer auth.
 */
export default function Auth() {
  const { t } = useTranslation();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>{t("auth.choosePath")}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Link to="/auth/youth" className="p-4 rounded-md border hover:bg-muted transition-colors">
              <div className="font-medium">{t("auth.youth")}</div>
            </Link>
            <Link to="/auth/staff" className="p-4 rounded-md border hover:bg-muted transition-colors">
              <div className="font-medium">{t("auth.staff")}</div>
              <div className="text-sm text-muted-foreground mt-1">{t("auth.staffNote")}</div>
            </Link>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
