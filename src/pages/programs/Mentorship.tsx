import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Mentorship program page.
 */
export default function Mentorship() {
  return (
    <Layout>
      <div className="section-container py-12 lg:py-20">
        <h1 className="font-display text-4xl font-bold text-foreground">Mentorship</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Mentor circles and guidance sessions for ages 15–20, focused on goals, education pathways, leadership, and safe decision-making.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Mentor circles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-muted-foreground">
              <ul className="list-disc pl-5">
                <li>Regular small-group sessions with consistent mentor teams</li>
                <li>Clear safeguarding standards and reporting procedures</li>
                <li>Participant attendance and engagement tracking</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle>Volunteer coordination</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-muted-foreground">
              <ul className="list-disc pl-5">
                <li>Volunteers can register and book availability</li>
                <li>Admins can confirm assignments and export coverage summaries</li>
                <li>Digital policy acknowledgements (safeguarding and data protection)</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
