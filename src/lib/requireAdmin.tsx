import { ReactNode, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";

/**
 * RequireAdmin protects admin-only routes.
 *
 * If the visitor is not signed in, we redirect them to /auth.
 * If the visitor is signed in but not an admin, we redirect them to the home page.
 */
export function RequireAdmin({ children }: { children: ReactNode }) {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      navigate("/auth", { replace: true, state: { from: location.pathname } });
      return;
    }

    if (profile?.role !== "admin") {
      navigate("/", { replace: true });
    }
  }, [loading, user, profile, navigate, location.pathname]);

  if (loading) return null;
  if (!user) return null;
  if (profile?.role !== "admin") return null;

  return <>{children}</>;
}
