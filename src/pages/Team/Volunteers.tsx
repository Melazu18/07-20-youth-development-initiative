import { Layout } from "@/components/layout/Layout";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Volunteers() {
  const { t } = useTranslation();

  const volunteers = [
    {
      title: t("team.volunteers.items.coachesTitle"),
      body: t("team.volunteers.items.coachesBody"),
    },
    {
      title: t("team.volunteers.items.mentorsTitle"),
      body: t("team.volunteers.items.mentorsBody"),
    },
    {
      title: t("team.volunteers.items.supportTitle"),
      body: t("team.volunteers.items.supportBody"),
    },
    {
      title: t("team.volunteers.items.eventsTitle"),
      body: t("team.volunteers.items.eventsBody"),
    },
  ];

  return (
    <Layout>
      <div className="section-container py-10">
        <div className="mx-auto max-w-5xl space-y-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">
              {t("nav.volunteers")}
            </h1>
            <p className="max-w-3xl text-muted-foreground">
              {t("team.volunteersPageIntro")}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {volunteers.map((v) => (
              <Card key={v.title} className="card-elevated">
                <CardHeader>
                  <CardTitle className="text-lg">{v.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {v.body}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="text-lg">
                {t("team.volunteers.ctaTitle")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
                {t("team.volunteers.ctaBody")}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
