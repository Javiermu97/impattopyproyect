import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "https://impatto.com.py";

  try {
    const url = new URL(req.url);
    const code = url.searchParams.get("code");
    const error = url.searchParams.get("error");

    // SI HAY ERROR DE GOOGLE, LO MOSTRAMOS EN PANTALLA
    if (error) {
      return NextResponse.json({ error: "Error desde Google", detalles: error });
    }
    if (!code) {
      return NextResponse.json({ error: "No llegó ningún código desde Google" });
    }

    const cookieStore = await cookies();
    
    // Verificamos cookies de seguridad (PKCE)
    const verifier = cookieStore.get("pkce_verifier")?.value;
    if (!verifier) {
       return NextResponse.json({ error: "Falta la cookie pkce_verifier. ¿El navegador está bloqueando cookies?" });
    }

    // 1. Canje con Google
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
      // SI FALLA EL CANJE, MOSTRAMOS EL JSON DE ERROR
      return NextResponse.json({ error: "Falló el canje de token con Google", google_response: tokenJson });
    }

    const { id_token } = tokenJson;

    // 2. Sesión en Supabase
    const supabase = createRouteHandlerClient({ 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        cookies: () => cookieStore as any 
    });

    const { error: signInError } = await supabase.auth.signInWithIdToken({
      provider: 'google',
      token: id_token,
    });

    if (signInError) {
      // SI FALLA SUPABASE, MOSTRAMOS EL ERROR EXACTO
      return NextResponse.json({ error: "Falló signInWithIdToken en Supabase", detalles: signInError });
    }

    // Limpieza
    cookieStore.delete("oauth_state");
    cookieStore.delete("pkce_verifier");

    // Solo si todo salió perfecto, redirigimos
    return NextResponse.redirect(`${base}/cuenta`);

  } catch (err: unknown) {
    return NextResponse.json({ 
        error: "Error CRÍTICO en el callback", 
        mensaje: err instanceof Error ? err.message : String(err) 
    });
  }
}