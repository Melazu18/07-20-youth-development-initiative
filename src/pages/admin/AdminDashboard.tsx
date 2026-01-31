import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { FileDown, RefreshCw, Users, Calendar, KeyRound } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { toast } from "@/components/ui/use-toast";



function InviteList() {
  const { t } = useTranslation();
  const { data, isFetching, refetch } = useQuery({
    queryKey: ["admin", "staff-invites"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("staff_invites")
        .select("role, expires_at, max_uses, uses, created_at")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data ?? [];
    },
  });

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Button type="button" variant="outline" size="sm" onClick={() => refetch()} disabled={isFetching}>
          <RefreshCw className={"h-4 w-4 " + (isFetching ? "animate-spin" : "")} /> {t("admin.refresh")}
        </Button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="min-w-full text-sm">
          <thead className="bg-secondary/30 text-left">
            <tr>
              <th className="px-3 py-2">{t("admin.inviteList.role")}</th>
              <th className="px-3 py-2">{t("admin.inviteList.uses")}</th>
              <th className="px-3 py-2">{t("admin.inviteList.expires")}</th>
              <th className="px-3 py-2">{t("admin.inviteList.created")}</th>
            </tr>
          </thead>
          <tbody>
            {(data ?? []).map((row: any, idx: number) => (
              <tr key={idx} className="border-t border-border">
                <td className="px-3 py-2">{row.role}</td>
                <td className="px-3 py-2">{row.uses} / {row.max_uses}</td>
                <td className="px-3 py-2">{row.expires_at ? format(new Date(row.expires_at), "yyyy-MM-dd") : t("admin.inviteList.noExpiry")}</td>
                <td className="px-3 py-2">{row.created_at ? format(new Date(row.created_at), "yyyy-MM-dd") : ""}</td>
              </tr>
            ))}
            {(!data || data.length === 0) ? (
              <tr>
                <td className="px-3 py-6 text-muted-foreground" colSpan={4}>
                  {t("admin.inviteList.empty")}
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/**
 * Admin dashboard for exports and operational oversight.
 *
 * Includes:
 * - Safeguarding acknowledgement exports (PDF/CSV)
 * - Attendance/RVSP compliance overview by activity (non-responders highlighted)
 */
export default function AdminDashboard() {
  const { t } = useTranslation();
  const { profile } = useAuth();
  const [selectedActivityId, setSelectedActivityId] = useState<string>("");
  const [enrollmentUserId, setEnrollmentUserId] = useState<string>("");
  const [enrollmentProgramType, setEnrollmentProgramType] = useState<string>("Football Development");
  const [enrollmentLocation, setEnrollmentLocation] = useState<string>("");
  const [enrollmentSaving, setEnrollmentSaving] = useState(false);

  // Staff invite code generation (admin-only)
  const [inviteRole, setInviteRole] = useState<string>("volunteer");
  const [inviteExpiresDays, setInviteExpiresDays] = useState<number>(14);
  const [inviteMaxUses, setInviteMaxUses] = useState<number>(1);
  const [generatedInviteCode, setGeneratedInviteCode] = useState<string>("");
  const [inviteGenerating, setInviteGenerating] = useState(false);

  const { data: acknowledgements, isFetching: ackLoading, refetch: refetchAck } = useQuery({
    queryKey: ["admin", "acknowledgements"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("policy_acknowledgements")
        .select("policy_slug, acknowledged_at, user_full_name, user_email")
        .order("acknowledged_at", { ascending: false });

      if (error) throw error;
      return data ?? [];
    },
    enabled: profile?.role === "admin",
  });

  const { data: activities } = useQuery({
    queryKey: ["admin", "activities"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("activities")
        .select("id, title, starts_at, ends_at, location, age_min, age_max, program_type")
        .order("starts_at", { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
    enabled: profile?.role === "admin",
  });

  const { data: profiles } = useQuery({
    queryKey: ["admin", "profiles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, email, role, created_at");
      if (error) throw error;
      return data ?? [];
    },
    enabled: profile?.role === "admin",
  });

  const { data: rsvps, isFetching: rsvpLoading, refetch: refetchRsvps } = useQuery({
    queryKey: ["admin", "rsvps", selectedActivityId],
    queryFn: async () => {
      if (!selectedActivityId) return [];
      const { data, error } = await supabase
        .from("activity_rsvp")
        .select("activity_id, user_id, status, responded_at")
        .eq("activity_id", selectedActivityId);
      if (error) throw error;
      return data ?? [];
    },
    enabled: profile?.role === "admin" && !!selectedActivityId,
  });

  const { data: inviteAudit, isFetching: inviteAuditLoading, refetch: refetchInviteAudit } = useQuery({
    queryKey: ["admin", "staff-invite-audit"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("staff_invite_audit")
        .select("invite_id, used_by, assigned_role, used_at")
        .order("used_at", { ascending: false })
        .limit(200);
      if (error) throw error;
      return data ?? [];
    },
    enabled: profile?.role === "admin",
  });

  const { data: enrollments } = useQuery({
    queryKey: ["admin", "enrollments", selectedActivityId],
    queryFn: async () => {
      if (!selectedActivityId) return [];
      // We fetch all enrollments and filter client-side based on the selected activity
      // to keep the query simple and portable.
      const { data, error } = await supabase
        .from("enrollments")
        .select("user_id, program_type, location, active")
        .eq("active", true);

      if (error) throw error;
      return data ?? [];
    },
    enabled: profile?.role === "admin" && !!selectedActivityId,
  });

  const expectedResponders = useMemo(() => {
    if (!selectedActivityId) return [];
    const activity = (activities ?? []).find((a: any) => a.id === selectedActivityId);
    if (!activity) return [];

    const list = profiles ?? [];
    const participants = list.filter((p: any) => ["participant", "student"].includes(p.role ?? "participant"));

    // Match via enrollments:
    // - program_type must match
    // - enrollment.location is optional; if set it must match the activity location
    const enrolledUserIds = new Set(
      (enrollments ?? [])
        .filter((e: any) =>
          e.active !== false &&
          e.program_type === activity.program_type &&
          (!e.location || e.location === activity.location)
        )
        .map((e: any) => e.user_id)
    );

    return participants.filter((p: any) => enrolledUserIds.has(p.id));
  }, [profiles, enrollments, activities, selectedActivityId]);

  const nonResponders = useMemo(() => {
    if (!selectedActivityId) return [];
    const respondedSet = new Set((rsvps ?? []).map((r: any) => r.user_id));
    return expectedResponders.filter((p: any) => !respondedSet.has(p.id));
  }, [expectedResponders, rsvps, selectedActivityId]);

  const responders = useMemo(() => {
    if (!selectedActivityId) return [];
    const byUser = new Map((rsvps ?? []).map((r: any) => [r.user_id, r]));
    return expectedResponders
      .filter((p: any) => byUser.has(p.id))
      .map((p: any) => ({ ...p, rsvp: byUser.get(p.id) }));
  }, [expectedResponders, rsvps, selectedActivityId]);

  const inviteAuditRows = useMemo(() => {
    const profileById = new Map((profiles ?? []).map((p: any) => [p.id, p]));
    return (inviteAudit ?? []).map((row: any) => {
      const p = profileById.get(row.used_by);
      return {
        ...row,
        name: p?.full_name ?? "",
        email: p?.email ?? "",
      };
    });
  }, [inviteAudit, profiles]);

  const downloadAcknowledgementsCsv = () => {
    const rows = (acknowledgements ?? []).map((a: any) => ({
      policy_slug: a.policy_slug,
      acknowledged_at: a.acknowledged_at,
      user_full_name: a.user_full_name ?? "",
      user_email: a.user_email ?? "",
    }));

    const header = Object.keys(rows[0] ?? { policy_slug: "", acknowledged_at: "", user_full_name: "", user_email: "" });
    const csv = [
      header.join(","),
      ...rows.map((r) => header.map((h) => `"${String((r as any)[h] ?? "").replace(/"/g, '""')}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "safeguarding_acknowledgements.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadAcknowledgementsPdf = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(t("admin.pdf.safeguardingTitle"), 14, 18);
    doc.setFontSize(10);
    doc.text(`${t("admin.pdf.generated")}: ${format(new Date(), "yyyy-MM-dd HH:mm")}`, 14, 25);

    autoTable(doc, {
      startY: 30,
      head: [[t("admin.pdf.name"), t("admin.pdf.email"), t("admin.pdf.policy"), t("admin.pdf.acknowledgedAt")]],
      body: (acknowledgements ?? []).map((a: any) => [
        a.user_full_name ?? "",
        a.user_email ?? "",
        a.policy_slug ?? "",
        a.acknowledged_at ? format(new Date(a.acknowledged_at), "yyyy-MM-dd HH:mm") : "",
      ]),
      styles: { fontSize: 9 },
      headStyles: { fontStyle: "bold" },
    });

    doc.save("safeguarding_acknowledgements.pdf");
  };

  const downloadAttendancePdf = () => {
    if (!selectedActivityId) return;
    const activity = (activities ?? []).find((a: any) => a.id === selectedActivityId);

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(t("admin.pdf.attendanceTitle"), 14, 18);
    doc.setFontSize(10);

    const subtitle = [
      activity?.title ? `${t("admin.pdf.activity")}: ${activity.title}` : t("admin.pdf.activity"),
      activity?.starts_at ? `${t("admin.pdf.start")}: ${format(new Date(activity.starts_at), "yyyy-MM-dd HH:mm")}` : "",
      activity?.location ? `${t("admin.pdf.location")}: ${activity.location}` : "",
    ]
      .filter(Boolean)
      .join("  |  ");

    doc.text(subtitle, 14, 25);

    autoTable(doc, {
      startY: 32,
      head: [[t("admin.pdf.name"), t("admin.pdf.email"), t("admin.pdf.rsvp"), t("admin.pdf.respondedAt")]],
      body: responders.map((p: any) => [
        p.full_name ?? "",
        p.email ?? "",
        p.rsvp?.status ?? "",
        p.rsvp?.responded_at ? format(new Date(p.rsvp.responded_at), "yyyy-MM-dd HH:mm") : "",
      ]),
      styles: { fontSize: 9 },
      headStyles: { fontStyle: "bold" },
    });

    const afterY = (doc as any).lastAutoTable?.finalY ?? 32;
    doc.setFontSize(12);
    doc.text(t("admin.pdf.nonRespondersTitle"), 14, afterY + 10);

    autoTable(doc, {
      startY: afterY + 14,
      head: [[t("admin.pdf.name"), t("admin.pdf.email")]],
      body: nonResponders.map((p: any) => [p.full_name ?? "", p.email ?? ""]),
      styles: { fontSize: 9 },
      headStyles: { fontStyle: "bold" },
    });

    doc.save("attendance_rsvp_report.pdf");
  };

  const saveEnrollment = async () => {
    if (!enrollmentUserId || !enrollmentProgramType) return;
    setEnrollmentSaving(true);
    try {
      const { error } = await supabase.from("enrollments").upsert(
        {
          user_id: enrollmentUserId,
          program_type: enrollmentProgramType,
          location: enrollmentLocation.trim() ? enrollmentLocation.trim() : null,
          active: true,
        },
        { onConflict: "user_id,program_type,location" }
      );
      if (error) throw error;
      setEnrollmentLocation("");
      toast({ title: t("admin.enrollmentSavedTitle"), description: t("admin.enrollmentSavedBody") });
    } catch (err: any) {
      toast({ title: t("admin.enrollmentSaveErrorTitle"), description: err?.message ?? t("common.tryAgain"), variant: "destructive" });
    } finally {
      setEnrollmentSaving(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <h1 className="text-3xl font-bold">{t("admin.title")}</h1>
            <p className="text-muted-foreground">
              {t("admin.subtitle")}
            </p>
          </div>
        </div>

        <Tabs defaultValue="ack" className="mt-8">
          <TabsList>
            <TabsTrigger value="ack" className="flex items-center gap-2">
              <Users className="h-4 w-4" /> {t("admin.tabs.ack")}
            </TabsTrigger>
            <TabsTrigger value="invites" className="flex items-center gap-2">
              <KeyRound className="h-4 w-4" /> {t("admin.tabs.invites")}
            </TabsTrigger>
            <TabsTrigger value="attendance" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" /> {t("admin.tabs.attendance")}
            </TabsTrigger>
            <TabsTrigger value="enrollments" className="flex items-center gap-2">
              <Users className="h-4 w-4" /> {t("admin.tabs.enrollments")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ack" className="mt-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between gap-3">
                <CardTitle>{t("admin.ack.title")}</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" onClick={() => refetchAck()} disabled={ackLoading}>
                    <RefreshCw className="h-4 w-4 mr-2" /> {t("admin.refresh")}
                  </Button>
                  <Button variant="outline" onClick={downloadAcknowledgementsCsv} disabled={!acknowledgements?.length}>
                    <FileDown className="h-4 w-4 mr-2" /> {t("admin.ack.csv")}
                  </Button>
                  <Button onClick={downloadAcknowledgementsPdf} disabled={!acknowledgements?.length}>
                    <FileDown className="h-4 w-4 mr-2" /> {t("admin.ack.pdf")}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {t("admin.ack.description")}
                </p>
                <div className="mt-4 text-sm">
                  {t("admin.ack.total")}: <span className="font-semibold">{acknowledgements?.length ?? 0}</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attendance" className="mt-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between gap-3">
                <CardTitle>{t("admin.attendance.title")}</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" onClick={() => refetchRsvps()} disabled={rsvpLoading || !selectedActivityId}>
                    <RefreshCw className="h-4 w-4 mr-2" /> {t("admin.refresh")}
                  </Button>
                  <Button onClick={downloadAttendancePdf} disabled={!selectedActivityId}>
                    <FileDown className="h-4 w-4 mr-2" /> {t("admin.ack.pdf")}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="max-w-xl">
                  <label className="text-sm font-medium">{t("admin.selectActivity")}</label>
                  <div className="mt-2">
                    <Select value={selectedActivityId} onValueChange={setSelectedActivityId}>
                      <SelectTrigger>
                        <SelectValue placeholder={t("admin.attendance.chooseActivity")} />
                      </SelectTrigger>
                      <SelectContent>
                        {(activities ?? []).map((a: any) => (
                          <SelectItem key={a.id} value={a.id}>
                            {a.title} • {a.starts_at ? format(new Date(a.starts_at), "yyyy-MM-dd HH:mm") : ""}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-sm text-muted-foreground">{t("admin.expectedResponders")}</div>
                        <div className="text-2xl font-bold">{expectedResponders.length}</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-sm text-muted-foreground">{t("admin.responded")}</div>
                        <div className="text-2xl font-bold">{responders.length}</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-sm text-muted-foreground">{t("admin.nonResponders")}</div>
                        <div className="text-2xl font-bold">{nonResponders.length}</div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="mt-6">
                    <div className="text-sm font-semibold">{t("admin.nonResponders")}</div>
                    <ul className="mt-2 space-y-2 text-sm">
                      {nonResponders.slice(0, 15).map((p: any) => (
                        <li key={p.id} className="flex items-center justify-between border rounded-md p-2">
                          <span>{p.full_name ?? t("admin.attendance.unnamedUser")}</span>
                          <span className="text-muted-foreground">{p.email ?? ""}</span>
                        </li>
                      ))}
                      {nonResponders.length > 15 && (
                        <li className="text-xs text-muted-foreground">{t("admin.attendance.showingFirst15")}</li>
                      )}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>{t("admin.automatedReminders")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {t("admin.attendance.remindersHelp")} <code className="px-1">/api/cron/rsvp-reminders</code>. {t("admin.attendance.remindersHelp2")}
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="enrollments" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>{t("admin.participantEnrollments")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-sm text-muted-foreground">
                  {t("admin.tabs.enrollments")} define who is expected to RSVP for each activity. The RSVP compliance report and reminder automation
                  only targets participants who have an active enrollment matching the activity’s program type (and optional location).
                </p>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label>{t("admin.selectParticipant")}</Label>
                    <Select value={enrollmentUserId} onValueChange={setEnrollmentUserId}>
                      <SelectTrigger>
                        <SelectValue placeholder={t("admin.selectParticipant")} />
                      </SelectTrigger>
                      <SelectContent>
                        {(profiles ?? [])
                          .filter((p: any) => ["participant", "student"].includes(p.role ?? "participant"))
                          .sort((a: any, b: any) => String(a.full_name ?? "").localeCompare(String(b.full_name ?? "")))
                          .map((p: any) => (
                            <SelectItem key={p.id} value={p.id}>
                              {p.full_name ?? p.email ?? p.id}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>{t("admin.programType")}</Label>
                    <Select value={enrollmentProgramType} onValueChange={setEnrollmentProgramType}>
                      <SelectTrigger>
                        <SelectValue placeholder={t("admin.programType")} />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          { value: "School Support", label: t("programTypes.schoolSupport") },
                          { value: "Football Development", label: t("programTypes.footballDevelopment") },
                          { value: "Mentorship", label: t("programTypes.mentorship") },
                          { value: "Creative Skills", label: t("programTypes.creativeSkills") },
                        ].map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>{t("admin.location")} ({t("admin.locationOptional")})</Label>
                    <Input
                      value={enrollmentLocation}
                      onChange={(e) => setEnrollmentLocation(e.target.value)}
                      placeholder={t("admin.locationExample")}
                    />
                    <div className="text-xs text-muted-foreground">
                      {t("admin.locationHint")}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button onClick={saveEnrollment} disabled={!enrollmentUserId || enrollmentSaving}>
                    {enrollmentSaving ? t("common.loading") : t("admin.saveEnrollment")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="invites">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>{t("admin.generateInvite")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {t("admin.invitesHelp")}
                  </p>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>{t("admin.invites.role")}</Label>
                      <Select value={inviteRole} onValueChange={(v) => setInviteRole(v)}>
                        <SelectTrigger>
                          <SelectValue placeholder={t("admin.invites.role")} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="volunteer">{t("admin.roles.volunteer")}</SelectItem>
                          <SelectItem value="staff">{t("admin.roles.staff")}</SelectItem>
                          <SelectItem value="board">{t("admin.roles.board")}</SelectItem>
                          <SelectItem value="admin">{t("admin.roles.admin")}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="inviteMaxUses">{t("admin.invites.maxUses")}</Label>
                      <Input
                        id="inviteMaxUses"
                        type="number"
                        min={1}
                        value={inviteMaxUses}
                        onChange={(e) => setInviteMaxUses(Number(e.target.value))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="inviteExpiresDays">{t("admin.invites.expiresDays")}</Label>
                      <Input
                        id="inviteExpiresDays"
                        type="number"
                        min={1}
                        value={inviteExpiresDays}
                        onChange={(e) => setInviteExpiresDays(Number(e.target.value))}
                      />
                    </div>
                  </div>

                  <Button
                    onClick={async () => {
                      setInviteGenerating(true);
                      setGeneratedInviteCode("");
                      try {
                        const expiresAt = new Date(Date.now() + inviteExpiresDays * 24 * 60 * 60 * 1000).toISOString();
                        const { data, error } = await supabase.rpc("create_staff_invite", {
                          p_role: inviteRole,
                          p_expires_at: expiresAt,
                          p_max_uses: inviteMaxUses,
                        });
                        if (error) throw error;
                        const code = (data as any)?.[0]?.invite_code;
                        setGeneratedInviteCode(code ?? "");
                        toast({ title: t("admin.inviteCodeCreated"), description: t("admin.shareSecurely") });
                      } catch (err: any) {
                        toast({ title: t("admin.invites.createErrorTitle"), description: err?.message ?? t("common.tryAgain"), variant: "destructive" });
                      } finally {
                        setInviteGenerating(false);
                      }
                    }}
                    disabled={inviteGenerating}
                  >
                    {inviteGenerating ? t("admin.invites.generating") : t("admin.generateInvite")}
                  </Button>

                  {generatedInviteCode ? (
                    <div className="rounded-lg border border-border bg-secondary/30 p-4">
                      <div className="text-sm font-medium text-foreground">{t("admin.inviteCode")}</div>
                      <div className="mt-2 font-mono text-lg">{generatedInviteCode}</div>
                      <div className="mt-3 flex gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={async () => {
                            await navigator.clipboard.writeText(generatedInviteCode);
                            toast({ title: t("common.copied"), description: t("admin.invites.copiedBody") });
                          }}
                        >
                          {t("admin.invites.copy")}
                        </Button>
                      </div>
                      <p className="mt-3 text-xs text-muted-foreground">
                        {t("admin.invites.redeemHint")} <strong>/auth/staff</strong> {t("admin.invites.redeemHint2")}
                      </p>
                    </div>
                  ) : null}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t("admin.activeInvites")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {t("admin.invites.activeListHelp")}
                  </p>
                  <InviteList />
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6">
              <CardHeader className="flex flex-row items-center justify-between gap-3">
                <CardTitle>{t("admin.inviteUsageAudit")}</CardTitle>
                <Button type="button" variant="outline" size="sm" onClick={() => refetchInviteAudit()} disabled={inviteAuditLoading}>
                  <RefreshCw className={"h-4 w-4 " + (inviteAuditLoading ? "animate-spin" : "")} /> {t("admin.refresh")}
                </Button>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {t("admin.invites.auditHelp")}
                </p>

                <div className="mt-4 overflow-x-auto rounded-lg border border-border">
                  <table className="min-w-full text-sm">
                    <thead className="bg-secondary/30 text-left">
                      <tr>
                        <th className="px-3 py-2">{t("admin.usedAt")}</th>
                        <th className="px-3 py-2">{t("admin.usedBy")}</th>
                        <th className="px-3 py-2">{t("admin.assignedRole")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(inviteAudit ?? []).map((row: any, idx: number) => {
                        const who = (profiles ?? []).find((p: any) => p.id === row.used_by);
                        return (
                          <tr key={idx} className="border-t border-border">
                            <td className="px-3 py-2">{row.used_at ? format(new Date(row.used_at), "yyyy-MM-dd HH:mm") : ""}</td>
                            <td className="px-3 py-2">
                              <div className="font-medium">{who?.full_name ?? t("common.unknown")}</div>
                              <div className="text-muted-foreground">{who?.email ?? row.used_by}</div>
                            </td>
                            <td className="px-3 py-2">{row.assigned_role}</td>
                          </tr>
                        );
                      })}

                      {(!inviteAudit || inviteAudit.length === 0) ? (
                        <tr>
                          <td className="px-3 py-6 text-muted-foreground" colSpan={3}>
                            {t("admin.invites.auditEmpty")}
                          </td>
                        </tr>
                      ) : null}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </div>
    </Layout>
  );
}
