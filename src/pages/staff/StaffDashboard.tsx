import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/lib/auth";

/**
 * Staff Portal
 *
 * A lightweight landing area for volunteers, workers/coaches, and board members.
 * This page is protected by `RequireStaff`.
 */
export default function StaffDashboard() {
  const { profile } = useAuth();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold">Staff Portal</h1>
          <p className="mt-2 text-muted-foreground">
            Internal workspace for volunteers, workers/coaches, and board members.
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Activities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  View the weekly/monthly schedule, venues, and session details. Use this to prepare staffing and follow-up.
                </p>
                <Button asChild variant="outline">
                  <Link to="/activities">Open activities</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Governance & Safeguarding</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Review safeguarding, data protection, and governance documents. Staff are expected to follow these policies.
                </p>
                <Button asChild variant="outline">
                  <Link to="/safeguarding">Safeguarding policy</Link>
                </Button>
              </CardContent>
            </Card>

            {profile?.role === "admin" ? (
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Admin</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Administration tools for compliance exports, staff invites, and enrollment management.
                  </p>
                  <Button asChild>
                    <Link to="/admin">Open admin dashboard</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : null}
          </div>
        </div>
      </div>
    </Layout>
  );
}
