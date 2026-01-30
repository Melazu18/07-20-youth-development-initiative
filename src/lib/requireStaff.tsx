import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/lib/auth";

/**
 * Route guard for staff-only areas.
 *
 * Staff roles are: volunteer, staff (worker/coach), board, admin.
 * Participants (youth) should not access staff-only pages.
 */
export function RequireStaff({ children }: { children: ReactNode }) {
  const { user, profile, loading } = useAuth();
  const location = useLocation();

  if (loading) return null;

  if (!user) {
    return <Navigate to="/auth/staff" replace state={{ from: location.pathname }} />;
  }

  const role = profile?.role ?? "participant";
  const isStaff = ["volunteer", "staff", "board", "admin"].includes(role);

  if (!isStaff) {
    return <Navigate to="/auth/staff" replace state={{ from: location.pathname }} />;
  }

  return <>{children}</>;
}
