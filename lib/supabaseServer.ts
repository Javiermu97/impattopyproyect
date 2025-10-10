import { createClient } from '@supabase/supabase-js';

export const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,           // https://xxxxx.supabase.co
  process.env.SUPABASE_SERVICE_ROLE_KEY!,          // SOLO servidor
  { auth: { persistSession: false } }
);
