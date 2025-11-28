import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  // Si venimos de un Reset Password, Supabase a veces manda 'next', si no, vamos a /cuenta
  const next = requestUrl.searchParams.get('next') || '/cuenta';

  if (code) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    
    // Esta función mágica detecta si es Google o Reset Password y crea la sesión
    await supabase.auth.exchangeCodeForSession(code);
  }

  // Redirección final
  return NextResponse.redirect(`${requestUrl.origin}${next}`);
}