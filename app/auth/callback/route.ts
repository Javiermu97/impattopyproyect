import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const next = requestUrl.searchParams.get('next') || '/cuenta';

  if (code) {
    const cookieStore = await cookies();
    
    const supabase = createRouteHandlerClient({ 
      // Esta línea de abajo le dice a ESLint que nos deje usar 'any' solo aquí
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cookies: () => cookieStore as any 
    });
    
    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(`${requestUrl.origin}${next}`);
}