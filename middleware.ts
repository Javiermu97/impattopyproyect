import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  
  // Si la ruta es parte del proceso de auth, DEJAMOS PASAR sin tocar nada.
  // Esto evita que el middleware rompa el login de Google.
  if (req.nextUrl.pathname.startsWith('/api/auth')) {
    return res;
  }

  const supabase = createMiddlewareClient({ req, res });
  await supabase.auth.getSession();

  return res;
}

export const config = {
  // El matcher ahora excluye explícitamente las rutas de api/auth para evitar conflict
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/auth).*)',
  ],
};