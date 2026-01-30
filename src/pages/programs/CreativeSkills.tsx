import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Creative Skills program page.
 */
export default function CreativeSkills() {
  return (
    <Layout>
      <div className="section-container py-12 lg:py-20">
        <h1 className="font-display text-4xl font-bold text-foreground">Creative Skills</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Workshops that build confidence, collaboration, and practical skills. These sessions complement sport and education pathways.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Workshops</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-muted-foreground">
              <ul className="list-disc pl-5">
                <li>Creative workshops (media, arts, and project-based learning)</li>
                <li>Safe and inclusive environment with clear conduct expectations</li>
                <li>Age-adapted sessions for 8–14 and mixed groups</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle>Outcomes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-muted-foreground">
              <ul className="list-disc pl-5">
                <li>Confidence and communication improvements</li>
                <li>Documented participation and progress notes</li>
                <li>Exportable summaries for partners when consent applies</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
