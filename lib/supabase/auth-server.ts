// lib/supabase/auth-server.ts
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

/**
 * Cliente server para páginas protegidas, usa cookies del usuario
 * Solo para server components (layouts, page.tsx)
 */
export function createAuthServerClient() {
  return createServerComponentClient({
    cookies,
  })
}

