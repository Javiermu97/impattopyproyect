// app/api/auth/google/start/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
// Asegúrate de que tienes estas utilidades en tu proyecto (ya las tenías)
import { generateCodeVerifier, generateCodeChallenge, randomState } from "@/lib/pkce";

// VITAL PARA EVITAR BUCLES EN NEXT 15
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL || "https://impatto.com.py";
    const clientId = process.env.GOOGLE_CLIENT_ID;

    if (!clientId) throw new Error("GOOGLE_CLIENT_ID no está definido");

    // Tu ruta de callback manual
    const redirectUri = `${base}/api/auth/google/callback`;

    // Generamos las claves de seguridad PKCE
    const state = randomState();
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);

    // --- CORRECCIÓN NEXT.JS 15: await cookies() ---
    const cookieStore = await cookies();

    // Guardamos las cookies de seguridad
    cookieStore.set("oauth_state", state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Secure en producción
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 10, // 10 minutos
    });

    cookieStore.set("pkce_verifier", codeVerifier, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 10,
    });

    // Construimos la URL de Google A MANO (Esto es lo que mantiene tu marca "Impatto")
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

    // Redirigimos directo a Google (sin pasar por Supabase primero)
    return NextResponse.redirect(authUrl.toString());

  } catch (error: unknown) {
    const base = process.env.NEXT_PUBLIC_BASE_URL || "https://impatto.com.py";
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.redirect(
      `${base}/cuenta/login?oauth_error=start_failed&desc=${encodeURIComponent(errorMessage)}`
    );
  }
}
