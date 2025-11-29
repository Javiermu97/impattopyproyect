import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';

// ESTO ES OBLIGATORIO EN NEXT.JS 15 PARA EVITAR EL BUCLE
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  // Aseguramos que 'base' sea correcto
  const base = process.env.NEXT_PUBLIC_BASE_URL || "https://impatto.com.py";

  try {
    const url = new URL(req.url);
    const code = url.searchParams.get("code");
    const error = url.searchParams.get("error");
    const errorDescription = url.searchParams.get("error_description");

    if (error) {
      return NextResponse.redirect(
        `${base}/cuenta/login?oauth_error=${encodeURIComponent(error)}&desc=${encodeURIComponent(errorDescription || "")}`
      );
    }

    if (!code) {
      return NextResponse.redirect(`${base}/cuenta/login?oauth_error=missing_code`);
    }

    // --- CORRECCIÓN NEXT.JS 15: await cookies() ---
    const cookieStore = await cookies();
    
    const stateCookie = cookieStore.get("oauth_state")?.value;
    const verifier = cookieStore.get("pkce_verifier")?.value;
    const state = url.searchParams.get("state");

    // Validamos seguridad (PKCE y State)
    if (!state || !stateCookie || state !== stateCookie) {
      return NextResponse.redirect(`${base}/cuenta/login?oauth_error=invalid_state`);
    }

    if (!verifier) {
      return NextResponse.redirect(`${base}/cuenta/login?oauth_error=missing_pkce_verifier`);
    }

    // 1. Canjeamos el código con Google MANUALMENTE (Esto mantiene tu marca)
    const redirectUri = `${base}/api/auth/google/callback`;

    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        code,
        grant_type: "authorization_code",
        redirect_uri: redirectUri,
        code_verifier: verifier,
      }),
    });

    const tokenJson = await tokenRes.json();
    if (!tokenRes.ok) {
      console.error("Error Google:", tokenJson);
      return NextResponse.redirect(`${base}/cuenta/login?oauth_error=token_exchange_failed`);
    }

    const { id_token } = tokenJson;
    if (!id_token) {
      return NextResponse.redirect(`${base}/cuenta/login?oauth_error=no_id_token`);
    }

    // 2. Creamos la sesión en Supabase usando el ID Token de Google
    // Usamos el cliente oficial para que guarde las cookies automáticamente
    const supabase = createRouteHandlerClient({ 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        cookies: () => cookieStore as any 
    });

    const { error: signInError } = await supabase.auth.signInWithIdToken({
      provider: 'google',
      token: id_token,
    });

    if (signInError) {
      console.error("Error Supabase:", signInError);
      return NextResponse.redirect(`${base}/cuenta/login?oauth_error=supabase_session_failed`);
    }

    // 3. Limpiamos las cookies temporales de seguridad
    cookieStore.delete("oauth_state");
    cookieStore.delete("pkce_verifier");

    // 4. ¡Éxito! Redirigimos a la cuenta
    return NextResponse.redirect(`${base}/cuenta`);

  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    return NextResponse.redirect(
      `${base}/cuenta/login?oauth_error=callback_failed&desc=${encodeURIComponent(errorMessage)}`
    );
  }
}