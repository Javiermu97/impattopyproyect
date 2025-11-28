import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const next = requestUrl.searchParams.get('next') || '/cuenta';

  if (code) {
    // 1. En Next.js 15, cookies() es una promesa, hay que esperar a que se resuelva
    const cookieStore = await cookies();
    
    // 2. Creamos el cliente usando un truco (casting) para evitar error de tipos en el Build
    const supabase = createRouteHandlerClient({ 
      cookies: () => cookieStore as any 
    });
    
    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(`${requestUrl.origin}${next}`);
}