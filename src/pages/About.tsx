import { Layout } from "@/components/layout/Layout";
import { Target, Heart, Users, Award } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();

  const values = [
    { title: t("about.values.youthFirstTitle"), description: t("about.values.youthFirstDesc"), icon: Heart },
    { title: t("about.values.inclusiveTitle"), description: t("about.values.inclusiveDesc"), icon: Users },
    { title: t("about.values.communityTitle"), description: t("about.values.communityDesc"), icon: Target },
    { title: t("about.values.impactTitle"), description: t("about.values.impactDesc"), icon: Award },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">{t("about.title")}</h1>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-3">{t("about.missionTitle")}</h2>
            <p className="text-muted-foreground leading-relaxed">{t("about.missionBody")}</p>
          </section>

          <section>
            <div className="grid md:grid-cols-2 gap-6">
              {values.map((v) => (
                <div key={v.title} className="rounded-lg border p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <v.icon className="w-6 h-6 text-primary" />
                    <h3 className="text-lg font-semibold">{v.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{v.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
