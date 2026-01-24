// lib/supabase/server.ts
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { createClient } from '@supabase/supabase-js'
import type { SupabaseClient } from '@supabase/supabase-js'

/**
 * ✅ CLIENTE PARA AUTH (usa cookies del usuario)
 * 👉 ESTE es el que se usa en pages protegidas
 */
export async function createAuthClient() {
  return createServerComponentClient({ cookies })
}

/**
 * ⚠️ CLIENTE SERVICE ROLE
 * 👉 SOLO para operaciones administrativas
 * 👉 NO sirve para auth
 */
export const supabaseServiceRole: SupabaseClient = createClient(
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


