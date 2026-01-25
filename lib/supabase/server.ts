// lib/supabase/server.ts
import { createClient } from '@supabase/supabase-js'

/**
 * Cliente service role
 * SOLO para server actions o operaciones administrativas que saltan el RLS
 */
export const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  }
)

