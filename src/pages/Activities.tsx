import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { Calendar, Clock, MapPin, Users, Filter } from "lucide-react";

import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

type Activity = {
  id: string;
  title: string;
  programType: "football" | "school" | "mentorship";
  ageMin: number;
  ageMax: number;
  location: string;
  startsAt: string; // ISO
  endsAt: string; // ISO
  capacity: number;
};

const PROGRAM_TYPES = [
  { value: "all", labelKey: "activities.all" },
  { value: "school", labelKey: "programs.schoolSupport" },
  { value: "football", labelKey: "programs.footballDevelopment" },
  { value: "mentorship", labelKey: "programs.mentorship" },
  { value: "integration", labelKey: "programs.socialIntegration" }, // kept for UI parity
  { value: "creative", labelKey: "programs.creativeSkills" }, // kept for UI parity
] as const;

function nextWeekdayAt(
  base: Date,
  weekday: number, // 0=Sun ... 6=Sat
  hour: number,
  minute: number,
) {
  const d = new Date(base);
  d.setHours(hour, minute, 0, 0);

  const current = d.getDay();
  let delta = (weekday - current + 7) % 7;

  // If it's the same weekday but time has already passed, go to next week
  if (delta === 0 && d.getTime() <= base.getTime()) delta = 7;

  d.setDate(d.getDate() + delta);
  return d;
}

function addMinutes(date: Date, minutes: number) {
  return new Date(date.getTime() + minutes * 60 * 1000);
}

function buildSeedActivities(): Activity[] {
  const now = new Date();
  const items: Activity[] = [];
  const weeksToGenerate = 8;

  // 1) Fridays 17:00 - 18:30 intensive football skills (15-20) rotating venue Trollhättan/Vänersborg
  for (let i = 0; i < weeksToGenerate; i++) {
    const start = nextWeekdayAt(now, 5, 17, 0); // Fri
    start.setDate(start.getDate() + i * 7);
    const ends = addMinutes(start, 90);

    const rotatingLocation = i % 2 === 0 ? "Trollhättan" : "Vänersborg";

    items.push({
      id: `fri-football-${i}`,
      title:
        "Intensive Football Skills Development (Boys & Girls 15–20) – Rotating venue",
      programType: "football",
      ageMin: 15,
      ageMax: 20,
      location: `${rotatingLocation} (venue changes weekly)`,
      startsAt: start.toISOString(),
      endsAt: ends.toISOString(),
      capacity: 22,
    });
  }

  // 2) Tuesdays 18:00 - 19:00 Assignment help & extra academic exercises
  for (let i = 0; i < weeksToGenerate; i++) {
    const start = nextWeekdayAt(now, 2, 18, 0); // Tue
    start.setDate(start.getDate() + i * 7);
    const ends = addMinutes(start, 60);

    items.push({
      id: `tue-school-${i}`,
      title: "Assignment Help & Extra Academic Exercises",
      programType: "school",
      ageMin: 7,
      ageMax: 20,
      location: "Trollhättan",
      startsAt: start.toISOString(),
      endsAt: ends.toISOString(),
      capacity: 25,
    });
  }

  // 3) Mondays & Wednesdays visiting training grounds (assessments & help) for 7-10, 11-13, 14-16
  // We model these as 3 separate sessions per day (same time block), repeated weekly.
  const visitDays = [
    { key: "mon", weekday: 1 }, // Mon
    { key: "wed", weekday: 3 }, // Wed
  ] as const;

  const ageGroups = [
    { min: 7, max: 10 },
    { min: 11, max: 13 },
    { min: 14, max: 16 },
  ] as const;

  for (const day of visitDays) {
    for (let i = 0; i < weeksToGenerate; i++) {
      // One start time, same for each age group; this is a "field visit" block.
      const startBase = nextWeekdayAt(now, day.weekday, 17, 0); // 17:00
      startBase.setDate(startBase.getDate() + i * 7);

      ageGroups.forEach((g, idx) => {
        const start = new Date(startBase);
        // stagger slightly to avoid identical timestamps (optional, keeps ordering stable)
        start.setMinutes(start.getMinutes() + idx * 5);
        const ends = addMinutes(start, 60);

        items.push({
          id: `${day.key}-visit-${i}-${g.min}-${g.max}`,
          title: `Training Ground Visit (Assessments & Support) – Ages ${g.min}–${g.max}`,
          programType: "football",
          ageMin: g.min,
          ageMax: g.max,
          location: "Trollhättan / Vänersborg (visiting grounds)",
          startsAt: start.toISOString(),
          endsAt: ends.toISOString(),
          capacity: 0, // capacity not meaningful for visits; keep 0
        });
      });
    }
  }

  // 4) Thursdays 18:00 - 19:00 Assignment help & Mentorship
  for (let i = 0; i < weeksToGenerate; i++) {
    const start = nextWeekdayAt(now, 4, 18, 0); // Thu
    start.setDate(start.getDate() + i * 7);
    const ends = addMinutes(start, 60);

    items.push({
      id: `thu-mentorship-${i}`,
      title: "Assignment Help & Mentorship",
      programType: "mentorship",
      ageMin: 15,
      ageMax: 20,
      location: "Vänersborg",
      startsAt: start.toISOString(),
      endsAt: ends.toISOString(),
      capacity: 20,
    });
  }

  // Sort by start time
  items.sort(
    (a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime(),
  );
  return items;
}

const SEEDED_ACTIVITIES: Activity[] = buildSeedActivities();

export default function Activities() {
  const { t } = useTranslation();

  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [ageFilter, setAgeFilter] = useState<string>("all");
  const [locationFilter, setLocationFilter] = useState<string>("all");

  const locations = useMemo(() => {
    const set = new Set<string>();
    SEEDED_ACTIVITIES.forEach((a) => {
      // normalize filter values a bit
      if (a.location.includes("Trollhättan")) set.add("Trollhättan");
      if (a.location.includes("Vänersborg")) set.add("Vänersborg");
    });
    return ["all", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, []);

  const filteredActivities = useMemo(() => {
    return SEEDED_ACTIVITIES.filter((a) => {
      const typeOk =
        typeFilter === "all" ||
        (typeFilter === "creative" || typeFilter === "integration"
          ? false
          : a.programType === typeFilter);

      const ageOk =
        ageFilter === "all" ||
        (() => {
          const [minStr, maxStr] = ageFilter.split("-").map((v) => v.trim());
          const min = Number(minStr);
          const max = Number(maxStr);
          return (
            Number.isFinite(min) &&
            Number.isFinite(max) &&
            a.ageMin >= min &&
            a.ageMax <= max
          );
        })();

      const locationOk =
        locationFilter === "all" ||
        (locationFilter === "Trollhättan" &&
          a.location.includes("Trollhättan")) ||
        (locationFilter === "Vänersborg" && a.location.includes("Vänersborg"));

      return typeOk && ageOk && locationOk;
    });
  }, [typeFilter, ageFilter, locationFilter]);

  return (
    <Layout>
      <div className="section-container py-12 lg:py-20">
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
              <Calendar className="w-10 h-10 text-primary" />
              {t("activities.title")}
            </h1>
            <p className="text-muted-foreground">{t("activities.subtitle")}</p>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              {t("activities.filtersTitle")}
            </CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="programType">{t("activities.programType")}</Label>
              <select
                id="programType"
                className="w-full mt-1 px-3 py-2 rounded-md border border-input bg-background"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                {PROGRAM_TYPES.map((pt) => (
                  <option key={pt.value} value={pt.value}>
                    {t(pt.labelKey)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="ageGroup">{t("activities.ageGroup")}</Label>
              <select
                id="ageGroup"
                className="w-full mt-1 px-3 py-2 rounded-md border border-input bg-background"
                value={ageFilter}
                onChange={(e) => setAgeFilter(e.target.value)}
              >
                <option value="all">{t("activities.all")}</option>
                <option value="7-10">7–10</option>
                <option value="11-13">11–13</option>
                <option value="14-16">14–16</option>
                <option value="15-20">15–20</option>
                <option value="7-20">7–20</option>
              </select>
            </div>

            <div>
              <Label htmlFor="location">{t("activities.location")}</Label>
              <select
                id="location"
                className="w-full mt-1 px-3 py-2 rounded-md border border-input bg-background"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              >
                {locations.map((l) => (
                  <option key={l} value={l}>
                    {l === "all" ? t("activities.all") : l}
                  </option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Activities List */}
        {filteredActivities.length === 0 ? (
          <Card>
            <CardContent className="py-6">
              <p className="font-medium">{t("activities.emptyTitle")}</p>
              <p className="text-muted-foreground mt-1">
                {t("activities.emptyBody")}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6">
            {filteredActivities.map((activity) => (
              <Card
                key={activity.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl mb-2">
                        {activity.title}
                      </CardTitle>
                      <Badge variant="secondary">
                        {t(`programTypes.${activity.programType}`)}
                      </Badge>
                    </div>
                    <Badge variant="outline" className="shrink-0">
                      Ages {activity.ageMin}–{activity.ageMax}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid gap-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>
                        {format(
                          new Date(activity.startsAt),
                          "EEEE d MMM, HH:mm",
                        )}{" "}
                        – {format(new Date(activity.endsAt), "HH:mm")}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{activity.location}</span>
                    </div>

                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>
                        {activity.capacity > 0
                          ? `Capacity: ${activity.capacity}`
                          : "Capacity: Not applicable"}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button variant="default">
                      {t("activities.attending")}
                    </Button>
                    <Button variant="outline">
                      {t("activities.notAttending")}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
