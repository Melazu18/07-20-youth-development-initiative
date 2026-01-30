import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const SAFEGUARDING_POLICY_SLUG = "safeguarding-v1";

/**
 * Auth context for the application.
 *
 * This wraps Supabase Auth so pages/components can access:
 * - the current session / user
 * - the user's profile row (role, name, etc.)
 * - a simple `signOut()` helper
 *
 * Notes
 * - The profile row is auto-created the first time a user signs in.
 * - Role-based access is enforced in the database via RLS policies (see `supabase/schema.sql`).
 */

export type UserRole = "participant" | "parent" | "volunteer" | "coach" | "admin";

export type UserProfile = {
  id: string;
  full_name: string | null;
  role: UserRole | string;
  created_at: string;
};

type AuthState = {
  loading: boolean;
  session: Awaited<ReturnType<typeof supabase.auth.getSession>>["data"]["session"] | null;
  user: Awaited<ReturnType<typeof supabase.auth.getUser>>["data"]["user"] | null;
  profile: UserProfile | null;
  isAdmin: boolean;
  policyLoading: boolean;
  hasSafeguardingAck: boolean;
  acknowledgeSafeguarding: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<AuthState["session"]>(null);
  const [user, setUser] = useState<AuthState["user"]>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [policyLoading, setPolicyLoading] = useState(false);
  const [hasSafeguardingAck, setHasSafeguardingAck] = useState(false);

  // Load initial session
  useEffect(() => {
    let mounted = true;

    const bootstrap = async () => {
      setLoading(true);
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setLoading(false);
    };

    bootstrap();

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);
    });

    return () => {
      mounted = false;
      subscription?.subscription?.unsubscribe();
    };
  }, []);

  // Ensure profile exists + keep profile in sync
  useEffect(() => {
    let cancelled = false;

    const syncProfile = async () => {
      if (!user) {
        setProfile(null);
        return;
      }

      // Try to read profile
      const { data: existing, error } = await supabase
        .from("profiles")
        .select("id, full_name, email, role, created_at")
        .eq("id", user.id)
        .maybeSingle();

      // If profile row doesn't exist yet, create a minimal one.
      if (!cancelled && (!existing || error)) {
        await supabase.from("profiles").insert({
          id: user.id,
          full_name: user.user_metadata?.full_name ?? null,
          email: user.email ?? null,
          role: "participant",
        });

        const { data: created } = await supabase
          .from("profiles")
          .select("id, full_name, email, role, created_at")
          .eq("id", user.id)
          .maybeSingle();

        if (!cancelled) setProfile((created as any) ?? null);
        return;
      }

      if (!cancelled) setProfile((existing as any) ?? null);

// Ensure profile has an email for admin reporting/reminders.
// This runs opportunistically and does not block normal login.
if ((existing as any)?.email == null && user.email) {
  await supabase.from("profiles").update({ email: user.email }).eq("id", user.id);
}

    };

    syncProfile();
    return () => {
      cancelled = true;
    };
  }, [user?.id]);



// Track whether the signed-in user has acknowledged the safeguarding policy.
// This is used to gate sensitive functionality (e.g., RSVP/attendance) until acknowledged.
useEffect(() => {
  let cancelled = false;

  const syncSafeguardingAck = async () => {
    if (!user) {
      setHasSafeguardingAck(false);
      setPolicyLoading(false);
      return;
    }

    setPolicyLoading(true);
    const { data, error } = await supabase
      .from("policy_acknowledgements")
      .select("id")
      .eq("user_id", user.id)
      .eq("policy_slug", SAFEGUARDING_POLICY_SLUG)
      .limit(1);

    if (cancelled) return;

    if (error) {
      // If we fail to read, be conservative and treat as not acknowledged.
      setHasSafeguardingAck(false);
      setPolicyLoading(false);
      return;
    }

    setHasSafeguardingAck((data?.length ?? 0) > 0);
    setPolicyLoading(false);
  };

  syncSafeguardingAck();
  return () => {
    cancelled = true;
  };
}, [user?.id]);

const value = useMemo<AuthState>(() => {
  const isAdmin = profile?.role === "admin";

  return {
    loading,
    session,
    user,
    profile,
    isAdmin,
    policyLoading,
    hasSafeguardingAck,
    acknowledgeSafeguarding: async () => {
      if (!user) return;

      // Insert the acknowledgement row. If it already exists, Supabase will return an error
      // unless you enforce uniqueness. The UI treats "already acknowledged" as success.
      const { error } = await supabase.from("policy_acknowledgements").insert({
          user_id: user.id,
          policy_slug: SAFEGUARDING_POLICY_SLUG,
          user_full_name: profile?.full_name ?? user.user_metadata?.full_name ?? null,
          user_email: (profile as any)?.email ?? user.email ?? null,
        });

        // Treat "already exists" as success.
        if (!error || (error as any)?.code === "23505") setHasSafeguardingAck(true);
    },

    refreshProfile: async () => {
      if (!user) return;

      const { data: p } = await supabase
        .from("profiles")
        .select("id, full_name, email, role, created_at")
        .eq("id", user.id)
        .maybeSingle();

      if (p) setProfile(p as any);

      const { data: ack } = await supabase
        .from("policy_acknowledgements")
        .select("id")
        .eq("user_id", user.id)
        .eq("policy_slug", SAFEGUARDING_POLICY_SLUG)
        .maybeSingle();

      setHasSafeguardingAck(!!ack);
    },

        signOut: async () => {
      await supabase.auth.signOut();
      setHasSafeguardingAck(false);
    },
  };
}, [loading, session, user, profile, policyLoading, hasSafeguardingAck]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
