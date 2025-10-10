import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");
  const errorDescription = url.searchParams.get("error_description");

  if (error) {
    return NextResponse.redirect(`/login?oauth_error=${encodeURIComponent(error)}&desc=${encodeURIComponent(errorDescription || "")}`);
  }
  if (!code) {
    return NextResponse.redirect(`/login?oauth_error=missing_code`);
  }

  const c = await cookies(); // ← IMPORTANTE: await
  const stateCookie = c.get("oauth_state")?.value || "";
  const verifier = c.get("pkce_verifier")?.value || "";
  const state = url.searchParams.get("state") || "";

  if (!state || !stateCookie || state !== stateCookie) {
    return NextResponse.redirect(`/login?oauth_error=invalid_state`);
  }
  if (!verifier) {
    return NextResponse.redirect(`/login?oauth_error=missing_pkce_verifier`);
  }

  const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/google/callback`;

  // Intercambio de código por tokens en Google
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      code,
      grant_type: "authorization_code",
      redirect_uri: redirectUri,
      code_verifier: verifier
    })
  });

  const tokenJson = await tokenRes.json();
  if (!tokenRes.ok) {
    const detail = typeof tokenJson === "object" ? JSON.stringify(tokenJson) : String(tokenJson);
    return NextResponse.redirect(`/login?oauth_error=token_exchange_failed&detail=${encodeURIComponent(detail)}`);
  }

  const { id_token } = tokenJson as { id_token?: string };
  if (!id_token) {
    return NextResponse.redirect(`/login?oauth_error=no_id_token`);
  }

  // Crear sesión en Supabase usando el ID Token de Google
  const supaRes = await fetch(`${process.env.SUPABASE_URL}/auth/v1/token?grant_type=id_token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": process.env.SUPABASE_ANON_KEY!,
      "Authorization": `Bearer ${process.env.SUPABASE_ANON_KEY!}`
    },
    body: JSON.stringify({ provider: "google", id_token })
  });

  const supaJson = await supaRes.json();
  if (!supaRes.ok) {
    const detail = typeof supaJson === "object" ? JSON.stringify(supaJson) : String(supaJson);
    return NextResponse.redirect(`/login?oauth_error=supabase_session_failed&detail=${encodeURIComponent(detail)}`);
  }

  // Limpia cookies opcionalmente
  c.delete("oauth_state");
  c.delete("pkce_verifier");

  return NextResponse.redirect("/cuenta");
}

