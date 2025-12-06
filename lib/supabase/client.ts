"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

let supabase: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!supabase) {
    supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL as string,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
      {
        cookieOptions: {
          name: "sb-pool-hydraulics",
          lifetime: 60 * 60 * 24 * 7, // 7 jours
          sameSite: "lax",
          secure: true,
        },
      }
    );
  }

  return supabase;
}
