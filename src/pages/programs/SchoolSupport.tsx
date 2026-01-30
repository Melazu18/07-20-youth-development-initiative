import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * School Support program page.
 */
export default function SchoolSupport() {
  return (
    <Layout>
      <div className="section-container py-12 lg:py-20">
        <h1 className="font-display text-4xl font-bold text-foreground">School Support</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Homework support, study planning, and structured guidance for ages 7–15. Sessions are
          designed to complement school routines and help participants build consistent habits.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Card className="border-border">
            <CardHeader>
              <CardTitle>What we do</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-muted-foreground">
              <ul className="list-disc pl-5">
                <li>Weekly homework support sessions (small groups)</li>
                <li>Study plans and goal tracking</li>
                <li>Guidance for parents/guardians on routines and follow-up</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle>How it connects</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-muted-foreground">
              <ul className="list-disc pl-5">
                <li>Attendance tracking aligned with safeguarding and data protection</li>
                <li>Mentor feedback integrated into participant progress profiles</li>
                <li>Exportable summaries for school collaboration (when consent applies)</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
