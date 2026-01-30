// Supabase client initialization.
// The frontend uses the anon (publishable) key; never expose service-role keys here.
import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;

/**
 * True when the environment variables required to talk to Supabase are present.
 * Used to show a helpful setup message instead of failing silently.
 */
export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_PUBLISHABLE_KEY);

if (!isSupabaseConfigured) {
  // Keep the app running so pages can render a setup hint.
  // Queries will fail until the env vars are provided.
  // eslint-disable-next-line no-console
  console.warn(
    "[Supabase] Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY. Add them to .env and restart the dev server."
  );
}

export const supabase = createClient<Database>(SUPABASE_URL ?? "", SUPABASE_PUBLISHABLE_KEY ?? "", {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  },
});
