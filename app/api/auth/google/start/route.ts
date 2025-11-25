// app/api/auth/google/start/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { generateCodeVerifier, generateCodeChallenge, randomState } from "@/lib/pkce";

export async function GET() {
  // ✅ URL base: toma la variable de entorno
  const base = process.env.NEXT_PUBLIC_BASE_URL;
  if (!base) {
    throw new Error("NEXT_PUBLIC_BASE_URL no está definido en tu .env");
  }

  // ✅ Client ID de Google
  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId) {
    throw new Error("GOOGLE_CLIENT_ID no está definido en tu .env");
  }

  // ✅ redirect_uri: debe coincidir exactamente con lo registrado en Google Cloud
  const redirectUri = `${base}/api/auth/google/callback`;

  // Genera estado y PKCE
  const state = randomState();
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = generateCodeChallenge(codeVerifier);

  // Guarda cookies seguras
  const c = await cookies();
  const secure = process.env.NODE_ENV === "production";

  c.set("oauth_state", state, {
    httpOnly: true,
    secure,
    sameSite: secure ? "none" : "lax",
    path: "/",
  });

  c.set("pkce_verifier", codeVerifier, {
    httpOnly: true,
    secure,
    sameSite: secure ? "none" : "lax",
    path: "/",
  });

  // Construye URL de autorización de Google
  const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  authUrl.searchParams.set("client_id", clientId);
  authUrl.searchParams.set("redirect_uri", redirectUri);
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("scope", "openid email profile");
  authUrl.searchParams.set("state", state);
  authUrl.searchParams.set("code_challenge", codeChallenge);
  authUrl.searchParams.set("code_challenge_method", "S256");
  authUrl.searchParams.set("prompt", "select_account");

  // Redirige al usuario a Google
  return NextResponse.redirect(authUrl.toString());
}


