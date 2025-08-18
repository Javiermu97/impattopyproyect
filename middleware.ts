import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const { data: { session } } = await supabase.auth.getSession();

  // Si el usuario no está logueado y trata de acceder a una ruta protegida
  if (!session && req.nextUrl.pathname.startsWith('/admin')) {
    // Redirige a la página de login, excepto si ya está en ella
    if (req.nextUrl.pathname !== '/admin/login') {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
  }

  return res;
}

// Configura el middleware para que se ejecute solo en las rutas del admin
export const config = {
  matcher: ['/admin/:path*'],
};