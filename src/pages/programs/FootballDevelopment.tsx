import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Football Development program page.
 */
export default function FootballDevelopment() {
  return (
    <Layout>
      <div className="section-container py-12 lg:py-20">
        <h1 className="font-display text-4xl font-bold text-foreground">Football Development</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Training pathways for boys and girls across ages 7–20 with a strong focus on long-term
          retention, confidence, and healthy performance culture.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Weekly training</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-muted-foreground">
              <ul className="list-disc pl-5">
                <li>Age-group sessions in Trollhättan and Vänersborg (including Sjuntorp and Vargön)</li>
                <li>Separate sessions for boys and girls where appropriate</li>
                <li>Attendance and RSVP rules (48h response window) supported by the platform</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle>High-ambition intensive training</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-muted-foreground">
              <ul className="list-disc pl-5">
                <li>Fridays 17:00–18:30 for ages 15–20</li>
                <li>Individual technical/tactical focus with feedback logs</li>
                <li>Suitable for participants aiming for higher competitive levels</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
