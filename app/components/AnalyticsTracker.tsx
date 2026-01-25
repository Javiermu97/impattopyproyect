'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // 1. Creamos o recuperamos un ID de sesión simple
    let sessionId = sessionStorage.getItem('impatto_session');
    
    if (!sessionId) {
      sessionId = Math.random().toString(36).substring(7) + Date.now();
      sessionStorage.setItem('impatto_session', sessionId);
    }

    // 2. Solo registramos la visita si es la página de inicio o si quieres 
    // que cuente la sesión independientemente de donde entre, pero con el ID.
    const trackVisitor = async () => {
      await supabase.from('page_views').insert([{ 
        page_path: pathname, 
        session_id: sessionId // Esto nos permite filtrar por "únicos" después
      }]);
    };

    trackVisitor();
  }, [pathname]);

  return null;
}