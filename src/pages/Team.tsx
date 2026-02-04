import { Layout } from "@/components/layout/Layout";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Shield, HeartHandshake } from "lucide-react";

type PersonCardProps = {
  name: string;
  role: string;
  body: string;
  badges?: string[];
  imageSrc?: string; // optional profile picture
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
            // If image fails, hide it so initials show via background layer
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
      ) : null}

      {/* Initials fallback layer */}
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

export default function Team() {
  const { t, i18n } = useTranslation();

  /**
   * IMPORTANT:
   * This prevents fallbackLng from showing English strings when Swedish is selected.
   * If a key doesn't exist in the active language, it returns "" instead of falling back.
   */
  const tl = (key: string) =>
    t(key, { lng: i18n.language, defaultValue: "" }).toString();

  const founder = {
    name: tl("team.founder.name") || t("team.founder.name"),
    role: tl("team.founder.role") || t("team.founder.role"),
    body: tl("team.founder.body") || t("team.founder.body"),
    imageSrc: "/assets/team/profilePix.png",
    badges: [
      tl("team.badges.uefaB") || t("team.badges.uefaB"),
      tl("team.badges.youthDevelopment") || t("team.badges.youthDevelopment"),
      tl("team.badges.wellbeing") || t("team.badges.wellbeing"),
    ],
  };

  // Core board members (always 3)
  const boardCore = [
    {
      id: "idris",
      name: tl("team.board.idris.name") || t("team.board.idris.name"),
      role: tl("team.board.idris.role") || t("team.board.idris.role"),
      body: tl("team.board.idris.body") || t("team.board.idris.body"),
      imageSrc: "/assets/people/idris-ajriaj.jpg",
      badges: [
        tl("team.badges.refereeTraining") || t("team.badges.refereeTraining"),
        tl("team.badges.rules") || t("team.badges.rules"),
        tl("team.badges.fairPlay") || t("team.badges.fairPlay"),
      ],
    },
    {
      id: "goran",
      name: tl("team.board.goran.name") || t("team.board.goran.name"),
      role: tl("team.board.goran.role") || t("team.board.goran.role"),
      body: tl("team.board.goran.body") || t("team.board.goran.body"),
      imageSrc: "/assets/people/goran-andersson.jpg",
      badges: [
        tl("team.badges.mentorship") || t("team.badges.mentorship"),
        tl("team.badges.structure") || t("team.badges.structure"),
      ],
    },
    {
      id: "abdinasir",
      name: tl("team.board.abdinasir.name") || t("team.board.abdinasir.name"),
      role: tl("team.board.abdinasir.role") || t("team.board.abdinasir.role"),
      body: tl("team.board.abdinasir.body") || t("team.board.abdinasir.body"),
      imageSrc: "/assets/people/abdinasir.jpg",
      badges: [
        tl("team.badges.analysis") || t("team.badges.analysis"),
        tl("team.badges.talentID") || t("team.badges.talentID"),
      ],
    },
  ];

  // Open slots: strictly two, and ONLY if the keys exist in the ACTIVE language (no fallback)
  const openSlots = [
    {
      id: "openSlot1",
      name: tl("team.board.openSlot1.name"),
      role: tl("team.board.openSlot1.role"),
      body: tl("team.board.openSlot1.body"),
      badges: [tl("team.badges.open") || t("team.badges.open")],
    },
    {
      id: "openSlot2",
      name: tl("team.board.openSlot2.name"),
      role: tl("team.board.openSlot2.role"),
      body: tl("team.board.openSlot2.body"),
      badges: [tl("team.badges.open") || t("team.badges.open")],
    },
  ]
    .slice(0, 2)
    .filter((p) => p.name && p.role && p.body);

  // ✅ Combine: named board members FIRST, open slots AFTER
  const board = [...boardCore, ...openSlots];

  const volunteers = [
    {
      title:
        tl("team.volunteers.items.coachesTitle") ||
        t("team.volunteers.items.coachesTitle"),
      body:
        tl("team.volunteers.items.coachesBody") ||
        t("team.volunteers.items.coachesBody"),
    },
    {
      title:
        tl("team.volunteers.items.mentorsTitle") ||
        t("team.volunteers.items.mentorsTitle"),
      body:
        tl("team.volunteers.items.mentorsBody") ||
        t("team.volunteers.items.mentorsBody"),
    },
    {
      title:
        tl("team.volunteers.items.supportTitle") ||
        t("team.volunteers.items.supportTitle"),
      body:
        tl("team.volunteers.items.supportBody") ||
        t("team.volunteers.items.supportBody"),
    },
    {
      title:
        tl("team.volunteers.items.eventsTitle") ||
        t("team.volunteers.items.eventsTitle"),
      body:
        tl("team.volunteers.items.eventsBody") ||
        t("team.volunteers.items.eventsBody"),
    },
  ];

  return (
    <Layout>
      <div className="section-container py-10">
        <div className="mx-auto max-w-5xl space-y-10">
          {/* Header */}
          <div className="space-y-3">
            <h1 className="text-4xl font-bold tracking-tight">
              {t("team.title")}
            </h1>
            <p className="max-w-3xl text-muted-foreground">{t("team.intro")}</p>

            <div className="flex flex-wrap gap-2 pt-2">
              <Badge variant="outline">{t("team.regionTag")}</Badge>
              <Badge variant="outline">{t("team.partnersTag")}</Badge>
              <Badge variant="outline">{t("team.stationsTag")}</Badge>
            </div>
          </div>

          {/* Story */}
          <Card className="card-elevated">
            <CardHeader className="space-y-2">
              <CardTitle className="flex items-center gap-2 text-2xl">
                <HeartHandshake className="h-6 w-6 text-primary" />
                {t("team.storyTitle")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
                {t("team.storyBody")}
              </p>
            </CardContent>
          </Card>

          {/* Founder */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-semibold">
                {t("team.founderTitle")}
              </h2>
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

          {/* Board */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-semibold">{t("team.boardTitle")}</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {board.map((p) => (
                <PersonCard
                  key={p.id}
                  name={p.name}
                  role={p.role}
                  body={p.body}
                  badges={p.badges}
                  imageSrc={(p as any).imageSrc}
                />
              ))}
            </div>
          </div>

          {/* Volunteers */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">
              {t("team.volunteers.title")}
            </h2>
            <p className="max-w-3xl text-muted-foreground">
              {t("team.volunteers.intro")}
            </p>

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
      </div>
    </Layout>
  );
}
