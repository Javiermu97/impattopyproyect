// lib/supabase/auth-server.ts
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

/**
 * Cliente server para páginas protegidas.
 * Corregido: Se pasa 'cookies' como referencia para evitar el error de "get is not a function"
 */
export function createAuthServerClient() {
  return createServerComponentClient({
    cookies, // <--- SIN PARÉNTESIS. Esto arregla el error.
  })
}
