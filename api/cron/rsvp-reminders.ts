import { createClient } from "@supabase/supabase-js";

/**
 * Vercel Cron endpoint: sends RSVP reminders for activities that are within 48 hours.
 *
 * This endpoint expects server-side environment variables:
 * - SUPABASE_URL
 * - SUPABASE_SERVICE_ROLE_KEY
 *
 * Optional email delivery via Resend:
 * - RESEND_API_KEY
 * - RESEND_FROM_EMAIL (e.g. "07–20 <noreply@yourdomain.se>")
 *
 * The function is intentionally safe-by-default:
 * - If email provider vars are missing, it returns the list of reminders it WOULD have sent.
 */
export default async function handler(req: any, res: any) {
  try {
    const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceKey) {
      res.status(500).json({ error: "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY" });
      return;
    }

    const sb = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });

    const now = new Date();
    const in48h = new Date(now.getTime() + 48 * 60 * 60 * 1000);

    // Fetch activities starting within the next 48 hours.
    const { data: activities, error: actErr } = await sb
      .from("activities")
      .select("id, title, program_type, location, starts_at")
      .gte("starts_at", now.toISOString())
      .lte("starts_at", in48h.toISOString())
      .order("starts_at", { ascending: true });

    if (actErr) throw actErr;

    // Expected responders: enrolled participants/students only.
    const { data: profiles, error: profErr } = await sb
      .from("profiles")
      .select("id, full_name, email, role")
      .in("role", ["participant", "student"]);

    if (profErr) throw profErr;

    const resendKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL;

    const reminders: Array<any> = [];

    for (const activity of activities ?? []) {
      // Load enrollments that match this activity.
      const { data: enrollments, error: enrErr } = await sb
        .from("enrollments")
        .select("user_id, program_type, location, active")
        .eq("active", true)
        .eq("program_type", activity.program_type);

      if (enrErr) throw enrErr;

      const expectedIds = new Set(
        (enrollments ?? [])
          .filter((e: any) => !e.location || e.location === activity.location)
          .map((e: any) => e.user_id)
      );

      const expectedProfiles = (profiles ?? []).filter((p: any) => expectedIds.has(p.id) && p.email);

      const { data: rsvps, error: rsvpErr } = await sb
        .from("activity_rsvp")
        .select("user_id")
        .eq("activity_id", activity.id);

      if (rsvpErr) throw rsvpErr;

      const responded = new Set((rsvps ?? []).map((r: any) => r.user_id));
      const nonResponders = expectedProfiles.filter((p: any) => !responded.has(p.id));

      for (const person of nonResponders) {
        reminders.push({
          activity_id: activity.id,
          activity_title: activity.title,
          activity_start_time: activity.starts_at,
          activity_location: activity.location,
          user_id: person.id,
          user_name: person.full_name,
          user_email: person.email,
        });
      }

      // Send emails if configured.
      if (resendKey && fromEmail && nonResponders.length > 0) {
        for (const person of nonResponders) {
          const start = new Date(activity.starts_at);
          const subject = `RSVP required: ${activity.title} (${start.toLocaleString("sv-SE")})`;
          const html = `
            <div style="font-family:system-ui,Segoe UI,Roboto,Arial,sans-serif;line-height:1.45">
              <h2 style="margin:0 0 12px">RSVP required</h2>
              <p>Hello${person.full_name ? ` ${person.full_name}` : ""},</p>
              <p>
                Please RSVP for the upcoming session:
              </p>
              <ul>
                <li><strong>${activity.title}</strong></li>
                <li><strong>When:</strong> ${start.toLocaleString("sv-SE")}</li>
                <li><strong>Where:</strong> ${activity.location ?? "See details in the platform"}</li>
              </ul>
              <p>
                Log in and respond in the Activities page.
              </p>
              <p style="color:#666;font-size:12px;margin-top:18px">
                07-20 Youth Development Initiative • Trollhättan, Sweden
              </p>
            </div>
          `;

          await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${resendKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: fromEmail,
              to: person.email,
              subject,
              html,
            }),
          });
        }
      }
    }

    res.status(200).json({
      ok: true,
      activities_checked: activities?.length ?? 0,
      reminders: reminders.length,
      email_enabled: Boolean(resendKey && fromEmail),
      preview: reminders.slice(0, 20),
    });
  } catch (e: any) {
    res.status(500).json({ error: e?.message ?? String(e) });
  }
}
