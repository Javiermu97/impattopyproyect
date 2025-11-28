import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  // 1. Inicializamos Supabase
  const supabase = createMiddlewareClient({ req, res });
  
  // 2. CRUCIAL: Esto refresca la sesión en TODAS las páginas.
  // Sin esto, la sesión se pierde al cambiar de ruta.
  const { data: { session } } = await supabase.auth.getSession();

  // 3. Lógica de Protección (Solo para Admin)
  // Mantenemos tu lógica original: Si intenta entrar a admin sin sesión, fuera.
  if (!session && req.nextUrl.pathname.startsWith('/admin')) {
    if (req.nextUrl.pathname !== '/admin/login') {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
  }

  // Opcional: Si quieres proteger /cuenta también para que no entren desconocidos:
  /*
  if (!session && req.nextUrl.pathname.startsWith('/cuenta') && !req.nextUrl.pathname.startsWith('/cuenta/login')) {
      return NextResponse.redirect(new URL('/cuenta/login', req.url));
  }
  */

  return res;
}

export const config = {
  // 4. CAMBIO VITAL: El matcher ahora debe incluir TODO el sitio,
  // excepto archivos estáticos (imágenes, favicon, etc).
  // Si solo pones '/admin', la sesión de usuario normal nunca se guardará.
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};