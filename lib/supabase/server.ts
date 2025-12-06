// lib/supabase/server.ts
import { createClient as createSupabaseClient, SupabaseClient } from '@supabase/supabase-js';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('NEXT_PUBLIC_SUPABASE_URL no definida en .env');
}
if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('SUPABASE_SERVICE_ROLE_KEY no definida en .env');
}

/**
 * Cliente global del server (usando SERVICE ROLE KEY).
 * Úsalo solo en código server-side.
 */
export const supabaseServer: SupabaseClient = createSupabaseClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  }
);

/**
 * Función compatibilidad: devuelve el cliente server.
 * Mantiene la API esperada por tu código (import { createClient } ...).
 */
export function createClient(): SupabaseClient {
  return supabaseServer;
}


