import "server-only";
import { createClient } from "@supabase/supabase-js";

// Cookie-less Supabase client for public reads. Safe to call inside
// unstable_cache because it doesn't touch any dynamic request data.
// RLS still applies (anonymous role).
export function createPublicClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: { persistSession: false, autoRefreshToken: false },
    }
  );
}
