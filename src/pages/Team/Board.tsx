import { Layout } from "@/components/layout/Layout";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

type PersonCardProps = {
  name: string;
  role: string;
  body: string;
  badges?: string[];
  imageSrc?: string;
};

type BoardPerson = PersonCardProps & {
  id: string; // ✅ stable unique key (not translated)
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
                {badges.map((b, idx) => (
                  <Badge key={`${b}-${idx}`} variant="secondary">
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

export default function Board() {
  const { t } = useTranslation();

  // ✅ Board members first
  const boardMembers: BoardPerson[] = [
    {
      id: "board-idris",
      name: t("team.board.idris.name"),
      role: t("team.board.idris.role"),
      body: t("team.board.idris.body"),
      imageSrc: "/assets/team/idris-ajriaj.jpg",
      badges: [
        t("team.badges.refereeTraining"),
        t("team.badges.rules"),
        t("team.badges.fairPlay"),
      ],
    },
    {
      id: "board-goran",
      name: t("team.board.goran.name"),
      role: t("team.board.goran.role"),
      body: t("team.board.goran.body"),
      imageSrc: "/assets/team/goran-andersson.jpg",
      badges: [t("team.badges.mentorship"), t("team.badges.structure")],
    },
    {
      id: "board-abdinasir",
      name: t("team.board.abdinasir.name"),
      role: t("team.board.abdinasir.role"),
      body: t("team.board.abdinasir.body"),
      imageSrc: "/assets/team/abdinasir.jpg",
      badges: [t("team.badges.analysis"), t("team.badges.talentID")],
    },
  ];

  // ✅ Open slots last (and only two)
  const openSlots: BoardPerson[] = [
    {
      id: "board-open-1",
      name: t("team.board.openSlot1.name"),
      role: t("team.board.openSlot1.role"),
      body: t("team.board.openSlot1.body"),
      badges: [t("team.badges.open")],
    },
    {
      id: "board-open-2",
      name: t("team.board.openSlot2.name"),
      role: t("team.board.openSlot2.role"),
      body: t("team.board.openSlot2.body"),
      badges: [t("team.badges.open")],
    },
  ];

  const board: BoardPerson[] = [...boardMembers, ...openSlots];

  return (
    <Layout>
      <div className="section-container py-10">
        <div className="mx-auto max-w-5xl space-y-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <h1 className="text-4xl font-bold tracking-tight">
                {t("nav.board")}
              </h1>
            </div>
            <p className="max-w-3xl text-muted-foreground">
              {t("team.boardPageIntro")}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {board.map((p) => (
              <PersonCard
                key={p.id} // ✅ stable key; language switching won't duplicate
                name={p.name}
                role={p.role}
                body={p.body}
                badges={p.badges}
                imageSrc={p.imageSrc}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
