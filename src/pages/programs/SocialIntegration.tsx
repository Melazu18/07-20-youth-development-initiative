import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Social Integration & Belonging Through Sport & Creativity
 *
 * Focus: youth with foreign background / youth new in Sweden ("Ny i Sverige").
 *
 * This page is written in sponsor- and municipality-ready language.
 */
export default function SocialIntegration() {
  return (
    <Layout>
      <div className="section-container py-12 lg:py-20">
        <h1 className="font-display text-4xl font-bold text-foreground">
          Social Integration &amp; Belonging Through Sport &amp; Creativity
        </h1>
        <p className="mt-2 max-w-3xl text-muted-foreground">
          Youth with Foreign Background / Ny i Sverige
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Program Description (Fundable Language)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  This program supports young people from migrant, refugee, and foreign-background families by
                  using sports and creative work as tools for integration, language development, and social belonging.
                </p>
                <p>
                  The approach strengthens protective factors such as consistent adult support, peer belonging, and
                  structured routines, while also building bridges between families, schools, clubs, and local communities.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Activities</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <ul className="list-disc space-y-2 pl-5">
                  <li>Mixed-background team training groups</li>
                  <li>Swedish language-through-sport sessions</li>
                  <li>Mentorship pairing (local youth + newcomer youth)</li>
                  <li>Parent engagement evenings (multilingual)</li>
                  <li>Creative workshops reflecting cultural identity</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Outcomes we measure</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground space-y-3">
                <p>Participation consistency and retention over time.</p>
                <p>Increased social belonging and peer connection.</p>
                <p>Improved Swedish language confidence in practical settings.</p>
                <p>Family engagement and support network strength.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Who it is for</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>
                  Young people ages 7–20 in Trollhättan and Vänersborg with a focus on youth who are new in Sweden,
                  or from under-resourced communities seeking safe, structured pathways into sport, creativity, and mentorship.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
