import { Layout } from "@/components/layout/Layout";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";

type PersonCardProps = {
  name: string;
  role: string;
  body: string;
  badges?: string[];
  imageSrc?: string;
};

function getInitials(name: string) {
  const cleaned = (name || "").trim();
  if (!cleaned) return "?";
  const parts = cleaned.split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? "") : "";
  return (first + last).toUpperCase();
}

function Avatar({ name, imageSrc }: { name: string; imageSrc?: string }) {
  const initials = getInitials(name);

  return (
    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border bg-muted">
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={name}
          className="h-full w-full object-cover"
          loading="lazy"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
      ) : null}

      <div className="absolute inset-0 grid place-items-center">
        <span className="text-sm font-semibold text-muted-foreground">
          {initials}
        </span>
      </div>
    </div>
  );
}

function PersonCard({ name, role, body, badges, imageSrc }: PersonCardProps) {
  return (
    <Card className="card-elevated">
      <CardHeader className="space-y-3">
        <div className="flex items-start gap-4">
          <Avatar name={name} imageSrc={imageSrc} />
          <div className="min-w-0">
            <CardTitle className="text-xl leading-tight">{name}</CardTitle>
            <div className="mt-1 text-sm text-muted-foreground">{role}</div>

            {badges?.length ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {badges.map((b) => (
                  <Badge key={b} variant="secondary">
                    {b}
                  </Badge>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
          {body}
        </p>
      </CardContent>
    </Card>
  );
}

export default function Founder() {
  const { t } = useTranslation();

  const founder = {
    name: t("team.founder.name"),
    role: t("team.founder.role"),
    body: t("team.founder.body"),
    imageSrc: "/assets/team/profilePix.png",
    badges: [
      t("team.badges.uefaB"),
      t("team.badges.youthDevelopment"),
      t("team.badges.wellbeing"),
    ],
  };

  return (
    <Layout>
      <div className="section-container py-10">
        <div className="mx-auto max-w-5xl space-y-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <h1 className="text-4xl font-bold tracking-tight">
                {t("nav.founder")}
              </h1>
            </div>
            <p className="max-w-3xl text-muted-foreground">
              {t("team.founderPageIntro")}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <PersonCard {...founder} />

            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="text-xl">
                  {t("team.sharedValuesTitle")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
                  {t("team.sharedValuesBody")}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
