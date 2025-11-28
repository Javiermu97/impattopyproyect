import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// ESTA LÍNEA ES LA SOLUCIÓN AL BUCLE:
// Obliga a Next.js a procesar el login desde cero cada vez, sin usar memoria vieja.
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const next = requestUrl.searchParams.get('next') || '/cuenta';

  if (code) {
    const cookieStore = await cookies();
    const supabase = createRouteHandlerClient({ 
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cookies: () => cookieStore as any 
    });
    
    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(`${requestUrl.origin}${next}`);
}