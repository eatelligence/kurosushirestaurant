import "server-only";
import { createClient } from "@supabase/supabase-js";

// Service-role client. Bypasses RLS. Use only in trusted server contexts
// (seed script, server actions that explicitly need elevated rights).
// NEVER import this from client components.
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: { persistSession: false, autoRefreshToken: false },
    }
  );
}
