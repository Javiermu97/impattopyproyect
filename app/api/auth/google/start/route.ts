import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { generateCodeVerifier, generateCodeChallenge, randomState } from "@/lib/pkce";

export async function GET() {
  const base = process.env.NEXT_PUBLIC_BASE_URL!;
  const clientId = process.env.GOOGLE_CLIENT_ID!;
  const redirectUri = `${base}/api/auth/google/callback`;

  const state = randomState();
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = generateCodeChallenge(codeVerifier);

  const c = await cookies(); // ← IMPORTANTE: await
  const secure = process.env.NODE_ENV === "production";

  c.set("oauth_state", state, { httpOnly: true, secure, sameSite: secure ? "none" : "lax", path: "/" });
  c.set("pkce_verifier", codeVerifier, { httpOnly: true, secure, sameSite: secure ? "none" : "lax", path: "/" });

  const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  authUrl.searchParams.set("client_id", clientId);
  authUrl.searchParams.set("redirect_uri", redirectUri);
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("scope", "openid email profile");
  authUrl.searchParams.set("state", state);
  authUrl.searchParams.set("code_challenge", codeChallenge);
  authUrl.searchParams.set("code_challenge_method", "S256");
  authUrl.searchParams.set("prompt", "select_account");

  return NextResponse.redirect(authUrl.toString());
}

