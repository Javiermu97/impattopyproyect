// lib/supabase/server.ts
import { createClient as createSupabaseClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

/**
 * IMPORTANTE:
 * ❌ NUNCA lanzar throw en build
 * ✅ Solo advertir en desarrollo
 */
if (!supabaseUrl || !serviceRoleKey) {
  console.warn('⚠️ Variables de entorno de Supabase no definidas todavía (build safe)');
}

/**
 * Cliente server con Service Role
 * ⚠️ SOLO para server actions, routes, server components
 */
export const supabaseServer: SupabaseClient = createSupabaseClient(
  supabaseUrl || '',
  serviceRoleKey || '',
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  }
);

/**
 * Compatibilidad con tu código existente
 */
export function createClient(): SupabaseClient {
  return supabaseServer;
}


