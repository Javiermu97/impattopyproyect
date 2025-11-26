// app/api/auth/google/callback/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  // Aseguramos que 'base' siempre sea una URL absoluta (debe empezar con https://)
  const base = process.env.NEXT_PUBLIC_BASE_URL || "https://www.impatto.com.py";

  try {
    const url = new URL(req.url);
    const code = url.searchParams.get("code");
    const error = url.searchParams.get("error");
    const errorDescription = url.searchParams.get("error_description");

    if (error) {
      // ✅ CORRECCIÓN: Usando URL absoluta con 'base'
      return NextResponse.redirect(
        `${base}/login?oauth_error=${encodeURIComponent(error)}&desc=${encodeURIComponent(errorDescription || "")}`
      );
    }

    if (!code) {
      // ✅ CORRECCIÓN: Usando URL absoluta con 'base' (soluciona error 'missing_code')
      return NextResponse.redirect(`${base}/login?oauth_error=missing_code`);
    }

    // 👇 TU VERSIÓN DE NEXT REQUIERE await
    const c = await cookies();
    const stateCookie = c.get("oauth_state")?.value || "";
    const verifier = c.get("pkce_verifier")?.value || "";
    const state = url.searchParams.get("state") || "";

    if (!state || !stateCookie || state !== stateCookie) {
      // ✅ CORRECCIÓN: Usando URL absoluta con 'base' (soluciona error 'invalid_state')
      return NextResponse.redirect(`${base}/login?oauth_error=invalid_state`);
    }

    if (!verifier) {
      // ✅ CORRECCIÓN: Usando URL absoluta con 'base'
      return NextResponse.redirect(`${base}/login?oauth_error=missing_pkce_verifier`);
    }

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
      const detail = typeof tokenJson === "object" ? JSON.stringify(tokenJson) : String(tokenJson);
      // ✅ CORRECCIÓN: Usando URL absoluta con 'base'
      return NextResponse.redirect(
        `${base}/login?oauth_error=token_exchange_failed&detail=${encodeURIComponent(detail)}`
      );
    }

    const { id_token } = tokenJson as { id_token?: string };
    if (!id_token) {
      // ✅ CORRECCIÓN: Usando URL absoluta con 'base'
      return NextResponse.redirect(`${base}/login?oauth_error=no_id_token`);
    }

    const supaRes = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/token?grant_type=id_token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
        },
        body: JSON.stringify({
          provider: "google",
          id_token,
        }),
      }
    );

    const supaJson = await supaRes.json();
    if (!supaRes.ok) {
      const detail = typeof supaJson === "object" ? JSON.stringify(supaJson) : String(supaJson);
      // ✅ CORRECCIÓN: Usando URL absoluta con 'base'
      return NextResponse.redirect(
        `${base}/login?oauth_error=supabase_session_failed&detail=${encodeURIComponent(detail)}`
      );
    }

    // 👇 TAMBIÉN requiere await (tu versión)
    await c.delete("oauth_state");
    await c.delete("pkce_verifier");

    // ✅ CORRECCIÓN: Usando URL absoluta con 'base'
    return NextResponse.redirect(`${base}/cuenta`);
  } catch (err: unknown) {
    // Manejo seguro del error: obtenemos un mensaje sin usar `any`
    let message = "unknown_error";
    if (err instanceof Error) {
      message = err.message;
    } else if (typeof err === "object" && err !== null && "message" in err) {
      // Si el objeto tiene una propiedad message, la convertimos a string de forma segura
      const possible = (err as { message?: unknown }).message;
      message = typeof possible === "string" ? possible : String(possible);
    } else {
      message = String(err);
    }

    // ✅ CORRECCIÓN: Usando URL absoluta con 'base' y message verificada
    return NextResponse.redirect(
      `${base}/login?oauth_error=callback_failed&desc=${encodeURIComponent(message)}`
    );
  }
}




