// app/api/auth/google/start/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { generateCodeVerifier, generateCodeChallenge, randomState } from "@/lib/pkce";

export async function GET() {
  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL;
    if (!base) throw new Error("NEXT_PUBLIC_BASE_URL no está definido");

    const clientId = process.env.GOOGLE_CLIENT_ID;
    if (!clientId) throw new Error("GOOGLE_CLIENT_ID no está definido");

    const redirectUri = `${base}/api/auth/google/callback`;

    const state = randomState();
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier); // 👈 IMPORTANTE

    const c = await cookies();

    // Cookies compatibles con Google OAuth + Next.js
    c.set("oauth_state", state, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",   // 👈 CAMBIADO: evita invalid_state en varios hosts
      path: "/",
    });

    c.set("pkce_verifier", codeVerifier, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",   // 👈 Igual que arriba
      path: "/",
    });

    const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    authUrl.searchParams.set("client_id", clientId);
    authUrl.searchParams.set("redirect_uri", redirectUri);
    authUrl.searchParams.set("response_type", "code");
    authUrl.searchParams.set("scope", "openid email profile");
    authUrl.searchParams.set("state", state);
    authUrl.searchParams.set("code_challenge", codeChallenge);
    authUrl.searchParams.set("code_challenge_method", "S256");
    authUrl.searchParams.set("prompt", "select_account");
    authUrl.searchParams.set("access_type", "offline");

    return NextResponse.redirect(authUrl.toString());
  } catch (error: unknown) { // ✅ CORREGIDO: Reemplazado 'any' con 'unknown'
    const base = process.env.NEXT_PUBLIC_BASE_URL || "https://www.impatto.com.py";
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.redirect(
      // Utilizamos 'errorMessage' que es un string seguro
      `${base}/login?oauth_error=start_failed&desc=${encodeURIComponent(errorMessage)}`
    );
  }
}




