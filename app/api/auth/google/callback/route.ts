// app/api/auth/google/callback/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';

// ESTA LÍNEA ES VITAL PARA QUE NO ENTRE Y SALGA (Evita caché)
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "https://impatto.com.py";
  const requestUrl = new URL(req.url);
  const code = requestUrl.searchParams.get("code");
  const error = requestUrl.searchParams.get("error");
  const errorDescription = requestUrl.searchParams.get("error_description");

  if (error) {
    return NextResponse.redirect(
      `${base}/cuenta/login?oauth_error=${encodeURIComponent(error)}&desc=${encodeURIComponent(errorDescription || "")}`
    );
  }

  if (!code) {
    return NextResponse.redirect(`${base}/cuenta/login?oauth_error=missing_code`);
  }

  // --- CORRECCIÓN NEXT.JS 15 ---
  const cookieStore = await cookies();
  
  // Inicializamos Supabase para guardar la sesión
  const supabase = createRouteHandlerClient({ 
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cookies: () => cookieStore as any 
  });

  // Intercambiamos el código por la sesión directamente con Supabase
  // Esto reemplaza todo tu código manual de fetch a Google que tenías antes
  // pero mantiene tu ruta personalizada.
  const { error: sessionError } = await supabase.auth.exchangeCodeForSession(code);

  if (sessionError) {
      return NextResponse.redirect(`${base}/cuenta/login?oauth_error=session_error`);
  }

  // Redirigimos a la cuenta
  return NextResponse.redirect(`${base}/cuenta`);
}