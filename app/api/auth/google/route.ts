import { NextResponse } from 'next/server';

export async function GET() {
  const googleClientId = process.env.GOOGLE_CLIENT_ID;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (!googleClientId || !siteUrl) {
    throw new Error('Google Client ID or Site URL is not configured.');
  }

  // La URL a la que Google nos devolverá al usuario
  const redirectUri = `${siteUrl}/api/auth/callback`;

  const params = new URLSearchParams({
    client_id: googleClientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'openid profile email', // Pedimos información básica del usuario
    prompt: 'select_account',
  });

  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;

  // Redirigimos al usuario a la página de login de Google
  return NextResponse.redirect(googleAuthUrl);
}