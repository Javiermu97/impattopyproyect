import { NextResponse } from 'next/server';

export async function GET() {
  const googleClientId = process.env.GOOGLE_CLIENT_ID;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  // --- INICIO DEL CÓDIGO DE DEPURACIÓN ---
  // Imprimiremos en los logs de Vercel lo que el servidor está leyendo.
  console.log("VERCEL_SITE_URL_DETECTED:", siteUrl);
  // --- FIN DEL CÓDIGO DE DEPURACIÓN ---

  if (!googleClientId || !siteUrl) {
    // Si una de las variables no se encuentra, el log de arriba nos lo mostrará como "undefined"
    throw new Error('Google Client ID or Site URL is not configured.');
  }

  const redirectUri = `${siteUrl}/api/auth/callback`;

  // --- INICIO DEL CÓDIGO DE DEPURACIÓN ---
  // Imprimiremos la URL exacta que estamos enviando a Google.
  console.log("GENERATED_REDIRECT_URI:", redirectUri);
  // --- FIN DEL CÓDIGO DE DEPURACIÓN ---

  const params = new URLSearchParams({
    client_id: googleClientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'openid profile email',
    prompt: 'select_account',
  });

  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;

  return NextResponse.redirect(googleAuthUrl);
}