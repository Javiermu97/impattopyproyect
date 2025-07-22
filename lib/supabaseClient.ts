// lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

// ─── Credenciales de tu proyecto Supabase ────────────────────────────────
const supabaseUrl = 'https://wghpygqhmrdvlimszghg.supabase.co'
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndnaHB5Z3FobXJkdmxpbXN6Z2hnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxNDg2NTYsImV4cCI6MjA2ODcyNDY1Nn0.5hYFBIRkqUbDy21NWfJ7UnPfeuuhDqEQOUjShPVJ7bA'

// ─── Cliente Supabase ────────────────────────────────────────────────────
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
